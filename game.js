const PLAYER_COLORS = ["#e53935", "#1e88e5", "#43a047", "#8e24aa", "#607d8b", "#795548"];
const PLAYER_DEFAULTS = ["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4", "Penonton 1", "Penonton 2"];
const MAX_GAME_PLAYERS = 4;
const MAX_ROOM_MEMBERS = 6;
const BOARD_SIZE = 40;
const START_MONEY = 1500;
const PASS_START_BONUS = 200;
const RENT_LABELS = ["Tanah", "1R", "2R", "3R", "4R", "Hotel"];

const PROPERTY_DATA = {
  "kuala-lumpur": { name: "Kuala Lumpur", kind: "city", group: "dark-bottom", color: "#28104d", mortgage: 30, rents: [5,20,60,180,320,450], buildingCost: 50 },
  "bangkok": { name: "Bangkok", kind: "city", group: "dark-bottom", color: "#28104d", mortgage: 30, rents: [5,20,60,180,320,450], buildingCost: 50 },
  "changi-airport": { name: "Changi Airport", kind: "airport", color: "#e8e8e8", mortgage: 100, rentsByOwned: [25,50,100,200] },
  "singapore": { name: "Singapore", kind: "city", group: "blue", color: "#4d7fcc", mortgage: 50, rents: [10,35,90,270,400,550], buildingCost: 50 },
  "manila": { name: "Manila", kind: "city", group: "blue", color: "#4d7fcc", mortgage: 50, rents: [10,35,90,270,400,550], buildingCost: 50 },
  "seoul": { name: "Seoul", kind: "city", group: "blue", color: "#4d7fcc", mortgage: 60, rents: [12,40,100,290,420,570], buildingCost: 50 },
  "tokyo": { name: "Tokyo", kind: "city", group: "orange", color: "#ff4b14", mortgage: 70, rents: [15,60,130,330,480,620], buildingCost: 100 },
  "perusahaan-air": { name: "Perusahaan Air", kind: "utility", color: "#e8f2ff", mortgage: 75, price: 150 },
  "taiwan": { name: "Taiwan", kind: "city", group: "orange", color: "#ff4b14", mortgage: 70, rents: [15,60,130,330,480,620], buildingCost: 100 },
  "hongkong": { name: "Hongkong", kind: "city", group: "orange", color: "#ff4b14", mortgage: 80, rents: [17,70,150,350,500,650], buildingCost: 100 },
  "narita-airport": { name: "Narita Airport", kind: "airport", color: "#e8e8e8", mortgage: 100, rentsByOwned: [25,50,100,200] },
  "new-delhi": { name: "New Delhi", kind: "city", group: "pink", color: "#f70b58", mortgage: 90, rents: [20,80,175,375,550,700], buildingCost: 100 },
  "riyadh": { name: "Riyadh", kind: "city", group: "pink", color: "#f70b58", mortgage: 90, rents: [20,80,175,375,550,700], buildingCost: 100 },
  "moscow": { name: "Moscow", kind: "city", group: "pink", color: "#f70b58", mortgage: 100, rents: [23,90,185,395,575,725], buildingCost: 100 },
  "beijing": { name: "Beijing", kind: "city", group: "red", color: "#f20707", mortgage: 100, rents: [25,125,225,425,625,800], buildingCost: 150 },
  "brazilia": { name: "Brazilia", kind: "city", group: "red", color: "#f20707", mortgage: 100, rents: [25,125,225,425,625,800], buildingCost: 150 },
  "london": { name: "London", kind: "city", group: "red", color: "#f20707", mortgage: 110, rents: [28,130,240,440,640,825], buildingCost: 150 },
  "john-f-kennedy-airport": { name: "John F. Kennedy Airport", kind: "airport", color: "#e8e8e8", mortgage: 100, rentsByOwned: [25,50,100,200] },
  "amsterdam": { name: "Amsterdam", kind: "city", group: "yellow", color: "#ffc31c", mortgage: 130, rents: [30,150,260,475,670,875], buildingCost: 150 },
  "paris": { name: "Paris", kind: "city", group: "yellow", color: "#ffc31c", mortgage: 130, rents: [30,150,260,475,670,875], buildingCost: 150 },
  "perusahaan-listrik": { name: "Perusahaan Listrik", kind: "utility", color: "#fff5d6", mortgage: 75, price: 150 },
  "roma": { name: "Roma", kind: "city", group: "yellow", color: "#ffc31c", mortgage: 140, rents: [32,160,275,490,690,900], buildingCost: 150 },
  "mexico-city": { name: "Mexico City", kind: "city", group: "green", color: "#2f7928", mortgage: 150, rents: [35,175,325,550,750,1000], buildingCost: 200 },
  "ottawa": { name: "Ottawa", kind: "city", group: "green", color: "#2f7928", mortgage: 150, rents: [35,175,325,550,750,1000], buildingCost: 200 },
  "washington": { name: "Washington", kind: "city", group: "green", color: "#2f7928", mortgage: 160, rents: [37,180,335,560,760,1020], buildingCost: 200 },
  "soekarno-hatta-airport": { name: "Soekarno Hatta Airport", kind: "airport", color: "#e8e8e8", mortgage: 100, rentsByOwned: [25,50,100,200] },
  "canberra": { name: "Canberra", kind: "city", group: "dark-top", color: "#28104d", mortgage: 175, rents: [45,200,360,620,825,1125], buildingCost: 200 },
  "jakarta": { name: "Jakarta", kind: "city", group: "dark-top", color: "#28104d", mortgage: 200, rents: [50,230,400,660,870,1200], buildingCost: 200 }
};

const BOARD = [
  { type: "start", name: "START" },
  { type: "property", propertyId: "kuala-lumpur" },
  { type: "community", name: "DANA" },
  { type: "property", propertyId: "bangkok" },
  { type: "tax", name: "PAJAK", amount: 200 },
  { type: "property", propertyId: "changi-airport" },
  { type: "property", propertyId: "singapore" },
  { type: "chance", name: "KARTU" },
  { type: "property", propertyId: "manila" },
  { type: "property", propertyId: "seoul" },
  { type: "jail", name: "PENJARA" },
  { type: "property", propertyId: "tokyo" },
  { type: "property", propertyId: "perusahaan-air" },
  { type: "property", propertyId: "taiwan" },
  { type: "property", propertyId: "hongkong" },
  { type: "property", propertyId: "narita-airport" },
  { type: "property", propertyId: "new-delhi" },
  { type: "community", name: "DANA" },
  { type: "property", propertyId: "riyadh" },
  { type: "property", propertyId: "moscow" },
  { type: "free", name: "PARKIR" },
  { type: "property", propertyId: "beijing" },
  { type: "chance", name: "KARTU" },
  { type: "property", propertyId: "brazilia" },
  { type: "property", propertyId: "london" },
  { type: "property", propertyId: "john-f-kennedy-airport" },
  { type: "property", propertyId: "amsterdam" },
  { type: "property", propertyId: "paris" },
  { type: "property", propertyId: "perusahaan-listrik" },
  { type: "property", propertyId: "roma" },
  { type: "go-jail", name: "MASUK PENJARA" },
  { type: "property", propertyId: "mexico-city" },
  { type: "property", propertyId: "ottawa" },
  { type: "community", name: "DANA" },
  { type: "property", propertyId: "washington" },
  { type: "property", propertyId: "soekarno-hatta-airport" },
  { type: "chance", name: "KARTU" },
  { type: "property", propertyId: "canberra" },
  { type: "tax", name: "PAJAK", amount: 100 },
  { type: "property", propertyId: "jakarta" }
];

const CARD_DECKS = {
  community: [
    {
      deck: "Dana Umum",
      title: "Terima Bunga dari Bank",
      text: "Kamu menerima $100 dari bank.",
      effect: { type: "money", amount: 100 }
    },
    {
      deck: "Dana Umum",
      title: "Bayar Biaya Dokter",
      text: "Bayar $50 ke Uang Pajak.",
      effect: { type: "payTax", amount: 50 }
    },
    {
      deck: "Dana Umum",
      title: "Anda Terlibat Kasus Korupsi",
      text: "Masuk penjara.",
      effect: { type: "jail" }
    },
    {
      deck: "Dana Umum",
      title: "Terima Warisan",
      text: "Kamu menerima $150.",
      effect: { type: "money", amount: 150 }
    },
    {
      deck: "Dana Umum",
      title: "Maju Sampai Start",
      text: "Pindah ke START dan menerima $100.",
      effect: { type: "moveTo", tile: 0, money: 100 }
    },
    {
      deck: "Dana Umum",
      title: "Mendapatkan Hadiah Pajak",
      text: "Ambil seluruh Uang Pajak di tengah papan.",
      effect: { type: "collectTaxPool" }
    }
  ],
  chance: [
    {
      deck: "Kesempatan",
      title: "Anda Terlibat Kasus Korupsi",
      text: "Masuk penjara.",
      effect: { type: "jail" }
    },
    {
      deck: "Kesempatan",
      title: "Terima Bunga dari Bank",
      text: "Kamu menerima $50 dari bank.",
      effect: { type: "money", amount: 50 }
    },
    {
      deck: "Kesempatan",
      title: "Melanggar Undang-Undang Lalu Lintas",
      text: "Bayar denda $75 ke Uang Pajak.",
      effect: { type: "payTax", amount: 75 }
    },
    {
      deck: "Kesempatan",
      title: "Maju Sampai Start",
      text: "Pindah ke START dan menerima $100.",
      effect: { type: "moveTo", tile: 0, money: 100 }
    },
    {
      deck: "Kesempatan",
      title: "Menuju Parkir Bebas",
      text: "Pindah ke Parkir Bebas, lalu pilih hadiah Uang Pajak atau 1 petak tujuan yang menguntungkan.",
      effect: { type: "moveToFreeParking" }
    },
    {
      deck: "Kesempatan",
      title: "Mendapatkan Hadiah Pajak",
      text: "Ambil seluruh Uang Pajak di tengah papan.",
      effect: { type: "collectTaxPool" }
    }
  ]
};

let app = null;
let db = null;
let roomRef = null;
let roomCode = "";
let mySeat = null;
let myPlayerId = "";
let roomState = null;
let gameScene = null;
let lastAnimatedMoveId = "";
let lastRouletteId = "";
let localHiddenCardId = "";
let localPopupOpen = false;
let freeMoveAnimating = false;
let freeMoveSelectionStarting = false;
let freeMoveTapInProgress = false;
let debtSaleInProgress = false;
let suppressBoardInputUntil = 0;
let lastBoardTapIndex = null;
let lastBoardTapAt = 0;
let connectionInfoRef = null;
let connectionInfoHandler = null;
let playerPresenceRef = null;
let presencePlayerRef = null;
let presenceConnectionId = "";
let hostElectionInProgress = false;
let restoringRoomSession = false;
let localDismissedOrderResultId = "";
let lastPlayerOrderSignature = "";
let orderRollInProgress = false;
let orderRollFinalizeTimer = null;

const ROOM_SESSION_KEY = "atho_room_session";

// Animasi saldo pemain disimpan secara lokal agar update Firebase tidak
// langsung mengganti angka sebelum indikator pemasukan/pengeluaran selesai.
const playerMoneyAnimationStates = new Map();
let moneyAnimationGeneration = 0;
let moneyAudioContext = null;

const els = {
  setupPanel: document.getElementById("setupPanel"),
  gamePanel: document.getElementById("gamePanel"),
  playerNameInput: document.getElementById("playerNameInput"),
  roomCodeInput: document.getElementById("roomCodeInput"),
  createRoomBtn: document.getElementById("createRoomBtn"),
  joinRoomBtn: document.getElementById("joinRoomBtn"),
  copyRoomBtn: document.getElementById("copyRoomBtn"),
  leaveBtn: document.getElementById("leaveBtn"),
  roomBadge: document.getElementById("roomBadge"),
  rollBtn: document.getElementById("rollBtn"),
  startBtn: document.getElementById("startBtn"),
  turnName: document.getElementById("turnName"),
  rouletteWheel: document.getElementById("rouletteWheel"),
  rouletteResult: document.getElementById("rouletteResult"),
  rouletteCaption: document.getElementById("rouletteCaption"),
  statusText: document.getElementById("statusText"),
  actionPanel: document.getElementById("actionPanel"),
  playersList: document.getElementById("playersList"),
  logList: document.getElementById("logList"),
  historyFab: document.getElementById("historyFab"),
  historyOverlay: document.getElementById("historyOverlay"),
  historyModalList: document.getElementById("historyModalList"),
  historyCloseBtn: document.getElementById("historyCloseBtn"),
  historyCloseTopBtn: document.getElementById("historyCloseTopBtn"),
  disconnectOverlay: document.getElementById("disconnectOverlay"),
  disconnectTitle: document.getElementById("disconnectTitle"),
  disconnectText: document.getElementById("disconnectText"),
  orderOverlay: document.getElementById("orderOverlay"),
  orderTitle: document.getElementById("orderTitle"),
  orderText: document.getElementById("orderText"),
  orderResults: document.getElementById("orderResults"),
  orderRollBtn: document.getElementById("orderRollBtn"),
  cardOverlay: document.getElementById("cardOverlay"),
  cardPopup: document.getElementById("cardPopup"),
  cardDeckLabel: document.getElementById("cardDeckLabel"),
  cardPlayerName: document.getElementById("cardPlayerName"),
  cardTitle: document.getElementById("cardTitle"),
  cardText: document.getElementById("cardText"),
  cardActions: document.getElementById("cardActions"),
  cardCloseBtn: document.getElementById("cardCloseBtn"),
  cardContinueBtn: document.getElementById("cardContinueBtn")
};

function initFirebase() {
  const config = window.FIREBASE_CONFIG;

  if (!config || String(config.apiKey || "").includes("PASTE")) {
    alert("Firebase config belum diisi. Buka file firebase-config.js lalu isi konfigurasi Firebase kamu.");
    throw new Error("Firebase config is missing.");
  }

  app = firebase.initializeApp(config);
  db = firebase.database();
}

function randomRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ATHO${suffix}`;
}

function makePlayerId() {
  let id = localStorage.getItem("atho_player_id");
  if (!id) {
    id = `player_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("atho_player_id", id);
  }
  return id;
}

function cleanName(value) {
  const name = String(value || "").trim();
  return name || "Pemain";
}

function saveRoomSession(playerName = "") {
  if (!roomCode || mySeat === null || !myPlayerId) return;

  localStorage.setItem(ROOM_SESSION_KEY, JSON.stringify({
    roomCode,
    seat: Number(mySeat),
    playerId: myPlayerId,
    playerName: cleanName(playerName || roomState?.players?.[mySeat]?.name || "Pemain"),
    savedAt: Date.now()
  }));
}

function readRoomSession() {
  try {
    const raw = localStorage.getItem(ROOM_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session?.roomCode || !session?.playerId) return null;
    return session;
  } catch (error) {
    console.warn("Room session tidak dapat dibaca.", error);
    return null;
  }
}

function clearRoomSession() {
  localStorage.removeItem(ROOM_SESSION_KEY);
}

function getPresenceConnections(stateLike, seat) {
  const connections = stateLike?.presence?.[seat];
  if (!connections || typeof connections !== "object") return [];
  return Object.keys(connections).filter(Boolean);
}

function isPlayerConnectedInState(stateLike, player) {
  if (!player) return false;

  const presenceRoot = stateLike?.presence;
  if (presenceRoot && typeof presenceRoot === "object" && Object.keys(presenceRoot).length > 0) {
    return getPresenceConnections(stateLike, Number(player.seat)).length > 0;
  }

  return Boolean(player.connected);
}

function isSpectator(player) {
  return player?.role === "spectator" || Number(player?.seat) >= MAX_GAME_PLAYERS;
}

function isMonopolyPlayer(player) {
  return Boolean(player) && !isSpectator(player) && Number(player.seat) < MAX_GAME_PLAYERS;
}

function normalizeSeatArray(value) {
  if (Array.isArray(value)) return value.map(Number).filter(Number.isInteger);
  if (value && typeof value === "object") return Object.values(value).map(Number).filter(Number.isInteger);
  return [];
}

function getTurnOrderFromState(stateLike = roomState) {
  const stored = normalizeSeatArray(stateLike?.turnOrder);
  const valid = stored.filter(seat => isPlayerGameParticipant(stateLike?.players?.[seat], stateLike));
  if (valid.length) return valid;

  return Object.values(stateLike?.players || {})
    .filter(player => isPlayerGameParticipant(player, stateLike))
    .map(player => Number(player.seat))
    .sort((a, b) => a - b);
}

function isPlayerGameParticipant(player, stateLike = roomState) {
  if (!player || player.bankrupt || !isMonopolyPlayer(player)) return false;

  if (["orderRoll", "playing", "finished"].includes(stateLike?.status)) {
    if (player.inGame === true) return true;
    if (player.inGame === false) return false;
    // Backward compatibility untuk room lama yang dibuat sebelum field inGame.
    return Boolean(player.id);
  }

  return Boolean(player.id) && isPlayerConnectedInState(stateLike, player);
}

function getDisconnectedGamePlayers(stateLike = roomState) {
  if (!stateLike || !["orderRoll", "playing"].includes(stateLike.status)) return [];

  return Object.values(stateLike.players || {})
    .filter(player => isPlayerGameParticipant(player, stateLike))
    .filter(player => !isPlayerConnectedInState(stateLike, player))
    .sort((a, b) => Number(a.seat) - Number(b.seat));
}

function isGamePausedForDisconnect(stateLike = roomState) {
  return getDisconnectedGamePlayers(stateLike).length > 0;
}

async function configureCurrentPresence() {
  if (!roomRef || mySeat === null || !myPlayerId || !playerPresenceRef || !presencePlayerRef) return;

  const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

  await playerPresenceRef.onDisconnect().remove();
  await presencePlayerRef.onDisconnect().update({
    connected: false,
    disconnectedAt: serverTimestamp
  });

  await playerPresenceRef.set({
    playerId: myPlayerId,
    connectedAt: serverTimestamp
  });

  await presencePlayerRef.update({
    connected: true,
    disconnectedAt: null,
    lastSeenAt: serverTimestamp
  });
}

async function detachCurrentPresence({ cancelDisconnect = true } = {}) {
  if (connectionInfoRef && connectionInfoHandler) {
    connectionInfoRef.off("value", connectionInfoHandler);
  }

  if (cancelDisconnect) {
    try {
      await playerPresenceRef?.onDisconnect().cancel();
      await presencePlayerRef?.onDisconnect().cancel();
    } catch (error) {
      console.warn("Gagal membatalkan handler onDisconnect.", error);
    }
  }

  connectionInfoRef = null;
  connectionInfoHandler = null;
  playerPresenceRef = null;
  presencePlayerRef = null;
  presenceConnectionId = "";
}

