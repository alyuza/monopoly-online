const PLAYER_COLORS = ["#e53935", "#1e88e5", "#43a047", "#8e24aa"];
const PLAYER_DEFAULTS = ["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4"];
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

function makeInitialPropertyState() {
  const data = {};
  Object.keys(PROPERTY_DATA).forEach((id) => {
    data[id] = { owner: null, level: 0 };
  });
  return data;
}

function createInitialRoom(hostName) {
  const players = {};
  for (let i = 0; i < 4; i++) {
    players[i] = {
      seat: i,
      id: i === 0 ? myPlayerId : "",
      name: i === 0 ? hostName : PLAYER_DEFAULTS[i],
      color: PLAYER_COLORS[i],
      money: START_MONEY,
      position: 0,
      inJail: false,
      jailAttempts: 0,
      connected: i === 0,
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

  for (let i = 0; i < 4; i++) {
    if (players[i]?.id === myPlayerId) {
      seat = i;
      break;
    }
  }

  if (seat === null) {
    for (let i = 0; i < 4; i++) {
      if (!players[i]?.connected && !players[i]?.id) {
        seat = i;
        break;
      }
    }
  }

  if (seat === null) {
    alert("Room sudah penuh.");
    return;
  }

  mySeat = seat;

  await roomRef.child(`players/${seat}`).update({
    id: myPlayerId,
    name: playerName,
    connected: true
  });

  await addRemoteLog(`${playerName} bergabung sebagai Pemain ${seat + 1}.`);

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
    if (!roomState) return;

    if (!roomState.propertyState) {
      roomRef.child("propertyState").set(makeInitialPropertyState());
      return;
    }

    renderUI();

    if (gameScene) {
      gameScene.renderRoomState(roomState);
    }

    maybeAnimateLastMove();
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
    "bergabung",
    "keluar dari game",
    "game dimulai",
    "game selesai",
    "menang"
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

function getActiveSeats() {
  if (!roomState?.players) return [];
  return Object.values(roomState.players)
    .filter(player => player.connected)
    .map(player => Number(player.seat))
    .sort((a, b) => a - b);
}

function getNextActiveSeat(currentSeat) {
  const seats = getActiveSeats();
  if (!seats.length) return 0;

  const currentIndex = seats.indexOf(Number(currentSeat));
  if (currentIndex === -1) return seats[0];

  return seats[(currentIndex + 1) % seats.length];
}

function canIStart() {
  return roomState?.players?.[mySeat]?.isHost && roomState.status === "lobby";
}

function canIRoll() {
  const player = roomState?.players?.[mySeat];

  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    !roomState.pendingAction &&
    !player?.inJail
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
    player?.inJail
  );
}

function canIAct() {
  return (
    roomState &&
    roomState.status === "playing" &&
    Number(roomState.currentSeat) === Number(mySeat) &&
    !roomState.isRolling &&
    roomState.pendingAction &&
    Number(roomState.pendingAction.seat) === Number(mySeat)
  );
}

async function startGame() {
  if (!canIStart()) return;

  const activeSeats = getActiveSeats();
  if (activeSeats.length < 2) {
    alert("Minimal 2 pemain aktif untuk mulai game.");
    return;
  }

  await roomRef.update({
    status: "playing",
    currentSeat: activeSeats[0],
    isRolling: false,
    pendingAction: null,
    winnerSeat: null
  });

  await addRemoteLog("Game dimulai.");
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

async function rollDice() {
  if (!canIRoll()) return;

  const player = roomState.players[mySeat];
  const result = Math.floor(Math.random() * 12) + 1;
  const total = result;
  const from = Number(player.position || 0);
  const to = (from + total) % BOARD_SIZE;
  const passedStart = from + total >= BOARD_SIZE;
  const moveId = `${Date.now()}_${mySeat}_${Math.random().toString(16).slice(2)}`;

  const prevRotation = Number(roomState.lastRoulette?.rotation || 0);
  const rotation = getRouletteFinalRotation(prevRotation, result);

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
    pendingAction: null
  };

  updates[`players/${mySeat}/position`] = to;
  updates[`players/${mySeat}/money`] = playerMoney;

  const logs = [];
  logs.push(`${player.name} memutar roulette dan mendapat ${result} langkah, bergerak dari petak ${from} ke petak ${to}.`);

  if (passedStart) {
    logs.push(`${player.name} melewati START dan menerima $200.`);
  }

  playerMoney = applyLandingEffect(to, mySeat, playerMoney, total, updates, logs);

  updates[`players/${mySeat}/money`] = playerMoney;

  await roomRef.update(updates);
  await addLogs(logs);

  const animationMs = Math.min(5200, total * 280 + 1700);

  setTimeout(async () => {
    const latest = (await roomRef.once("value")).val();
    if (!latest?.lastMove || latest.lastMove.id !== moveId) return;

    if (latest.pendingAction) {
      await roomRef.update({ isRolling: false });
      return;
    }

    const nextSeat = getNextActiveSeat(latest.currentSeat);
    await roomRef.update({
      isRolling: false,
      currentSeat: nextSeat
    });

    await addRemoteLog(`Giliran berpindah ke ${latest.players[nextSeat]?.name || `Pemain ${nextSeat + 1}`}.`);
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
    return playerMoney;
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

async function beginFreeMoveSelection() {
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "freeParkingChoice") return;

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
}

async function collectFreeParkingTax() {
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

  const targetTile = BOARD[normalizedIndex];
  const isBeneficialTarget = targetTile
    && (targetTile.type === "community"
      || targetTile.type === "chance"
      || targetTile.type === "property");
  if (!isBeneficialTarget) return;

  roomState = latest;
  const player = latest.players?.[mySeat];
  if (!player) return;

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

  await roomRef.update(updates);
  await addLogs(logs);

  setTimeout(async () => {
    const current = (await roomRef.once("value")).val();
    if (!current?.lastMove || current.lastMove.id !== moveId) return;

    await roomRef.update({ isRolling: false });

    const afterUnlock = (await roomRef.once("value")).val();
    if (!afterUnlock?.pendingAction) {
      await finishTurn();
    }
  }, 680);
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
    return playerMoney;
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
  return playerMoney;
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

    if (Number(ps.level || 0) === 0 && hasFullGroup(ps.owner, property.group, stateLike)) {
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

  return groupIds.every(id => Number(stateLike.propertyState?.[id]?.owner) === Number(ownerSeat));
}

function getOwnedPropertyIds(ownerSeat, stateLike = roomState) {
  return Object.keys(PROPERTY_DATA)
    .filter(id => Number(stateLike.propertyState?.[id]?.owner) === Number(ownerSeat));
}

async function payJailFine() {
  if (!canIUseJailAction()) return;

  const player = roomState.players[mySeat];
  const updates = {};
  updates[`players/${mySeat}/money`] = Number(player.money || 0) - 50;
  updates[`players/${mySeat}/inJail`] = false;
  updates[`players/${mySeat}/jailAttempts`] = 0;
  updates.taxPool = Number(roomState.taxPool || 0) + 50;

  await roomRef.update(updates);
  await addRemoteLog(`${player.name} membayar $50 dan bebas dari penjara. Pemain dapat langsung bermain pada giliran ini.`);
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

  const activeSeats = Object.values(latest.players || {})
    .filter(player => player.connected)
    .map(player => Number(player.seat))
    .sort((a, b) => a - b);

  if (activeSeats.length <= 1) {
    const winnerSeat = activeSeats[0] ?? latest.currentSeat;
    await roomRef.update({
      status: "finished",
      winnerSeat,
      isRolling: false,
      pendingAction: null,
      cardPopup: {
        id: `${Date.now()}_game_finished`,
        deckType: "system",
        deck: "Game Selesai",
        title: `${latest.players[winnerSeat]?.name || "Pemain terakhir"} Menang!`,
        text: "Semua pemain lain sudah keluar. Game dinyatakan selesai.",
        seat: winnerSeat,
        playerName: latest.players[winnerSeat]?.name || "Pemenang"
      }
    });
    await addRemoteLog(`Game selesai. ${latest.players[winnerSeat]?.name || "Pemain terakhir"} menang.`);
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
    cardPopup: null
  });

  await addRemoteLog(`Giliran berpindah ke ${latest.players[nextSeat]?.name || `Pemain ${nextSeat + 1}`}.`);
}

function renderUI() {
  const players = roomState.players || {};
  const current = players[roomState.currentSeat];

  els.turnName.textContent = current?.name || "-";
  renderRouletteUI();

  els.startBtn.disabled = !canIStart();
  els.rollBtn.disabled = !canIRoll();

  if (roomState.status === "finished") {
    const winner = players[roomState.winnerSeat];
    els.statusText.textContent = `Game selesai. Pemenang: ${winner?.name || "Pemain terakhir"}.`;
  } else if (roomState.status === "lobby") {
    els.statusText.textContent = canIStart()
      ? "Kamu host. Setelah minimal 2 pemain masuk, klik Mulai Game."
      : "Menunggu host memulai game.";
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
    } else {
      els.statusText.textContent = `Menunggu aksi dari ${actor?.name || "pemain aktif"}.`;
    }
  } else if (current?.inJail) {
    els.statusText.textContent = Number(roomState.currentSeat) === Number(mySeat)
      ? "Kamu sedang di penjara. Pilih bayar $50 atau coba dapatkan angka 12 dari roulette."
      : `${current?.name || "Pemain aktif"} sedang di penjara.`;
  } else if (canIRoll()) {
    els.statusText.textContent = "Sekarang giliranmu. Klik Putar Roulette.";
  } else {
    els.statusText.textContent = `Menunggu giliran ${current?.name || "pemain lain"}.`;
  }

  renderActionPanel();
  renderPlayersList(players);
  renderLogs();
  renderCardPopup();
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
    els.actionPanel.innerHTML = `
      <div class="action-title">Lobby</div>
      <div class="action-sub">Menunggu pemain masuk. Host dapat memulai game setelah minimal 2 pemain aktif.</div>
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
    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(currentTileName)}</div>
      <div class="action-sub">${myTurn ? "Tidak ada aksi khusus. Silakan putar roulette." : "Menunggu giliran pemain aktif."}</div>
    `;
    return;
  }

  const actor = roomState.players[action.seat];
  const enabled = canIAct();

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
        <button class="gold" onclick="collectFreeParkingTax()" ${enabled && pool > 0 ? "" : "disabled"}>Ambil Uang Pajak</button>
        <button class="primary" onclick="beginFreeMoveSelection()" ${enabled && totalChoices > 0 ? "" : "disabled"}>Pilih Petak Tujuan</button>
      </div>
    `;
    return;
  }

  if (action.type === "freeMove") {
    const totalChoices = normalizeTileIndices(action.eligibleIndices).length;
    els.actionPanel.innerHTML = `
      <div class="action-title">PILIH PETAK TUJUAN</div>
      <div class="action-sub">Klik salah satu petak yang di-highlight kuning. Petak tujuan yang rutenya melewati START memberi bonus $200. Petak lawan, pajak, penjara, Masuk Penjara, START, dan Parkir Bebas tidak dapat dipilih. Pilihan tersedia: ${totalChoices} petak.</div>
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

function renderPlayersList(players) {
  const visiblePlayers = Object.values(players)
    .filter(player => player.connected)
    .sort((a, b) => Number(a.seat) - Number(b.seat));
  const visibleSeats = new Set(visiblePlayers.map(player => Number(player.seat)));

  els.playersList.querySelectorAll(".player-row[data-seat]").forEach(row => {
    if (!visibleSeats.has(Number(row.dataset.seat))) {
      row.remove();
    }
  });

  visiblePlayers.forEach((player, playerIndex) => {
    const seat = Number(player.seat);
    let row = els.playersList.querySelector(`.player-row[data-seat="${seat}"]`);

    if (!row) {
      row = createPlayerRow(seat);
      els.playersList.appendChild(row);
    }

    // Jangan append ulang row pada setiap snapshot Firebase. Memindahkan node
    // yang sama dapat me-restart CSS animation dan membuat seluruh Data Pemain
    // tampak berkedip ketika pion sedang berjalan.
    const rowAtExpectedPosition = els.playersList.children[playerIndex];
    if (rowAtExpectedPosition !== row) {
      els.playersList.insertBefore(row, rowAtExpectedPosition || null);
    }

    const ownedIds = getOwnedPropertyIds(player.seat);
    const ownedTags = ownedIds.slice(0, 6).map(id => {
      const property = PROPERTY_DATA[id];
      const ps = getPropertyState(id);
      const level = property.kind === "city" ? ` ${RENT_LABELS[Number(ps.level || 0)]}` : "";
      return `<span class="owned-tag">${escapeHTML(property.name)}${level}</span>`;
    }).join("");

    row.classList.toggle("active", seat === Number(roomState.currentSeat));

    const dot = row.querySelector('[data-role="dot"]');
    const name = row.querySelector('[data-role="name"]');
    const sub = row.querySelector('[data-role="sub"]');
    const owned = row.querySelector('[data-role="owned"]');

    dot.style.background = player.color;
    dot.textContent = String(seat + 1);
    name.textContent = player.name;
    sub.textContent = `Petak ${player.position || 0} • ${player.connected ? "Online" : "Kosong"} • Tanah ${ownedIds.length}${player.inJail ? ` • Penjara ${Number(player.jailAttempts || 0)}/3` : ""}`;
    owned.innerHTML = ownedTags || `<span class="owned-tag">Belum punya tanah</span>`;

    const moneyState = queuePlayerMoneyChange(seat, player.money);
    setDisplayedPlayerMoney(seat, moneyState.displayed);
  });
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
  const isBlockingPopup = ["card", "taxPopup", "cardFreeParking"].includes(actionType);
  const isActor = canIAct();

  els.cardActions.innerHTML = "";
  els.cardActions.classList.add("hidden");
  els.cardContinueBtn.classList.remove("hidden");

  if (actionType === "freeParkingChoice") {
    const pool = Number(roomState.taxPool || 0);
    const totalChoices = normalizeTileIndices(roomState.pendingAction?.eligibleIndices).length;
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = `
      <button class="gold" type="button" onclick="collectFreeParkingTax()" ${isActor && pool > 0 ? "" : "disabled"}>
        Ambil Uang Pajak ${formatMoney(pool)}
      </button>
      <button class="primary" type="button" onclick="beginFreeMoveSelection()" ${isActor && totalChoices > 0 ? "" : "disabled"}>
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

  if (!canIAct()) {
    const blockingForMe = ["card", "taxPopup", "cardFreeParking"].includes(actionType)
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

  if (!["card", "taxPopup"].includes(actionType)) return;

  const actor = roomState.players[mySeat];

  await roomRef.update({
    pendingAction: null,
    cardPopup: null
  });

  await addRemoteLog(`${actor.name} menutup popup dan mengakhiri aksi.`);
  await finishTurn();
}

function showPropertyDetailPopup(propertyId) {
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
    els.cardText.innerHTML = `
      <div class="detail-card-meta">Harga tanah <strong>${formatMoney(price)}</strong> • Hipotik <strong>${formatMoney(property.mortgage)}</strong></div>
      <table class="popup-rent-table">
        ${property.rents.map((rent, index) => `<tr><td>${RENT_LABELS[index]}</td><td>${formatMoney(rent)}</td></tr>`).join("")}
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
      rect.on("pointerdown", () => {
        if (roomState?.pendingAction?.type === "freeMove") {
          const allowed = normalizeTileIndices(roomState.pendingAction.eligibleIndices);
          if (allowed.includes(i) && Number(roomState.pendingAction.seat) === Number(mySeat)) {
            chooseFreeMoveTarget(i);
            return;
          }
          return;
        }
        if (boardTile.type === "property") {
          showPropertyDetailPopup(boardTile.propertyId);
        }
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

      const startBonusBadge = this.add.text(x, y + tile * .30, "+$200", {
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
      if (!player?.connected) pawn.setVisible(false);
    });

    Object.values(state.players || {})
      .filter(player => player.connected)
      .forEach(player => {
        const seat = Number(player.seat);
        const position = Number(player.position || 0);
        this.ensurePawn(player);
        this.pawns[seat].setVisible(true);
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

    const text = this.add.text(0, 0, String(seat + 1), {
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
  const activeBefore = Object.values(latest?.players || {})
    .filter(player => player.connected)
    .map(player => Number(player.seat));
  const remaining = activeBefore.filter(seat => seat !== Number(mySeat));
  const updates = {};

  updates[`players/${mySeat}/connected`] = false;
  updates[`players/${mySeat}/id`] = "";

  if (latest?.status === "playing" && remaining.length === 1) {
    const winnerSeat = remaining[0];
    updates.status = "finished";
    updates.winnerSeat = winnerSeat;
    updates.isRolling = false;
    updates.pendingAction = null;
    updates.currentSeat = winnerSeat;
    updates.cardPopup = {
      id: `${Date.now()}_game_finished_leave`,
      deckType: "system",
      deck: "Game Selesai",
      title: `${latest.players[winnerSeat]?.name || "Pemain terakhir"} Menang!`,
      text: `${leavingPlayer?.name || "Seorang pemain"} keluar. Karena hanya tersisa satu pemain, game dinyatakan selesai.`,
      seat: winnerSeat,
      playerName: latest.players[winnerSeat]?.name || "Pemenang"
    };
  } else if (latest?.status === "playing" && remaining.length > 1) {
    if (Number(latest.currentSeat) === Number(mySeat)) {
      updates.currentSeat = remaining[0];
    }

    if (latest.pendingAction && Number(latest.pendingAction.seat) === Number(mySeat)) {
      updates.pendingAction = null;
      updates.isRolling = false;
    }

    updates.cardPopup = {
      id: `${Date.now()}_player_left_${mySeat}`,
      deckType: "system",
      deck: "Info Game",
      title: `${leavingPlayer?.name || "Pemain"} Keluar`,
      text: `Permainan tetap berlanjut dengan ${remaining.length} pemain aktif.`,
      seat: mySeat,
      playerName: leavingPlayer?.name || "Pemain"
    };
  }

  await roomRef.update(updates);
  await addRemoteLog(`${leavingPlayer?.name || "Pemain"} keluar dari game.`);

  roomRef.off();
  roomRef = null;
  roomState = null;
  roomCode = "";
  mySeat = null;
  resetPlayerMoneyAnimations();

  els.setupPanel.classList.remove("hidden");
  els.gamePanel.classList.add("hidden");
  els.roomBadge.textContent = "Belum masuk room";
  els.copyRoomBtn.disabled = true;
  els.leaveBtn.disabled = true;
}

els.createRoomBtn.addEventListener("click", createRoom);
els.joinRoomBtn.addEventListener("click", joinRoom);
els.startBtn.addEventListener("click", startGame);
window.chooseFreeMoveTarget = chooseFreeMoveTarget;
window.beginFreeMoveSelection = beginFreeMoveSelection;
window.collectFreeParkingTax = collectFreeParkingTax;
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

window.addEventListener("beforeunload", () => {
  if (roomRef && mySeat !== null) {
    roomRef.child(`players/${mySeat}/connected`).set(false);
  }
});

initFirebase();
