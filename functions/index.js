"use strict";

const { onSchedule } = require("firebase-functions/scheduler");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const ROOM_EMPTY_DELETE_MS = 5 * 60 * 1000;
const MAX_GAME_PLAYERS = 4;
const MAX_ROOM_MEMBERS = 6;

function activeSeatSet(room) {
  const active = new Set();
  const presence = room?.presence;
  if (!presence || typeof presence !== "object") return active;

  Object.entries(presence).forEach(([seat, connections]) => {
    if (connections && typeof connections === "object" && Object.keys(connections).length > 0) {
      active.add(Number(seat));
    }
  });
  return active;
}

function makeListing(roomCode, room, activeSeats, now) {
  const players = room?.players || {};
  let playerCount = 0;
  let spectatorCount = 0;

  activeSeats.forEach(seat => {
    const player = players?.[seat];
    if (!player?.id) return;
    if (seat < MAX_GAME_PLAYERS) playerCount += 1;
    else if (seat < MAX_ROOM_MEMBERS) spectatorCount += 1;
  });

  const visibility = ["public", "private", "unlisted"].includes(room?.visibility)
    ? room.visibility
    : "public";

  return {
    roomCode,
    roomName: String(room?.roomName || `Room ${roomCode}`).slice(0, 30),
    visibility,
    requiresPassword: room?.requiresPassword === true,
    status: String(room?.status || "lobby"),
    playerCount,
    spectatorCount,
    maxPlayers: MAX_GAME_PLAYERS,
    maxSpectators: MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS,
    createdAt: Number(room?.createdAt || now),
    lastActivityAt: Number(room?.lastActivityAt || room?.createdAt || now),
    emptySince: room?.emptySince || null
  };
}

exports.cleanupInactiveRooms = onSchedule({
  schedule: "every 1 minutes",
  timeZone: "Asia/Jakarta",
  region: "asia-southeast1"
}, async () => {
  const db = admin.database();
  const roomsSnapshot = await db.ref("rooms").once("value");
  const rooms = roomsSnapshot.val() || {};
  const now = Date.now();
  const updates = {};
  let deletedCount = 0;
  let markedEmptyCount = 0;

  Object.entries(rooms).forEach(([roomCode, room]) => {
    const activeSeats = activeSeatSet(room);
    const listing = makeListing(roomCode, room, activeSeats, now);

    if (activeSeats.size > 0) {
      if (room?.emptySince) updates[`rooms/${roomCode}/emptySince`] = null;
      updates[`rooms/${roomCode}/lastActivityAt`] = now;
      listing.emptySince = null;
      listing.lastActivityAt = now;
      Object.entries(listing).forEach(([key, value]) => {
        updates[`roomLookup/${roomCode}/${key}`] = value;
      });
      updates[`roomDirectory/${roomCode}`] = listing.visibility === "unlisted" ? null : listing;
      return;
    }

    const emptySince = Number(room?.emptySince || 0);
    if (!emptySince) {
      markedEmptyCount += 1;
      updates[`rooms/${roomCode}/emptySince`] = now;
      listing.playerCount = 0;
      listing.spectatorCount = 0;
      listing.emptySince = now;
      Object.entries(listing).forEach(([key, value]) => {
        updates[`roomLookup/${roomCode}/${key}`] = value;
      });
      updates[`roomDirectory/${roomCode}`] = listing.visibility === "unlisted" ? null : listing;
      return;
    }

    if (now - emptySince < ROOM_EMPTY_DELETE_MS) return;

    deletedCount += 1;
    updates[`rooms/${roomCode}`] = null;
    updates[`roomDirectory/${roomCode}`] = null;
    updates[`roomLookup/${roomCode}`] = null;
    updates[`roomSecrets/${roomCode}`] = null;
    updates[`roomAccess/${roomCode}`] = null;
    updates[`voiceSignals/${roomCode}`] = null;
  });

  if (Object.keys(updates).length > 0) {
    await db.ref().update(updates);
  }

  logger.info("Room cleanup selesai", {
    checkedRooms: Object.keys(rooms).length,
    markedEmptyRooms: markedEmptyCount,
    deletedRooms: deletedCount
  });
});