async function setupCurrentPresence() {
  await detachCurrentPresence({ cancelDisconnect: true });
  if (!db || !roomRef || mySeat === null || !myPlayerId) return;

  presenceConnectionId = `conn_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  playerPresenceRef = roomRef.child(`presence/${mySeat}/${presenceConnectionId}`);
  presencePlayerRef = roomRef.child(`players/${mySeat}`);
  connectionInfoRef = db.ref(".info/connected");

  connectionInfoHandler = (snapshot) => {
    if (snapshot.val() !== true) return;
    configureCurrentPresence().catch(error => {
      console.warn("Gagal memperbarui presence pemain.", error);
    });
  };

  connectionInfoRef.on("value", connectionInfoHandler);
  await configureCurrentPresence();
}

async function restoreRoomSession() {
  if (restoringRoomSession) return;
  const session = readRoomSession();
  if (!session) return;

  restoringRoomSession = true;

  try {
    myPlayerId = makePlayerId();
    if (session.playerId !== myPlayerId) {
      clearRoomSession();
      return;
    }

    const storedRoomCode = String(session.roomCode || "").trim().toUpperCase();
    if (!storedRoomCode) {
      clearRoomSession();
      return;
    }

    const candidateRoomRef = db.ref(`rooms/${storedRoomCode}`);
    const snapshot = await candidateRoomRef.once("value");
    const state = snapshot.val();

    if (!state?.players) {
      clearRoomSession();
      return;
    }

    const matchingPlayer = Object.values(state.players)
      .find(player => player?.id === myPlayerId);

    if (!matchingPlayer) {
      clearRoomSession();
      return;
    }

    roomCode = storedRoomCode;
    roomRef = candidateRoomRef;
    mySeat = Number(matchingPlayer.seat);

    await setupCurrentPresence();
    saveRoomSession(matchingPlayer.name || session.playerName || "Pemain");
    enterGameView();
    subscribeRoom();
  } catch (error) {
    console.error("Gagal memulihkan room setelah refresh.", error);
  } finally {
    restoringRoomSession = false;
  }
}

async function ensureLobbyHost(stateLike = roomState) {
  if (!roomRef || hostElectionInProgress || stateLike?.status !== "lobby") return;

  const connectedPlayers = Object.values(stateLike.players || {})
    .filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(stateLike, player))
    .sort((a, b) => Number(a.seat) - Number(b.seat));

  if (!connectedPlayers.length) return;

  const currentHostSeat = Number(stateLike.hostSeat);
  const currentHost = stateLike.players?.[currentHostSeat];
  const currentHostValid = currentHost
    && currentHost.id
    && currentHost.isHost
    && isPlayerConnectedInState(stateLike, currentHost);

  if (currentHostValid) return;

  hostElectionInProgress = true;

  try {
    await roomRef.transaction((room) => {
      if (!room || room.status !== "lobby") return room;

      const candidates = Object.values(room.players || {})
        .filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(room, player))
        .sort((a, b) => Number(a.seat) - Number(b.seat));

      if (!candidates.length) return room;

      const hostSeat = Number(candidates[0].seat);
      room.hostSeat = hostSeat;

      Object.keys(room.players || {}).forEach((seatKey) => {
        room.players[seatKey].isHost = Number(seatKey) === hostSeat;
      });

      return room;
    });
  } catch (error) {
    console.warn("Pemindahan host lobby gagal.", error);
  } finally {
    hostElectionInProgress = false;
  }
}

function makeInitialPropertyState() {
  const data = {};
  Object.keys(PROPERTY_DATA).forEach((id) => {
    data[id] = { owner: null, level: 0 };
  });
  return data;
}

function createInitialRoom(hostName) {
  const players = {};
  for (let i = 0; i < MAX_ROOM_MEMBERS; i++) {
    players[i] = {
      seat: i,
      role: i < MAX_GAME_PLAYERS ? "player" : "spectator",
      id: i === 0 ? myPlayerId : "",
      name: i === 0 ? hostName : PLAYER_DEFAULTS[i],
      color: PLAYER_COLORS[i],
      money: i < MAX_GAME_PLAYERS ? START_MONEY : 0,
      position: 0,
      inJail: false,
      jailAttempts: 0,
      roulette12Streak: 0,
      lapsCompleted: 0,
      bankrupt: false,
      inGame: false,
      connected: i === 0,
      disconnectedAt: null,
      isHost: i === 0
    };
  }

  return {
    status: "lobby",
    createdAt: Date.now(),
    hostSeat: 0,
    currentSeat: 0,
    isRolling: false,
    taxPool: 0,
    lastDice: [0, 0],
    lastRoulette: { id: "", result: 0, rotation: 0 },
    lastMove: null,
    pendingAction: null,
    pendingExtraRoll: null,
    turnOrder: [],
    orderRoll: null,
    debtState: null,
    cardPopup: null,
    winnerSeat: null,
    propertyState: makeInitialPropertyState(),
    players,
    logs: {
      [Date.now()]: `${hostName} membuat room.`
    }
  };
}

async function createRoom() {
  const playerName = cleanName(els.playerNameInput.value);
  myPlayerId = makePlayerId();
  roomCode = randomRoomCode();
  roomRef = db.ref(`rooms/${roomCode}`);

  await roomRef.set(createInitialRoom(playerName));
  mySeat = 0;
  await setupCurrentPresence();
  saveRoomSession(playerName);
  enterGameView();
  subscribeRoom();
}

async function joinRoom() {
  const playerName = cleanName(els.playerNameInput.value);
  const code = String(els.roomCodeInput.value || "").trim().toUpperCase();

  if (!code) {
    alert("Masukkan kode room terlebih dahulu.");
    return;
  }

  myPlayerId = makePlayerId();
  roomCode = code;
  roomRef = db.ref(`rooms/${roomCode}`);

  const snap = await roomRef.once("value");
  if (!snap.exists()) {
    alert("Room tidak ditemukan.");
    return;
  }

  const data = snap.val();
  const players = data.players || {};
  let seat = null;

  for (let i = 0; i < MAX_ROOM_MEMBERS; i++) {
    if (players[i]?.id === myPlayerId) {
      seat = i;
      break;
    }
  }

  const reconnectingExistingPlayer = seat !== null;

  if (seat === null) {
    const gameAlreadyStarted = data.status !== "lobby";
    const candidateSeats = gameAlreadyStarted
      ? [4, 5]
      : [0, 1, 2, 3, 4, 5];

    seat = candidateSeats.find(index => !players[index]?.id) ?? null;
  }

  if (seat === null) {
    alert("Room sudah penuh. Maksimal 4 pemain Monopoly dan 2 penonton.");
    return;
  }

  mySeat = Number(seat);
  const role = mySeat < MAX_GAME_PLAYERS ? "player" : "spectator";
  const playerUpdates = {
    seat: mySeat,
    role,
    color: players[mySeat]?.color || PLAYER_COLORS[mySeat],
    id: myPlayerId,
    name: playerName,
    connected: true,
    disconnectedAt: null
  };

  if (!reconnectingExistingPlayer) {
    playerUpdates.inGame = false;
    playerUpdates.bankrupt = false;
    playerUpdates.money = role === "player" ? START_MONEY : 0;
    playerUpdates.position = 0;
    playerUpdates.inJail = false;
    playerUpdates.jailAttempts = 0;
    playerUpdates.roulette12Streak = 0;
    playerUpdates.lapsCompleted = 0;
    playerUpdates.isHost = false;
  }

  await roomRef.child(`players/${mySeat}`).update(playerUpdates);
  await setupCurrentPresence();
  saveRoomSession(playerName);

  if (!reconnectingExistingPlayer) {
    const roleLabel = role === "spectator" ? `Penonton ${mySeat - 3}` : `Pemain ${mySeat + 1}`;
    await addRemoteLog(`${playerName} bergabung sebagai ${roleLabel}.`);
  }

  enterGameView();
  subscribeRoom();
}

function enterGameView() {
  resetPlayerMoneyAnimations();
  els.setupPanel.classList.add("hidden");
  els.gamePanel.classList.remove("hidden");
  els.roomBadge.textContent = `Room: ${roomCode}`;
  els.copyRoomBtn.disabled = false;
  els.leaveBtn.disabled = false;

  if (!gameScene) {
    startPhaser();
  }
}

function subscribeRoom() {
  if (!roomRef) return;

  roomRef.on("value", (snap) => {
    roomState = snap.val();
    if (!roomState) {
      clearRoomSession();
      renderDisconnectOverlay();
      return;
    }

    ensureLobbyHost(roomState);

    if (!roomState.propertyState) {
      roomRef.child("propertyState").set(makeInitialPropertyState());
      return;
    }

    renderUI();

    if (gameScene) {
      gameScene.renderRoomState(roomState);
    }

    maybeAnimateLastMove();
    scheduleStartingOrderFinalization(roomState);
  });
}

function isImportantGameLog(text) {
  const normalized = String(text || "").toLowerCase();
  if (!normalized) return false;

  // Aktivitas rutin tidak perlu memenuhi riwayat permainan.
  const ignoredPatterns = [
    "memutar roulette",
    "giliran berpindah",
    "berhenti di start",
    "hanya lewat area penjara",
    "mendarat di tanah miliknya sendiri",
    "mendarat di properti miliknya sendiri",
    "tanah belum dimiliki dan bisa dibeli",
    "melewati aksi di",
    "menutup popup dan mengakhiri aksi"
  ];

  if (ignoredPatterns.some(pattern => normalized.includes(pattern))) {
    return false;
  }

  // Simpan kejadian yang berpengaruh pada uang, aset, kartu, status pemain,
  // penjara, Parkir Bebas, atau hasil permainan.
  const importantPatterns = [
    "menerima",
    "membayar",
    "mengambil uang pajak",
    "mengambil seluruh uang pajak",
    "membeli",
    "membangun",
    "sewa",
    "pajak",
    "denda",
    "mengambil kartu",
    "kartu kesempatan",
    "kartu dana umum",
    "parkir bebas",
    "masuk penjara",
    "bebas dari penjara",
    "roulette penjara",
    "roulette 12",
    "penentuan giliran",
    "urutan pertama",
    "bergabung",
    "keluar dari game",
    "keluar dari room",
    "menjadi host baru",
    "game dimulai",
    "game selesai",
    "menang",
    "putaran pertama",
    "saldo minus",
    "menjual properti",
    "melunasi kekurangan",
    "bangkrut"
  ];

  return importantPatterns.some(pattern => normalized.includes(pattern));
}

async function trimRemoteLogsToLatest(limit = 22) {
  if (!roomRef) return;

  const snapshot = await roomRef.child("logs").once("value");
  const logs = snapshot.val() || {};
  const sorted = Object.entries(logs)
    .filter(([, value]) => isImportantGameLog(value))
    .sort((a, b) => Number(b[0]) - Number(a[0]));

  const keepKeys = new Set(sorted.slice(0, limit).map(([key]) => key));
  const cleanup = {};

  Object.entries(logs).forEach(([key, value]) => {
    if (!isImportantGameLog(value) || !keepKeys.has(key)) {
      cleanup[`logs/${key}`] = null;
    }
  });

  if (Object.keys(cleanup).length) {
    await roomRef.update(cleanup);
  }
}

async function addRemoteLog(text) {
  if (!roomRef || !isImportantGameLog(text)) return;
  const key = Date.now().toString();
  await roomRef.child(`logs/${key}`).set(text);
  await trimRemoteLogsToLatest(22);
}

function isPlayerBoardActive(player) {
  return Number(player?.lapsCompleted || 0) >= 1;
}

function getConnectedSeatsFromState(stateLike = roomState) {
  if (!stateLike?.players) return [];
  return Object.values(stateLike.players)
    .filter(player => player?.id && isMonopolyPlayer(player) && !player.bankrupt && isPlayerConnectedInState(stateLike, player))
    .map(player => Number(player.seat))
    .sort((a, b) => a - b);
}

function getActiveSeatsFromState(stateLike = roomState) {
  if (!stateLike?.players) return [];
  return getTurnOrderFromState(stateLike);
}

function getActiveSeats() {
  return ["orderRoll", "playing"].includes(roomState?.status)
    ? getActiveSeatsFromState(roomState)
    : getConnectedSeatsFromState(roomState);
}

function getNextActiveSeat(currentSeat) {
  const seats = getActiveSeats();
  if (!seats.length) return 0;

  const currentIndex = seats.indexOf(Number(currentSeat));
  if (currentIndex === -1) return seats[0];

  return seats[(currentIndex + 1) % seats.length];
}

function canIStart() {
  return roomState?.players?.[mySeat]?.isHost && isMonopolyPlayer(roomState?.players?.[mySeat]) && roomState.status === "lobby";
}

function canIRoll() {
  const player = roomState?.players?.[mySeat];

  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    !roomState.pendingAction &&
    !roomState.debtState &&
    !isGamePausedForDisconnect(roomState) &&
    !player?.inJail &&
    !player?.bankrupt
  );
}

function canIUseJailAction() {
  const player = roomState?.players?.[mySeat];

  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    !roomState.pendingAction &&
    !roomState.debtState &&
    !isGamePausedForDisconnect(roomState) &&
    player?.inJail &&
    !player?.bankrupt
  );
}

function canIAct() {
  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    roomState.pendingAction &&
    Number(roomState.pendingAction.seat) === Number(mySeat) &&
    !isGamePausedForDisconnect(roomState) &&
    !roomState.players?.[mySeat]?.bankrupt
  );
}

function canIResolveDebt() {
  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    !roomState.pendingAction &&
    roomState.debtState &&
    Number(roomState.debtState.seat) === Number(mySeat) &&
    !isGamePausedForDisconnect(roomState) &&
    !roomState.players?.[mySeat]?.bankrupt
  );
}

async function startGame() {
  if (!canIStart()) return;

  const activeSeats = getConnectedSeatsFromState(roomState).slice(0, MAX_GAME_PLAYERS);
  if (activeSeats.length < 2) {
    alert("Minimal 2 pemain Monopoly aktif untuk mulai game.");
    return;
  }

  const updates = {
    status: "orderRoll",
    currentSeat: activeSeats[0],
    isRolling: false,
    pendingAction: null,
    pendingExtraRoll: null,
    debtState: null,
    cardPopup: null,
    winnerSeat: null,
    turnOrder: [],
    orderRoll: {
      id: `${Date.now()}_starting_order_${Math.random().toString(16).slice(2)}`,
      eligibleSeats: activeSeats,
      queue: activeSeats,
      currentIndex: 0,
      histories: {},
      round: 1,
      completed: false,
      createdAt: Date.now()
    }
  };

  Object.values(roomState.players || {}).forEach((player) => {
    const participant = activeSeats.includes(Number(player.seat)) && isMonopolyPlayer(player);
    updates[`players/${player.seat}/inGame`] = participant;
    updates[`players/${player.seat}/roulette12Streak`] = 0;
    if (isSpectator(player)) updates[`players/${player.seat}/money`] = 0;
  });

  await roomRef.update(updates);
  await addRemoteLog("Game dimulai. Pemain menentukan urutan giliran melalui roulette.");
}

function compareRollHistories(a = [], b = []) {
  const maxLength = Math.max(a.length, b.length);
  for (let index = 0; index < maxLength; index++) {
    const av = Number(a[index] ?? -1);
    const bv = Number(b[index] ?? -1);
    if (av !== bv) return bv - av;
  }
  return 0;
}

function getStartingOrderRanking(stateLike = roomState) {
  const eligible = normalizeSeatArray(stateLike?.orderRoll?.eligibleSeats);
  const histories = stateLike?.orderRoll?.histories || {};
  return eligible.sort((seatA, seatB) => {
    const comparison = compareRollHistories(histories[seatA] || [], histories[seatB] || []);
    return comparison || seatA - seatB;
  });
}

function findStartingOrderTies(stateLike) {
  const eligible = normalizeSeatArray(stateLike?.orderRoll?.eligibleSeats);
  const histories = stateLike?.orderRoll?.histories || {};
  const groups = new Map();

  eligible.forEach(seat => {
    const key = JSON.stringify(normalizeSeatArray(histories[seat]));
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(seat);
  });

  return [...groups.values()].filter(group => group.length > 1);
}

async function rollStartingOrder() {
  if (!roomRef || orderRollInProgress || roomState?.status !== "orderRoll") return;

  const latest = (await roomRef.once("value")).val();
  const order = latest?.orderRoll;
  const queue = normalizeSeatArray(order?.queue);
  const currentIndex = Number(order?.currentIndex || 0);
  const seat = queue[currentIndex];

  if (!latest || order?.completed || seat === undefined || Number(seat) !== Number(mySeat)) return;
  if (latest.isRolling || isGamePausedForDisconnect(latest)) return;

  orderRollInProgress = true;
  const result = Math.floor(Math.random() * 12) + 1;
  const rollId = `${Date.now()}_${seat}_order_roll_${Math.random().toString(16).slice(2)}`;
  const rotation = getRouletteFinalRotation(Number(latest.lastRoulette?.rotation || 0), result);
  const histories = { ...(order.histories || {}) };
  const previousHistory = normalizeSeatArray(histories[seat]);
  histories[seat] = [...previousHistory, result];

  try {
    await roomRef.update({
      isRolling: true,
      lastDice: [0, result],
      lastRoulette: {
        id: rollId,
        result,
        rotation,
        source: "starting-order",
        createdAt: Date.now()
      },
      [`orderRoll/histories/${seat}`]: histories[seat]
    });
    orderRollInProgress = false;
    scheduleStartingOrderFinalization({
      ...latest,
      isRolling: true,
      lastRoulette: { id: rollId, source: "starting-order", createdAt: Date.now() }
    });
  } catch (error) {
    orderRollInProgress = false;
    console.error("Gagal memproses roulette penentuan giliran.", error);
    await roomRef.update({ isRolling: false });
  }
}

function scheduleStartingOrderFinalization(stateLike = roomState) {
  if (orderRollFinalizeTimer) {
    clearTimeout(orderRollFinalizeTimer);
    orderRollFinalizeTimer = null;
  }

  const roulette = stateLike?.lastRoulette;
  if (stateLike?.status !== "orderRoll"
    || !stateLike?.isRolling
    || roulette?.source !== "starting-order"
    || !roulette?.id) return;

  const elapsed = Date.now() - Number(roulette.createdAt || Date.now());
  const delay = Math.max(80, 1800 - elapsed);
  orderRollFinalizeTimer = setTimeout(() => {
    orderRollFinalizeTimer = null;
    finalizeStartingOrderRoll(roulette.id).catch(error => {
      console.error("Gagal menyelesaikan roulette penentuan giliran.", error);
    });
  }, delay);
}

async function finalizeStartingOrderRoll(rollId) {
  if (!roomRef || !rollId) return;

  const transaction = await roomRef.transaction((room) => {
    if (!room
      || room.status !== "orderRoll"
      || !room.isRolling
      || room.lastRoulette?.source !== "starting-order"
      || room.lastRoulette?.id !== rollId
      || room.orderRoll?.lastProcessedRollId === rollId) {
      return;
    }

    const order = room.orderRoll || {};
    const queue = normalizeSeatArray(order.queue);
    const nextIndex = Number(order.currentIndex || 0) + 1;
    order.lastProcessedRollId = rollId;

    if (nextIndex < queue.length) {
      const nextSeat = queue[nextIndex];
      order.currentIndex = nextIndex;
      order.lastOutcome = { type: "next", rollId, nextSeat };
      room.currentSeat = nextSeat;
      room.isRolling = false;
      room.orderRoll = order;
      return room;
    }

    const stateForRanking = { ...room, orderRoll: order };
    const ties = findStartingOrderTies(stateForRanking);
    if (ties.length) {
      const tieQueue = ties.flat().sort((a, b) => a - b);
      order.queue = tieQueue;
      order.currentIndex = 0;
      order.round = Number(order.round || 1) + 1;
      order.lastOutcome = { type: "tie", rollId, tieQueue };
      room.currentSeat = tieQueue[0];
      room.isRolling = false;
      room.orderRoll = order;
      return room;
    }

    const finalOrder = getStartingOrderRanking(stateForRanking);
    const winnerSeat = finalOrder[0];
    order.completed = true;
    order.finalOrder = finalOrder;
    order.resultId = `${rollId}_result`;
    order.completedAt = Date.now();
    order.lastOutcome = { type: "completed", rollId, winnerSeat };

    room.status = "playing";
    room.isRolling = false;
    room.currentSeat = winnerSeat;
    room.turnOrder = finalOrder;
    room.orderRoll = order;
    return room;
  });

  if (!transaction.committed) return;
  const updated = transaction.snapshot.val();
  const outcome = updated?.orderRoll?.lastOutcome;
  if (outcome?.rollId !== rollId) return;

  if (outcome.type === "tie") {
    const names = normalizeSeatArray(outcome.tieQueue)
      .map(seat => updated.players?.[seat]?.name)
      .filter(Boolean);
    await addRemoteLog(`Nilai roulette penentuan giliran seri. ${names.join(", ")} melakukan roulette ulang.`);
  } else if (outcome.type === "completed") {
    const winnerSeat = Number(outcome.winnerSeat);
    const winnerName = updated.players?.[winnerSeat]?.name || `Pemain ${winnerSeat + 1}`;
    await addRemoteLog(`${winnerName} memperoleh urutan pertama dari roulette penentuan giliran.`);
  }
}

function normalizeRouletteAngle(angle) {
  return ((Number(angle || 0) % 360) + 360) % 360;
}

function getRouletteFinalRotation(previousRotation, result, fullTurns = 5) {
  const segment = 360 / 12;
  const currentRotation = Number(previousRotation || 0);
  const currentAngle = normalizeRouletteAngle(currentRotation);
  const targetAngle = normalizeRouletteAngle(-((Number(result) - 1) * segment));
  const alignmentDelta = (targetAngle - currentAngle + 360) % 360;

  return currentRotation + (360 * fullTurns) + alignmentDelta;
}

function makeRoulette12BonusPopup(player, streak) {
  const isSecond = Number(streak) >= 2;

  return {
    id: `${Date.now()}_${player.seat}_roulette12_bonus_${streak}_${Math.random().toString(16).slice(2)}`,
    deckType: "system",
    deck: "Bonus Roulette",
    title: isSecond ? "ROULETTE 12 LAGI!" : "ROULETTE 12!",
    text: isSecond
      ? `${player.name} mendapat angka 12 untuk kedua kalinya berturut-turut. Putar lagi, tetapi jika kembali mendapat 12 maka pemain masuk penjara.`
      : `${player.name} mendapat angka 12 dan memperoleh satu kesempatan roulette tambahan.`,
    seat: Number(player.seat),
    playerName: player.name
  };
}

function makeTripleTwelveJailPopup(player) {
  return {
    id: `${Date.now()}_${player.seat}_roulette12_triple_jail_${Math.random().toString(16).slice(2)}`,
    deckType: "system",
    deck: "Aturan Roulette",
    title: "TIGA KALI ROULETTE 12!",
    text: `${player.name} mendapat angka 12 sebanyak tiga kali berturut-turut dan langsung masuk penjara.`,
    seat: Number(player.seat),
    playerName: player.name
  };
}

async function activatePendingRoulette12Bonus(latest) {
  const pending = latest?.pendingExtraRoll;
  if (!pending) return false;

  const seat = Number(pending.seat);
  const player = latest.players?.[seat];
  const staleOrInvalid = !player
    || Number(latest.currentSeat) !== seat
    || player.bankrupt
    || player.inJail
    || !player.inGame;

  if (staleOrInvalid) {
    const cleanup = { pendingExtraRoll: null };
    if (player && (player.bankrupt || player.inJail)) {
      cleanup[`players/${seat}/roulette12Streak`] = 0;
    }
    await roomRef.update(cleanup);
    return false;
  }

  const streak = Math.max(1, Math.min(2, Number(pending.streak || 1)));
  await roomRef.update({
    isRolling: false,
    pendingExtraRoll: null,
    pendingAction: {
      type: "roulette12Bonus",
      seat,
      streak
    },
    cardPopup: makeRoulette12BonusPopup(player, streak)
  });

  const suffix = streak >= 2
    ? "untuk kedua kalinya berturut-turut dan mendapat satu giliran roulette tambahan."
    : "dan mendapat satu giliran roulette tambahan.";
  await addRemoteLog(`${player.name} mendapat roulette 12 ${suffix}`);
  return true;
}

async function acceptRoulette12Bonus(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "roulette12Bonus") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  if (!latest || action?.type !== "roulette12Bonus" || Number(action.seat) !== Number(mySeat)) return;

  localHiddenCardId = latest.cardPopup?.id || localHiddenCardId;
  await roomRef.update({
    pendingAction: null,
    cardPopup: null,
    isRolling: false
  });
}

async function rollDice() {
  if (!canIRoll()) return;

  const player = roomState.players[mySeat];
  const result = Math.floor(Math.random() * 12) + 1;
  const currentStreak = Number(player.roulette12Streak || 0);
  const nextStreak = result === 12 ? currentStreak + 1 : 0;
  const isThirdConsecutiveTwelve = result === 12 && nextStreak >= 3;
  const from = Number(player.position || 0);
  const moveId = `${Date.now()}_${mySeat}_${Math.random().toString(16).slice(2)}`;
  const prevRotation = Number(roomState.lastRoulette?.rotation || 0);
  const rotation = getRouletteFinalRotation(prevRotation, result);

  // Angka 12 ketiga tidak menjalankan perpindahan normal. Pemain langsung
  // dipindahkan ke penjara dan rantai roulette 12 di-reset.
  if (isThirdConsecutiveTwelve) {
    const popup = makeTripleTwelveJailPopup(player);
    const updates = {
      isRolling: true,
      lastDice: [0, result],
      lastRoulette: {
        id: moveId,
        result,
        rotation,
        createdAt: Date.now(),
        source: "triple-roulette-12"
      },
      lastMove: {
        id: moveId,
        seat: mySeat,
        from,
        to: 10,
        steps: 0,
        direct: true,
        duration: 760,
        createdAt: Date.now()
      },
      pendingExtraRoll: null,
      pendingAction: {
        type: "tripleTwelveJail",
        seat: mySeat,
        streak: 3,
        moveId
      },
      cardPopup: popup
    };

    updates[`players/${mySeat}/position`] = 10;
    updates[`players/${mySeat}/inJail`] = true;
    updates[`players/${mySeat}/jailAttempts`] = 0;
    updates[`players/${mySeat}/roulette12Streak`] = 0;

    await roomRef.update(updates);
    await addRemoteLog(`${player.name} mendapat roulette 12 tiga kali berturut-turut dan masuk penjara.`);

    setTimeout(async () => {
      const latest = (await roomRef.once("value")).val();
      if (!latest?.lastRoulette || latest.lastRoulette.id !== moveId) return;
      await roomRef.update({ isRolling: false });
    }, 1650);
    return;
  }

  const total = result;
  const to = (from + total) % BOARD_SIZE;
  const passedStart = from + total >= BOARD_SIZE;
  const previousLaps = Number(player.lapsCompleted || 0);
  const nextLaps = previousLaps + (passedStart ? 1 : 0);
  const boardActiveAfterMove = previousLaps >= 1 || passedStart;
  const completedFirstLap = previousLaps < 1 && passedStart;

  let playerMoney = Number(player.money || 0) + (passedStart ? PASS_START_BONUS : 0);
  const updates = {
    isRolling: true,
    lastDice: [0, result],
    lastRoulette: {
      id: moveId,
      result,
      rotation,
      createdAt: Date.now()
    },
    lastMove: {
      id: moveId,
      seat: mySeat,
      from,
      to,
      steps: total,
      dice: [0, result],
      createdAt: Date.now()
    },
    pendingAction: null,
    pendingExtraRoll: result === 12
      ? {
          seat: mySeat,
          streak: nextStreak,
          moveId,
          createdAt: Date.now()
        }
      : null
  };

  updates[`players/${mySeat}/position`] = to;
  updates[`players/${mySeat}/money`] = playerMoney;
  updates[`players/${mySeat}/lapsCompleted`] = nextLaps;
  updates[`players/${mySeat}/roulette12Streak`] = nextStreak;

  const logs = [];
  logs.push(`${player.name} memutar roulette dan mendapat ${result} langkah, bergerak dari petak ${from} ke petak ${to}.`);

  if (passedStart) {
    logs.push(`${player.name} melewati START dan menerima $200.`);
  }

  if (completedFirstLap) {
    logs.push(`${player.name} menyelesaikan putaran pertama. Seluruh petak kini aktif untuk pemain ini.`);
  }

  // Sebelum menyelesaikan satu putaran penuh, seluruh efek petak dinonaktifkan
  // khusus untuk pemain tersebut. Efek langsung aktif pada langkah yang pertama
  // kali melewati START.
  if (boardActiveAfterMove) {
    playerMoney = applyLandingEffect(to, mySeat, playerMoney, total, updates, logs);
  }

  updates[`players/${mySeat}/money`] = playerMoney;

  await roomRef.update(updates);
  await addLogs(logs);

  const animationMs = Math.min(5200, total * 280 + 1700);

  setTimeout(async () => {
    const latest = (await roomRef.once("value")).val();
    if (!latest?.lastMove || latest.lastMove.id !== moveId) return;

    const latestPlayer = latest.players?.[mySeat];

    if (latest.debtState && Number(latest.debtState.seat) === Number(mySeat)) {
      await roomRef.update({ isRolling: false });
      return;
    }

    if (latestPlayer?.bankrupt) {
      await roomRef.update({ isRolling: false });
      await finishTurn();
      return;
    }

    if (latest.pendingAction) {
      await roomRef.update({ isRolling: false });
      return;
    }

    await roomRef.update({ isRolling: false });
    await finishTurn();
  }, animationMs);
}


function applyLandingEffect(tileIndex, seat, playerMoney, diceTotal, updates, logs) {
  const tile = BOARD[tileIndex];
  const player = roomState.players[seat];

  if (tile.type === "start") {
    logs.push(`${player.name} berhenti di START.`);
    return playerMoney;
  }

  if (tile.type === "jail") {
    logs.push(`${player.name} hanya lewat area penjara.`);
    return playerMoney;
  }

  if (tile.type === "go-jail") {
    updates[`players/${seat}/position`] = 10;
    updates[`players/${seat}/inJail`] = true;
    updates[`players/${seat}/jailAttempts`] = 0;
    logs.push(`${player.name} masuk penjara.`);
    return playerMoney;
  }

  if (tile.type === "tax") {
    const popupId = `${Date.now()}_${seat}_tax_${tile.amount}_${Math.random().toString(16).slice(2)}`;
    playerMoney -= tile.amount;
    updates.taxPool = Number(roomState.taxPool || 0) + tile.amount;
    updates.cardPopup = {
      id: popupId,
      deckType: "tax",
      deck: "Pajak",
      title: `Kena Pajak ${formatMoney(tile.amount)}`,
      text: `${player.name} membayar pajak sebesar ${formatMoney(tile.amount)} ke Uang Pajak.`,
      seat,
      playerName: player.name
    };
    updates.pendingAction = {
      type: "taxPopup",
      seat,
      cardId: popupId
    };
    logs.push(`${player.name} membayar pajak ${formatMoney(tile.amount)}.`);
    return applyDebtRequirement(seat, playerMoney, updates, `pajak ${formatMoney(tile.amount)}`, logs);
  }

  if (tile.type === "free") {
    const pool = Number(roomState.taxPool || 0);
    const eligibleIndices = getFreeMoveEligibleIndices(roomState, seat);

    updates.pendingAction = {
      type: "freeParkingChoice",
      seat,
      eligibleIndices
    };
    updates.cardPopup = makeFreeParkingPopup(player, pool);

    logs.push(`${player.name} masuk Parkir Bebas dan harus memilih hadiah Uang Pajak atau pindah ke petak yang menguntungkan.`);
    return playerMoney;
  }

  if (tile.type === "community" || tile.type === "chance") {
    return drawAndApplyCard(tile.type, seat, playerMoney, updates, logs);
  }

  if (tile.type === "property") {
    return handlePropertyLanding(tile.propertyId, seat, playerMoney, diceTotal, updates, logs);
  }

  return playerMoney;
}

function normalizeTileIndices(value) {
  if (Array.isArray(value)) {
    return value.map(Number).filter(Number.isInteger);
  }

  if (value && typeof value === "object") {
    return Object.values(value).map(Number).filter(Number.isInteger);
  }

  return [];
}

function getClockwiseDistance(fromIndex, toIndex) {
  const from = ((Number(fromIndex) % BOARD_SIZE) + BOARD_SIZE) % BOARD_SIZE;
  const to = ((Number(toIndex) % BOARD_SIZE) + BOARD_SIZE) % BOARD_SIZE;
  return (to - from + BOARD_SIZE) % BOARD_SIZE;
}

function doesClockwiseMovePassStart(fromIndex, toIndex) {
  const from = ((Number(fromIndex) % BOARD_SIZE) + BOARD_SIZE) % BOARD_SIZE;
  const distance = getClockwiseDistance(fromIndex, toIndex);

  // Tidak ada perpindahan berarti tidak melewati START.
  if (distance === 0) return false;

  // Jika jumlah posisi awal + jarak mencapai/melewati ukuran papan,
  // rute searah permainan telah melewati petak START (indeks 0).
  return from + distance >= BOARD_SIZE;
}

function getFreeMoveEligibleIndices(stateLike = roomState, seat) {
  return BOARD
    .map((tile, index) => ({ tile, index }))
    .filter(({ tile }) => {
      if (tile.type === "community" || tile.type === "chance") {
        return true;
      }

      if (tile.type !== "property") {
        return false;
      }

      const propertyState = stateLike?.propertyState?.[tile.propertyId] || { owner: null };
      return propertyState.owner === null
        || propertyState.owner === undefined
        || Number(propertyState.owner) === Number(seat);
    })
    .map(({ index }) => index);
}

function makeFreeParkingPopup(player, pool) {
  const rewardText = pool > 0
    ? `Ambil hadiah Uang Pajak sebesar ${formatMoney(pool)}, atau pilih satu petak tujuan yang menguntungkan.`
    : "Uang Pajak sedang kosong. Pilih satu petak tujuan yang menguntungkan.";

  return {
    id: `${Date.now()}_${player.seat}_free_parking_choice_${Math.random().toString(16).slice(2)}`,
    deckType: "system",
    deck: "Parkir Bebas",
    title: "PARKIR BEBAS",
    text: rewardText,
    seat: Number(player.seat),
    playerName: player.name
  };
}

async function beginFreeMoveSelection(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "freeParkingChoice") return;

  suppressBoardInputUntil = Date.now() + 420;
  freeMoveSelectionStarting = true;

  try {
    const latest = (await roomRef.once("value")).val();
    const action = latest?.pendingAction;
    if (!latest || action?.type !== "freeParkingChoice" || Number(action.seat) !== Number(mySeat)) return;

    const player = latest.players?.[mySeat];
    if (!player) return;

    const eligibleIndices = getFreeMoveEligibleIndices(latest, mySeat);
    if (!eligibleIndices.length) {
      await roomRef.update({ pendingAction: null, cardPopup: null, isRolling: false });
      await addRemoteLog(`${player.name} tidak memiliki petak tujuan yang menguntungkan dari Parkir Bebas.`);
      await finishTurn();
      return;
    }

    localHiddenCardId = latest.cardPopup?.id || localHiddenCardId;
    els.cardOverlay.classList.add("hidden");

    await roomRef.update({
      pendingAction: {
        type: "freeMove",
        seat: mySeat,
        eligibleIndices
      },
      cardPopup: null,
      isRolling: false
    });

    await addRemoteLog(`${player.name} memilih bonus pindah petak dari Parkir Bebas. Petak yang menguntungkan sudah di-highlight.`);
  } finally {
    window.setTimeout(() => {
      freeMoveSelectionStarting = false;
    }, 420);
  }
}

async function collectFreeParkingTax(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  suppressBoardInputUntil = Date.now() + 420;
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "freeParkingChoice") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  if (!latest || action?.type !== "freeParkingChoice" || Number(action.seat) !== Number(mySeat)) return;

  const player = latest.players?.[mySeat];
  if (!player) return;

  const pool = Number(latest.taxPool || 0);
  if (pool <= 0) return;

  await roomRef.update({
    [`players/${mySeat}/money`]: Number(player.money || 0) + pool,
    taxPool: 0,
    pendingAction: null,
    cardPopup: null,
    isRolling: false
  });

  await addRemoteLog(`${player.name} memilih hadiah Parkir Bebas dan mengambil Uang Pajak sebesar ${formatMoney(pool)}.`);
  await finishTurn();
}

async function chooseFreeMoveTarget(tileIndex) {
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "freeMove") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  if (!latest || action?.type !== "freeMove" || Number(action.seat) !== Number(mySeat)) return;

  const allowed = normalizeTileIndices(action.eligibleIndices);
  const normalizedIndex = Number(tileIndex);
  if (!allowed.includes(normalizedIndex)) return;
  if (freeMoveTapInProgress) return;

  const targetTile = BOARD[normalizedIndex];
  const isBeneficialTarget = targetTile
    && (targetTile.type === "community"
      || targetTile.type === "chance"
      || targetTile.type === "property");
  if (!isBeneficialTarget) return;

  roomState = latest;
  const player = latest.players?.[mySeat];
  if (!player) return;

  freeMoveTapInProgress = true;
  suppressBoardInputUntil = Date.now() + 900;

  const currentPos = Number(player.position || 0);
  const clockwiseDistance = getClockwiseDistance(currentPos, normalizedIndex);
  const passedStart = doesClockwiseMovePassStart(currentPos, normalizedIndex);
  const updates = {
    pendingAction: null,
    cardPopup: null,
    isRolling: true
  };
  let playerMoney = Number(player.money || 0);
  const moveId = `${Date.now()}_${mySeat}_free_${Math.random().toString(16).slice(2)}`;

  if (passedStart) {
    playerMoney += PASS_START_BONUS;
  }

  updates[`players/${mySeat}/position`] = normalizedIndex;
  updates[`players/${mySeat}/money`] = playerMoney;
  updates.lastMove = {
    id: moveId,
    seat: mySeat,
    from: currentPos,
    to: normalizedIndex,
    steps: clockwiseDistance,
    direct: true,
    duration: 620,
    passedStart,
    startBonus: passedStart ? PASS_START_BONUS : 0,
    createdAt: Date.now()
  };

  const targetName = getTileName(targetTile);
  const logs = [`${player.name} memilih ${targetName} sebagai tujuan bonus Parkir Bebas.`];

  if (passedStart) {
    logs.push(`${player.name} melewati START menuju ${targetName} dan menerima ${formatMoney(PASS_START_BONUS)}.`);
  }

  playerMoney = applyLandingEffect(
    normalizedIndex,
    mySeat,
    playerMoney,
    Number(latest.lastRoulette?.result || 7),
    updates,
    logs
  );
  updates[`players/${mySeat}/money`] = playerMoney;

  try {
    await roomRef.update(updates);
    await addLogs(logs);

    setTimeout(async () => {
      try {
        const current = (await roomRef.once("value")).val();
        if (!current?.lastMove || current.lastMove.id !== moveId) return;

        await roomRef.update({ isRolling: false });

        const afterUnlock = (await roomRef.once("value")).val();
        if (!afterUnlock?.pendingAction) {
          await finishTurn();
        }
      } finally {
        freeMoveTapInProgress = false;
      }
    }, 680);
  } catch (error) {
    freeMoveTapInProgress = false;
    throw error;
  }
}

function chooseSelectedFreeMoveTarget(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const select = document.getElementById("freeMoveTargetSelect");
  if (!select) return;

  const tileIndex = Number(select.value);
  if (!Number.isInteger(tileIndex)) return;

  chooseFreeMoveTarget(tileIndex);
}

function drawAndApplyCard(tileType, seat, playerMoney, updates, logs) {
  const deckKey = tileType === "community" ? "community" : "chance";
  const deck = CARD_DECKS[deckKey];
  const card = deck[Math.floor(Math.random() * deck.length)];
  const player = roomState.players[seat];
  const popupId = `${Date.now()}_${seat}_${deckKey}_${Math.random().toString(16).slice(2)}`;

  updates.cardPopup = {
    id: popupId,
    deckType: deckKey,
    deck: card.deck,
    title: card.title,
    text: card.text,
    seat,
    playerName: player.name
  };

  updates.pendingAction = {
    type: "card",
    seat,
    cardId: popupId
  };

  logs.push(`${player.name} mengambil kartu ${card.deck}: ${card.title}.`);

  return applyCardEffect(card, seat, playerMoney, updates, logs);
}

function applyCardEffect(card, seat, playerMoney, updates, logs) {
  const player = roomState.players[seat];
  const effect = card.effect || {};

  if (effect.type === "money") {
    playerMoney += Number(effect.amount || 0);
    logs.push(`${player.name} menerima ${formatMoney(effect.amount)}.`);
    return playerMoney;
  }

  if (effect.type === "payTax") {
    const amount = Number(effect.amount || 0);
    playerMoney -= amount;
    updates.taxPool = Number(updates.taxPool ?? roomState.taxPool ?? 0) + amount;
    logs.push(`${player.name} membayar ${formatMoney(amount)} ke Uang Pajak.`);
    return applyDebtRequirement(seat, playerMoney, updates, `denda atau pajak ${formatMoney(amount)}`, logs);
  }

  if (effect.type === "collectTaxPool") {
    const pool = Number(updates.taxPool ?? roomState.taxPool ?? 0);

    if (pool > 0) {
      playerMoney += pool;
      updates.taxPool = 0;
      logs.push(`${player.name} mengambil seluruh Uang Pajak sebesar ${formatMoney(pool)}.`);
    } else {
      logs.push(`${player.name} mendapat hadiah pajak, tetapi Uang Pajak masih kosong.`);
    }

    return playerMoney;
  }

  if (effect.type === "jail") {
    updates[`players/${seat}/position`] = 10;
    updates[`players/${seat}/inJail`] = true;
    updates[`players/${seat}/jailAttempts`] = 0;
    logs.push(`${player.name} langsung masuk penjara.`);
    return playerMoney;
  }

  if (effect.type === "moveToFreeParking") {
    updates.pendingAction = {
      type: "cardFreeParking",
      seat,
      cardId: updates.cardPopup?.id || ""
    };
    logs.push(`${player.name} akan menuju Parkir Bebas setelah kartu ditutup.`);
    return playerMoney;
  }

  if (effect.type === "moveTo") {
    const target = Number(effect.tile || 0);
    updates[`players/${seat}/position`] = target;

    if (Number(effect.money || 0) > 0) {
      playerMoney += Number(effect.money);
      logs.push(`${player.name} pindah ke ${getTileName(BOARD[target])} dan menerima ${formatMoney(effect.money)}.`);
    } else {
      logs.push(`${player.name} pindah ke ${getTileName(BOARD[target])}.`);
    }

    return playerMoney;
  }

  return playerMoney;
}

function handlePropertyLanding(propertyId, seat, playerMoney, diceTotal, updates, logs) {
  const property = PROPERTY_DATA[propertyId];
  const ps = getPropertyState(propertyId);
  const player = roomState.players[seat];

  if (ps.owner === null || ps.owner === undefined) {
    updates.pendingAction = {
      type: "buy",
      seat,
      propertyId
    };
    logs.push(`${player.name} mendarat di ${property.name}. Tanah belum dimiliki dan bisa dibeli seharga ${formatMoney(getPropertyPrice(property))}.`);
    return playerMoney;
  }

  if (Number(ps.owner) === Number(seat)) {
    if (property.kind === "city") {
      updates.pendingAction = {
        type: "build",
        seat,
        propertyId
      };
      logs.push(`${player.name} mendarat di tanah miliknya sendiri: ${property.name}. Bisa membangun rumah/hotel.`);
    } else {
      logs.push(`${player.name} mendarat di properti miliknya sendiri: ${property.name}.`);
    }
    return playerMoney;
  }

  const ownerSeat = Number(ps.owner);
  const owner = roomState.players[ownerSeat];
  const rent = calculateRent(propertyId, diceTotal, roomState);

  playerMoney -= rent;
  const ownerMoney = Number(owner.money || 0) + rent;
  updates[`players/${ownerSeat}/money`] = ownerMoney;

  logs.push(`${player.name} membayar sewa ${formatMoney(rent)} kepada ${owner.name} untuk ${property.name}.`);
  return applyDebtRequirement(seat, playerMoney, updates, `sewa ${property.name} sebesar ${formatMoney(rent)}`, logs);
}

async function addLogs(logs) {
  if (!roomRef) return;

  const importantLogs = (logs || []).filter(isImportantGameLog);
  if (!importantLogs.length) return;

  const updates = {};
  const timestamp = Date.now();
  importantLogs.forEach((text, index) => {
    updates[`logs/${timestamp + index}`] = text;
  });

  await roomRef.update(updates);
  await trimRemoteLogsToLatest(22);
}

function getPropertyState(propertyId) {
  return roomState?.propertyState?.[propertyId] || { owner: null, level: 0 };
}

function getPropertyPrice(property) {
  if (property.kind === "utility") return property.price || 150;
  return property.mortgage * 2;
}

function calculateRent(propertyId, diceTotal = 7, stateLike = roomState) {
  const property = PROPERTY_DATA[propertyId];
  const ps = stateLike.propertyState?.[propertyId] || { owner: null, level: 0 };

  if (ps.owner === null || ps.owner === undefined) return 0;

  if (property.kind === "city") {
    let rent = property.rents[Number(ps.level || 0)] || property.rents[0];

    if (hasFullGroup(ps.owner, property.group, stateLike)) {
      rent *= 2;
    }

    return rent;
  }

  if (property.kind === "airport") {
    const count = getOwnedPropertyIds(ps.owner, stateLike)
      .map(id => PROPERTY_DATA[id])
      .filter(item => item.kind === "airport")
      .length;

    return property.rentsByOwned[Math.max(0, count - 1)] || property.rentsByOwned[0];
  }

  if (property.kind === "utility") {
    const count = getOwnedPropertyIds(ps.owner, stateLike)
      .map(id => PROPERTY_DATA[id])
      .filter(item => item.kind === "utility")
      .length;

    // Sewa perusahaan tidak lagi bergantung pada hasil roulette.
    // Satu perusahaan = 2× nilai hipotik, dua perusahaan = 5× nilai hipotik.
    return Number(property.mortgage || 0) * (count >= 2 ? 5 : 2);
  }

  return 0;
}

function hasFullGroup(ownerSeat, group, stateLike = roomState) {
  const groupIds = Object.entries(PROPERTY_DATA)
    .filter(([, item]) => item.kind === "city" && item.group === group)
    .map(([id]) => id);

  return groupIds.every(id => {
    const owner = stateLike.propertyState?.[id]?.owner;
    return owner !== null && owner !== undefined && Number(owner) === Number(ownerSeat);
  });
}

function getOwnedPropertyIds(ownerSeat, stateLike = roomState) {
  return Object.keys(PROPERTY_DATA)
    .filter(id => {
      const owner = stateLike?.propertyState?.[id]?.owner;
      return owner !== null && owner !== undefined && Number(owner) === Number(ownerSeat);
    });
}

function getPropertyLiquidationValue(propertyId, stateLike = roomState) {
  const property = PROPERTY_DATA[propertyId];
  const propertyState = stateLike?.propertyState?.[propertyId] || { level: 0 };
  if (!property) return 0;

  // Nilai jual tanah = nilai hipotik (50% dari harga beli).
  // Seluruh rumah/hotel ikut dijual dengan nilai 50% dari total biaya bangunan.
  const landValue = Number(property.mortgage || 0);
  const level = property.kind === "city" ? Number(propertyState.level || 0) : 0;
  const buildingValue = level * Number(property.buildingCost || 0) * 0.5;

  return Math.floor(landValue + buildingValue);
}

function applyDebtRequirement(seat, projectedMoney, updates, reason, logs, options = {}) {
  const money = Number(projectedMoney || 0);
  if (money >= 0) return money;

  const player = roomState?.players?.[seat];
  const ownedIds = getOwnedPropertyIds(seat, roomState);
  const deficit = Math.abs(money);

  if (ownedIds.length > 0) {
    updates.debtState = {
      seat: Number(seat),
      reason: String(reason || "kewajiban pembayaran"),
      deficit,
      resumeTurn: Boolean(options.resumeTurn),
      createdAt: Date.now()
    };
    logs.push(`${player?.name || "Pemain"} memiliki saldo minus ${formatMoney(deficit)} dan harus menjual properti.`);
    return money;
  }

  updates[`players/${seat}/money`] = 0;
  updates[`players/${seat}/bankrupt`] = true;
  updates[`players/${seat}/inJail`] = false;
  updates[`players/${seat}/jailAttempts`] = 0;
  updates.debtState = null;
  updates.pendingAction = null;
  updates.cardPopup = null;
  updates.isRolling = false;
  logs.push(`${player?.name || "Pemain"} bangkrut karena tidak memiliki properti untuk menutup kekurangan ${formatMoney(deficit)}.`);
  return 0;
}

async function sellSelectedPropertyForDebt(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!roomRef || !canIResolveDebt() || debtSaleInProgress) return;

  const select = document.getElementById("debtPropertySelect");
  const propertyId = String(select?.value || "");
  if (!PROPERTY_DATA[propertyId]) return;

  debtSaleInProgress = true;

  try {
    const latest = (await roomRef.once("value")).val();
    const debt = latest?.debtState;
    const player = latest?.players?.[mySeat];
    const propertyState = latest?.propertyState?.[propertyId];

    if (!latest || !player || player.bankrupt) return;
    if (!debt || Number(debt.seat) !== Number(mySeat)) return;
    if (Number(propertyState?.owner) !== Number(mySeat)) return;

    const saleValue = getPropertyLiquidationValue(propertyId, latest);
    const currentMoney = Number(player.money || 0);
    const nextMoney = currentMoney + saleValue;
    const remainingIds = getOwnedPropertyIds(mySeat, latest).filter(id => id !== propertyId);
    const property = PROPERTY_DATA[propertyId];
    const updates = {
      [`players/${mySeat}/money`]: nextMoney,
      [`propertyState/${propertyId}/owner`]: null,
      [`propertyState/${propertyId}/level`]: 0,
      isRolling: false
    };

    let becameBankrupt = false;
    let debtResolved = false;

    if (nextMoney >= 0) {
      updates.debtState = null;
      debtResolved = true;
    } else if (remainingIds.length > 0) {
      updates.debtState = {
        seat: Number(mySeat),
        reason: debt.reason || "kewajiban pembayaran",
        deficit: Math.abs(nextMoney),
        resumeTurn: Boolean(debt.resumeTurn),
        createdAt: Number(debt.createdAt || Date.now())
      };
    } else {
      updates[`players/${mySeat}/money`] = 0;
      updates[`players/${mySeat}/bankrupt`] = true;
      updates[`players/${mySeat}/inJail`] = false;
      updates[`players/${mySeat}/jailAttempts`] = 0;
      updates.debtState = null;
      updates.pendingAction = null;
      updates.cardPopup = null;
      becameBankrupt = true;
    }

    await roomRef.update(updates);
    await addRemoteLog(`${player.name} menjual properti ${property.name} kepada bank seharga ${formatMoney(saleValue)}.`);

    if (debtResolved) {
      await addRemoteLog(`${player.name} melunasi kekurangan pembayaran dan memiliki saldo ${formatMoney(nextMoney)}.`);
      if (!debt.resumeTurn) {
        await finishTurn();
      }
      return;
    }

    if (becameBankrupt) {
      await addRemoteLog(`${player.name} bangkrut setelah seluruh properti dijual tetapi saldo masih belum mencukupi.`);
      await finishTurn();
    }
  } finally {
    debtSaleInProgress = false;
  }
}


async function payJailFine() {
  if (!canIUseJailAction()) return;

  const player = roomState.players[mySeat];
  const updates = {};
  const logs = [`${player.name} membayar $50 dan bebas dari penjara. Pemain dapat langsung bermain pada giliran ini.`];
  let nextMoney = Number(player.money || 0) - 50;

  updates[`players/${mySeat}/inJail`] = false;
  updates[`players/${mySeat}/jailAttempts`] = 0;
  updates.taxPool = Number(roomState.taxPool || 0) + 50;
  nextMoney = applyDebtRequirement(mySeat, nextMoney, updates, "denda keluar penjara $50", logs, { resumeTurn: true });
  updates[`players/${mySeat}/money`] = nextMoney;

  await roomRef.update(updates);
  await addLogs(logs);

  if (updates[`players/${mySeat}/bankrupt`]) {
    await finishTurn();
  }
}


async function rollForJailRoulette() {
  if (!canIUseJailAction()) return;

  const player = roomState.players[mySeat];
  const result = Math.floor(Math.random() * 12) + 1;
  const attempts = Number(player.jailAttempts || 0) + 1;
  const rouletteId = `${Date.now()}_${mySeat}_jail_${Math.random().toString(16).slice(2)}`;
  const previousRotation = Number(roomState.lastRoulette?.rotation || 0);
  const rotation = getRouletteFinalRotation(previousRotation, result);

  await roomRef.update({
    isRolling: true,
    lastDice: [0, result],
    lastRoulette: {
      id: rouletteId,
      result,
      rotation,
      createdAt: Date.now(),
      source: "jail"
    }
  });

  setTimeout(async () => {
    const latest = (await roomRef.once("value")).val();
    if (!latest?.lastRoulette || latest.lastRoulette.id !== rouletteId) return;

    const latestPlayer = latest.players?.[mySeat];
    if (!latestPlayer?.inJail) {
      await roomRef.update({ isRolling: false });
      return;
    }

    if (result === 12) {
      await roomRef.update({
        [`players/${mySeat}/inJail`]: false,
        [`players/${mySeat}/jailAttempts`]: 0,
        isRolling: false
      });
      await addRemoteLog(`${latestPlayer.name} mendapat angka 12 pada roulette penjara dan bebas dari penjara. Pemain dapat langsung bermain pada giliran ini.`);
      return;
    }

    if (attempts >= 3) {
      await roomRef.update({
        [`players/${mySeat}/inJail`]: false,
        [`players/${mySeat}/jailAttempts`]: 0,
        isRolling: false
      });
      await addRemoteLog(`${latestPlayer.name} mendapat angka ${result} pada percobaan roulette penjara ke-3. Pemain tetap dibebaskan dan dapat bermain.`);
      return;
    }

    await roomRef.update({
      [`players/${mySeat}/jailAttempts`]: attempts,
      isRolling: false
    });
    await addRemoteLog(`${latestPlayer.name} gagal keluar dari penjara karena roulette mendapat angka ${result}. Percobaan ${attempts}/3.`);
    await finishTurn();
  }, 1650);
}

async function buyCurrentProperty() {
  if (!canIAct()) return;

  const action = roomState.pendingAction;
  if (action.type !== "buy") return;

  const propertyId = action.propertyId;
  const property = PROPERTY_DATA[propertyId];
  const ps = getPropertyState(propertyId);
  const player = roomState.players[mySeat];
  const price = getPropertyPrice(property);

  if (ps.owner !== null && ps.owner !== undefined) {
    alert("Tanah sudah dimiliki pemain lain.");
    await roomRef.update({ pendingAction: null });
    await finishTurn();
    return;
  }

  if (Number(player.money || 0) < price) {
    alert("Uang tidak cukup untuk membeli tanah ini.");
    return;
  }

  const updates = {};
  updates[`players/${mySeat}/money`] = Number(player.money || 0) - price;
  updates[`propertyState/${propertyId}/owner`] = mySeat;
  updates[`propertyState/${propertyId}/level`] = 0;
  updates.pendingAction = null;

  await roomRef.update(updates);
  await addRemoteLog(`${player.name} membeli ${property.name} seharga ${formatMoney(price)}.`);
  await finishTurn();
}

async function skipCurrentAction() {
  if (!canIAct()) return;

  const action = roomState.pendingAction;
  const property = action?.propertyId ? PROPERTY_DATA[action.propertyId] : null;

  await roomRef.update({ pendingAction: null });

  if (property) {
    await addRemoteLog(`${roomState.players[mySeat].name} melewati aksi di ${property.name}.`);
  }

  await finishTurn();
}

async function buildCurrentProperty() {
  if (!canIAct()) return;

  const action = roomState.pendingAction;
  if (action.type !== "build") return;

  const propertyId = action.propertyId;
  const property = PROPERTY_DATA[propertyId];
  const ps = getPropertyState(propertyId);
  const player = roomState.players[mySeat];

  if (property.kind !== "city") return;
  if (Number(ps.owner) !== Number(mySeat)) return;

  const level = Number(ps.level || 0);

  if (level >= 5) {
    alert("Tanah ini sudah memiliki hotel.");
    return;
  }

  if (Number(player.money || 0) < property.buildingCost) {
    alert("Uang tidak cukup untuk membangun.");
    return;
  }

  const nextLevel = level + 1;
  const buildText = nextLevel === 5 ? "hotel" : `rumah ke-${nextLevel}`;

  const updates = {};
  updates[`players/${mySeat}/money`] = Number(player.money || 0) - property.buildingCost;
  updates[`propertyState/${propertyId}/level`] = nextLevel;
  updates.pendingAction = null;

  await roomRef.update(updates);
  await addRemoteLog(`${player.name} membangun ${buildText} di ${property.name}.`);
  await finishTurn();
}

async function finishTurn() {
  const latest = (await roomRef.once("value")).val();
  if (!latest) return;

  // Pemain yang masih memiliki saldo minus wajib menyelesaikan penjualan aset
  // sebelum giliran dapat berpindah.
  if (latest.debtState) {
    await roomRef.update({ isRolling: false });
    return;
  }

  // Roulette 12 pertama atau kedua memberi satu putaran tambahan setelah
  // seluruh efek petak dan transaksi pada langkah tersebut selesai.
  if (await activatePendingRoulette12Bonus(latest)) {
    return;
  }

  const activeSeats = getActiveSeatsFromState(latest);

  if (activeSeats.length <= 1) {
    const winnerSeat = activeSeats[0] ?? null;
    const winnerName = winnerSeat !== null
      ? (latest.players?.[winnerSeat]?.name || "Pemain terakhir")
      : "Tidak ada pemenang";

    await roomRef.update({
      status: "finished",
      winnerSeat,
      isRolling: false,
      pendingAction: null,
      pendingExtraRoll: null,
      debtState: null,
      cardPopup: {
        id: `${Date.now()}_game_finished`,
        deckType: "system",
        deck: "Game Selesai",
        title: winnerSeat !== null ? `${winnerName} Menang!` : "Game Selesai",
        text: winnerSeat !== null
          ? "Semua pemain lain sudah bangkrut atau keluar. Game dinyatakan selesai."
          : "Tidak ada pemain aktif yang tersisa.",
        seat: winnerSeat,
        playerName: winnerName
      }
    });
    await addRemoteLog(winnerSeat !== null
      ? `Game selesai. ${winnerName} menang.`
      : "Game selesai tanpa pemenang.");
    return;
  }

  const currentIndex = activeSeats.indexOf(Number(latest.currentSeat));
  const nextSeat = currentIndex === -1
    ? activeSeats[0]
    : activeSeats[(currentIndex + 1) % activeSeats.length];

  await roomRef.update({
    currentSeat: nextSeat,
    isRolling: false,
    pendingAction: null,
    pendingExtraRoll: null,
    debtState: null,
    cardPopup: null
  });

  await addRemoteLog(`Giliran berpindah ke ${latest.players[nextSeat]?.name || `Pemain ${nextSeat + 1}`}.`);
}


function renderUI() {
  const players = roomState.players || {};
  const current = players[roomState.currentSeat];
  const me = players[mySeat];

  els.turnName.textContent = roomState.status === "orderRoll" ? (current?.name || "-") : (current?.name || "-");
  renderRouletteUI();

  els.startBtn.disabled = !canIStart();
  els.rollBtn.disabled = !canIRoll();

  if (roomState.status === "finished") {
    const winner = players[roomState.winnerSeat];
    els.statusText.textContent = `Game selesai. Pemenang: ${winner?.name || "Pemain terakhir"}.`;
  } else if (roomState.status === "lobby") {
    if (isSpectator(me)) {
      els.statusText.textContent = "Kamu bergabung sebagai penonton. Kamu dapat menyaksikan permainan tanpa mendapat giliran.";
    } else {
      els.statusText.textContent = canIStart()
        ? "Kamu host. Setelah minimal 2 pemain masuk, klik Mulai Game."
        : "Menunggu host memulai game.";
    }
  } else if (roomState.status === "orderRoll") {
    els.statusText.textContent = isSpectator(me)
      ? `Menonton ${current?.name || "pemain"} menentukan urutan giliran.`
      : Number(roomState.currentSeat) === Number(mySeat)
        ? "Giliranmu memutar roulette untuk menentukan urutan permainan."
        : `Menunggu ${current?.name || "pemain"} menentukan urutan giliran.`;
  } else if (isSpectator(me)) {
    els.statusText.textContent = "Kamu adalah penonton. Permainan tetap dapat disaksikan secara realtime.";
  } else if (me?.bankrupt) {
    els.statusText.textContent = "Kamu sudah bangkrut dan sekarang menjadi penonton. Permainan pemain lain tetap berlanjut.";
  } else if (roomState.isRolling) {
    els.statusText.textContent = current?.inJail
      ? "Roulette penjara sedang berputar. Pemain harus mendapat angka 12 untuk bebas."
      : "Pion sedang berjalan. Tunggu sampai animasi selesai.";
  } else if (roomState.pendingAction) {
    const actor = players[roomState.pendingAction.seat];
    if (roomState.pendingAction.type === "freeParkingChoice") {
      els.statusText.textContent = Number(roomState.currentSeat) === Number(mySeat)
        ? "Parkir Bebas: pilih hadiah Uang Pajak atau pilih petak tujuan."
        : `${actor?.name || "Pemain aktif"} sedang memilih bonus Parkir Bebas.`;
    } else if (roomState.pendingAction.type === "freeMove") {
      els.statusText.textContent = Number(roomState.currentSeat) === Number(mySeat)
        ? "Klik salah satu petak yang di-highlight kuning."
        : `${actor?.name || "Pemain aktif"} sedang memilih petak tujuan dari Parkir Bebas.`;
    } else if (roomState.pendingAction.type === "roulette12Bonus") {
      els.statusText.textContent = Number(roomState.currentSeat) === Number(mySeat)
        ? "Kamu mendapat angka 12. Tutup popup lalu putar roulette lagi."
        : `${actor?.name || "Pemain aktif"} mendapat bonus roulette karena memperoleh angka 12.`;
    } else if (roomState.pendingAction.type === "tripleTwelveJail") {
      els.statusText.textContent = `${actor?.name || "Pemain aktif"} mendapat angka 12 tiga kali berturut-turut dan masuk penjara.`;
    } else {
      els.statusText.textContent = `Menunggu aksi dari ${actor?.name || "pemain aktif"}.`;
    }
  } else if (roomState.debtState) {
    const debtor = players[roomState.debtState.seat];
    els.statusText.textContent = Number(roomState.debtState.seat) === Number(mySeat)
      ? `Saldo kamu minus. Jual properti sampai saldo kembali minimal $0.`
      : `${debtor?.name || "Pemain aktif"} sedang menjual properti untuk menutup saldo minus.`;
  } else if (current?.inJail) {
    els.statusText.textContent = Number(roomState.currentSeat) === Number(mySeat)
      ? "Kamu sedang di penjara. Pilih bayar $50 atau coba dapatkan angka 12 dari roulette."
      : `${current?.name || "Pemain aktif"} sedang di penjara.`;
  } else if (canIRoll()) {
    els.statusText.textContent = isPlayerBoardActive(me)
      ? "Sekarang giliranmu. Klik Putar Roulette."
      : "Putaran pemanasan: selesaikan satu putaran dan lewati START agar seluruh petak aktif untukmu.";
  } else {
    els.statusText.textContent = `Menunggu giliran ${current?.name || "pemain lain"}.`;
  }

  renderActionPanel();
  renderPlayersList(players);
  renderLogs();
  renderCardPopup();
  renderDisconnectOverlay();
  renderOrderOverlay();
}


function formatOrderHistory(history) {
  const values = normalizeSeatArray(history);
  return values.length ? values.join(" → ") : "Belum roulette";
}

function renderOrderOverlay() {
  if (!els.orderOverlay) return;

  const order = roomState?.orderRoll;
  const resultId = order?.resultId || "";
  const showRolling = roomState?.status === "orderRoll" && order && !order.completed;
  const showResult = roomState?.status === "playing"
    && order?.completed
    && resultId
    && resultId !== localDismissedOrderResultId;
  const shouldShow = showRolling || showResult;

  els.orderOverlay.classList.toggle("hidden", !shouldShow);
  els.orderOverlay.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  if (!shouldShow) return;

  const histories = order?.histories || {};
  const ranking = showResult
    ? normalizeSeatArray(order.finalOrder)
    : getStartingOrderRanking(roomState);

  if (showResult) {
    els.orderTitle.textContent = "Urutan Giliran Ditentukan";
    els.orderText.textContent = "Urutan pemain telah disusun dari hasil roulette tertinggi.";
    els.orderResults.innerHTML = ranking.map((seat, index) => {
      const player = roomState.players?.[seat];
      return `<div class="order-result-row final"><span>${index + 1}</span><strong>${escapeHTML(player?.name || `Pemain ${seat + 1}`)}</strong><em>${escapeHTML(formatOrderHistory(histories[seat]))}</em></div>`;
    }).join("");
    els.orderRollBtn.textContent = "Lanjutkan ke Permainan";
    els.orderRollBtn.disabled = false;
    els.orderRollBtn.dataset.mode = "dismiss";
    return;
  }

  const queue = normalizeSeatArray(order.queue);
  const currentIndex = Number(order.currentIndex || 0);
  const currentSeat = queue[currentIndex];
  const currentPlayer = roomState.players?.[currentSeat];
  const isMyTurn = Number(currentSeat) === Number(mySeat) && !isSpectator(roomState.players?.[mySeat]);
  const isTieRound = Number(order.round || 1) > 1;

  els.orderTitle.textContent = isTieRound ? "Roulette Ulang Karena Seri" : "Penentuan Giliran";
  els.orderText.textContent = isMyTurn
    ? `Giliran ${currentPlayer?.name || "kamu"} untuk menentukan urutan dari nilai roulette.`
    : `Menunggu ${currentPlayer?.name || "pemain"} memutar roulette penentuan giliran.`;
  els.orderResults.innerHTML = ranking.map((seat, index) => {
    const player = roomState.players?.[seat];
    return `<div class="order-result-row"><span>${index + 1}</span><strong>${escapeHTML(player?.name || `Pemain ${seat + 1}`)}</strong><em>${escapeHTML(formatOrderHistory(histories[seat]))}</em></div>`;
  }).join("");
  els.orderRollBtn.textContent = roomState.isRolling
    ? "Roulette Berputar..."
    : isMyTurn ? "Putar Roulette Penentuan" : `Menunggu ${currentPlayer?.name || "Pemain"}`;
  els.orderRollBtn.disabled = !isMyTurn || roomState.isRolling || isGamePausedForDisconnect(roomState);
  els.orderRollBtn.dataset.mode = "roll";
}

function handleOrderOverlayButton() {
  if (els.orderRollBtn?.dataset.mode === "dismiss") {
    localDismissedOrderResultId = roomState?.orderRoll?.resultId || "";
    renderOrderOverlay();
    renderPlayersList(roomState?.players || {});
    if (gameScene && roomState) gameScene.renderRoomState(roomState);
    return;
  }

  rollStartingOrder();
}


function renderDisconnectOverlay() {
  if (!els.disconnectOverlay) return;

  const disconnectedPlayers = getDisconnectedGamePlayers(roomState);
  const shouldShow = ["orderRoll", "playing"].includes(roomState?.status) && disconnectedPlayers.length > 0;

  els.disconnectOverlay.classList.toggle("hidden", !shouldShow);
  els.disconnectOverlay.setAttribute("aria-hidden", shouldShow ? "false" : "true");

  if (!shouldShow) return;

  const names = disconnectedPlayers.map(player => player.name || `Pemain ${Number(player.seat) + 1}`);
  const nameText = names.length === 1
    ? names[0]
    : `${names.slice(0, -1).join(", ")} dan ${names[names.length - 1]}`;

  if (els.disconnectTitle) {
    els.disconnectTitle.textContent = "Permainan Dijeda";
  }

  if (els.disconnectText) {
    els.disconnectText.textContent = `Menunggu ${nameText} terhubung kembali. Permainan akan dilanjutkan otomatis setelah koneksi pulih.`;
  }
}

function renderActionPanel() {
  const action = roomState.pendingAction;
  const myTurn = Number(roomState.currentSeat) === Number(mySeat);
  const player = roomState.players?.[roomState.currentSeat];
  const currentTile = player ? BOARD[Number(player.position || 0)] : null;
  const currentTileName = getTileName(currentTile);

  if (roomState.status === "finished") {
    const winner = roomState.players?.[roomState.winnerSeat];
    els.actionPanel.innerHTML = `
      <div class="action-title">Game Selesai</div>
      <div class="action-sub">${escapeHTML(winner?.name || "Pemain terakhir")} menjadi pemenang.</div>
    `;
    return;
  }

  if (roomState.status === "lobby") {
    const me = roomState.players?.[mySeat];
    els.actionPanel.innerHTML = isSpectator(me)
      ? `
        <div class="action-title">Mode Penonton</div>
        <div class="action-sub">Slot pemain Monopoly sudah penuh. Kamu dapat menyaksikan seluruh permainan secara realtime.</div>
      `
      : `
        <div class="action-title">Lobby</div>
        <div class="action-sub">Menunggu pemain masuk. Host dapat memulai game setelah minimal 2 pemain aktif.</div>
      `;
    return;
  }

  if (roomState.status === "orderRoll") {
    const currentOrderPlayer = roomState.players?.[roomState.currentSeat];
    els.actionPanel.innerHTML = `
      <div class="action-title">PENENTUAN GILIRAN</div>
      <div class="action-sub">${escapeHTML(currentOrderPlayer?.name || "Pemain")} sedang menentukan urutan melalui roulette. Nilai terbesar mendapat giliran lebih awal.</div>
    `;
    return;
  }

  if (isSpectator(roomState.players?.[mySeat])) {
    els.actionPanel.innerHTML = `
      <div class="action-title">Mode Penonton</div>
      <div class="action-sub">Kamu dapat melihat papan, transaksi, dan riwayat, tetapi tidak dapat melakukan aksi permainan.</div>
    `;
    return;
  }

  if (roomState.debtState && !roomState.pendingAction && !roomState.isRolling) {
    const debtSeat = Number(roomState.debtState.seat);
    const debtor = roomState.players?.[debtSeat];
    const ownedIds = getOwnedPropertyIds(debtSeat, roomState);
    const options = ownedIds.map(propertyId => {
      const property = PROPERTY_DATA[propertyId];
      const saleValue = getPropertyLiquidationValue(propertyId, roomState);
      return `<option value="${escapeHTML(propertyId)}">${escapeHTML(property.name)} (${formatMoney(saleValue)})</option>`;
    }).join("");
    const enabled = canIResolveDebt() && ownedIds.length > 0;
    const currentMoney = Number(debtor?.money || 0);

    els.actionPanel.innerHTML = `
      <div class="action-title">JUAL PROPERTI</div>
      <div class="action-sub">
        ${escapeHTML(debtor?.name || "Pemain")} memiliki saldo ${formatMoney(currentMoney)} karena ${escapeHTML(roomState.debtState.reason || "kewajiban pembayaran")}.
        Jual seluruh tanah beserta bangunannya sampai saldo kembali minimal $0.
      </div>
      <div class="price-pill">Kekurangan: ${formatMoney(Math.abs(currentMoney))}</div>
      ${ownedIds.length ? `
        <div class="free-move-mobile-picker debt-property-picker">
          <select id="debtPropertySelect" aria-label="Pilih properti yang akan dijual">${options}</select>
          <button class="danger" type="button" onclick="sellSelectedPropertyForDebt(event)" ${enabled ? "" : "disabled"}>Jual Properti</button>
        </div>
      ` : `
        <div class="action-sub">Tidak ada properti yang dapat dijual. Pemain akan dinyatakan bangkrut.</div>
      `}
    `;
    return;
  }

  if (player?.inJail && !roomState.pendingAction && !roomState.isRolling) {
    const enabled = canIUseJailAction();
    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(player.name)} di Penjara</div>
      <div class="action-sub">
        Percobaan keluar: ${Number(player.jailAttempts || 0)}/3. Pilih bayar $50 untuk langsung bebas, atau putar roulette dan dapatkan angka 12.
        Jika belum mendapat 12 sampai percobaan ke-3, pemain tetap dibebaskan dan dapat bermain pada giliran tersebut.
      </div>
      <div class="action-row">
        <button class="gold" onclick="rollForJailRoulette()" ${enabled ? "" : "disabled"}>Coba Roulette 12</button>
        <button class="primary" onclick="payJailFine()" ${enabled ? "" : "disabled"}>Bayar $50 Bebas</button>
      </div>
    `;
    return;
  }

  if (roomState.isRolling) {
    els.actionPanel.innerHTML = player?.inJail
      ? `
        <div class="action-title">Roulette Penjara</div>
        <div class="action-sub">Roulette sedang berputar. Angka 12 akan membebaskan pemain tanpa membayar.</div>
      `
      : `
        <div class="action-title">Pion Bergerak</div>
        <div class="action-sub">Tunggu animasi pion selesai. Setelah itu aksi petak akan muncul jika tersedia.</div>
      `;
    return;
  }

  if (!action) {
    if (myTurn && !isPlayerBoardActive(player)) {
      els.actionPanel.innerHTML = `
        <div class="action-title">PUTARAN PEMANASAN</div>
        <div class="action-sub">Seluruh efek petak belum aktif untuk ${escapeHTML(player?.name || "pemain ini")}. Lewati START satu kali untuk membuka pembelian tanah, kartu, pajak, denda, penjara, dan Parkir Bebas.</div>
        <div class="price-pill">Putaran ${Number(player?.lapsCompleted || 0)}/1</div>
      `;
    } else {
      els.actionPanel.innerHTML = `
        <div class="action-title">${escapeHTML(currentTileName)}</div>
        <div class="action-sub">${myTurn ? "Tidak ada aksi khusus. Silakan putar roulette." : "Menunggu giliran pemain aktif."}</div>
      `;
    }
    return;
  }

  const actor = roomState.players[action.seat];
  const enabled = canIAct();

  if (action.type === "roulette12Bonus") {
    const streak = Number(action.streak || 1);
    els.actionPanel.innerHTML = `
      <div class="action-title">ROULETTE 12${streak >= 2 ? " LAGI" : ""}!</div>
      <div class="action-sub">${escapeHTML(actor?.name || "Pemain aktif")} mendapat satu kesempatan roulette tambahan.${streak >= 2 ? " Jika kembali mendapat angka 12, pemain langsung masuk penjara." : ""}</div>
      <div class="action-row single">
        <button class="primary" onclick="acceptRoulette12Bonus(event)" ${enabled ? "" : "disabled"}>Putar Lagi</button>
      </div>
    `;
    return;
  }

  if (action.type === "tripleTwelveJail") {
    els.actionPanel.innerHTML = `
      <div class="action-title">MASUK PENJARA</div>
      <div class="action-sub">${escapeHTML(actor?.name || "Pemain aktif")} mendapat angka 12 tiga kali berturut-turut dan langsung dipindahkan ke penjara.</div>
      <div class="action-row single">
        <button class="primary" onclick="closeCardAndFinishTurn()" ${enabled ? "" : "disabled"}>Tutup & Lanjutkan</button>
      </div>
    `;
    return;
  }

  if (action.type === "card" || action.type === "taxPopup") {
    const popup = roomState.cardPopup;

    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(popup?.deck || "Kartu")}: ${escapeHTML(popup?.title || "Kartu")}</div>
      <div class="action-sub">${escapeHTML(popup?.text || "Efek sedang diproses.")}</div>
      <div class="action-row single">
        <button class="primary" onclick="closeCardAndFinishTurn()" ${enabled ? "" : "disabled"}>Tutup & Lanjutkan</button>
      </div>
    `;
    return;
  }

  if (action.type === "freeParkingChoice") {
    const pool = Number(roomState.taxPool || 0);
    const totalChoices = normalizeTileIndices(action.eligibleIndices).length;
    els.actionPanel.innerHTML = `
      <div class="action-title">PARKIR BEBAS</div>
      <div class="action-sub">Pilih satu hadiah. Mengambil Uang Pajak akan mengakhiri giliran. Memilih petak akan menampilkan highlight pada tanah kosong, tanah milikmu, Dana Umum, dan Kesempatan.</div>
      <div class="price-pill">Uang Pajak: ${formatMoney(pool)} • ${totalChoices} petak menguntungkan</div>
      <div class="action-row">
        <button class="gold" onclick="collectFreeParkingTax(event)" ${enabled && pool > 0 ? "" : "disabled"}>Ambil Uang Pajak</button>
        <button class="primary" onclick="beginFreeMoveSelection(event)" ${enabled && totalChoices > 0 ? "" : "disabled"}>Pilih Petak Tujuan</button>
      </div>
    `;
    return;
  }

  if (action.type === "freeMove") {
    const eligibleIndices = normalizeTileIndices(action.eligibleIndices);
    const totalChoices = eligibleIndices.length;
    const actorPosition = Number(roomState.players?.[action.seat]?.position ?? 20);
    const options = eligibleIndices.map((tileIndex) => {
      const bonusLabel = doesClockwiseMovePassStart(actorPosition, tileIndex) ? " (+$200)" : "";
      return `<option value="${tileIndex}">${escapeHTML(getTileName(BOARD[tileIndex]))}${bonusLabel}</option>`;
    }).join("");

    els.actionPanel.innerHTML = `
      <div class="action-title">PILIH PETAK TUJUAN</div>
      <div class="action-sub">Tap salah satu petak yang di-highlight kuning. Petak tujuan yang rutenya melewati START memberi bonus $200. Pilihan tersedia: ${totalChoices} petak.</div>
      <div class="free-move-mobile-picker">
        <select id="freeMoveTargetSelect" aria-label="Pilih petak tujuan Parkir Bebas">${options}</select>
        <button class="primary" type="button" onclick="chooseSelectedFreeMoveTarget(event)">Pindah ke Petak</button>
      </div>
    `;
    return;
  }

  const property = PROPERTY_DATA[action.propertyId];

  if (action.type === "buy") {
    const price = getPropertyPrice(property);

    els.actionPanel.innerHTML = `
      <div class="action-title">Beli ${escapeHTML(property.name)}?</div>
      <div class="price-pill">Harga ${formatMoney(price)}</div>
      <div class="action-sub">${escapeHTML(actor.name)} mendarat di tanah kosong. Pilih beli atau tidak beli.</div>
      <div class="action-row">
        <button class="primary" onclick="buyCurrentProperty()" ${enabled ? "" : "disabled"}>Beli</button>
        <button class="danger" onclick="skipCurrentAction()" ${enabled ? "" : "disabled"}>Tidak Beli</button>
      </div>
    `;
    return;
  }

  if (action.type === "build") {
    const ps = getPropertyState(action.propertyId);
    const level = Number(ps.level || 0);
    const next = level < 4 ? `Bangun Rumah ${level + 1}` : level === 4 ? "Bangun Hotel" : "Sudah Hotel";
    const canBuild = level < 5;

    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(property.name)}</div>
      <div class="price-pill">Level: ${RENT_LABELS[level]}</div>
      <div class="action-sub">
        Tanah ini milik ${escapeHTML(actor.name)}. Rumah dibangun bertahap sampai 4 rumah, lalu menjadi 1 hotel.
        Biaya bangun: ${formatMoney(property.buildingCost)}.
      </div>
      <div class="action-row">
        <button class="gold" onclick="buildCurrentProperty()" ${enabled && canBuild ? "" : "disabled"}>${next}</button>
        <button class="danger" onclick="skipCurrentAction()" ${enabled ? "" : "disabled"}>Lewati</button>
      </div>
    `;
    return;
  }
}

function renderRouletteUI() {
  const roulette = roomState?.lastRoulette || { result: 0, rotation: 0, id: "" };
  const result = Number(roulette.result || 0);

  if (els.rouletteResult) els.rouletteResult.textContent = result || "-";
  if (els.rouletteCaption) els.rouletteCaption.textContent = result || "-";

  if (!els.rouletteWheel) return;

  if (roulette.id && roulette.id !== lastRouletteId) {
    lastRouletteId = roulette.id;
    els.rouletteWheel.style.transition = "transform 1.55s cubic-bezier(.12,.72,.14,1)";
    requestAnimationFrame(() => {
      els.rouletteWheel.style.transform = `rotate(${Number(roulette.rotation || 0)}deg)`;
    });
  } else {
    els.rouletteWheel.style.transition = "none";
    els.rouletteWheel.style.transform = `rotate(${Number(roulette.rotation || 0)}deg)`;
  }
}

function waitForMoneyAnimation(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetPlayerMoneyAnimations() {
  moneyAnimationGeneration += 1;

  playerMoneyAnimationStates.forEach(state => {
    if (state?.settleTimer) {
      clearTimeout(state.settleTimer);
    }
  });

  playerMoneyAnimationStates.clear();
}

function getMoneyAnimationElements(seat) {
  const row = els.playersList?.querySelector(`.player-row[data-seat="${Number(seat)}"]`);
  if (!row) return { row: null, money: null, change: null };

  return {
    row,
    money: row.querySelector('[data-role="money"]'),
    change: row.querySelector('[data-role="money-change"]')
  };
}

function setDisplayedPlayerMoney(seat, value, animate = false) {
  const { money } = getMoneyAnimationElements(seat);
  if (!money) return;

  money.textContent = formatMoney(value);

  if (animate) {
    money.classList.remove("money-value-pop");
    void money.offsetWidth;
    money.classList.add("money-value-pop");

    // Kelas dibersihkan setelah animasi agar render Firebase berikutnya
    // tidak menghidupkan kembali efek pop secara tidak sengaja.
    money.addEventListener("animationend", () => {
      money.classList.remove("money-value-pop");
    }, { once: true });
  }
}

function unlockMoneyAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!moneyAudioContext) {
      moneyAudioContext = new AudioContextClass();
    }

    if (moneyAudioContext.state === "suspended") {
      moneyAudioContext.resume().catch(() => {});
    }

    return moneyAudioContext;
  } catch (error) {
    return null;
  }
}

function playMoneyChangeSound(delta) {
  const audioContext = unlockMoneyAudio();
  if (!audioContext || audioContext.state !== "running") return;

  const isGain = Number(delta) > 0;
  const now = audioContext.currentTime;
  const masterGain = audioContext.createGain();

  // Satu transaksi menghasilkan satu bunyi. Dua oscillator ditumpuk pada
  // waktu yang sama untuk memberi karakter koin, bukan dimainkan berurutan.
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(isGain ? 0.065 : 0.05, now + 0.008);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + (isGain ? 0.24 : 0.28));
  masterGain.connect(audioContext.destination);

  const frequencies = isGain ? [1046.5, 2093] : [330, 220];

  frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();
    const stopAt = now + (isGain ? 0.18 : 0.22);

    oscillator.type = isGain ? (index === 0 ? "sine" : "triangle") : "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      isGain ? frequency * 1.02 : Math.max(90, frequency * 0.82),
      stopAt
    );

    noteGain.gain.setValueAtTime(index === 0 ? 0.65 : 0.32, now);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, stopAt);

    oscillator.connect(noteGain);
    noteGain.connect(masterGain);
    oscillator.start(now);
    oscillator.stop(stopAt + 0.02);
  });
}

function queuePlayerMoneyChange(seat, nextMoney) {
  const normalizedSeat = Number(seat);
  const normalizedMoney = Number(nextMoney || 0);
  let state = playerMoneyAnimationStates.get(normalizedSeat);

  if (!state) {
    state = {
      displayed: normalizedMoney,
      observed: normalizedMoney,
      queue: [],
      running: false,
      activeDelta: 0,
      settleTimer: null
    };
    playerMoneyAnimationStates.set(normalizedSeat, state);
    return state;
  }

  if (normalizedMoney !== state.observed) {
    state.queue.push({
      from: state.observed,
      to: normalizedMoney,
      delta: normalizedMoney - state.observed
    });
    state.observed = normalizedMoney;
    runPlayerMoneyAnimationQueue(normalizedSeat);
  }

  return state;
}

async function runPlayerMoneyAnimationQueue(seat) {
  const state = playerMoneyAnimationStates.get(Number(seat));
  if (!state || state.running) return;

  state.running = true;
  const generation = moneyAnimationGeneration;

  while (state.queue.length && generation === moneyAnimationGeneration) {
    const changeData = state.queue.shift();
    const delta = Number(changeData.delta || 0);

    if (!delta) {
      state.displayed = Number(changeData.to || 0);
      setDisplayedPlayerMoney(seat, state.displayed);
      continue;
    }

    state.displayed = Number(changeData.from || 0);
    state.activeDelta = delta;
    setDisplayedPlayerMoney(seat, state.displayed);

    const { change } = getMoneyAnimationElements(seat);
    if (change) {
      change.textContent = `${delta > 0 ? "+" : "-"}${formatMoney(Math.abs(delta))}`;
      change.classList.remove("money-change-gain", "money-change-loss", "money-change-play");
      change.classList.add(delta > 0 ? "money-change-gain" : "money-change-loss");
      void change.offsetWidth;
      change.classList.add("money-change-play");
    }

    playMoneyChangeSound(delta);

    // Indikator muncul, bertahan, lalu benar-benar menghilang.
    await waitForMoneyAnimation(1120);
    if (generation !== moneyAnimationGeneration) return;

    if (change) {
      change.classList.remove("money-change-play", "money-change-gain", "money-change-loss");
      change.textContent = "";
    }

    // Saldo baru baru ditampilkan setelah indikator selesai menghilang.
    state.displayed = Number(changeData.to || 0);
    state.activeDelta = 0;
    setDisplayedPlayerMoney(seat, state.displayed, true);
    await waitForMoneyAnimation(280);
  }

  state.running = false;
}

function createPlayerRow(seat) {
  const row = document.createElement("div");
  row.className = "player-row";
  row.dataset.seat = String(Number(seat));
  row.innerHTML = `
    <div class="player-dot" data-role="dot"></div>
    <div class="player-main">
      <div class="player-name" data-role="name"></div>
      <div class="player-sub" data-role="sub"></div>
    </div>
    <div class="money-wrap">
      <div class="money" data-role="money">$0</div>
      <div class="money-change" data-role="money-change" aria-live="polite"></div>
    </div>
    <div class="owned-tags" data-role="owned"></div>
  `;
  return row;
}

function shouldApplyTurnOrderLocally() {
  const resultId = roomState?.orderRoll?.resultId || "";
  if (roomState?.status === "playing" && resultId && resultId !== localDismissedOrderResultId) {
    return false;
  }
  return true;
}

function getVisiblePlayerSortKey(player) {
  const seat = Number(player.seat);
  if (isSpectator(player)) return 100 + seat;
  if (player?.bankrupt) return 50 + seat;

  if (["playing", "finished"].includes(roomState?.status) && shouldApplyTurnOrderLocally()) {
    const order = getTurnOrderFromState(roomState);
    const index = order.indexOf(seat);
    if (index !== -1) return index;
  }

  return seat;
}

function getPlayerDisplayNumber(player) {
  const seat = Number(player.seat);
  if (isSpectator(player)) return `S${Math.max(1, seat - MAX_GAME_PLAYERS + 1)}`;

  if (["playing", "finished"].includes(roomState?.status) && shouldApplyTurnOrderLocally()) {
    const index = getTurnOrderFromState(roomState).indexOf(seat);
    if (index !== -1) return String(index + 1);
  }

  return String(seat + 1);
}

function animatePlayerListReorder(previousRects) {
  requestAnimationFrame(() => {
    els.playersList.querySelectorAll(".player-row[data-seat]").forEach(row => {
      const oldRect = previousRects.get(row.dataset.seat);
      if (!oldRect) return;
      const newRect = row.getBoundingClientRect();
      const deltaY = oldRect.top - newRect.top;
      if (Math.abs(deltaY) < 1) return;

      row.style.transition = "none";
      row.style.transform = `translateY(${deltaY}px)`;
      row.style.zIndex = "3";
      requestAnimationFrame(() => {
        row.style.transition = "transform 620ms cubic-bezier(.2,.8,.2,1)";
        row.style.transform = "translateY(0)";
        row.addEventListener("transitionend", () => {
          row.style.transition = "";
          row.style.transform = "";
          row.style.zIndex = "";
        }, { once: true });
      });
    });
  });
}

function renderPlayersList(players) {
  const visiblePlayers = Object.values(players)
    .filter(player => player?.id || player.bankrupt || isPlayerConnectedInState(roomState, player))
    .sort((a, b) => getVisiblePlayerSortKey(a) - getVisiblePlayerSortKey(b));
  const visibleSeats = new Set(visiblePlayers.map(player => Number(player.seat)));
  const previousRects = new Map();
  els.playersList.querySelectorAll(".player-row[data-seat]").forEach(row => {
    previousRects.set(row.dataset.seat, row.getBoundingClientRect());
    if (!visibleSeats.has(Number(row.dataset.seat))) row.remove();
  });

  const orderSignature = visiblePlayers.map(player => Number(player.seat)).join("-");
  const shouldAnimateOrder = lastPlayerOrderSignature && lastPlayerOrderSignature !== orderSignature;

  visiblePlayers.forEach((player, playerIndex) => {
    const seat = Number(player.seat);
    let row = els.playersList.querySelector(`.player-row[data-seat="${seat}"]`);

    if (!row) {
      row = createPlayerRow(seat);
      els.playersList.appendChild(row);
    }

    const rowAtExpectedPosition = els.playersList.children[playerIndex];
    if (rowAtExpectedPosition !== row) {
      els.playersList.insertBefore(row, rowAtExpectedPosition || null);
    }

    const spectator = isSpectator(player);
    const ownedIds = spectator ? [] : getOwnedPropertyIds(player.seat);
    const ownedTags = spectator ? "" : ownedIds.slice(0, 6).map(id => {
      const property = PROPERTY_DATA[id];
      const ps = getPropertyState(id);
      const level = property.kind === "city" ? ` ${RENT_LABELS[Number(ps.level || 0)]}` : "";
      return `<span class="owned-tag">${escapeHTML(property.name)}${level}</span>`;
    }).join("");

    const playerConnected = isPlayerConnectedInState(roomState, player);
    row.classList.toggle("active", !spectator && seat === Number(roomState.currentSeat) && !player.bankrupt);
    row.classList.toggle("bankrupt", Boolean(player.bankrupt));
    row.classList.toggle("disconnected", !playerConnected && !player.bankrupt);
    row.classList.toggle("spectator", spectator);

    const dot = row.querySelector('[data-role="dot"]');
    const name = row.querySelector('[data-role="name"]');
    const sub = row.querySelector('[data-role="sub"]');
    const owned = row.querySelector('[data-role="owned"]');
    const money = row.querySelector('[data-role="money"]');
    const moneyChange = row.querySelector('[data-role="money-change"]');

    dot.style.background = player.color || (spectator ? "#607d8b" : PLAYER_COLORS[seat]);
    dot.textContent = getPlayerDisplayNumber(player);
    name.textContent = player.bankrupt
      ? `${player.name} • BANGKRUT`
      : spectator ? `${player.name} • PENONTON` : player.name;

    if (spectator) {
      sub.textContent = playerConnected ? "Online • Menyaksikan permainan" : "Offline • Penonton";
      owned.innerHTML = '<span class="owned-tag spectator-tag">Tidak masuk giliran</span>';
      playerMoneyAnimationStates.delete(seat);
      money.textContent = "MENONTON";
      moneyChange.textContent = "";
      money.classList.remove("money-value-pop");
    } else if (player.bankrupt) {
      sub.textContent = `Penonton • Tanah ${ownedIds.length}`;
      owned.innerHTML = `<span class="owned-tag bankrupt-tag">BANGKRUT — hanya menonton</span>`;
      const moneyState = queuePlayerMoneyChange(seat, player.money);
      setDisplayedPlayerMoney(seat, moneyState.displayed);
    } else {
      const activationText = isPlayerBoardActive(player)
        ? `Aktif • Putaran ${Number(player.lapsCompleted || 0)}`
        : "Belum aktif • Putaran 0/1";
      const connectionText = playerConnected ? "Online" : "Offline — menunggu kembali";
      const orderIndex = getTurnOrderFromState(roomState).indexOf(seat);
      const orderText = ["playing", "finished"].includes(roomState?.status) && shouldApplyTurnOrderLocally() && orderIndex !== -1
        ? ` • Urutan ${orderIndex + 1}` : "";
      sub.textContent = `Petak ${player.position || 0} • ${connectionText}${orderText} • ${activationText} • Tanah ${ownedIds.length}${player.inJail ? ` • Penjara ${Number(player.jailAttempts || 0)}/3` : ""}`;
      owned.innerHTML = ownedTags || `<span class="owned-tag">Belum punya tanah</span>`;
      const moneyState = queuePlayerMoneyChange(seat, player.money);
      setDisplayedPlayerMoney(seat, moneyState.displayed);
    }
  });

  if (shouldAnimateOrder) animatePlayerListReorder(previousRects);
  lastPlayerOrderSignature = orderSignature;
}

function renderLogs() {
  const logs = roomState?.logs || {};
  const latestImportantLogs = Object.entries(logs)
    .filter(([, text]) => isImportantGameLog(text))
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .slice(0, 22);

  const renderLogItems = (items) => items
    .map(([, text]) => `<div class="log-item">${escapeHTML(text)}</div>`)
    .join("");

  const emptyState = '<div class="history-empty">Belum ada riwayat penting permainan.</div>';

  if (els.logList) {
    els.logList.innerHTML = latestImportantLogs.length
      ? renderLogItems(latestImportantLogs)
      : emptyState;
  }

  if (els.historyModalList) {
    els.historyModalList.innerHTML = latestImportantLogs.length
      ? renderLogItems(latestImportantLogs)
      : emptyState;
  }
}

function openHistoryModal() {
  if (!els.historyOverlay) return;
  renderLogs();
  els.historyOverlay.classList.remove("hidden");
  els.historyOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("history-open");
  requestAnimationFrame(() => els.historyCloseTopBtn?.focus());
}

function closeHistoryModal() {
  if (!els.historyOverlay) return;
  els.historyOverlay.classList.add("hidden");
  els.historyOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("history-open");
  els.historyFab?.focus();
}

function renderCardPopup() {
  if (localPopupOpen) return;

  const popup = roomState?.cardPopup;

  if (!popup || popup.id === localHiddenCardId) {
    els.cardOverlay.classList.add("hidden");
    return;
  }

  els.cardOverlay.classList.remove("hidden");
  els.cardPopup.className = "card-popup";
  els.cardPopup.classList.toggle("community", popup.deckType === "community");
  els.cardPopup.classList.toggle("chance", popup.deckType === "chance");
  els.cardPopup.classList.toggle("tax", popup.deckType === "tax");
  els.cardPopup.classList.toggle("system", popup.deckType === "system");
  els.cardDeckLabel.textContent = popup.deck || "Info";
  els.cardPlayerName.textContent = popup.playerName ? `Untuk ${popup.playerName}` : "";
  els.cardTitle.textContent = popup.title || "Info";
  els.cardText.textContent = popup.text || "";

  const actionType = roomState.pendingAction?.type;
  const isBlockingPopup = ["card", "taxPopup", "cardFreeParking", "roulette12Bonus", "tripleTwelveJail"].includes(actionType);
  const isActor = canIAct();

  els.cardActions.innerHTML = "";
  els.cardActions.classList.add("hidden");
  els.cardContinueBtn.classList.remove("hidden");

  if (actionType === "roulette12Bonus") {
    const streak = Number(roomState.pendingAction?.streak || 1);
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = `
      <button class="primary" type="button" onclick="acceptRoulette12Bonus(event)" ${isActor ? "" : "disabled"}>
        Putar Lagi
      </button>
    `;
    els.cardContinueBtn.classList.add("hidden");
    return;
  }

  if (actionType === "freeParkingChoice") {
    const pool = Number(roomState.taxPool || 0);
    const totalChoices = normalizeTileIndices(roomState.pendingAction?.eligibleIndices).length;
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = `
      <button class="gold" type="button" onclick="collectFreeParkingTax(event)" ${isActor && pool > 0 ? "" : "disabled"}>
        Ambil Uang Pajak ${formatMoney(pool)}
      </button>
      <button class="primary" type="button" onclick="beginFreeMoveSelection(event)" ${isActor && totalChoices > 0 ? "" : "disabled"}>
        Pilih Petak Tujuan
      </button>
    `;
    els.cardContinueBtn.classList.add("hidden");
    return;
  }

  if (isBlockingPopup) {
    els.cardContinueBtn.textContent = isActor ? "Tutup & Lanjutkan" : "Menunggu Pemain Aktif";
    els.cardContinueBtn.disabled = !isActor;
  } else {
    els.cardContinueBtn.textContent = "Tutup";
    els.cardContinueBtn.disabled = false;
  }
}

function hideCardPopupLocal() {
  localPopupOpen = false;

  if (roomState?.cardPopup?.id) {
    localHiddenCardId = roomState.cardPopup.id;
  }

  els.cardOverlay.classList.add("hidden");
  els.cardText.textContent = "";
  els.cardActions.innerHTML = "";
  els.cardActions.classList.add("hidden");
  els.cardContinueBtn.classList.remove("hidden");
}

async function resolveFreeParkingCard() {
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "cardFreeParking") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  if (!latest || action?.type !== "cardFreeParking" || Number(action.seat) !== Number(mySeat)) return;

  const player = latest.players?.[mySeat];
  if (!player) return;

  const from = Number(player.position || 0);
  const target = 20;
  const pool = Number(latest.taxPool || 0);
  const eligibleIndices = getFreeMoveEligibleIndices(latest, mySeat);
  const moveId = `${Date.now()}_${mySeat}_card_free_parking_${Math.random().toString(16).slice(2)}`;
  const updates = {
    isRolling: true,
    cardPopup: makeFreeParkingPopup(player, pool),
    lastMove: {
      id: moveId,
      seat: mySeat,
      from,
      to: target,
      steps: 0,
      direct: true,
      duration: 720,
      createdAt: Date.now()
    },
    pendingAction: {
      type: "freeParkingChoice",
      seat: mySeat,
      eligibleIndices
    }
  };

  updates[`players/${mySeat}/position`] = target;

  await roomRef.update(updates);
  await addLogs([
    `${player.name} berpindah ke Parkir Bebas dari kartu Kesempatan.`,
    `${player.name} harus memilih hadiah Uang Pajak atau pindah ke petak yang menguntungkan.`
  ]);

  setTimeout(async () => {
    const current = (await roomRef.once("value")).val();
    if (!current?.lastMove || current.lastMove.id !== moveId) return;
    await roomRef.update({ isRolling: false });
  }, 780);
}

async function closeCardAndFinishTurn() {
  if (localPopupOpen) {
    hideCardPopupLocal();
    return;
  }

  const actionType = roomState?.pendingAction?.type;
  if (!actionType) {
    hideCardPopupLocal();
    return;
  }

  if (actionType === "freeMove" || actionType === "freeParkingChoice") {
    hideCardPopupLocal();
    return;
  }

  if (actionType === "roulette12Bonus") {
    await acceptRoulette12Bonus();
    return;
  }

  if (!canIAct()) {
    const blockingForMe = ["card", "taxPopup", "cardFreeParking", "roulette12Bonus", "tripleTwelveJail"].includes(actionType)
      && Number(roomState?.pendingAction?.seat) === Number(mySeat);

    if (!blockingForMe) {
      hideCardPopupLocal();
    }
    return;
  }

  if (actionType === "cardFreeParking") {
    await resolveFreeParkingCard();
    return;
  }

  if (!["card", "taxPopup", "tripleTwelveJail"].includes(actionType)) return;

  const actor = roomState.players[mySeat];

  await roomRef.update({
    pendingAction: null,
    cardPopup: null
  });

  await addRemoteLog(`${actor.name} menutup popup dan mengakhiri aksi.`);
  await finishTurn();
}

function showPropertyDetailPopup(propertyId) {
  const actionType = roomState?.pendingAction?.type;
  if (Date.now() < suppressBoardInputUntil
    || freeMoveSelectionStarting
    || actionType === "freeParkingChoice"
    || actionType === "freeMove"
    || actionType === "cardFreeParking") {
    return;
  }

  const property = PROPERTY_DATA[propertyId];
  if (!property) return;

  const ps = getPropertyState(propertyId);
  const owner = ps.owner !== null && ps.owner !== undefined ? roomState?.players?.[ps.owner] : null;
  const price = getPropertyPrice(property);
  const currentRent = owner ? calculateRent(propertyId, roomState?.lastDice?.[0] + roomState?.lastDice?.[1] || 7, roomState) : 0;

  localPopupOpen = true;
  els.cardActions.innerHTML = "";
  els.cardActions.classList.add("hidden");
  els.cardContinueBtn.classList.remove("hidden");
  els.cardOverlay.classList.remove("hidden");
  els.cardPopup.className = "card-popup property-detail";
  els.cardDeckLabel.textContent = "Detail Tanah";
  els.cardPlayerName.textContent = owner ? `Dimiliki ${owner.name}` : "Belum dimiliki";
  els.cardTitle.textContent = property.name;

  if (property.kind === "city") {
    const hasComplexBonus = Boolean(owner && hasFullGroup(ps.owner, property.group, roomState));
    const rentMultiplier = hasComplexBonus ? 2 : 1;
    els.cardText.innerHTML = `
      <div class="detail-card-meta">Harga tanah <strong>${formatMoney(price)}</strong> • Hipotik <strong>${formatMoney(property.mortgage)}</strong>${hasComplexBonus ? " • Kompleks lengkap: sewa ×2" : ""}</div>
      <table class="popup-rent-table">
        ${property.rents.map((rent, index) => `<tr><td>${RENT_LABELS[index]}</td><td>${formatMoney(rent * rentMultiplier)}</td></tr>`).join("")}
        <tr><td>Harga bangunan</td><td>${formatMoney(property.buildingCost)}</td></tr>
        <tr><td>Level saat ini</td><td>${RENT_LABELS[Number(ps.level || 0)]}</td></tr>
        <tr><td>Sewa saat ini</td><td>${owner ? formatMoney(currentRent) : "-"}</td></tr>
      </table>
    `;
  } else if (property.kind === "airport") {
    els.cardText.innerHTML = `
      <div class="detail-card-meta">Harga tanah <strong>${formatMoney(price)}</strong> • Hipotik <strong>${formatMoney(property.mortgage)}</strong></div>
      <table class="popup-rent-table">
        ${property.rentsByOwned.map((rent, index) => `<tr><td>${index + 1} Bandara</td><td>${formatMoney(rent)}</td></tr>`).join("")}
        <tr><td>Sewa saat ini</td><td>${owner ? formatMoney(currentRent) : "-"}</td></tr>
      </table>
    `;
  } else {
    els.cardText.innerHTML = `
      <div class="detail-card-meta">Harga tanah <strong>${formatMoney(price)}</strong> • Hipotik <strong>${formatMoney(property.mortgage)}</strong></div>
      <table class="popup-rent-table">
        <tr><td>1 perusahaan</td><td>${formatMoney(Number(property.mortgage || 0) * 2)}</td></tr>
        <tr><td>2 perusahaan</td><td>${formatMoney(Number(property.mortgage || 0) * 5)}</td></tr>
        <tr><td>Sewa saat ini</td><td>${owner ? formatMoney(currentRent) : "-"}</td></tr>
      </table>
    `;
  }

  els.cardContinueBtn.textContent = "Tutup";
  els.cardContinueBtn.disabled = false;
}

function getTileName(tile) {
  if (!tile) return "-";
  if (tile.type === "property") return PROPERTY_DATA[tile.propertyId].name;
  if (tile.type === "start") return "START";
  if (tile.type === "free") return "Parkir Bebas";
  if (tile.type === "jail") return "Penjara";
  if (tile.type === "go-jail") return "Masuk Penjara";
  if (tile.type === "tax") return `${tile.name} ${formatMoney(tile.amount)}`;
  return tile.name || "-";
}

function maybeAnimateLastMove() {
  if (!roomState?.lastMove || !gameScene) return;

  const move = roomState.lastMove;
  if (move.id === lastAnimatedMoveId) return;

  lastAnimatedMoveId = move.id;
  if (move.direct) {
    gameScene.animatePawnDirect(move.seat, move.from, move.to, Number(move.duration || 420));
    return;
  }
  gameScene.animatePawnMove(move.seat, move.from, move.steps);
}

function startPhaser() {
  const config = {
    type: Phaser.AUTO,
    parent: "gameCanvas",
    backgroundColor: "#d7f8dd",
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 720,
      height: 720
    },
    scene: [BoardScene]
  };

  new Phaser.Game(config);
}

class BoardScene extends Phaser.Scene {
  constructor() {
    super("BoardScene");
    this.tiles = [];
    this.pawns = {};
    this.animatingSeats = new Set();
    this.taxAmountText = null;
    this.tileSize = 56;
    this.tileShade = null;
    this.freeMoveCenterShade = null;
    this.freeMoveHint = null;
    this.propertyMarkerSignature = "";
  }

  create() {
    gameScene = this;
    this.drawBoard();

    if (roomState) {
      this.renderRoomState(roomState);
    }

    this.scale.on("resize", () => {
      this.drawBoard();
      if (roomState) this.renderRoomState(roomState);
    });

    this.installMobileBoardTapFallback();
  }

  installMobileBoardTapFallback() {
    const canvas = this.game?.canvas;
    if (!canvas || this.mobileTouchEndHandler) return;

    this.mobileTouchEndHandler = (event) => {
      if (roomState?.pendingAction?.type !== "freeMove") return;
      const touch = event.changedTouches?.[0];
      if (!touch) return;

      const tileIndex = this.getTileIndexFromClientPoint(touch.clientX, touch.clientY);
      if (tileIndex === null) return;

      event.preventDefault();
      event.stopPropagation();
      this.handleTileTap(tileIndex);
    };

    canvas.addEventListener("touchend", this.mobileTouchEndHandler, { passive: false });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      canvas.removeEventListener("touchend", this.mobileTouchEndHandler);
      this.mobileTouchEndHandler = null;
    });
  }

  getTileIndexFromClientPoint(clientX, clientY) {
    const canvas = this.game?.canvas;
    if (!canvas || !this.tiles?.length) return null;

    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return null;

    const sceneX = (clientX - bounds.left) * (this.scale.width / bounds.width);
    const sceneY = (clientY - bounds.top) * (this.scale.height / bounds.height);
    const half = this.tileSize * 0.53;

    const hit = this.tiles.find((tileObj) => (
      Math.abs(sceneX - tileObj.x) <= half
      && Math.abs(sceneY - tileObj.y) <= half
    ));

    return hit ? hit.index : null;
  }

  handleTileTap(tileIndex) {
    const now = Date.now();
    if (now < suppressBoardInputUntil || freeMoveSelectionStarting) return;
    if (lastBoardTapIndex === tileIndex && now - lastBoardTapAt < 450) return;

    lastBoardTapIndex = tileIndex;
    lastBoardTapAt = now;

    const boardTile = BOARD[tileIndex];
    const actionType = roomState?.pendingAction?.type;

    if (actionType === "freeParkingChoice" || actionType === "cardFreeParking") {
      return;
    }

    if (actionType === "freeMove") {
      const allowed = normalizeTileIndices(roomState.pendingAction?.eligibleIndices);
      if (allowed.includes(Number(tileIndex))
        && Number(roomState.pendingAction?.seat) === Number(mySeat)) {
        chooseFreeMoveTarget(Number(tileIndex));
      }
      return;
    }

    if (boardTile?.type === "property") {
      showPropertyDetailPopup(boardTile.propertyId);
    }
  }

  drawBoard() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.tweens.killAll();
    this.animatingSeats.clear();
    this.children.removeAll();
    this.tiles = [];
    this.pawns = {};
    this.propertyMarkerSignature = "";

    // Isi papan dibuat hampir menyentuh batas canvas. Inset kecil tetap
    // dipertahankan agar stroke terluar tidak terpotong pada layar retina.
    const canvasSide = Math.min(width, height);
    const boardInset = Math.max(2, Math.min(6, Math.floor(canvasSide * 0.006)));
    const size = Math.max(140, canvasSide - boardInset * 2);
    const startX = (width - size) / 2;
    const startY = (height - size) / 2;
    const cells = 11;
    const tile = size / cells;

    this.tileSize = tile;
    this.startX = startX;
    this.startY = startY;

    const bg = this.add.rectangle(width / 2, height / 2, size, size, 0x14213d);
    bg.setStrokeStyle(7, 0x14213d);

    const center = this.add.rectangle(
      startX + tile * 5.5,
      startY + tile * 5.5,
      tile * 9,
      tile * 9,
      0xd7f8dd
    );
    center.setStrokeStyle(2, 0x9abf9d);

    const title = this.add.text(startX + tile * 5.5, startY + tile * 5.4, "MONOPOLY", {
      fontFamily: "Arial",
      fontSize: `${Math.floor(tile * .42)}px`,
      fontStyle: "bold",
      color: "#ffffff",
      backgroundColor: "#e60012",
      padding: { x: 12, y: 7 }
    });
    title.setOrigin(.5);
    title.setAngle(0);


    const sub = this.add.text(startX + tile * 5.5, startY + tile * 6.1, "ONLINE MVP", {
      fontFamily: "Arial",
      fontSize: `${Math.floor(tile * .22)}px`,
      fontStyle: "bold",
      color: "#14213d"
    });
    sub.setOrigin(.5);

    const taxShadow = this.add.rectangle(startX + tile * 5.5, startY + tile * 7.55, tile * 2.55, tile * .86, 0x000000, 0.10);
    taxShadow.setStrokeStyle(0, 0x000000);
    const taxBox = this.add.rectangle(startX + tile * 5.5, startY + tile * 7.48, tile * 2.55, tile * .86, 0xf1d38c);
    taxBox.setStrokeStyle(3, 0x14213d);
    const taxInner = this.add.rectangle(startX + tile * 5.72, startY + tile * 7.48, tile * 1.6, tile * .44, 0x2d4038);
    taxInner.setStrokeStyle(2, 0x7fb98b);
    this.add.text(startX + tile * 5.5, startY + tile * 7.02, "UANG PAJAK", {
      fontFamily: "Arial",
      fontSize: `${Math.floor(tile * .15)}px`,
      fontStyle: "bold",
      color: "#14213d"
    }).setOrigin(.5);
    const coin1 = this.add.circle(startX + tile * 4.46, startY + tile * 7.48, tile * .18, 0xf2b84b);
    coin1.setStrokeStyle(2, 0x14213d);
    this.add.text(coin1.x, coin1.y, "$", {
      fontFamily: "Arial",
      fontSize: `${Math.floor(tile * .22)}px`,
      fontStyle: "bold",
      color: "#14213d"
    }).setOrigin(.5);
    const coin2 = this.add.circle(startX + tile * 4.63, startY + tile * 7.60, tile * .14, 0xffe7ac);
    coin2.setStrokeStyle(2, 0x14213d);
    this.taxAmountText = this.add.text(startX + tile * 5.72, startY + tile * 7.48, formatMoney(roomState?.taxPool || 0), {
      fontFamily: "Arial",
      fontSize: `${Math.floor(tile * .22)}px`,
      fontStyle: "bold",
      color: "#fffaf0"
    }).setOrigin(.5);

    this.tiles = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      const pos = this.getTileCell(i);
      const x = startX + pos.col * tile + tile / 2;
      const y = startY + pos.row * tile + tile / 2;
      const boardTile = BOARD[i];
      const property = boardTile.type === "property" ? PROPERTY_DATA[boardTile.propertyId] : null;

      const rect = this.add.rectangle(x, y, tile - 2, tile - 2, this.getTileColor(i));
      rect.setStrokeStyle(1.3, 0x14213d);
      rect.setInteractive({ useHandCursor: true });
      rect.on("pointerup", () => {
        this.handleTileTap(i);
      });

      let colorBand = null;
      if (property && property.kind === "city") {
        colorBand = this.add.rectangle(x, y - tile * .36, tile - 4, tile * .15, Phaser.Display.Color.HexStringToColor(property.color).color);
        colorBand.setStrokeStyle(.5, 0x14213d);
      }

      const labelText = this.getTileLabel(i);
      const label = this.add.text(x, y - tile * 0.005, labelText, {
        fontFamily: "Arial",
        fontSize: `${this.getTileLabelFontSize(i, tile, labelText)}px`,
        fontStyle: "bold",
        color: "#14213d",
        align: "center",
        lineSpacing: -1,
        wordWrap: { width: tile * .88, useAdvancedWrap: true }
      });
      label.setOrigin(.5);

      const highlight = this.add.rectangle(x, y, tile - 4, tile - 4, 0xffc928, 0);
      highlight.setStrokeStyle(Math.max(3, tile * .055), 0xffb300);
      highlight.setDepth(52);
      highlight.setVisible(false);

      const startBonusBadge = this.add.text(x, y - tile * .235, "+$200", {
        fontFamily: "Arial",
        fontSize: `${Math.max(7, Math.floor(tile * .13))}px`,
        fontStyle: "bold",
        color: "#ffffff",
        backgroundColor: "#0f6b4f",
        padding: {
          x: Math.max(2, Math.floor(tile * .05)),
          y: Math.max(1, Math.floor(tile * .025))
        }
      });
      startBonusBadge.setOrigin(.5);
      startBonusBadge.setDepth(54);
      startBonusBadge.setVisible(false);

      this.tiles[i] = {
        x,
        y,
        rect,
        label,
        colorBand,
        highlight,
        startBonusBadge,
        ownerMarker: null,
        boardTile,
        index: i,
        visualObjects: [rect, colorBand, label].filter(Boolean)
      };
    }

    this.freeMoveCenterShade = this.add.rectangle(
      startX + tile * 5.5,
      startY + tile * 5.5,
      tile * 9,
      tile * 9,
      0x0f172a,
      0.62
    );
    this.freeMoveCenterShade.setDepth(48);
    this.freeMoveCenterShade.setVisible(false);

    const hintBg = this.add.graphics();
    const hintWidth = tile * 5.5;
    const hintHeight = tile * 2.02;
    hintBg.fillStyle(0xffbd59, 1);
    hintBg.lineStyle(Math.max(4, tile * .09), 0x050505, 1);
    hintBg.fillRoundedRect(-hintWidth / 2, -hintHeight / 2, hintWidth, hintHeight, tile * .32);
    hintBg.strokeRoundedRect(-hintWidth / 2, -hintHeight / 2, hintWidth, hintHeight, tile * .32);

    const hintTitle = this.add.text(0, -tile * .18, "PARKIR BEBAS", {
      fontFamily: "Arial",
      fontSize: `${Math.max(16, Math.floor(tile * .38))}px`,
      fontStyle: "bold",
      color: "#050505",
      align: "center"
    }).setOrigin(.5);

    const hintText = this.add.text(0, tile * .34, "PILIH PETAK YANG DI-HIGHLIGHT KUNING\nLABEL +$200 = MELEWATI START", {
      fontFamily: "Arial",
      fontSize: `${Math.max(10, Math.floor(tile * .19))}px`,
      color: "#050505",
      align: "center",
      wordWrap: { width: hintWidth * .84 }
    }).setOrigin(.5);

    this.freeMoveHint = this.add.container(
      startX + tile * 5.5,
      startY + tile * 5.5,
      [hintBg, hintTitle, hintText]
    );
    this.freeMoveHint.setDepth(60);
    this.freeMoveHint.setVisible(false);

  }

  getTileCell(index) {
    if (index === 0) return { col: 10, row: 10 };
    if (index > 0 && index < 10) return { col: 10 - index, row: 10 };
    if (index === 10) return { col: 0, row: 10 };
    if (index > 10 && index < 20) return { col: 0, row: 20 - index };
    if (index === 20) return { col: 0, row: 0 };
    if (index > 20 && index < 30) return { col: index - 20, row: 0 };
    if (index === 30) return { col: 10, row: 0 };
    return { col: 10, row: index - 30 };
  }

  getTileColor(index) {
    const tile = BOARD[index];
    if (tile.type === "start") return 0xfff4d6;
    if (tile.type === "jail") return 0xf8e4af;
    if (tile.type === "free") return 0xd9f5e4;
    if (tile.type === "go-jail") return 0xffe1e1;
    if (tile.type === "community") return 0xcf8db8;
    if (tile.type === "chance") return 0xb8d9ab;
    if (tile.type === "tax") return 0xa80f0f;
    if (tile.type === "property") {
      const property = PROPERTY_DATA[tile.propertyId];
      if (property.kind === "airport") return 0xf1f1f1;
      if (property.kind === "utility") return 0xeaf1ff;
    }
    return 0xfffaf0;
  }

  getTileLabel(index) {
    const boardTile = BOARD[index];

    if (boardTile.type === "property") {
      const labels = {
        "kuala-lumpur": "KUALA\nLUMPUR",
        "changi-airport": "CHANGI\nAIRPORT",
        "perusahaan-air": "PERUSAHAAN\nAIR",
        "narita-airport": "NARITA\nAIRPORT",
        "new-delhi": "NEW\nDELHI",
        "john-f-kennedy-airport": "JFK\nAIRPORT",
        "perusahaan-listrik": "PERUSAHAAN\nLISTRIK",
        "mexico-city": "MEXICO\nCITY",
        "soekarno-hatta-airport": "SOEKARNO\nHATTA"
      };
      return labels[boardTile.propertyId] || PROPERTY_DATA[boardTile.propertyId].name.toUpperCase();
    }

    if (boardTile.type === "tax") return `PAJAK\n${formatMoney(boardTile.amount)}`;
    if (boardTile.type === "start") return "START";
    if (boardTile.type === "jail") return "PENJARA";
    if (boardTile.type === "free") return "PARKIR\nBEBAS";
    if (boardTile.type === "go-jail") return "MASUK\nPENJARA";
    return boardTile.name || `PETAK ${index}`;
  }

  getTileLabelFontSize(index, tileSize, labelText) {
    const compactLength = String(labelText || "").replace(/\n/g, "").length;
    const lineCount = String(labelText || "").split("\n").length;
    let ratio = 0.125;

    if (compactLength >= 13 || lineCount >= 2) ratio = 0.105;
    if (compactLength >= 18) ratio = 0.092;

    const boardTile = BOARD[index];
    if (["community", "chance", "tax"].includes(boardTile.type)) ratio = Math.min(ratio, 0.112);
    if (["start", "jail", "free", "go-jail"].includes(boardTile.type)) ratio = Math.min(ratio, 0.11);

    return Math.max(5, Math.min(10, Math.floor(tileSize * ratio)));
  }

  renderRoomState(state) {
    if (!this.tiles.length) return;

    if (this.taxAmountText) {
      this.taxAmountText.setText(formatMoney(state.taxPool || 0));
    }

    Object.entries(this.pawns).forEach(([seat, pawn]) => {
      const player = state.players?.[seat];
      const shouldShow = state.status === "lobby"
        ? Boolean(player && isMonopolyPlayer(player) && isPlayerConnectedInState(state, player) && !player.bankrupt)
        : Boolean(player && isPlayerGameParticipant(player, state) && !player.bankrupt);
      pawn.setVisible(shouldShow);
    });

    Object.values(state.players || {})
      .filter(player => state.status === "lobby"
        ? isMonopolyPlayer(player) && isPlayerConnectedInState(state, player) && !player.bankrupt
        : isPlayerGameParticipant(player, state) && !player.bankrupt)
      .forEach(player => {
        const seat = Number(player.seat);
        const position = Number(player.position || 0);
        this.ensurePawn(player);
        const pawnNumberText = this.pawns[seat]?.getAt?.(1);
        if (pawnNumberText?.setText) pawnNumberText.setText(getPlayerDisplayNumber(player));
        this.pawns[seat].setVisible(true);
        this.pawns[seat].setAlpha(isPlayerConnectedInState(state, player) ? 1 : 0.55);
        if (!this.animatingSeats.has(seat)) {
          this.setPawnPosition(seat, position, false);
        }
      });

    this.refreshPropertyMarkers(state);
    this.refreshTileHighlights(state);
  }

  ensurePawn(player) {
    const seat = Number(player.seat);
    if (this.pawns[seat]) return;

    const container = this.add.container(0, 0);
    const circle = this.add.circle(0, 0, Math.max(9, this.tileSize * .16), Phaser.Display.Color.HexStringToColor(player.color).color);
    circle.setStrokeStyle(2, 0xffffff);

    const pawnNumber = getPlayerDisplayNumber(player);
    const text = this.add.text(0, 0, pawnNumber, {
      fontFamily: "Arial",
      fontSize: `${Math.max(9, Math.floor(this.tileSize * .18))}px`,
      fontStyle: "bold",
      color: "#ffffff"
    });
    text.setOrigin(.5);

    container.add([circle, text]);
    container.setDepth(70);
    this.pawns[seat] = container;
  }

  setPawnPosition(seat, position, animate = false) {
    const pawn = this.pawns[seat];
    const tile = this.tiles[position];
    if (!pawn || !tile) return;

    const target = this.getPawnTarget(seat, position);

    if (animate) {
      this.tweens.add({
        targets: pawn,
        x: target.x,
        y: target.y,
        duration: 230,
        ease: "Sine.easeInOut"
      });
    } else {
      pawn.setPosition(target.x, target.y);
    }
  }


  animatePawnDirect(seat, from, to, duration = 420) {
    const pawn = this.pawns[seat];
    if (!pawn || !this.tiles.length) return;

    this.animatingSeats.add(Number(seat));
    this.tweens.killTweensOf(pawn);
    pawn.setScale(1);
    this.setPawnPosition(seat, from, false);

    const target = this.getPawnTarget(seat, to);
    this.tweens.add({
      targets: pawn,
      x: target.x,
      y: target.y,
      duration: Math.max(220, duration),
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.setPawnPosition(seat, to, false);
        this.animatingSeats.delete(Number(seat));
      }
    });

    this.tweens.add({
      targets: pawn,
      scaleX: 1.14,
      scaleY: 1.14,
      duration: Math.max(110, duration / 2),
      yoyo: true,
      ease: "Sine.easeOut"
    });
  }

  animatePawnMove(seat, from, steps) {
    const pawn = this.pawns[seat];
    if (!pawn || !this.tiles.length) return;

    this.animatingSeats.add(Number(seat));
    this.tweens.killTweensOf(pawn);
    pawn.setScale(1);

    let step = 0;
    this.setPawnPosition(seat, from, false);

    const moveOneStep = () => {
      if (step >= steps) {
        const finalPos = (from + steps) % BOARD_SIZE;
        this.setPawnPosition(seat, finalPos, false);
        pawn.setScale(1);
        this.animatingSeats.delete(Number(seat));
        return;
      }

      step += 1;
      const pos = (from + step) % BOARD_SIZE;
      const target = this.getPawnTarget(seat, pos);

      this.tweens.killTweensOf(pawn);
      this.tweens.add({
        targets: pawn,
        x: target.x,
        y: target.y,
        duration: 250,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.setPawnPosition(seat, pos, false);
          this.time.delayedCall(25, moveOneStep);
        }
      });

      this.tweens.add({
        targets: pawn,
        scaleX: 1.16,
        scaleY: 1.16,
        duration: 125,
        yoyo: true,
        ease: "Sine.easeOut"
      });
    };

    this.time.delayedCall(100, moveOneStep);
  }

  getPropertyMarkerSignature(state) {
    const propertyPart = Object.keys(PROPERTY_DATA)
      .map((propertyId) => {
        const ps = state?.propertyState?.[propertyId] || {};
        return `${propertyId}:${ps.owner ?? "-"}:${Number(ps.level || 0)}`;
      })
      .join("|");

    const playerColorPart = Object.values(state?.players || {})
      .map((player) => `${player.seat}:${player.color || ""}`)
      .sort()
      .join("|");

    return `${propertyPart}__${playerColorPart}`;
  }

  refreshPropertyMarkers(state) {
    const signature = this.getPropertyMarkerSignature(state);
    if (signature === this.propertyMarkerSignature) return;
    this.propertyMarkerSignature = signature;

    this.tiles.forEach((tileObj) => {
      if (tileObj?.ownerMarker) {
        tileObj.ownerMarker.destroy(true);
        tileObj.ownerMarker = null;
      }

      const boardTile = tileObj?.boardTile;
      if (!boardTile || boardTile.type !== "property") return;

      const propertyId = boardTile.propertyId;
      const property = PROPERTY_DATA[propertyId];
      const ps = state?.propertyState?.[propertyId] || { owner: null, level: 0 };
      if (ps.owner === null || ps.owner === undefined || ps.owner === "") return;

      const owner = state?.players?.[ps.owner];
      const ownerColor = Phaser.Display.Color.HexStringToColor(
        owner?.color || PLAYER_COLORS[Number(ps.owner)] || "#0f6b4f"
      ).color;

      tileObj.ownerMarker = this.createPropertyOwnerMarker(
        tileObj.index,
        property,
        Number(ps.level || 0),
        ownerColor
      );
    });
  }

  createPropertyOwnerMarker(tileIndex, property, level, ownerColor) {
    const marker = this.add.container(this.tiles[tileIndex].x, this.tiles[tileIndex].y);
    marker.setDepth(44);

    const tile = this.tileSize;
    const dotX = -tile * 0.32;
    const dotY = tile * 0.30;
    const dotRadius = Math.max(3.4, tile * 0.075);
    const houseSize = Math.max(3.8, tile * 0.082);
    const gap = Math.max(1.5, tile * 0.025);
    const step = houseSize + gap;

    const dotShadow = this.add.circle(
      dotX + Math.max(1, tile * 0.018),
      dotY + Math.max(1, tile * 0.018),
      dotRadius,
      0x000000,
      0.28
    );
    const ownerDot = this.add.circle(dotX, dotY, dotRadius, ownerColor);
    ownerDot.setStrokeStyle(Math.max(1.2, tile * 0.025), 0xffffff);
    marker.add([dotShadow, ownerDot]);

    if (property.kind !== "city" || level <= 0) {
      return marker;
    }

    const buildStart = dotRadius + tile * 0.085;

    if (level >= 5) {
      const hotelLong = Math.max(11, tile * 0.29);
      const hotelShort = Math.max(5, tile * 0.105);
      const hotelX = dotX + buildStart + hotelLong / 2;
      const hotelY = dotY;
      const hotelWidth = hotelLong;
      const hotelHeight = hotelShort;

      const hotelShadow = this.add.rectangle(
        hotelX + Math.max(1, tile * 0.015),
        hotelY + Math.max(1, tile * 0.015),
        hotelWidth,
        hotelHeight,
        0x000000,
        0.25
      );
      const hotel = this.add.rectangle(hotelX, hotelY, hotelWidth, hotelHeight, ownerColor);
      hotel.setStrokeStyle(Math.max(1, tile * 0.022), 0xffffff);
      marker.add([hotelShadow, hotel]);
      return marker;
    }

    const houseCount = Math.min(4, Math.max(0, level));
    for (let index = 0; index < houseCount; index++) {
      const houseX = dotX + buildStart + index * step;
      const houseY = dotY;
      const houseShadow = this.add.rectangle(
        houseX + Math.max(0.8, tile * 0.012),
        houseY + Math.max(0.8, tile * 0.012),
        houseSize,
        houseSize,
        0x000000,
        0.25
      );
      const house = this.add.rectangle(houseX, houseY, houseSize, houseSize, ownerColor);
      house.setStrokeStyle(Math.max(0.9, tile * 0.018), 0xffffff);
      marker.add([houseShadow, house]);
    }

    return marker;
  }

  getPropertyMarkerSide(index) {
    if (index > 0 && index < 10) return "bottom";
    if (index > 10 && index < 20) return "left";
    if (index > 20 && index < 30) return "top";
    if (index > 30 && index < 40) return "right";
    return "corner";
  }

  refreshTileHighlights(state) {
    const freeMove = state?.pendingAction?.type === "freeMove" ? state.pendingAction : null;
    const allowed = new Set(normalizeTileIndices(freeMove?.eligibleIndices));
    const actorPosition = freeMove
      ? Number(state?.players?.[freeMove.seat]?.position ?? 20)
      : 20;

    if (this.freeMoveCenterShade) {
      this.freeMoveCenterShade.setVisible(Boolean(freeMove));
    }
    if (this.freeMoveHint) {
      this.freeMoveHint.setVisible(Boolean(freeMove));
    }

    this.tiles.forEach((tileObj) => {
      if (!tileObj?.rect) return;
      const isAllowed = allowed.has(tileObj.index);
      const alpha = freeMove ? (isAllowed ? 1 : 0.20) : 1;

      (tileObj.visualObjects || [tileObj.rect, tileObj.label]).forEach((obj) => {
        if (obj) obj.setAlpha(alpha);
      });
      if (tileObj.ownerMarker) {
        tileObj.ownerMarker.setAlpha(alpha);
      }

      if (tileObj.highlight) {
        tileObj.highlight.setVisible(Boolean(freeMove && isAllowed));
      }

      if (tileObj.startBonusBadge) {
        const givesStartBonus = Boolean(
          freeMove
          && isAllowed
          && doesClockwiseMovePassStart(actorPosition, tileObj.index)
        );
        tileObj.startBonusBadge.setVisible(givesStartBonus);
      }

      tileObj.rect.setStrokeStyle(
        freeMove && isAllowed ? Math.max(3.5, this.tileSize * .06) : 1.3,
        freeMove && isAllowed ? 0xffb300 : 0x14213d
      );
    });
  }

  getPawnTarget(seat, position) {
    const tile = this.tiles[position];
    const offsets = [
      { x: -this.tileSize * .18, y: -this.tileSize * .18 },
      { x: this.tileSize * .18, y: -this.tileSize * .18 },
      { x: -this.tileSize * .18, y: this.tileSize * .18 },
      { x: this.tileSize * .18, y: this.tileSize * .18 }
    ];

    const offset = offsets[seat] || { x: 0, y: 0 };
    return {
      x: tile.x + offset.x,
      y: tile.y + offset.y
    };
  }
}

function formatMoney(value) {
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(value) || 0)}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyRoomCode() {
  if (!roomCode) return;
  await navigator.clipboard.writeText(roomCode);
  alert(`Kode room disalin: ${roomCode}`);
}

async function leaveRoom() {
  if (!roomRef || mySeat === null) return;

  const confirmed = confirm("Yakin ingin keluar dari game?");
  if (!confirmed) return;

  const latest = (await roomRef.once("value")).val();
  const leavingPlayer = latest?.players?.[mySeat];
  const updates = {};

  const participantSeats = getActiveSeatsFromState(latest);
  const remainingParticipants = participantSeats.filter(seat => seat !== Number(mySeat));

  updates[`players/${mySeat}/connected`] = false;
  updates[`players/${mySeat}/id`] = "";
  updates[`players/${mySeat}/inGame`] = false;
  updates[`players/${mySeat}/isHost`] = false;
  updates[`players/${mySeat}/disconnectedAt`] = firebase.database.ServerValue.TIMESTAMP;
  updates[`players/${mySeat}/roulette12Streak`] = 0;
  updates[`presence/${mySeat}`] = null;
  if (normalizeSeatArray(latest?.turnOrder).includes(Number(mySeat))) {
    updates.turnOrder = normalizeSeatArray(latest.turnOrder).filter(seat => seat !== Number(mySeat));
  }

  if (latest?.pendingExtraRoll && Number(latest.pendingExtraRoll.seat) === Number(mySeat)) {
    updates.pendingExtraRoll = null;
  }

  let newHostName = "";

  if (latest?.status === "lobby") {
    const remainingConnectedPlayers = Object.values(latest.players || {})
      .filter(player => Number(player.seat) !== Number(mySeat))
      .filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(latest, player))
      .sort((a, b) => Number(a.seat) - Number(b.seat));

    const newHostSeat = remainingConnectedPlayers.length
      ? Number(remainingConnectedPlayers[0].seat)
      : null;

    updates.hostSeat = newHostSeat;
    Object.values(latest.players || {}).forEach((player) => {
      updates[`players/${player.seat}/isHost`] = newHostSeat !== null
        && Number(player.seat) === newHostSeat;
    });

    if (newHostSeat !== null) {
      newHostName = latest.players?.[newHostSeat]?.name || `Pemain ${newHostSeat + 1}`;
    }
  } else if (latest?.status === "orderRoll" && isPlayerGameParticipant(leavingPlayer, latest)) {
    const remainingConnected = remainingParticipants.filter(seat => isPlayerConnectedInState(latest, latest.players?.[seat]));
    const existingHostSeat = Number(latest.hostSeat);
    const newHostSeat = remainingConnected.includes(existingHostSeat)
      ? existingHostSeat
      : (remainingConnected[0] ?? null);
    updates.hostSeat = newHostSeat;
    Object.values(latest.players || {}).forEach(player => {
      updates[`players/${player.seat}/isHost`] = newHostSeat !== null && Number(player.seat) === Number(newHostSeat);
    });
    updates.isRolling = false;
    updates.pendingAction = null;
    updates.pendingExtraRoll = null;

    if (remainingConnected.length < 2) {
      updates.status = "lobby";
      updates.orderRoll = null;
      updates.turnOrder = [];
      updates.currentSeat = remainingConnected[0] ?? 0;
      remainingConnected.forEach(seat => { updates[`players/${seat}/inGame`] = false; });
    } else {
      updates.status = "lobby";
      updates.orderRoll = null;
      updates.turnOrder = [];
      updates.currentSeat = remainingConnected[0];
      remainingConnected.forEach(seat => { updates[`players/${seat}/inGame`] = false; });
      updates.cardPopup = {
        id: `${Date.now()}_order_cancelled_leave`,
        deckType: "system",
        deck: "Penentuan Giliran",
        title: "Penentuan Giliran Dibatalkan",
        text: `${leavingPlayer?.name || "Seorang pemain"} keluar. Host dapat memulai kembali penentuan giliran.`,
        seat: remainingConnected[0],
        playerName: latest.players?.[remainingConnected[0]]?.name || "Host"
      };
    }
  } else if (latest?.status === "playing" && isPlayerGameParticipant(leavingPlayer, latest)) {
    if (remainingParticipants.length <= 1) {
      const winnerSeat = remainingParticipants[0] ?? null;
      const winnerName = winnerSeat !== null
        ? (latest.players?.[winnerSeat]?.name || "Pemain terakhir")
        : "Tidak ada pemenang";

      updates.status = "finished";
      updates.winnerSeat = winnerSeat;
      updates.isRolling = false;
      updates.pendingAction = null;
      updates.pendingExtraRoll = null;
      updates.debtState = null;
      updates.currentSeat = winnerSeat;
      updates.cardPopup = {
        id: `${Date.now()}_game_finished_leave`,
        deckType: "system",
        deck: "Game Selesai",
        title: winnerSeat !== null ? `${winnerName} Menang!` : "Game Selesai",
        text: `${leavingPlayer?.name || "Seorang pemain"} keluar dari permainan.`,
        seat: winnerSeat,
        playerName: winnerName
      };
    } else {
      if (Number(latest.currentSeat) === Number(mySeat)) {
        const originalOrder = getTurnOrderFromState(latest);
        const currentOrder = originalOrder.filter(seat => seat !== Number(mySeat));
        const leavingIndex = originalOrder.indexOf(Number(mySeat));
        const nextSeat = currentOrder.length
          ? currentOrder[((leavingIndex >= 0 ? leavingIndex : 0) % currentOrder.length)]
          : null;
        updates.currentSeat = nextSeat;
      }

      if (latest.pendingAction && Number(latest.pendingAction.seat) === Number(mySeat)) {
        updates.pendingAction = null;
        updates.isRolling = false;
      }

      if (latest.debtState && Number(latest.debtState.seat) === Number(mySeat)) {
        updates.debtState = null;
        updates.isRolling = false;
      }

      updates.cardPopup = {
        id: `${Date.now()}_player_left_${mySeat}`,
        deckType: "system",
        deck: "Info Game",
        title: `${leavingPlayer?.name || "Pemain"} Keluar`,
        text: `Permainan tetap berlanjut dengan ${remainingParticipants.length} pemain.`,
        seat: mySeat,
        playerName: leavingPlayer?.name || "Pemain"
      };
    }
  }

  await detachCurrentPresence({ cancelDisconnect: true });
  await roomRef.update(updates);

  const leaveLog = latest?.status === "lobby" && newHostName
    ? `${leavingPlayer?.name || "Pemain"} keluar dari room. ${newHostName} menjadi host baru.`
    : `${leavingPlayer?.name || "Pemain"} keluar dari game.`;
  await addRemoteLog(leaveLog);

  roomRef.off();
  roomRef = null;
  roomState = null;
  roomCode = "";
  mySeat = null;
  clearRoomSession();
  resetPlayerMoneyAnimations();
  renderDisconnectOverlay();

  els.setupPanel.classList.remove("hidden");
  els.gamePanel.classList.add("hidden");
  els.roomBadge.textContent = "Belum masuk room";
  els.copyRoomBtn.disabled = true;
  els.leaveBtn.disabled = true;
}

els.createRoomBtn.addEventListener("click", createRoom);
els.joinRoomBtn.addEventListener("click", joinRoom);
els.startBtn.addEventListener("click", startGame);
els.orderRollBtn?.addEventListener("click", handleOrderOverlayButton);
window.chooseFreeMoveTarget = chooseFreeMoveTarget;
window.acceptRoulette12Bonus = acceptRoulette12Bonus;
window.beginFreeMoveSelection = beginFreeMoveSelection;
window.collectFreeParkingTax = collectFreeParkingTax;
window.chooseSelectedFreeMoveTarget = chooseSelectedFreeMoveTarget;
window.sellSelectedPropertyForDebt = sellSelectedPropertyForDebt;
els.rollBtn.addEventListener("click", rollDice);
els.copyRoomBtn.addEventListener("click", copyRoomCode);
els.leaveBtn.addEventListener("click", leaveRoom);
els.historyFab?.addEventListener("click", openHistoryModal);
els.historyCloseBtn?.addEventListener("click", closeHistoryModal);
els.historyCloseTopBtn?.addEventListener("click", closeHistoryModal);
els.historyOverlay?.addEventListener("click", (event) => {
  if (event.target === els.historyOverlay) closeHistoryModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.historyOverlay && !els.historyOverlay.classList.contains("hidden")) {
    closeHistoryModal();
  }
});
els.cardCloseBtn.addEventListener("click", closeCardAndFinishTurn);
els.cardContinueBtn.addEventListener("click", closeCardAndFinishTurn);

// Browser HP mengizinkan audio setelah interaksi pengguna pertama.
document.addEventListener("pointerdown", unlockMoneyAudio, { passive: true });
document.addEventListener("keydown", unlockMoneyAudio);

initFirebase();
restoreRoomSession();
