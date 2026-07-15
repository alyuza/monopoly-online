const PLAYER_COLORS = ["#e53935", "#1e88e5", "#43a047", "#8e24aa", "#607d8b", "#795548"];
const PLAYER_DEFAULTS = ["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4", "Penonton 1", "Penonton 2"];
const MAX_GAME_PLAYERS = 4;
const MAX_ROOM_MEMBERS = 6;
const BOARD_SIZE = 40;
const START_MONEY = 1500;
const PASS_START_BONUS = 200;
const RENT_LABELS = ["Tanah", "1R", "2R", "3R", "4R", "Hotel"];

// Timeline visual roulette. Nilai game tetap dihitung sekali seperti sebelumnya;
// konstanta ini hanya mengatur kapan hasil, pion, saldo, dan popup ditampilkan.
const ROULETTE_SPIN_MS = 2500;
const PAWN_START_AFTER_RESULT_MS = 1000;
const PAWN_STEP_MS = 260;
const PAWN_STEP_GAP_MS = 22;
const EFFECTS_AFTER_ARRIVAL_MS = 1000;
const DIRECT_PAWN_MOVE_MS = 760;
const DISCONNECT_GRACE_MS = 30000;
const PLAYER_PAYMENT_TOAST_MS = 5000;

// Timer AFK hanya menjadi lapisan otomatisasi di atas handler yang sudah ada.
// Tidak ada perhitungan roulette, kartu, properti, atau penjara yang diduplikasi.
const AFK_ACTION_TIMEOUTS_MS = Object.freeze({
  startingOrder: 25000,
  roll: 30000,
  jail: 20000,
  buy: 20000,
  build: 20000,
  freeParkingChoice: 20000,
  freeMove: 20000,
  roulette12Bonus: 12000,
  tripleTwelveJail: 10000,
  goJailPopup: 10000,
  taxExemptionChoice: 18000,
  cardMove: 12000,
  cardFreeParking: 12000,
  cardChoiceFineOrChance: 18000,
  cardChoiceMoveBack: 18000,
  cardChooseBuild: 18000,
  card: 12000,
  taxPopup: 10000,
  debt: 30000
});
const AFK_MANUAL_INTERACTION_GRACE_MS = 1500;
const AFK_RETRY_AFTER_INTERACTION_MS = 3000;

// Lobby dan directory room. Engine permainan tidak bergantung pada konstanta ini.
const PLAYER_PROFILE_KEY = "atho_player_profile_name";
const ROOM_DIRECTORY_HEARTBEAT_MS = 15000;
const FINISHED_ROOM_DELETE_DELAY_MS = 1800;
// Versi gratis: browser yang sedang membuka lobby membantu membersihkan room
// yang seluruh presence-nya kosong selama minimal 30 detik.
const EMPTY_ROOM_CLIENT_CLEANUP_GRACE_MS = 30000;
const EMPTY_ROOM_CLIENT_CLEANUP_RETRY_MS = 15000;
const ROOM_VISIBILITIES = new Set(["public", "private", "unlisted"]);

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
    { id: "community-01", deck: "Dana Umum", title: "Terima Bunga dari Bank", text: "Terima bunga dari bank sebesar $200.", effect: { type: "money", amount: 200 } },
    { id: "community-02", deck: "Dana Umum", title: "Terlibat Kasus Korupsi", text: "Anda terlibat kasus korupsi. Masuk penjara!", effect: { type: "jail" } },
    { id: "community-03", deck: "Dana Umum", title: "Terima Bunga", text: "Terima bunga sebesar $100.", effect: { type: "money", amount: 100 } },
    { id: "community-04", deck: "Dana Umum", title: "Dapat Komisi", text: "Dapat komisi sebesar $150.", effect: { type: "money", amount: 150 } },
    { id: "community-05", deck: "Dana Umum", title: "Bayar Biaya Dokter", text: "Bayar biaya dokter sebesar $50.", effect: { type: "payBank", amount: 50, reason: "biaya dokter" } },
    { id: "community-06", deck: "Dana Umum", title: "Hari Ulang Tahun", text: "Hari ulang tahun Anda. Terima $100 dari masing-masing pemain Monopoly yang masih aktif.", effect: { type: "birthday", amount: 100 } },
    { id: "community-07", deck: "Dana Umum", title: "Terima Sisa Uang Pajak Jalan", text: "Terima sisa uang pajak jalan sebesar $100.", effect: { type: "money", amount: 100 } },
    { id: "community-08", deck: "Dana Umum", title: "Bayar Premi Asuransi", text: "Bayar premi asuransi sebesar $50.", effect: { type: "payBank", amount: 50, reason: "premi asuransi" } },
    { id: "community-09", deck: "Dana Umum", title: "Dibebaskan dari Penjara", text: "Simpan kartu Bebas Penjara ini dan gunakan saat diperlukan.", effect: { type: "storeJailFree" } },
    { id: "community-10", deck: "Dana Umum", title: "Biaya Rumah Sakit", text: "Bayar biaya perawatan rumah sakit sebesar $100.", effect: { type: "payBank", amount: 100, reason: "biaya rumah sakit" } },
    { id: "community-11", deck: "Dana Umum", title: "Hadiah Kedua", text: "Anda mendapat hadiah kedua dalam model show sebesar $75.", effect: { type: "money", amount: 75 } },
    { id: "community-12", deck: "Dana Umum", title: "Terbang ke Bangkok", text: "Terbang ke Bangkok. Jika melewati START, terima $150.", effect: { type: "cardMove", tile: 3, passStartBonus: 150 } },
    { id: "community-13", deck: "Dana Umum", title: "Bayar Denda atau Ambil Kesempatan", text: "Bayar denda $10 atau ambil satu kartu Kesempatan.", effect: { type: "choiceFineOrChance", amount: 10 } },
    { id: "community-14", deck: "Dana Umum", title: "Terima Warisan", text: "Terima warisan sebesar $150.", effect: { type: "money", amount: 150 } },
    { id: "community-15", deck: "Dana Umum", title: "Maju Sampai START", text: "Maju sampai START dan terima $100.", effect: { type: "cardMove", tile: 0, alwaysMoney: 100, applyLanding: false } },
    { id: "community-16", deck: "Dana Umum", title: "Kesalahan Bank", text: "Karena kesalahan bank, Anda menerima $200.", effect: { type: "money", amount: 200 } },
    { id: "community-17", deck: "Dana Umum", title: "Hadiah Pajak Jalan", text: "Ambil seluruh Uang Pajak di tengah papan permainan.", effect: { type: "collectTaxPool" } },
    { id: "community-18", deck: "Dana Umum", title: "Menuju Parkir Bebas", text: "Pindah ke Parkir Bebas, lalu pilih hadiah Uang Pajak atau petak tujuan yang menguntungkan.", effect: { type: "moveToFreeParking" } },
    { id: "community-19", deck: "Dana Umum", title: "Bebas Pajak", text: "Simpan kartu Bebas Pajak ini. Gunakan untuk membebaskan satu kewajiban pajak petak.", effect: { type: "storeTaxExemption" } },
    { id: "community-20", deck: "Dana Umum", title: "Kesempatan Membangun Rumah", text: "Pilih satu kota milikmu untuk dibangun. Bayar sesuai harga bangunan kota tersebut.", effect: { type: "chooseBuild" } }
  ],
  chance: [
    { id: "chance-01", deck: "Kesempatan", title: "Menuju Perusahaan Air", text: "Menuju Perusahaan Air. Jika melewati START, terima $150.", effect: { type: "cardMove", tile: 12, passStartBonus: 150 } },
    { id: "chance-02", deck: "Kesempatan", title: "Terlibat Kasus Korupsi", text: "Anda terlibat kasus korupsi. Masuk penjara!", effect: { type: "jail" } },
    { id: "chance-03", deck: "Kesempatan", title: "Dibebaskan dari Penjara", text: "Simpan kartu Bebas Penjara ini dan gunakan saat diperlukan.", effect: { type: "storeJailFree" } },
    { id: "chance-04", deck: "Kesempatan", title: "Terbang ke Tokyo", text: "Terbang ke Tokyo. Jika melewati START, terima $150.", effect: { type: "cardMove", tile: 11, passStartBonus: 150 } },
    { id: "chance-05", deck: "Kesempatan", title: "Maju Sampai START", text: "Maju sampai START dan terima $100.", effect: { type: "cardMove", tile: 0, alwaysMoney: 100, applyLanding: false } },
    { id: "chance-06", deck: "Kesempatan", title: "Terbang ke Jakarta", text: "Terbang ke Jakarta dan terima uang dinas sebesar $50.", effect: { type: "cardMove", tile: 39, alwaysMoney: 50 } },
    { id: "chance-07", deck: "Kesempatan", title: "Terima Bunga dari Bank", text: "Terima bunga dari bank sebesar $50.", effect: { type: "money", amount: 50 } },
    { id: "chance-08", deck: "Kesempatan", title: "Bayar Asuransi", text: "Bayar asuransi sebesar $150.", effect: { type: "payBank", amount: 150, reason: "asuransi" } },
    { id: "chance-09", deck: "Kesempatan", title: "Pelanggaran Lalu Lintas", text: "Melanggar undang-undang lalu lintas. Bayar denda $75.", effect: { type: "payTax", amount: 75 } },
    { id: "chance-10", deck: "Kesempatan", title: "Terima Uang Sewa dari Bank", text: "Terima uang sewa dari bank sebesar $150.", effect: { type: "money", amount: 150 } },
    { id: "chance-11", deck: "Kesempatan", title: "Dana Pembetulan Jalan", text: "Bayar $40 untuk setiap rumah dan $100 untuk setiap hotel yang Anda miliki.", effect: { type: "roadRepair", houseAmount: 40, hotelAmount: 100 } },
    { id: "chance-12", deck: "Kesempatan", title: "Pilih Mundur", text: "Pilih mundur 2 petak atau 5 petak. Efek petak tujuan tetap berlaku.", effect: { type: "choiceMoveBack", choices: [2, 5] } },
    { id: "chance-13", deck: "Kesempatan", title: "Menuju Narita Airport", text: "Lanjutkan perjalanan ke Narita Airport. Jika melewati START, terima $200.", effect: { type: "cardMove", tile: 15, passStartBonus: 200 } },
    { id: "chance-14", deck: "Kesempatan", title: "Hadiah Teka-Teki Silang", text: "Anda mendapat hadiah teka-teki silang sebesar $100.", effect: { type: "money", amount: 100 } },
    { id: "chance-15", deck: "Kesempatan", title: "Mabuk di Tempat Umum", text: "Mabuk di tempat umum. Bayar denda $75.", effect: { type: "payTax", amount: 75 } },
    { id: "chance-16", deck: "Kesempatan", title: "Menuju Changi Airport", text: "Maju sampai Changi Airport. Jika melewati START, terima $200.", effect: { type: "cardMove", tile: 5, passStartBonus: 200 } },
    { id: "chance-17", deck: "Kesempatan", title: "Menuju Perusahaan Listrik", text: "Menuju Perusahaan Listrik. Jika melewati START, terima $150.", effect: { type: "cardMove", tile: 28, passStartBonus: 150 } },
    { id: "chance-18", deck: "Kesempatan", title: "Berlibur ke Paris", text: "Berlibur ke Paris. Jika melewati START, terima $150.", effect: { type: "cardMove", tile: 27, passStartBonus: 150 } },
    { id: "chance-19", deck: "Kesempatan", title: "Menuju Parkir Bebas", text: "Pindah ke Parkir Bebas, lalu pilih hadiah Uang Pajak atau petak tujuan yang menguntungkan.", effect: { type: "moveToFreeParking" } },
    { id: "chance-20", deck: "Kesempatan", title: "Hadiah Pajak Jalan", text: "Ambil seluruh Uang Pajak di tengah papan permainan.", effect: { type: "collectTaxPool" } }
  ]
};

function shuffleCardIds(ids) {
  const shuffled = [...ids];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function toFirebaseCardList(ids) {
  if (!ids.length) return null;
  return ids.reduce((result, id, index) => {
    result[index] = id;
    return result;
  }, {});
}

function normalizeCardIds(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => Number(a) - Number(b))
      .map(key => value[key])
      .filter(Boolean)
      .map(String);
  }
  return [];
}

function makeFreshDeckState(deckKey, cycle = 1) {
  const ids = shuffleCardIds(CARD_DECKS[deckKey].map(card => card.id));
  return {
    remainingIds: toFirebaseCardList(ids),
    remainingCount: ids.length,
    cycle: Number(cycle || 1)
  };
}

function makeInitialCardDeckState() {
  return {
    community: makeFreshDeckState("community", 1),
    chance: makeFreshDeckState("chance", 1)
  };
}

function getCardById(deckKey, cardId) {
  return CARD_DECKS[deckKey]?.find(card => card.id === cardId) || null;
}

function getDeckRemainingIds(stateLike, deckKey) {
  const deckState = stateLike?.cardDeckState?.[deckKey];
  const count = Number(deckState?.remainingCount);
  if (!deckState) return CARD_DECKS[deckKey].map(card => card.id);
  if (count === 0) return [];
  const ids = normalizeCardIds(deckState.remainingIds);
  return ids.length ? ids : CARD_DECKS[deckKey].map(card => card.id);
}

function getDeckRemainingCount(stateLike, deckKey) {
  const count = Number(stateLike?.cardDeckState?.[deckKey]?.remainingCount);
  return Number.isFinite(count) ? Math.max(0, count) : CARD_DECKS[deckKey].length;
}

function drawNextDeckCard(deckKey, updates) {
  const currentDeckState = roomState?.cardDeckState?.[deckKey];
  let remainingIds = getDeckRemainingIds(roomState, deckKey);
  let cycle = Number(currentDeckState?.cycle || 1);

  if (!remainingIds.length) {
    cycle += 1;
    remainingIds = shuffleCardIds(CARD_DECKS[deckKey].map(card => card.id));
  }

  const cardId = remainingIds.shift();
  const card = getCardById(deckKey, cardId) || CARD_DECKS[deckKey][0];
  updates[`cardDeckState/${deckKey}/remainingIds`] = toFirebaseCardList(remainingIds);
  updates[`cardDeckState/${deckKey}/remainingCount`] = remainingIds.length;
  updates[`cardDeckState/${deckKey}/cycle`] = cycle;
  updates[`cardDeckState/${deckKey}/lastDrawnId`] = card.id;
  return card;
}

function appendDeckResetUpdates(stateLike, updates) {
  ["community", "chance"].forEach(deckKey => {
    if (getDeckRemainingCount(stateLike, deckKey) !== 0) return;
    const cycle = Number(stateLike?.cardDeckState?.[deckKey]?.cycle || 1) + 1;
    const fresh = makeFreshDeckState(deckKey, cycle);
    updates[`cardDeckState/${deckKey}/remainingIds`] = fresh.remainingIds;
    updates[`cardDeckState/${deckKey}/remainingCount`] = fresh.remainingCount;
    updates[`cardDeckState/${deckKey}/cycle`] = fresh.cycle;
    updates[`cardDeckState/${deckKey}/lastDrawnId`] = null;
  });
}

let app = null;
let auth = null;
let db = null;
let currentAuthUid = "";
let firebaseReadyPromise = null;
let firebaseServerTimeOffsetMs = 0;
let firebaseServerTimeOffsetRef = null;
let firebaseServerTimeOffsetHandler = null;
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
let jailRouletteInProgress = false;
let jailRouletteResolutionTimer = null;
let jailRouletteResolutionRunning = false;
let scheduledJailRouletteId = "";
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
let rouletteRevealTimer = null;
let moveEffectsRevealTimer = null;
let activeMoveResolutionTimer = null;
let movePresentationUiMoveId = "";
let movePresentationUiTimers = [];
let disconnectExpiryTimer = null;
let disconnectCountdownTimer = null;
let disconnectCleanupInProgress = false;
let localNetworkTimeoutTimer = null;
let firebaseConnected = false;
let membershipResetInProgress = false;
let manualLeaveInProgress = false;
let normalRouletteInProgress = false;
let finishedRoomCleanupTimer = null;
let finishedRoomCleanupInProgress = false;
let finishedRoomCleanupCode = "";
let finishedRoomResultMessage = "";
let playerPaymentToastTimer = null;
let playerPaymentToastId = "";
let rouletteSoundTimers = [];
let rouletteSoundId = "";
let afkActionTimeout = null;
let afkCountdownInterval = null;
let afkActionSignature = "";
let afkActionDeadlineAt = 0;
let afkActionDescriptor = null;
let afkAutoActionInProgress = false;
let lastLocalGameInteractionAt = 0;

// State lokal lobby. Dipisahkan dari roomState agar tidak mengubah engine permainan.
let savedPlayerName = "";
let roomDirectoryRef = null;
let roomDirectoryHandler = null;
let latestRoomDirectory = {};
let roomDirectorySyncTimer = null;
let lastRoomDirectorySignature = "";
let lastRoomDirectorySyncAt = 0;
let pendingJoinContext = null;
let lobbyActionInProgress = false;
let roomEmptySinceRef = null;
let roomCleanupCandidateRef = null;
let activeRoomCleanupCandidateHandler = null;
let roomCleanupCandidatesRef = null;
let roomCleanupCandidatesHandler = null;
let latestRoomCleanupCandidates = {};
const roomCleanupCandidateTimers = new Map();
const roomCleanupAttemptsInProgress = new Set();

// Voice chat WebRTC: Firebase hanya dipakai sebagai signaling.
const VOICE_SIGNAL_MAX_AGE_MS = 60_000;
const DEFAULT_VOICE_ICE_SERVERS = [
  { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }
];
let voiceNetworkStarted = false;
let voiceSignalInboxRef = null;
let voiceSignalHandler = null;
let voiceSignalStartedAt = 0;
let localVoiceStream = null;
let localVoiceMicEnabled = false;
let voiceInteractionUnlocked = false;
let voiceToggleInProgress = false;
let voiceConnectivityCheckTimer = null;
const voicePeers = new Map();
const voiceSpeakerMuted = new Map();

const ROOM_SESSION_KEY = "atho_room_session";

// Animasi saldo pemain disimpan secara lokal agar update Firebase tidak
// langsung mengganti angka sebelum indikator pemasukan/pengeluaran selesai.
const playerMoneyAnimationStates = new Map();
let moneyAnimationGeneration = 0;
let moneyAudioContext = null;

const els = {
  appRoot: document.getElementById("appRoot"),
  setupPanel: document.getElementById("setupPanel"),
  gamePanel: document.getElementById("gamePanel"),
  playerNameInput: document.getElementById("playerNameInput"),
  profileSetupView: document.getElementById("profileSetupView"),
  lobbyHomeView: document.getElementById("lobbyHomeView"),
  lobbyPlayerName: document.getElementById("lobbyPlayerName"),
  confirmProfileBtn: document.getElementById("confirmProfileBtn"),
  editProfileBtn: document.getElementById("editProfileBtn"),
  editProfileOverlay: document.getElementById("editProfileOverlay"),
  editPlayerNameInput: document.getElementById("editPlayerNameInput"),
  saveProfileBtn: document.getElementById("saveProfileBtn"),
  closeEditProfileBtn: document.getElementById("closeEditProfileBtn"),
  roomList: document.getElementById("roomList"),
  roomListStatus: document.getElementById("roomListStatus"),
  refreshRoomListBtn: document.getElementById("refreshRoomListBtn"),
  openCreateRoomBtn: document.getElementById("openCreateRoomBtn"),
  createRoomOverlay: document.getElementById("createRoomOverlay"),
  closeCreateRoomBtn: document.getElementById("closeCreateRoomBtn"),
  roomNameInput: document.getElementById("roomNameInput"),
  createRoomPasswordField: document.getElementById("createRoomPasswordField"),
  createRoomPasswordInput: document.getElementById("createRoomPasswordInput"),
  createPasswordLabel: document.getElementById("createPasswordLabel"),
  createPasswordHint: document.getElementById("createPasswordHint"),
  openJoinCodeBtn: document.getElementById("openJoinCodeBtn"),
  joinCodeOverlay: document.getElementById("joinCodeOverlay"),
  closeJoinCodeBtn: document.getElementById("closeJoinCodeBtn"),
  roomCodeInput: document.getElementById("roomCodeInput"),
  roomPasswordOverlay: document.getElementById("roomPasswordOverlay"),
  roomPasswordTitle: document.getElementById("roomPasswordTitle"),
  roomPasswordDescription: document.getElementById("roomPasswordDescription"),
  roomPasswordInput: document.getElementById("roomPasswordInput"),
  roomPasswordError: document.getElementById("roomPasswordError"),
  confirmRoomPasswordBtn: document.getElementById("confirmRoomPasswordBtn"),
  closeRoomPasswordBtn: document.getElementById("closeRoomPasswordBtn"),
  createRoomBtn: document.getElementById("createRoomBtn"),
  joinRoomBtn: document.getElementById("joinRoomBtn"),
  copyRoomBtn: document.getElementById("copyRoomBtn"),
  leaveBtn: document.getElementById("leaveBtn"),
  roomBadge: document.getElementById("roomBadge"),
  rollBtn: document.getElementById("rollBtn"),
  startBtn: document.getElementById("startBtn"),
  turnName: document.getElementById("turnName"),
  turnTimer: document.getElementById("turnTimer"),
  turnTimerLabel: document.getElementById("turnTimerLabel"),
  turnTimerValue: document.getElementById("turnTimerValue"),
  orderAfkTimer: document.getElementById("orderAfkTimer"),
  orderAfkTimerValue: document.getElementById("orderAfkTimerValue"),
  cardAfkTimer: document.getElementById("cardAfkTimer"),
  cardAfkTimerValue: document.getElementById("cardAfkTimerValue"),
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
  disconnectCountdown: document.getElementById("disconnectCountdown"),
  disconnectLeaveBtn: document.getElementById("disconnectLeaveBtn"),
  playerPaymentToast: document.getElementById("playerPaymentToast"),
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

async function initFirebase() {
  const config = window.FIREBASE_CONFIG;

  if (!config || String(config.apiKey || "").includes("PASTE")) {
    alert("Firebase config belum diisi. Buka file firebase-config.js lalu isi konfigurasi Firebase kamu.");
    throw new Error("Firebase config is missing.");
  }

  app = firebase.apps?.length ? firebase.app() : firebase.initializeApp(config);

  const appCheckSiteKey = String(window.FIREBASE_APP_CHECK_SITE_KEY || "").trim();
  if (appCheckSiteKey && !appCheckSiteKey.includes("PASTE") && firebase.appCheck) {
    firebase.appCheck().activate(appCheckSiteKey, true);
  }

  auth = firebase.auth();
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  let user = auth.currentUser;
  if (!user) {
    const credential = await auth.signInAnonymously();
    user = credential.user;
  }

  if (!user?.uid) {
    throw new Error("Firebase Anonymous Authentication gagal membuat identitas pengguna.");
  }

  currentAuthUid = user.uid;
  db = firebase.database();

  // Gunakan waktu server Firebase untuk signaling WebRTC. Sebelumnya pesan
  // offer/answer dapat dianggap kedaluwarsa jika jam dua perangkat berbeda.
  firebaseServerTimeOffsetRef = db.ref(".info/serverTimeOffset");
  firebaseServerTimeOffsetHandler = snapshot => {
    const offset = Number(snapshot.val() || 0);
    firebaseServerTimeOffsetMs = Number.isFinite(offset) ? offset : 0;
  };
  try {
    const initialOffset = await firebaseServerTimeOffsetRef.once("value");
    firebaseServerTimeOffsetHandler(initialOffset);
  } catch (error) {
    console.warn("Offset waktu server Firebase tidak dapat dibaca.", error);
  }
  firebaseServerTimeOffsetRef.on("value", firebaseServerTimeOffsetHandler);
}

function getFirebaseServerNow() {
  return Date.now() + Number(firebaseServerTimeOffsetMs || 0);
}

function randomRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 8; i++) {
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
    authUid: currentAuthUid,
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


function cleanRoomName(value) {
  const roomName = String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s+/g, " ");
  return roomName.slice(0, 30);
}

function normalizeRoomCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function normalizeVisibility(value) {
  const visibility = String(value || "public").toLowerCase();
  return ROOM_VISIBILITIES.has(visibility) ? visibility : "public";
}

function readSavedPlayerName() {
  return cleanName(localStorage.getItem(PLAYER_PROFILE_KEY) || "");
}

function persistPlayerName(value) {
  const playerName = cleanName(value).slice(0, 18);
  localStorage.setItem(PLAYER_PROFILE_KEY, playerName);
  savedPlayerName = playerName;
  if (els.lobbyPlayerName) els.lobbyPlayerName.textContent = playerName;
  if (els.playerNameInput) els.playerNameInput.value = playerName;
  if (els.editPlayerNameInput) els.editPlayerNameInput.value = playerName;
  return playerName;
}

function getActiveProfileName() {
  if (!savedPlayerName) savedPlayerName = readSavedPlayerName();
  return cleanName(savedPlayerName || "Pemain").slice(0, 18);
}

function setOverlayVisible(element, visible) {
  if (!element) return;
  element.classList.toggle("hidden", !visible);
  element.setAttribute("aria-hidden", visible ? "false" : "true");
}

function closeAllLobbyModals() {
  setOverlayVisible(els.editProfileOverlay, false);
  setOverlayVisible(els.createRoomOverlay, false);
  setOverlayVisible(els.joinCodeOverlay, false);
  setOverlayVisible(els.roomPasswordOverlay, false);
  pendingJoinContext = null;
  if (els.roomPasswordError) {
    els.roomPasswordError.textContent = "";
    els.roomPasswordError.classList.add("hidden");
  }
}

function showProfileSetup() {
  stopRoomDirectorySubscription();
  stopRoomCleanupCandidateSubscription();
  closeAllLobbyModals();
  els.profileSetupView?.classList.remove("hidden");
  els.lobbyHomeView?.classList.add("hidden");
  requestAnimationFrame(() => els.playerNameInput?.focus());
}

function showLobbyHome() {
  const profileName = getActiveProfileName();
  if (!profileName || profileName === "Pemain" && !localStorage.getItem(PLAYER_PROFILE_KEY)) {
    showProfileSetup();
    return;
  }

  closeAllLobbyModals();
  els.profileSetupView?.classList.add("hidden");
  els.lobbyHomeView?.classList.remove("hidden");
  if (els.lobbyPlayerName) els.lobbyPlayerName.textContent = profileName;
  startRoomDirectorySubscription();
  startRoomCleanupCandidateSubscription();
}

function initializeLobbyFlow() {
  const stored = String(localStorage.getItem(PLAYER_PROFILE_KEY) || "").trim();
  if (stored) {
    persistPlayerName(stored);
    showLobbyHome();
  } else {
    savedPlayerName = "";
    if (els.playerNameInput) els.playerNameInput.value = "";
    showProfileSetup();
  }
}

function confirmPlayerProfile() {
  const raw = String(els.playerNameInput?.value || "").trim();
  if (!raw) {
    alert("Masukkan nama pemain terlebih dahulu.");
    els.playerNameInput?.focus();
    return;
  }
  persistPlayerName(raw);
  showLobbyHome();
}

function openEditProfile() {
  if (els.editPlayerNameInput) els.editPlayerNameInput.value = getActiveProfileName();
  setOverlayVisible(els.editProfileOverlay, true);
  requestAnimationFrame(() => {
    els.editPlayerNameInput?.focus();
    els.editPlayerNameInput?.select();
  });
}

function saveEditedProfile() {
  const raw = String(els.editPlayerNameInput?.value || "").trim();
  if (!raw) {
    alert("Nama pemain tidak boleh kosong.");
    return;
  }
  persistPlayerName(raw);
  setOverlayVisible(els.editProfileOverlay, false);
}

function getSelectedRoomVisibility() {
  const checked = document.querySelector('input[name="roomVisibility"]:checked');
  return normalizeVisibility(checked?.value || "public");
}

function updateCreateRoomPasswordField() {
  const visibility = getSelectedRoomVisibility();
  const requiresField = visibility !== "public";
  els.createRoomPasswordField?.classList.toggle("hidden", !requiresField);
  if (els.createPasswordLabel) {
    els.createPasswordLabel.textContent = visibility === "private"
      ? "Password Room"
      : "Password Room (Opsional)";
  }
  if (els.createPasswordHint) {
    els.createPasswordHint.textContent = visibility === "private"
      ? "Password wajib dan minimal 6 karakter untuk room Private."
      : "Kosongkan jika room Unlisted tidak memerlukan password.";
  }
  if (!requiresField && els.createRoomPasswordInput) {
    els.createRoomPasswordInput.value = "";
  }
}

function openCreateRoomModal() {
  if (els.roomNameInput) els.roomNameInput.value = `${getActiveProfileName()}'s Room`.slice(0, 30);
  const publicOption = document.querySelector('input[name="roomVisibility"][value="public"]');
  if (publicOption) publicOption.checked = true;
  if (els.createRoomPasswordInput) els.createRoomPasswordInput.value = "";
  updateCreateRoomPasswordField();
  setOverlayVisible(els.createRoomOverlay, true);
  requestAnimationFrame(() => {
    els.roomNameInput?.focus();
    els.roomNameInput?.select();
  });
}

function openJoinCodeModal() {
  if (els.roomCodeInput) els.roomCodeInput.value = "";
  setOverlayVisible(els.joinCodeOverlay, true);
  requestAnimationFrame(() => els.roomCodeInput?.focus());
}

function roomStatusLabel(status, isFull = false) {
  if (isFull) return "Room Penuh";
  const labels = {
    lobby: "Menunggu Pemain",
    orderRoll: "Menentukan Urutan",
    playing: "Sedang Bermain",
    finished: "Permainan Selesai"
  };
  return labels[status] || "Status Tidak Diketahui";
}

function normalizeDirectoryEntry(code, value) {
  const entry = value && typeof value === "object" ? value : {};
  const visibility = normalizeVisibility(entry.visibility);
  return {
    roomCode: normalizeRoomCode(entry.roomCode || code),
    roomName: cleanRoomName(entry.roomName || `Room ${code}`),
    visibility,
    requiresPassword: entry.requiresPassword === true,
    status: String(entry.status || "lobby"),
    playerCount: Math.max(0, Math.min(MAX_GAME_PLAYERS, Number(entry.playerCount || 0))),
    spectatorCount: Math.max(0, Math.min(MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS, Number(entry.spectatorCount || 0))),
    maxPlayers: MAX_GAME_PLAYERS,
    maxSpectators: MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS,
    createdAt: Number(entry.createdAt || 0),
    lastActivityAt: Number(entry.lastActivityAt || entry.createdAt || 0),
    emptySince: Number(entry.emptySince || 0) || null
  };
}

function sortRoomDirectoryEntries(entries) {
  return [...entries].sort((a, b) => {
    if (b.playerCount !== a.playerCount) return b.playerCount - a.playerCount;
    const aLobby = a.status === "lobby" ? 1 : 0;
    const bLobby = b.status === "lobby" ? 1 : 0;
    if (bLobby !== aLobby) return bLobby - aLobby;
    if (b.spectatorCount !== a.spectatorCount) return b.spectatorCount - a.spectatorCount;
    return b.lastActivityAt - a.lastActivityAt;
  });
}

function renderRoomDirectory() {
  if (!els.roomList || !els.roomListStatus) return;
  const entries = sortRoomDirectoryEntries(
    Object.entries(latestRoomDirectory || {})
      .map(([code, value]) => normalizeDirectoryEntry(code, value))
      .filter(entry => entry.visibility === "public" || entry.visibility === "private")
      .filter(entry => entry.status !== "finished")
  );

  els.roomListStatus.textContent = entries.length
    ? `${entries.length} room aktif ditemukan.`
    : "Belum ada room yang dapat ditampilkan.";

  if (!entries.length) {
    els.roomList.innerHTML = `
      <div class="room-empty-state">
        <div><strong>Belum ada room aktif</strong>Buat room baru atau masuk menggunakan kode.</div>
      </div>`;
    return;
  }

  els.roomList.innerHTML = entries.map(entry => {
    const gameStarted = entry.status !== "lobby";
    const roomIsFull = gameStarted
      ? entry.spectatorCount >= entry.maxSpectators
      : entry.playerCount >= entry.maxPlayers && entry.spectatorCount >= entry.maxSpectators;
    const playerSeatAvailable = entry.status === "lobby" && entry.playerCount < entry.maxPlayers;
    const buttonLabel = roomIsFull ? "Room Penuh" : (playerSeatAvailable ? "Masuk" : "Tonton");
    const icon = entry.visibility === "private" ? "🔒" : "🌐";
    const statusClass = roomIsFull ? "full" : escapeHTML(entry.status);
    return `
      <article class="room-card ${escapeHTML(entry.visibility)}" role="listitem">
        <div class="room-card-main">
          <div class="room-card-title-row">
            <span class="room-type-icon" aria-hidden="true">${icon}</span>
            <div class="room-card-title" title="${escapeHTML(entry.roomName)}">${escapeHTML(entry.roomName)}</div>
          </div>
          <span class="room-status-pill ${statusClass}">${escapeHTML(roomStatusLabel(entry.status, roomIsFull))}</span>
          <div class="room-card-meta">
            <span>👤 ${entry.playerCount}/${entry.maxPlayers} pemain</span>
            <span>👁 ${entry.spectatorCount}/${entry.maxSpectators} penonton</span>
            <span>${entry.visibility === "private" ? "Private" : "Public"}</span>
          </div>
          <div class="room-card-code">${escapeHTML(entry.roomCode)}</div>
        </div>
        <button class="${entry.visibility === "private" ? "gold" : "primary"} room-join-btn" type="button"
          data-room-code="${escapeHTML(entry.roomCode)}" ${roomIsFull ? "disabled" : ""}>${buttonLabel}</button>
      </article>`;
  }).join("");
}

function startRoomDirectorySubscription() {
  if (!db || roomDirectoryHandler || els.lobbyHomeView?.classList.contains("hidden")) return;
  roomDirectoryRef = db.ref("roomDirectory");
  els.roomListStatus.textContent = "Memuat room...";
  els.roomList.innerHTML = '<div class="room-loading-skeleton">Mengambil daftar room...</div>';
  roomDirectoryHandler = snapshot => {
    latestRoomDirectory = snapshot.val() || {};
    renderRoomDirectory();
  };
  roomDirectoryRef.on("value", roomDirectoryHandler, error => {
    console.warn("Daftar room tidak dapat dibaca.", error);
    els.roomListStatus.textContent = "Daftar room gagal dimuat.";
    els.roomList.innerHTML = '<div class="room-empty-state"><div><strong>Gagal memuat room</strong>Periksa koneksi dan Firebase Rules.</div></div>';
  });
}

function stopRoomDirectorySubscription() {
  if (roomDirectoryRef && roomDirectoryHandler) {
    roomDirectoryRef.off("value", roomDirectoryHandler);
  }
  roomDirectoryRef = null;
  roomDirectoryHandler = null;
}

function normalizeRoomCleanupCandidate(code, value) {
  const candidate = value && typeof value === "object" ? value : {};
  const normalizedCode = normalizeRoomCode(candidate.roomCode || code);
  const candidateAt = Number(candidate.candidateAt || 0);
  if (!normalizedCode || !Number.isFinite(candidateAt) || candidateAt <= 0) return null;
  return { roomCode: normalizedCode, candidateAt };
}

function clearRoomCleanupCandidateTimer(code) {
  const normalizedCode = normalizeRoomCode(code);
  const timer = roomCleanupCandidateTimers.get(normalizedCode);
  if (timer) clearTimeout(timer);
  roomCleanupCandidateTimers.delete(normalizedCode);
}

function scheduleRoomCleanupCandidate(candidate) {
  if (!candidate?.roomCode || !candidate?.candidateAt) return;
  clearRoomCleanupCandidateTimer(candidate.roomCode);
  const dueAt = Number(candidate.candidateAt) + EMPTY_ROOM_CLIENT_CLEANUP_GRACE_MS;
  const delay = Math.max(50, dueAt - Date.now());
  const timer = setTimeout(() => {
    roomCleanupCandidateTimers.delete(candidate.roomCode);
    attemptClientAssistedRoomCleanup(candidate.roomCode, candidate.candidateAt).catch(error => {
      console.warn("Cleanup room kosong gagal dijalankan.", error);
    });
  }, delay);
  roomCleanupCandidateTimers.set(candidate.roomCode, timer);
}

function reconcileRoomCleanupCandidateTimers() {
  const activeCodes = new Set();
  Object.entries(latestRoomCleanupCandidates || {}).forEach(([code, value]) => {
    const candidate = normalizeRoomCleanupCandidate(code, value);
    if (!candidate) return;
    activeCodes.add(candidate.roomCode);
    scheduleRoomCleanupCandidate(candidate);
  });

  Array.from(roomCleanupCandidateTimers.keys()).forEach(code => {
    if (!activeCodes.has(code)) clearRoomCleanupCandidateTimer(code);
  });
}

async function attemptClientAssistedRoomCleanup(code, expectedCandidateAt) {
  const normalizedCode = normalizeRoomCode(code);
  if (!db || !normalizedCode || roomCleanupAttemptsInProgress.has(normalizedCode)) return;
  roomCleanupAttemptsInProgress.add(normalizedCode);

  try {
    const candidateSnapshot = await db.ref(`roomCleanupCandidates/${normalizedCode}`).once("value");
    const candidate = normalizeRoomCleanupCandidate(normalizedCode, candidateSnapshot.val());
    if (!candidate) return;

    // Marker yang lebih baru berarti ada disconnect baru; gunakan waktu terbaru.
    if (Number(candidate.candidateAt) !== Number(expectedCandidateAt)) {
      scheduleRoomCleanupCandidate(candidate);
      return;
    }

    const remainingMs = candidate.candidateAt + EMPTY_ROOM_CLIENT_CLEANUP_GRACE_MS - Date.now();
    if (remainingMs > 0) {
      scheduleRoomCleanupCandidate(candidate);
      return;
    }

    // Security Rules menjadi pengaman terakhir: penghapusan hanya diizinkan
    // bila marker sudah >=30 detik dan node presence benar-benar kosong.
    await db.ref().update({
      [`rooms/${normalizedCode}`]: null,
      [`roomDirectory/${normalizedCode}`]: null,
      [`roomLookup/${normalizedCode}`]: null,
      [`roomSecrets/${normalizedCode}`]: null,
      [`roomAccess/${normalizedCode}`]: null,
      [`voiceSignals/${normalizedCode}`]: null,
      [`roomCleanupCandidates/${normalizedCode}`]: null
    });
  } catch (error) {
    const codeText = String(error?.code || error?.message || "").toUpperCase();
    // PERMISSION_DENIED normal terjadi bila seorang pemain sudah reconnect atau
    // masih ada presence aktif. Marker aktif akan dibersihkan client room.
    if (!codeText.includes("PERMISSION_DENIED")) throw error;

    const latestSnapshot = await db.ref(`roomCleanupCandidates/${normalizedCode}`).once("value");
    const latestCandidate = normalizeRoomCleanupCandidate(normalizedCode, latestSnapshot.val());
    if (latestCandidate) {
      const retryTimer = setTimeout(() => {
        roomCleanupCandidateTimers.delete(normalizedCode);
        attemptClientAssistedRoomCleanup(normalizedCode, latestCandidate.candidateAt).catch(retryError => {
          console.warn("Percobaan ulang cleanup room kosong gagal.", retryError);
        });
      }, EMPTY_ROOM_CLIENT_CLEANUP_RETRY_MS);
      clearRoomCleanupCandidateTimer(normalizedCode);
      roomCleanupCandidateTimers.set(normalizedCode, retryTimer);
    }
  } finally {
    roomCleanupAttemptsInProgress.delete(normalizedCode);
  }
}

function startRoomCleanupCandidateSubscription() {
  if (!db || roomCleanupCandidatesHandler || els.lobbyHomeView?.classList.contains("hidden")) return;
  roomCleanupCandidatesRef = db.ref("roomCleanupCandidates");
  roomCleanupCandidatesHandler = snapshot => {
    latestRoomCleanupCandidates = snapshot.val() || {};
    reconcileRoomCleanupCandidateTimers();
  };
  roomCleanupCandidatesRef.on("value", roomCleanupCandidatesHandler, error => {
    console.warn("Marker cleanup room tidak dapat dibaca.", error);
  });
}

function stopRoomCleanupCandidateSubscription() {
  if (roomCleanupCandidatesRef && roomCleanupCandidatesHandler) {
    roomCleanupCandidatesRef.off("value", roomCleanupCandidatesHandler);
  }
  roomCleanupCandidatesRef = null;
  roomCleanupCandidatesHandler = null;
  latestRoomCleanupCandidates = {};
  Array.from(roomCleanupCandidateTimers.keys()).forEach(clearRoomCleanupCandidateTimer);
}

async function refreshRoomDirectory() {
  if (!db) return;
  els.refreshRoomListBtn.disabled = true;
  try {
    const snapshot = await db.ref("roomDirectory").once("value");
    latestRoomDirectory = snapshot.val() || {};
    renderRoomDirectory();
  } finally {
    els.refreshRoomListBtn.disabled = false;
  }
}

function randomHex(bytes = 16) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return Array.from(data, value => value.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(value) {
  if (!crypto?.subtle) throw new Error("Browser tidak mendukung Web Crypto.");
  const encoded = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function makePasswordProof(password, salt) {
  return sha256Hex(`${String(salt || "")}:${String(password || "")}`);
}

function buildRoomListing(stateLike, code = roomCode) {
  const players = Object.values(stateLike?.players || {});
  const playerCount = players.filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(stateLike, player)).length;
  const spectatorCount = players.filter(player => player?.id && isSpectator(player) && isPlayerConnectedInState(stateLike, player)).length;
  const visibility = normalizeVisibility(stateLike?.visibility || "public");
  return {
    roomCode: normalizeRoomCode(code),
    roomName: cleanRoomName(stateLike?.roomName || `Room ${code}`),
    visibility,
    requiresPassword: stateLike?.requiresPassword === true,
    status: String(stateLike?.status || "lobby"),
    playerCount,
    spectatorCount,
    maxPlayers: MAX_GAME_PLAYERS,
    maxSpectators: MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS,
    createdAt: Number(stateLike?.createdAt || Date.now()),
    lastActivityAt: firebase.database.ServerValue.TIMESTAMP,
    emptySince: stateLike?.emptySince || null
  };
}

async function syncRoomListingNow(stateLike = roomState, { force = false } = {}) {
  if (!db || !roomRef || !roomCode || !stateLike || mySeat === null) return;

  const activeRoomRef = roomRef;
  const activeRoomCode = roomCode;
  const activeSeat = Number(mySeat);
  const activePlayerId = myPlayerId;
  const activeAuthUid = currentAuthUid;

  // Gunakan snapshot room terbaru sebagai sumber angka directory. Ini mencegah
  // timer lama menulis kembali jumlah pemain sebelum seseorang keluar.
  const authoritativeSnapshot = await activeRoomRef.once("value");
  if (roomRef !== activeRoomRef
    || roomCode !== activeRoomCode
    || Number(mySeat) !== activeSeat) return;

  const authoritativeState = authoritativeSnapshot.val();
  const activeMembership = authoritativeState?.players?.[activeSeat];
  if (!authoritativeState
    || activeMembership?.id !== activePlayerId
    || activeMembership?.authUid !== activeAuthUid) return;

  const listing = buildRoomListing(authoritativeState, activeRoomCode);
  const signature = JSON.stringify({
    roomName: listing.roomName,
    visibility: listing.visibility,
    requiresPassword: listing.requiresPassword,
    status: listing.status,
    playerCount: listing.playerCount,
    spectatorCount: listing.spectatorCount,
    emptySince: listing.emptySince || null
  });
  const now = Date.now();
  if (!force && signature === lastRoomDirectorySignature && now - lastRoomDirectorySyncAt < ROOM_DIRECTORY_HEARTBEAT_MS) return;

  lastRoomDirectorySignature = signature;
  lastRoomDirectorySyncAt = now;

  const updates = {};
  Object.entries(listing).forEach(([key, value]) => {
    updates[`roomLookup/${activeRoomCode}/${key}`] = value;
  });
  if (listing.visibility === "unlisted") {
    updates[`roomDirectory/${activeRoomCode}`] = null;
  } else {
    updates[`roomDirectory/${activeRoomCode}`] = listing;
  }
  await db.ref().update(updates);
}

function scheduleRoomListingSync(_stateLike = roomState, { force = false } = {}) {
  if (roomDirectorySyncTimer) clearTimeout(roomDirectorySyncTimer);
  const scheduledRoomRef = roomRef;
  const scheduledRoomCode = roomCode;
  roomDirectorySyncTimer = setTimeout(() => {
    roomDirectorySyncTimer = null;
    if (!roomRef
      || roomRef !== scheduledRoomRef
      || roomCode !== scheduledRoomCode
      || mySeat === null) return;
    syncRoomListingNow(roomState, { force }).catch(error => {
      console.warn("Metadata Room List gagal diperbarui.", error);
    });
  }, force ? 0 : 120);
}

function getFinishedRoomCleanupSeat(stateLike = roomState) {
  if (!stateLike?.players) return null;

  const winnerSeat = Number(stateLike.winnerSeat);
  const winner = stateLike.players?.[winnerSeat];
  if (Number.isInteger(winnerSeat) && winner?.id && winner?.authUid) {
    return winnerSeat;
  }

  const connectedMembers = Object.values(stateLike.players)
    .filter(player => player?.id && player?.authUid && isPlayerConnectedInState(stateLike, player))
    .sort((a, b) => Number(a.seat) - Number(b.seat));
  if (connectedMembers.length) return Number(connectedMembers[0].seat);

  const remainingMembers = Object.values(stateLike.players)
    .filter(player => player?.id && player?.authUid)
    .sort((a, b) => Number(a.seat) - Number(b.seat));
  return remainingMembers.length ? Number(remainingMembers[0].seat) : null;
}

async function deleteFinishedRoom(code) {
  const normalizedCode = normalizeRoomCode(code);
  if (!db || !normalizedCode || finishedRoomCleanupInProgress) return;
  finishedRoomCleanupInProgress = true;

  try {
    const roomSnapshot = await db.ref(`rooms/${normalizedCode}`).once("value");
    const latest = roomSnapshot.val();
    if (!latest || latest.status !== "finished") return;

    const cleanupSeat = getFinishedRoomCleanupSeat(latest);
    const member = latest.players?.[mySeat];
    if (Number(cleanupSeat) !== Number(mySeat)
      || member?.authUid !== currentAuthUid
      || !member?.id) {
      return;
    }

    // Bersihkan indeks dan data pendukung selagi room finished masih tersedia
    // untuk validasi rules. State utama dihapus pada operasi berikutnya.
    await db.ref().update({
      [`roomDirectory/${normalizedCode}`]: null,
      [`roomLookup/${normalizedCode}`]: null,
      [`voiceSignals/${normalizedCode}`]: null,
      [`roomAccess/${normalizedCode}`]: null,
      [`roomSecrets/${normalizedCode}`]: null,
      [`roomCleanupCandidates/${normalizedCode}`]: null
    });
    await db.ref(`rooms/${normalizedCode}`).remove();
  } catch (error) {
    console.warn("Room selesai belum dapat dihapus otomatis.", error);
  } finally {
    finishedRoomCleanupInProgress = false;
  }
}

function scheduleFinishedRoomDeletion(stateLike = roomState) {
  if (stateLike?.status !== "finished" || !roomCode) {
    if (finishedRoomCleanupTimer) clearTimeout(finishedRoomCleanupTimer);
    finishedRoomCleanupTimer = null;
    return;
  }

  const winnerSeat = Number(stateLike.winnerSeat);
  const winnerName = Number.isInteger(winnerSeat)
    ? (stateLike.players?.[winnerSeat]?.name || "Pemain terakhir")
    : "";
  finishedRoomCleanupCode = roomCode;
  finishedRoomResultMessage = winnerName
    ? `Game selesai. ${winnerName} menang. Room telah dihapus.`
    : "Game selesai. Room telah dihapus.";

  const cleanupSeat = getFinishedRoomCleanupSeat(stateLike);
  if (Number(cleanupSeat) !== Number(mySeat) || finishedRoomCleanupTimer || finishedRoomCleanupInProgress) {
    return;
  }

  // Room hilang dari Room List segera. State utama dipertahankan sebentar agar
  // seluruh client sempat menerima dan menampilkan hasil pemenang.
  db.ref().update({
    [`roomDirectory/${roomCode}`]: null,
    [`roomLookup/${roomCode}`]: null
  }).catch(error => {
    console.warn("Room selesai belum dapat disembunyikan dari daftar.", error);
  });

  finishedRoomCleanupTimer = setTimeout(() => {
    finishedRoomCleanupTimer = null;
    deleteFinishedRoom(finishedRoomCleanupCode).catch(error => {
      console.warn("Gagal menjalankan cleanup room selesai.", error);
    });
  }, FINISHED_ROOM_DELETE_DELAY_MS);
}

async function readRoomLookup(code) {
  const normalizedCode = normalizeRoomCode(code);
  if (!normalizedCode) return null;
  const snapshot = await db.ref(`roomLookup/${normalizedCode}`).once("value");
  if (snapshot.exists()) return normalizeDirectoryEntry(normalizedCode, snapshot.val());

  // Backward compatibility untuk room lama yang belum mempunyai roomLookup.
  try {
    const roomSnapshot = await db.ref(`rooms/${normalizedCode}`).once("value");
    if (!roomSnapshot.exists()) return null;
    const state = roomSnapshot.val();
    return normalizeDirectoryEntry(normalizedCode, {
      roomCode: normalizedCode,
      roomName: state.roomName || `Room ${normalizedCode}`,
      visibility: state.visibility || "public",
      requiresPassword: state.requiresPassword === true,
      status: state.status || "lobby",
      playerCount: Object.values(state.players || {}).filter(player => player?.id && !isSpectator(player)).length,
      spectatorCount: Object.values(state.players || {}).filter(player => player?.id && isSpectator(player)).length,
      createdAt: state.createdAt || 0,
      lastActivityAt: state.lastActivityAt || state.createdAt || 0
    });
  } catch (error) {
    if (String(error?.code || "").toUpperCase().includes("PERMISSION_DENIED")) return null;
    throw error;
  }
}

async function hasStoredRoomAccess(code) {
  if (!db || !currentAuthUid) return false;
  const snapshot = await db.ref(`roomAccess/${normalizeRoomCode(code)}/${currentAuthUid}/granted`).once("value");
  return snapshot.val() === true;
}

function openRoomPasswordPrompt(context) {
  pendingJoinContext = context;
  if (els.roomPasswordTitle) els.roomPasswordTitle.textContent = `Buka ${context.lookup.roomName}`;
  if (els.roomPasswordDescription) {
    els.roomPasswordDescription.textContent = `${context.lookup.visibility === "private" ? "Room Private" : "Room Unlisted"} ini membutuhkan password.`;
  }
  if (els.roomPasswordInput) els.roomPasswordInput.value = "";
  if (els.roomPasswordError) {
    els.roomPasswordError.textContent = "";
    els.roomPasswordError.classList.add("hidden");
  }
  setOverlayVisible(els.roomPasswordOverlay, true);
  requestAnimationFrame(() => els.roomPasswordInput?.focus());
}

async function grantRoomAccess(code, lookup, password) {
  const salt = String(lookup?.passwordSalt || "");
  if (!salt) {
    // Salt berada pada roomLookup; baca data mentah karena normalizer tidak menyimpannya.
    const rawLookupSnapshot = await db.ref(`roomLookup/${normalizeRoomCode(code)}`).once("value");
    const rawLookup = rawLookupSnapshot.val() || {};
    lookup.passwordSalt = String(rawLookup.passwordSalt || "");
  }
  if (!lookup.passwordSalt) throw new Error("Konfigurasi password room tidak lengkap.");
  const proof = await makePasswordProof(password, lookup.passwordSalt);
  await db.ref(`roomAccess/${normalizeRoomCode(code)}/${currentAuthUid}`).set({
    granted: true,
    proof,
    grantedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function requestJoinRoom(code, suppliedLookup = null) {
  if (lobbyActionInProgress) return;
  const normalizedCode = normalizeRoomCode(code);
  if (!normalizedCode) {
    alert("Masukkan kode room terlebih dahulu.");
    return;
  }

  lobbyActionInProgress = true;
  try {
    const lookup = suppliedLookup || await readRoomLookup(normalizedCode);
    if (!lookup) {
      alert("Room tidak ditemukan atau sudah tidak aktif.");
      return;
    }

    const roomIsFull = lookup.status !== "lobby"
      ? lookup.spectatorCount >= MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS
      : lookup.playerCount >= MAX_GAME_PLAYERS
        && lookup.spectatorCount >= MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS;
    if (roomIsFull) {
      alert("Room sudah penuh.");
      return;
    }

    const needsPassword = lookup.requiresPassword === true;
    if (needsPassword && !(await hasStoredRoomAccess(normalizedCode))) {
      openRoomPasswordPrompt({ code: normalizedCode, lookup });
      return;
    }

    closeAllLobbyModals();
    await joinRoomByCode(normalizedCode);
  } finally {
    lobbyActionInProgress = false;
  }
}

async function confirmRoomPassword() {
  if (!pendingJoinContext || lobbyActionInProgress) return;
  const password = String(els.roomPasswordInput?.value || "");
  if (!password) {
    els.roomPasswordError.textContent = "Masukkan password room.";
    els.roomPasswordError.classList.remove("hidden");
    return;
  }

  lobbyActionInProgress = true;
  els.confirmRoomPasswordBtn.disabled = true;
  try {
    await grantRoomAccess(pendingJoinContext.code, pendingJoinContext.lookup, password);
    const code = pendingJoinContext.code;
    closeAllLobbyModals();
    await joinRoomByCode(code);
  } catch (error) {
    console.warn("Password room ditolak.", error);
    els.roomPasswordError.textContent = "Password salah atau akses room telah kedaluwarsa.";
    els.roomPasswordError.classList.remove("hidden");
    els.roomPasswordInput?.select();
  } finally {
    lobbyActionInProgress = false;
    els.confirmRoomPasswordBtn.disabled = false;
  }
}

async function returnToSetupView(message = "") {
  if (membershipResetInProgress) return;
  membershipResetInProgress = true;

  try {
    await stopVoiceChatNetwork();
    clearAfkActionTimer();
    if (disconnectExpiryTimer) clearTimeout(disconnectExpiryTimer);
    if (disconnectCountdownTimer) clearInterval(disconnectCountdownTimer);
    disconnectExpiryTimer = null;
    disconnectCountdownTimer = null;
    normalRouletteInProgress = false;
    if (finishedRoomCleanupTimer) clearTimeout(finishedRoomCleanupTimer);
    finishedRoomCleanupTimer = null;
    finishedRoomCleanupInProgress = false;

    await detachCurrentPresence({ cancelDisconnect: firebaseConnected });
    roomRef?.off();
  } catch (error) {
    console.warn("Gagal membersihkan koneksi room.", error);
  }

  resetLocalAnimationTimeline();
  resetPlayerMoneyAnimations();
  roomRef = null;
  roomState = null;
  roomCode = "";
  mySeat = null;
  lastRoomDirectorySignature = "";
  lastRoomDirectorySyncAt = 0;
  if (roomDirectorySyncTimer) clearTimeout(roomDirectorySyncTimer);
  roomDirectorySyncTimer = null;
  clearRoomSession();

  els.appRoot?.classList.remove("game-active");
  els.setupPanel.classList.remove("hidden");
  els.gamePanel.classList.add("hidden");
  els.roomBadge.textContent = "Belum masuk room";
  els.copyRoomBtn.disabled = true;
  els.leaveBtn.disabled = true;
  els.disconnectOverlay?.classList.add("hidden");
  showLobbyHome();

  finishedRoomCleanupCode = "";
  finishedRoomResultMessage = "";
  membershipResetInProgress = false;
  if (message) setTimeout(() => alert(message), 80);
}

function isCurrentMembershipValid(stateLike = roomState) {
  if (mySeat === null || !myPlayerId || !currentAuthUid) return true;
  const player = stateLike?.players?.[mySeat];
  return player?.id === myPlayerId && player?.authUid === currentAuthUid;
}

function getDisconnectDeadline(player) {
  const disconnectedAt = Number(player?.disconnectedAt || 0);
  return disconnectedAt > 0 ? disconnectedAt + DISCONNECT_GRACE_MS : 0;
}

function getExpiredDisconnectedSeats(stateLike = roomState, now = Date.now()) {
  return getDisconnectedRoomMembers(stateLike)
    .filter(player => {
      const deadline = getDisconnectDeadline(player);
      return deadline > 0 && now >= deadline;
    })
    .map(player => Number(player.seat));
}

function getLeavingAssetSettlement(stateLike, leavingSeat, excludedRecipientSeats = []) {
  const normalizedSeat = Number(leavingSeat);
  const leavingPlayer = stateLike?.players?.[normalizedSeat];
  if (!leavingPlayer || stateLike?.status !== "playing" || !isPlayerGameParticipant(leavingPlayer, stateLike)) {
    return {
      recipientSeats: [],
      ownedPropertyIds: [],
      availableMoney: 0,
      sharePerPlayer: 0,
      distributedMoney: 0,
      discardedRemainder: 0
    };
  }

  const excludedSeats = new Set(normalizeSeatArray(excludedRecipientSeats).map(Number));
  const recipientSeats = getTurnOrderFromState(stateLike)
    .filter(seat => Number(seat) !== normalizedSeat)
    .filter(seat => !excludedSeats.has(Number(seat)))
    .filter(seat => isPlayerGameParticipant(stateLike?.players?.[seat], stateLike));

  const ownedPropertyIds = Object.keys(PROPERTY_DATA).filter(propertyId => {
    const owner = stateLike?.propertyState?.[propertyId]?.owner;
    return owner !== null && owner !== undefined && Number(owner) === normalizedSeat;
  });

  const availableMoney = Math.max(0, Math.floor(Number(leavingPlayer.money || 0)));
  const sharePerPlayer = recipientSeats.length > 0
    ? Math.floor(availableMoney / recipientSeats.length)
    : 0;
  const distributedMoney = sharePerPlayer * recipientSeats.length;

  return {
    recipientSeats,
    ownedPropertyIds,
    availableMoney,
    sharePerPlayer,
    distributedMoney,
    discardedRemainder: availableMoney - distributedMoney
  };
}

function appendLeavingAssetSettlementUpdates(stateLike, leavingSeat, updates) {
  const settlement = getLeavingAssetSettlement(stateLike, leavingSeat);

  settlement.ownedPropertyIds.forEach(propertyId => {
    updates[`propertyState/${propertyId}/owner`] = null;
    updates[`propertyState/${propertyId}/level`] = 0;
  });

  settlement.recipientSeats.forEach(seat => {
    const currentMoney = Number(stateLike?.players?.[seat]?.money || 0);
    updates[`players/${seat}/money`] = currentMoney + settlement.sharePerPlayer;
  });

  if (stateLike?.status === "playing" && stateLike?.players?.[leavingSeat]) {
    updates[`players/${leavingSeat}/money`] = 0;
  }

  return settlement;
}

function applyLeavingAssetSettlementToRoom(room, leavingSeat, excludedRecipientSeats = []) {
  const settlement = getLeavingAssetSettlement(room, leavingSeat, excludedRecipientSeats);

  settlement.ownedPropertyIds.forEach(propertyId => {
    if (!room.propertyState?.[propertyId]) return;
    room.propertyState[propertyId].owner = null;
    room.propertyState[propertyId].level = 0;
  });

  settlement.recipientSeats.forEach(seat => {
    const recipient = room.players?.[seat];
    if (!recipient) return;
    recipient.money = Number(recipient.money || 0) + settlement.sharePerPlayer;
  });

  if (room.players?.[leavingSeat]) {
    room.players[leavingSeat].money = 0;
  }

  return settlement;
}

function describeLeavingAssetSettlement(settlement) {
  if (!settlement) return "";

  const parts = [];
  const propertyCount = settlement.ownedPropertyIds.length;
  if (propertyCount > 0) {
    parts.push(`${propertyCount} properti dikembalikan ke bank`);
  }

  if (settlement.availableMoney > 0 && settlement.recipientSeats.length > 0) {
    let moneyText = `${formatMoney(settlement.availableMoney)} dibagi kepada ${settlement.recipientSeats.length} pemain, masing-masing menerima ${formatMoney(settlement.sharePerPlayer)}`;
    if (settlement.discardedRemainder > 0) {
      moneyText += `, sedangkan sisa ${formatMoney(settlement.discardedRemainder)} dihapus`;
    }
    parts.push(moneyText);
  }

  return parts.length ? `${parts.join(". ")}.` : "";
}

function removeSeatFromRoomState(room, seat, reasonText = "terputus lebih dari 30 detik", excludedRecipientSeats = []) {
  if (!room?.players?.[seat]) return room;

  const leavingPlayer = room.players[seat];
  const wasParticipant = isPlayerGameParticipant(leavingPlayer, room);
  const originalOrder = getTurnOrderFromState(room);
  const seatsRemovedInBatch = new Set([Number(seat), ...normalizeSeatArray(excludedRecipientSeats)]);
  const survivingParticipants = originalOrder
    .filter(value => !seatsRemovedInBatch.has(Number(value)))
    .filter(value => isPlayerGameParticipant(room.players?.[value], room));
  const gameEndsAfterRemoval = room.status === "playing"
    && wasParticipant
    && survivingParticipants.length <= 1;
  const assetSettlement = room.status === "playing" && wasParticipant && !gameEndsAfterRemoval
    ? applyLeavingAssetSettlementToRoom(room, seat, excludedRecipientSeats)
    : null;
  const assetSettlementText = describeLeavingAssetSettlement(assetSettlement);

  leavingPlayer.connected = false;
  leavingPlayer.id = "";
  leavingPlayer.authUid = "";
  leavingPlayer.inGame = false;
  leavingPlayer.isHost = false;
  leavingPlayer.roulette12Streak = 0;
  leavingPlayer.disconnectedAt = Date.now();
  leavingPlayer.leftAt = Date.now();
  leavingPlayer.leftReason = "disconnect-timeout";
  if (room.presence) room.presence[seat] = null;
  room.turnOrder = normalizeSeatArray(room.turnOrder).filter(value => Number(value) !== Number(seat));

  if (room.pendingExtraRoll && Number(room.pendingExtraRoll.seat) === Number(seat)) {
    room.pendingExtraRoll = null;
  }

  if (room.status === "lobby") {
    const candidates = Object.values(room.players || {})
      .filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(room, player))
      .sort((a, b) => Number(a.seat) - Number(b.seat));
    const newHostSeat = candidates.length ? Number(candidates[0].seat) : null;
    room.hostSeat = newHostSeat;
    Object.values(room.players || {}).forEach(player => {
      player.isHost = newHostSeat !== null && Number(player.seat) === newHostSeat;
    });
  } else if (room.status === "orderRoll" && wasParticipant) {
    const remaining = originalOrder
      .filter(value => Number(value) !== Number(seat))
      .filter(value => room.players?.[value]?.id);
    room.status = "lobby";
    room.orderRoll = null;
    room.turnOrder = [];
    room.isRolling = false;
    room.pendingAction = null;
    room.pendingExtraRoll = null;
    room.currentSeat = remaining[0] ?? 0;
    remaining.forEach(value => { room.players[value].inGame = false; });
  } else if (room.status === "playing" && wasParticipant) {
    const remaining = originalOrder
      .filter(value => Number(value) !== Number(seat))
      .filter(value => isPlayerGameParticipant(room.players?.[value], room));

    if (remaining.length <= 1) {
      const winnerSeat = remaining[0] ?? null;
      room.status = "finished";
      room.winnerSeat = winnerSeat;
      room.currentSeat = winnerSeat;
      room.isRolling = false;
      room.pendingAction = null;
      room.pendingExtraRoll = null;
      room.debtState = null;
      room.cardPopup = {
        id: `${Date.now()}_disconnect_winner_${seat}`,
        deckType: "system",
        deck: "Game Selesai",
        title: winnerSeat !== null ? `${room.players?.[winnerSeat]?.name || "Pemain terakhir"} Menang!` : "Game Selesai",
        text: winnerSeat !== null
          ? "Semua pemain lain sudah bangkrut atau keluar. Game dinyatakan selesai."
          : "Tidak ada pemain aktif yang tersisa.",
        seat: winnerSeat,
        playerName: winnerSeat !== null ? room.players?.[winnerSeat]?.name : ""
      };
    } else {
      if (Number(room.currentSeat) === Number(seat)) {
        const leavingIndex = originalOrder.indexOf(Number(seat));
        room.currentSeat = remaining[(Math.max(0, leavingIndex) % remaining.length)];
        room.isRolling = false;
      }
      if (room.pendingAction && Number(room.pendingAction.seat) === Number(seat)) {
        room.pendingAction = null;
        room.isRolling = false;
      }
      if (room.debtState && Number(room.debtState.seat) === Number(seat)) {
        room.debtState = null;
        room.isRolling = false;
      }
      room.cardPopup = {
        id: `${Date.now()}_disconnect_removed_${seat}`,
        deckType: "system",
        deck: "Info Game",
        title: `${leavingPlayer.name || "Pemain"} Keluar`,
        text: `Pemain dikeluarkan karena ${reasonText}. Permainan dilanjutkan.${assetSettlementText ? ` ${assetSettlementText}` : ""}`,
        seat,
        playerName: leavingPlayer.name || "Pemain"
      };
    }
  }

  const connectedCandidates = Object.values(room.players || {})
    .filter(player => player?.id && isMonopolyPlayer(player) && isPlayerConnectedInState(room, player))
    .sort((a, b) => Number(a.seat) - Number(b.seat));
  if (!room.players?.[room.hostSeat]?.id || !isPlayerConnectedInState(room, room.players?.[room.hostSeat])) {
    room.hostSeat = connectedCandidates.length ? Number(connectedCandidates[0].seat) : null;
    Object.values(room.players || {}).forEach(player => {
      player.isHost = room.hostSeat !== null && Number(player.seat) === Number(room.hostSeat);
    });
  }

  room.logs = room.logs || {};
  const logTimestamp = Date.now();
  room.logs[logTimestamp] = `${leavingPlayer.name || "Pemain"} dikeluarkan karena ${reasonText}.`;
  if (assetSettlementText) {
    room.logs[logTimestamp + 1] = assetSettlementText;
  }
  return room;
}

async function expireDisconnectedPlayers() {
  if (!roomRef || disconnectCleanupInProgress) return;
  disconnectCleanupInProgress = true;

  try {
    await roomRef.transaction(room => {
      if (!room) return room;
      const expiredSeats = getExpiredDisconnectedSeats(room, Date.now());
      if (!expiredSeats.length) return;
      expiredSeats.forEach(seat => removeSeatFromRoomState(room, seat, "terputus lebih dari 30 detik", expiredSeats));
      return room;
    });
  } catch (error) {
    console.warn("Gagal mengeluarkan pemain yang terputus.", error);
  } finally {
    disconnectCleanupInProgress = false;
  }
}

function scheduleDisconnectExpiry(stateLike = roomState) {
  if (disconnectExpiryTimer) clearTimeout(disconnectExpiryTimer);
  disconnectExpiryTimer = null;

  const deadlines = getDisconnectedRoomMembers(stateLike)
    .map(getDisconnectDeadline)
    .filter(value => value > 0)
    .sort((a, b) => a - b);

  if (!deadlines.length) return;

  const delay = Math.max(80, deadlines[0] - Date.now() + 100);
  disconnectExpiryTimer = setTimeout(() => {
    disconnectExpiryTimer = null;
    expireDisconnectedPlayers();
  }, delay);
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

function getDisconnectedRoomMembers(stateLike = roomState) {
  if (!stateLike?.players) return [];

  return Object.values(stateLike.players)
    .filter(player => player?.id)
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
  // Marker ini bukan keputusan bahwa room sudah kosong. Setiap disconnect boleh
  // membuat marker, tetapi penghapusan baru diizinkan setelah 30 detik DAN
  // Security Rules memastikan seluruh presence room benar-benar kosong.
  await roomCleanupCandidateRef?.onDisconnect().set({
    roomCode,
    candidateAt: serverTimestamp
  });

  await playerPresenceRef.set({
    playerId: myPlayerId,
    authUid: currentAuthUid,
    connectedAt: serverTimestamp
  });

  await presencePlayerRef.update({
    connected: true,
    disconnectedAt: null,
    lastSeenAt: serverTimestamp
  });
  if (roomEmptySinceRef) {
    await roomEmptySinceRef.set(null);
  }
  if (roomCleanupCandidateRef) {
    await roomCleanupCandidateRef.remove();
  }
}

async function detachCurrentPresence({ cancelDisconnect = true } = {}) {
  if (connectionInfoRef && connectionInfoHandler) {
    connectionInfoRef.off("value", connectionInfoHandler);
  }
  if (roomCleanupCandidateRef && activeRoomCleanupCandidateHandler) {
    roomCleanupCandidateRef.off("value", activeRoomCleanupCandidateHandler);
  }

  if (cancelDisconnect) {
    try {
      await playerPresenceRef?.onDisconnect().cancel();
      await presencePlayerRef?.onDisconnect().cancel();
      await roomEmptySinceRef?.onDisconnect().cancel();
      await roomCleanupCandidateRef?.onDisconnect().cancel();
    } catch (error) {
      console.warn("Gagal membatalkan handler onDisconnect.", error);
    }
  }

  if (localNetworkTimeoutTimer) clearTimeout(localNetworkTimeoutTimer);
  localNetworkTimeoutTimer = null;
  firebaseConnected = false;
  connectionInfoRef = null;
  connectionInfoHandler = null;
  playerPresenceRef = null;
  presencePlayerRef = null;
  roomEmptySinceRef = null;
  roomCleanupCandidateRef = null;
  activeRoomCleanupCandidateHandler = null;
  presenceConnectionId = "";
}

async function setupCurrentPresence() {
  await detachCurrentPresence({ cancelDisconnect: true });
  if (!db || !roomRef || mySeat === null || !myPlayerId || !currentAuthUid) return;

  presenceConnectionId = `conn_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  playerPresenceRef = roomRef.child(`presence/${mySeat}/${presenceConnectionId}`);
  presencePlayerRef = roomRef.child(`players/${mySeat}`);
  roomEmptySinceRef = roomRef.child("emptySince");
  roomCleanupCandidateRef = db.ref(`roomCleanupCandidates/${roomCode}`);
  connectionInfoRef = db.ref(".info/connected");

  // Selama masih ada satu client aktif di room, marker disconnect apa pun harus
  // segera dibersihkan. Listener ini juga menutup race ketika marker dibuat
  // sedikit setelah presence pemain lain berubah.
  activeRoomCleanupCandidateHandler = snapshot => {
    if (!snapshot.exists() || !firebaseConnected || !roomCleanupCandidateRef || mySeat === null) return;
    roomCleanupCandidateRef.remove().catch(error => {
      console.warn("Gagal membatalkan kandidat cleanup karena room masih aktif.", error);
    });
  };
  roomCleanupCandidateRef.on("value", activeRoomCleanupCandidateHandler);

  connectionInfoHandler = (snapshot) => {
    const connected = snapshot.val() === true;
    firebaseConnected = connected;

    if (!connected) {
      if (localNetworkTimeoutTimer) clearTimeout(localNetworkTimeoutTimer);
      localNetworkTimeoutTimer = setTimeout(() => {
        localNetworkTimeoutTimer = null;
        returnToSetupView("Koneksi terputus lebih dari 30 detik. Silakan join room kembali.");
      }, DISCONNECT_GRACE_MS);
      return;
    }

    if (localNetworkTimeoutTimer) clearTimeout(localNetworkTimeoutTimer);
    localNetworkTimeoutTimer = null;
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
    if (session.playerId !== myPlayerId || session.authUid !== currentAuthUid) {
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
      .find(player => player?.id === myPlayerId && player?.authUid === currentAuthUid);

    if (!matchingPlayer) {
      clearRoomSession();
      return;
    }

    roomCode = storedRoomCode;
    roomRef = candidateRoomRef;
    mySeat = Number(matchingPlayer.seat);
    persistPlayerName(matchingPlayer.name || session.playerName || "Pemain");

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

function createInitialRoom(hostName, roomOptions = {}) {
  const players = {};
  for (let i = 0; i < MAX_ROOM_MEMBERS; i++) {
    players[i] = {
      seat: i,
      role: i < MAX_GAME_PLAYERS ? "player" : "spectator",
      id: i === 0 ? myPlayerId : "",
      authUid: i === 0 ? currentAuthUid : "",
      name: i === 0 ? hostName : PLAYER_DEFAULTS[i],
      color: PLAYER_COLORS[i],
      money: i < MAX_GAME_PLAYERS ? START_MONEY : 0,
      position: 0,
      inJail: false,
      jailAttempts: 0,
      roulette12Streak: 0,
      lapsCompleted: 0,
      jailFreeCards: 0,
      taxExemptionCards: 0,
      bankrupt: false,
      inGame: false,
      connected: i === 0,
      disconnectedAt: null,
      isHost: i === 0
    };
  }

  const roomName = cleanRoomName(roomOptions.roomName || `${hostName}'s Room`) || "Monopoly Room";
  const visibility = normalizeVisibility(roomOptions.visibility || "public");

  return {
    schemaVersion: 2,
    roomName,
    visibility,
    requiresPassword: roomOptions.requiresPassword === true,
    status: "lobby",
    createdAt: Date.now(),
    lastActivityAt: Date.now(),
    emptySince: null,
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
    cardDeckState: makeInitialCardDeckState(),
    deferredDebtReasons: {},
    players,
    logs: {
      [Date.now()]: `${hostName} membuat room.`
    }
  };
}

async function reserveRoomSecret(roomOptions) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidateCode = randomRoomCode();
    const secretRef = db.ref(`roomSecrets/${candidateCode}`);
    try {
      await secretRef.set({
        ownerUid: currentAuthUid,
        visibility: roomOptions.visibility,
        requiresPassword: roomOptions.requiresPassword,
        passwordHash: roomOptions.passwordHash || "",
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      return candidateCode;
    } catch (error) {
      const permissionDenied = String(error?.code || "").toUpperCase().includes("PERMISSION_DENIED");
      if (!permissionDenied || attempt === 7) throw error;
    }
  }
  throw new Error("Gagal membuat kode room unik.");
}

async function createRoom() {
  if (lobbyActionInProgress) return;
  await firebaseReadyPromise;

  const playerName = getActiveProfileName();
  const roomName = cleanRoomName(els.roomNameInput?.value);
  const visibility = getSelectedRoomVisibility();
  const password = String(els.createRoomPasswordInput?.value || "");

  if (roomName.length < 3) {
    alert("Nama room minimal 3 karakter.");
    els.roomNameInput?.focus();
    return;
  }

  if (visibility === "private" && password.length < 6) {
    alert("Room Private harus memakai password minimal 6 karakter.");
    els.createRoomPasswordInput?.focus();
    return;
  }

  if (visibility === "unlisted" && password.length > 0 && password.length < 6) {
    alert("Password room minimal 6 karakter, atau kosongkan jika tidak ingin memakai password.");
    els.createRoomPasswordInput?.focus();
    return;
  }

  const requiresPassword = visibility === "private" || (visibility === "unlisted" && password.length > 0);

  lobbyActionInProgress = true;
  els.createRoomBtn.disabled = true;
  let reservedCode = "";

  try {
    const passwordSalt = requiresPassword ? randomHex(16) : "";
    const passwordHash = requiresPassword ? await makePasswordProof(password, passwordSalt) : "";
    myPlayerId = makePlayerId();
    reservedCode = await reserveRoomSecret({ visibility, requiresPassword, passwordHash });
    roomCode = reservedCode;
    roomRef = db.ref(`rooms/${roomCode}`);

    const initialRoom = createInitialRoom(playerName, { roomName, visibility, requiresPassword });
    const listing = buildRoomListing(initialRoom, roomCode);
    const lookup = {
      ...listing,
      lastActivityAt: firebase.database.ServerValue.TIMESTAMP,
      passwordSalt: requiresPassword ? passwordSalt : ""
    };
    const createUpdates = {
      [`rooms/${roomCode}`]: initialRoom,
      [`roomLookup/${roomCode}`]: lookup
    };
    if (visibility !== "unlisted") {
      createUpdates[`roomDirectory/${roomCode}`] = listing;
    }
    // Room dan metadata browser dibuat dalam satu multi-location update agar
    // tidak ada room setengah jadi di antara dua request.
    await db.ref().update(createUpdates);

    mySeat = 0;
    await setupCurrentPresence();
    saveRoomSession(playerName);
    closeAllLobbyModals();
    enterGameView();
    subscribeRoom();

    if (visibility === "unlisted") {
      setTimeout(() => alert(`Room Unlisted berhasil dibuat. Bagikan kode ini kepada temanmu: ${roomCode}`), 120);
    }
  } catch (error) {
    if (roomRef && reservedCode) {
      try { await roomRef.remove(); } catch (_) {}
    }
    if (reservedCode) {
      try { await db.ref(`roomDirectory/${reservedCode}`).remove(); } catch (_) {}
      try { await db.ref(`roomLookup/${reservedCode}`).remove(); } catch (_) {}
      try { await db.ref(`roomSecrets/${reservedCode}`).remove(); } catch (_) {}
    }
    roomRef = null;
    roomCode = "";
    mySeat = null;
    throw error;
  } finally {
    lobbyActionInProgress = false;
    els.createRoomBtn.disabled = false;
  }
}

async function claimRoomSeatAtomically(seat, playerName, { allowEmpty = true } = {}) {
  const normalizedSeat = Number(seat);
  if (!roomRef || !Number.isInteger(normalizedSeat) || normalizedSeat < 0 || normalizedSeat >= MAX_ROOM_MEMBERS) {
    return null;
  }

  const role = normalizedSeat < MAX_GAME_PLAYERS ? "player" : "spectator";
  let claimMode = "";

  const result = await roomRef.child(`players/${normalizedSeat}`).transaction((currentPlayer) => {
    const current = currentPlayer && typeof currentPlayer === "object" ? currentPlayer : {};
    const sameMembership = current.id === myPlayerId && current.authUid === currentAuthUid;
    const seatIsEmpty = !String(current.id || "") && !String(current.authUid || "");

    if (!sameMembership && !(allowEmpty && seatIsEmpty)) return;

    claimMode = sameMembership ? "reconnect" : "new";

    const nextPlayer = {
      ...current,
      seat: normalizedSeat,
      role,
      color: current.color || PLAYER_COLORS[normalizedSeat],
      id: myPlayerId,
      authUid: currentAuthUid,
      name: playerName,
      connected: true,
      disconnectedAt: null,
      leftAt: null,
      leftReason: ""
    };

    if (!sameMembership) {
      Object.assign(nextPlayer, {
        inGame: false,
        bankrupt: false,
        money: role === "player" ? START_MONEY : 0,
        position: 0,
        inJail: false,
        jailAttempts: 0,
        roulette12Streak: 0,
        lapsCompleted: 0,
        jailFreeCards: 0,
        taxExemptionCards: 0,
        isHost: false
      });
    }

    return nextPlayer;
  }, undefined, false);

  if (!result.committed) return null;

  return {
    seat: normalizedSeat,
    role,
    reconnectingExistingPlayer: claimMode === "reconnect"
  };
}

async function joinRoomByCode(code) {
  await firebaseReadyPromise;
  const playerName = getActiveProfileName();
  const normalizedCode = normalizeRoomCode(code);

  if (!normalizedCode) {
    alert("Masukkan kode room terlebih dahulu.");
    return;
  }

  myPlayerId = makePlayerId();
  roomCode = normalizedCode;
  roomRef = db.ref(`rooms/${roomCode}`);

  let snap = await roomRef.once("value");
  if (!snap.exists()) {
    roomRef = null;
    roomCode = "";
    alert("Room tidak ditemukan.");
    return;
  }

  let data = snap.val();
  let players = data.players || {};
  let existingSeat = null;

  for (let i = 0; i < MAX_ROOM_MEMBERS; i++) {
    if (players[i]?.id === myPlayerId && players[i]?.authUid === currentAuthUid) {
      existingSeat = i;
      break;
    }
  }

  let claim = null;

  if (existingSeat !== null) {
    claim = await claimRoomSeatAtomically(existingSeat, playerName, { allowEmpty: false });
  }

  if (!claim) {
    // Baca ulang agar pilihan seat memakai status room terbaru setelah percobaan reconnect.
    snap = await roomRef.once("value");
    if (!snap.exists()) {
      roomRef = null;
      roomCode = "";
      alert("Room tidak ditemukan.");
      return;
    }

    data = snap.val();
    players = data.players || {};

    const latestExistingSeat = Array.from({ length: MAX_ROOM_MEMBERS }, (_, index) => index)
      .find(index => players[index]?.id === myPlayerId && players[index]?.authUid === currentAuthUid);

    if (latestExistingSeat !== undefined) {
      claim = await claimRoomSeatAtomically(latestExistingSeat, playerName, { allowEmpty: false });
    }

    if (!claim) {
      const gameAlreadyStarted = data.status !== "lobby";
      const candidateSeats = gameAlreadyStarted
        ? [4, 5]
        : [0, 1, 2, 3, 4, 5];

      for (const candidateSeat of candidateSeats) {
        claim = await claimRoomSeatAtomically(candidateSeat, playerName, { allowEmpty: true });
        if (claim) break;
      }
    }
  }

  if (!claim) {
    roomRef = null;
    roomCode = "";
    alert("Room sudah penuh. Maksimal 4 pemain Monopoly dan 2 penonton.");
    return;
  }

  mySeat = claim.seat;
  const role = claim.role;
  const reconnectingExistingPlayer = claim.reconnectingExistingPlayer;

  await setupCurrentPresence();
  saveRoomSession(playerName);

  if (!reconnectingExistingPlayer) {
    const roleLabel = role === "spectator" ? `Penonton ${mySeat - 3}` : `Pemain ${mySeat + 1}`;
    await addRemoteLog(`${playerName} bergabung sebagai ${roleLabel}.`);
  }

  closeAllLobbyModals();
  enterGameView();
  subscribeRoom();
}

async function joinRoom() {
  const code = normalizeRoomCode(els.roomCodeInput?.value);
  await requestJoinRoom(code);
}

function enterGameView() {
  stopRoomDirectorySubscription();
  stopRoomCleanupCandidateSubscription();
  closeAllLobbyModals();
  els.appRoot?.classList.add("game-active");
  resetLocalAnimationTimeline();
  resetPlayerMoneyAnimations();
  els.setupPanel.classList.add("hidden");
  els.gamePanel.classList.remove("hidden");
  els.roomBadge.textContent = `Room: ${roomCode}`;
  els.copyRoomBtn.disabled = false;
  els.leaveBtn.disabled = false;

  if (!gameScene) {
    startPhaser();
  }

  startVoiceChatNetwork().catch(error => {
    console.warn("Voice chat gagal diinisialisasi.", error);
  });
}

function subscribeRoom() {
  if (!roomRef) return;

  roomRef.on("value", (snap) => {
    roomState = snap.val();
    if (!roomState) {
      const finishedMessage = finishedRoomCleanupCode === roomCode
        ? finishedRoomResultMessage
        : "";
      returnToSetupView(finishedMessage || "Room sudah tidak tersedia.");
      return;
    }

    if (normalRouletteInProgress) {
      const localPlayer = roomState.players?.[mySeat];
      if (roomState.isRolling
        || roomState.status !== "playing"
        || Number(roomState.currentSeat) !== Number(mySeat)
        || roomState.pendingAction
        || roomState.debtState
        || localPlayer?.inJail
        || localPlayer?.bankrupt) {
        normalRouletteInProgress = false;
      }
    }

    if (!isCurrentMembershipValid(roomState)) {
      // Saat tombol Keluar diproses, Firebase memancarkan snapshot lokal lebih
      // dulu. Jangan jalankan cleanup kedua sebelum update leave selesai.
      if (manualLeaveInProgress) return;
      returnToSetupView("Koneksi melewati batas 30 detik atau kamu sudah keluar dari room. Silakan buat atau join room kembali.");
      return;
    }

    ensureLobbyHost(roomState);
    scheduleDisconnectExpiry(roomState);

    const connectedMembers = Object.values(roomState.players || {})
      .filter(player => player?.id && isPlayerConnectedInState(roomState, player));
    if (connectedMembers.length > 0 && roomState.emptySince) {
      roomRef.child("emptySince").set(null).catch(error => {
        console.warn("Gagal membersihkan penanda room kosong.", error);
      });
    }
    if (connectedMembers.length > 0 && roomCleanupCandidateRef) {
      roomCleanupCandidateRef.remove().catch(error => {
        console.warn("Gagal membatalkan kandidat cleanup room aktif.", error);
      });
    }
    if (roomState.status === "finished") {
      scheduleFinishedRoomDeletion(roomState);
    } else {
      scheduleRoomListingSync(roomState);
    }

    if (!roomState.propertyState) {
      roomRef.child("propertyState").set(makeInitialPropertyState());
      return;
    }

    if (!roomState.cardDeckState) {
      roomRef.child("cardDeckState").set(makeInitialCardDeckState());
      return;
    }

    renderUI();
    syncAfkActionTimer(roomState);
    syncVoicePeers(roomState);

    if (gameScene) {
      gameScene.renderRoomState(roomState);
    }

    maybeAnimateLastMove();
    scheduleMovePresentationUi(roomState);
    scheduleActiveMoveResolution(roomState);
    scheduleJailRouletteResolution(roomState);
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
    "menyimpan satu kartu",
    "menggunakan kartu",
    "ulang tahun",
    "perbaikan jalan",
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
    !normalRouletteInProgress &&
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
      [`orderRoll/histories/${seat}`]: histories[seat],
      "orderRoll/activeRollId": rollId,
      "orderRoll/activeSeat": Number(seat)
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
    await roomRef.update({
      isRolling: false,
      "orderRoll/activeRollId": null,
      "orderRoll/activeSeat": null
    });
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
  const delay = Math.max(80, (ROULETTE_SPIN_MS + 120) - elapsed);
  orderRollFinalizeTimer = setTimeout(() => {
    orderRollFinalizeTimer = null;
    finalizeStartingOrderRoll(roulette.id).catch(error => {
      console.error("Gagal menyelesaikan roulette penentuan giliran.", error);
    });
  }, delay);
}

async function applyStartingOrderOutcome(order, rollId) {
  if (!roomRef || !order || !rollId) return false;

  const outcome = order.lastOutcome;
  if (!outcome
    || outcome.rollId !== rollId
    || order.lastProcessedRollId !== rollId) {
    return false;
  }

  const updates = { isRolling: false };

  if (outcome.type === "next") {
    updates.currentSeat = Number(outcome.nextSeat);
  } else if (outcome.type === "tie") {
    const tieQueue = normalizeSeatArray(outcome.tieQueue);
    if (!tieQueue.length) return false;
    updates.currentSeat = tieQueue[0];
  } else if (outcome.type === "completed") {
    const finalOrder = normalizeSeatArray(order.finalOrder);
    const winnerSeat = Number(outcome.winnerSeat);
    if (!finalOrder.length || !Number.isInteger(winnerSeat)) return false;
    updates.status = "playing";
    updates.currentSeat = winnerSeat;
    updates.turnOrder = finalOrder;
  } else {
    return false;
  }

  await roomRef.update(updates);
  return true;
}

async function finalizeStartingOrderRoll(rollId) {
  if (!roomRef || !rollId) return;

  // Hanya node orderRoll yang dikunci melalui transaction. Perubahan status,
  // currentSeat, dan isRolling diterapkan sesudah hasil resolusi berhasil
  // dikunci. Ini menghindari transaction seluruh room dijalankan bersamaan
  // oleh setiap browser yang sedang berlangganan ke room yang sama.
  const orderRef = roomRef.child("orderRoll");
  const transaction = await orderRef.transaction((orderValue) => {
    if (!orderValue || orderValue.completed) return;

    const activeRollId = String(orderValue.activeRollId || rollId);
    if (activeRollId !== rollId || orderValue.lastProcessedRollId === rollId) {
      return;
    }

    const order = { ...orderValue };
    const queue = normalizeSeatArray(order.queue);
    const currentIndex = Number(order.currentIndex || 0);
    const activeSeat = Number(order.activeSeat ?? queue[currentIndex]);

    if (!queue.length
      || !Number.isInteger(activeSeat)
      || Number(queue[currentIndex]) !== activeSeat) {
      return;
    }

    const histories = order.histories || {};
    const activeHistory = normalizeSeatArray(histories[activeSeat]);
    if (!activeHistory.length) return;

    const nextIndex = currentIndex + 1;
    order.lastProcessedRollId = rollId;
    order.activeRollId = null;
    order.activeSeat = null;

    if (nextIndex < queue.length) {
      const nextSeat = queue[nextIndex];
      order.currentIndex = nextIndex;
      order.lastOutcome = { type: "next", rollId, nextSeat };
      return order;
    }

    const stateForRanking = { orderRoll: order };
    const ties = findStartingOrderTies(stateForRanking);
    if (ties.length) {
      const tieQueue = ties.flat().sort((a, b) => a - b);
      order.queue = tieQueue;
      order.currentIndex = 0;
      order.round = Number(order.round || 1) + 1;
      order.lastOutcome = { type: "tie", rollId, tieQueue };
      return order;
    }

    const finalOrder = getStartingOrderRanking(stateForRanking);
    const winnerSeat = finalOrder[0];
    order.completed = true;
    order.finalOrder = finalOrder;
    order.resultId = `${rollId}_result`;
    order.completedAt = Date.now();
    order.lastOutcome = { type: "completed", rollId, winnerSeat };
    return order;
  });

  let updatedOrder = transaction.snapshot?.val() || null;

  // Jika browser lain sudah lebih dahulu mengunci hasil roll, transaction
  // lokal akan abort. Baca state terbaru dan tetap terapkan outcome yang sama
  // secara idempoten agar room tidak macet saat browser pemroses terputus.
  if (!transaction.committed) {
    const latestSnapshot = await orderRef.once("value");
    updatedOrder = latestSnapshot.val();
    if (updatedOrder?.lastProcessedRollId === rollId
      && updatedOrder?.lastOutcome?.rollId === rollId) {
      await applyStartingOrderOutcome(updatedOrder, rollId);
    }
    return;
  }

  const outcome = updatedOrder?.lastOutcome;
  if (outcome?.rollId !== rollId) return;

  await applyStartingOrderOutcome(updatedOrder, rollId);

  if (outcome.type === "tie") {
    const latestRoom = (await roomRef.once("value")).val();
    const names = normalizeSeatArray(outcome.tieQueue)
      .map(seat => latestRoom?.players?.[seat]?.name)
      .filter(Boolean);
    await addRemoteLog(`Nilai roulette penentuan giliran seri. ${names.join(", ")} melakukan roulette ulang.`);
  } else if (outcome.type === "completed") {
    const latestRoom = (await roomRef.once("value")).val();
    const winnerSeat = Number(outcome.winnerSeat);
    const winnerName = latestRoom?.players?.[winnerSeat]?.name || `Pemain ${winnerSeat + 1}`;
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

function getPawnStepArrivalOffset(stepNumber) {
  const step = Math.max(0, Number(stepNumber || 0));
  if (!step) return 0;
  return (step * PAWN_STEP_MS) + (Math.max(0, step - 1) * PAWN_STEP_GAP_MS);
}

function getPawnMoveDuration(steps) {
  return getPawnStepArrivalOffset(Math.max(0, Number(steps || 0)));
}

function makeRouletteMovePresentation(createdAt, from, steps, passedStart = false, directDuration = 0) {
  const startedAt = Number(createdAt || Date.now());
  const normalizedSteps = Math.max(0, Number(steps || 0));
  const rouletteRevealAt = startedAt + ROULETTE_SPIN_MS;
  const pawnStartAt = rouletteRevealAt + PAWN_START_AFTER_RESULT_MS;
  const moveDuration = directDuration > 0
    ? Math.max(220, Number(directDuration))
    : getPawnMoveDuration(normalizedSteps);
  const arrivalAt = pawnStartAt + moveDuration;
  const effectsRevealAt = arrivalAt + EFFECTS_AFTER_ARRIVAL_MS;
  const normalizedFrom = ((Number(from || 0) % BOARD_SIZE) + BOARD_SIZE) % BOARD_SIZE;
  const startStep = passedStart ? BOARD_SIZE - normalizedFrom : 0;
  const startBonusAt = passedStart
    ? pawnStartAt + getPawnStepArrivalOffset(startStep)
    : 0;

  return {
    type: "roulette",
    rouletteRevealAt,
    pawnStartAt,
    arrivalAt,
    effectsRevealAt,
    startBonusAt,
    moveDuration
  };
}

function getMovePresentation(move = roomState?.lastMove) {
  return move?.presentation || null;
}

function getCurrentMoveEffectsRevealAt() {
  return Number(getMovePresentation()?.effectsRevealAt || 0);
}

function getCurrentMovePresentationPhase(now = Date.now()) {
  const move = roomState?.lastMove;
  const presentation = getMovePresentation(move);
  const isCurrentRouletteMove = Boolean(move?.id && roomState?.lastRoulette?.id === move.id);
  if (!isCurrentRouletteMove || !presentation || presentation.type !== "roulette") return "none";
  if (now < Number(presentation.rouletteRevealAt || 0)) return "roulette";
  if (now < Number(presentation.pawnStartAt || 0)) return "result";
  if (now < Number(presentation.arrivalAt || 0)) return "moving";
  if (now < Number(presentation.effectsRevealAt || 0)) return "arrived";
  return "done";
}

function resetLocalAnimationTimeline() {
  if (rouletteRevealTimer) clearTimeout(rouletteRevealTimer);
  if (moveEffectsRevealTimer) clearTimeout(moveEffectsRevealTimer);
  if (activeMoveResolutionTimer) clearTimeout(activeMoveResolutionTimer);
  clearJailRouletteResolutionTimer();
  movePresentationUiTimers.forEach(timer => clearTimeout(timer));
  movePresentationUiTimers = [];
  movePresentationUiMoveId = "";
  rouletteRevealTimer = null;
  moveEffectsRevealTimer = null;
  activeMoveResolutionTimer = null;
  lastAnimatedMoveId = "";
  lastRouletteId = "";
}

function scheduleMoveEffectsRender(revealAt) {
  const target = Number(revealAt || 0);
  if (!target || target <= Date.now()) return;

  if (moveEffectsRevealTimer) clearTimeout(moveEffectsRevealTimer);
  moveEffectsRevealTimer = setTimeout(() => {
    moveEffectsRevealTimer = null;
    if (roomState) renderUI();
  }, Math.max(20, target - Date.now() + 20));
}

function scheduleMovePresentationUi(stateLike = roomState) {
  const move = stateLike?.lastMove;
  const presentation = getMovePresentation(move);
  if (!move?.id || !presentation || presentation.type !== "roulette") return;
  if (movePresentationUiMoveId === move.id) return;

  movePresentationUiTimers.forEach(timer => clearTimeout(timer));
  movePresentationUiTimers = [];
  movePresentationUiMoveId = move.id;

  const boundaries = [
    presentation.rouletteRevealAt,
    presentation.pawnStartAt,
    presentation.arrivalAt,
    presentation.effectsRevealAt
  ].map(Number).filter(value => value > Date.now());

  boundaries.forEach(boundary => {
    const timer = setTimeout(() => {
      if (roomState?.lastMove?.id === move.id) renderUI();
    }, Math.max(20, boundary - Date.now() + 20));
    movePresentationUiTimers.push(timer);
  });
}

async function finalizeActiveMovePresentation(moveId, seat) {
  if (!roomRef) return;

  const latest = (await roomRef.once("value")).val();
  if (!latest?.lastMove || latest.lastMove.id !== moveId || !latest.isRolling) return;
  if (Number(latest.lastMove.seat) !== Number(seat)) return;

  const latestPlayer = latest.players?.[seat];

  if (latest.debtState && Number(latest.debtState.seat) === Number(seat)) {
    await roomRef.update({ isRolling: false });
    return;
  }

  if (latestPlayer?.bankrupt) {
    await finishTurn();
    return;
  }

  if (latest.pendingAction) {
    await roomRef.update({ isRolling: false });
    return;
  }

  // finishTurn memindahkan currentSeat dan membuka isRolling dalam satu update.
  // Jangan membuka lock lebih dulu karena tombol roulette dapat aktif sesaat.
  await finishTurn();
}

function scheduleActiveMoveResolution(stateLike = roomState) {
  const move = stateLike?.lastMove;
  const presentation = getMovePresentation(move);

  if (activeMoveResolutionTimer) {
    clearTimeout(activeMoveResolutionTimer);
    activeMoveResolutionTimer = null;
  }

  if (!roomRef
    || stateLike?.status !== "playing"
    || !stateLike?.isRolling
    || !move?.id
    || !presentation?.effectsRevealAt
    || Number(move.seat) !== Number(mySeat)) {
    return;
  }

  const delay = Math.max(80, Number(presentation.effectsRevealAt) - Date.now());
  activeMoveResolutionTimer = setTimeout(() => {
    activeMoveResolutionTimer = null;
    finalizeActiveMovePresentation(move.id, Number(move.seat)).catch(error => {
      console.error("Gagal menyelesaikan timeline animasi pion.", error);
    });
  }, delay);
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
  if (!canIRoll() || normalRouletteInProgress) return;

  normalRouletteInProgress = true;
  if (els.rollBtn) els.rollBtn.disabled = true;

  try {
  const player = roomState.players[mySeat];
  const result = Math.floor(Math.random() * 12) + 1;
  const currentStreak = Number(player.roulette12Streak || 0);
  const nextStreak = result === 12 ? currentStreak + 1 : 0;
  const isThirdConsecutiveTwelve = result === 12 && nextStreak >= 3;
  const from = Number(player.position || 0);
  const createdAt = Date.now();
  const moveId = `${createdAt}_${mySeat}_${Math.random().toString(16).slice(2)}`;
  const prevRotation = Number(roomState.lastRoulette?.rotation || 0);
  const rotation = getRouletteFinalRotation(prevRotation, result);

  // Angka 12 ketiga tidak menjalankan perpindahan normal. Pemain langsung
  // dipindahkan ke penjara dan rantai roulette 12 di-reset.
  if (isThirdConsecutiveTwelve) {
    const presentation = makeRouletteMovePresentation(createdAt, from, 0, false, DIRECT_PAWN_MOVE_MS);
    const popup = {
      ...makeTripleTwelveJailPopup(player),
      revealAt: presentation.effectsRevealAt
    };
    const updates = {
      isRolling: true,
      lastDice: [0, result],
      lastRoulette: {
        id: moveId,
        result,
        rotation,
        createdAt,
        revealAt: presentation.rouletteRevealAt,
        source: "triple-roulette-12"
      },
      lastMove: {
        id: moveId,
        seat: mySeat,
        from,
        to: 10,
        steps: 0,
        direct: true,
        duration: DIRECT_PAWN_MOVE_MS,
        presentation,
        createdAt
      },
      pendingExtraRoll: null,
      pendingAction: {
        type: "tripleTwelveJail",
        seat: mySeat,
        streak: 3,
        moveId,
        revealAt: presentation.effectsRevealAt
      },
      cardPopup: popup
    };

    updates[`players/${mySeat}/position`] = 10;
    updates[`players/${mySeat}/inJail`] = true;
    updates[`players/${mySeat}/jailAttempts`] = 0;
    updates[`players/${mySeat}/roulette12Streak`] = 0;

    await roomRef.update(updates);
    await addRemoteLog(`${player.name} mendapat roulette 12 tiga kali berturut-turut dan masuk penjara.`);

    scheduleActiveMoveResolution({
      status: "playing",
      isRolling: true,
      lastMove: updates.lastMove
    });
    return;
  }

  const total = result;
  const to = (from + total) % BOARD_SIZE;
  const passedStart = from + total >= BOARD_SIZE;
  const previousLaps = Number(player.lapsCompleted || 0);
  const nextLaps = previousLaps + (passedStart ? 1 : 0);
  const boardActiveAfterMove = previousLaps >= 1 || passedStart;
  const completedFirstLap = previousLaps < 1 && passedStart;
  const presentation = makeRouletteMovePresentation(createdAt, from, total, passedStart);

  let playerMoney = Number(player.money || 0) + (passedStart ? PASS_START_BONUS : 0);
  const updates = {
    isRolling: true,
    lastDice: [0, result],
    lastRoulette: {
      id: moveId,
      result,
      rotation,
      createdAt,
      revealAt: presentation.rouletteRevealAt
    },
    lastMove: {
      id: moveId,
      seat: mySeat,
      from,
      to,
      steps: total,
      dice: [0, result],
      passedStart,
      startBonus: passedStart ? PASS_START_BONUS : 0,
      presentation,
      createdAt
    },
    pendingAction: null,
    pendingExtraRoll: result === 12
      ? {
          seat: mySeat,
          streak: nextStreak,
          moveId,
          createdAt
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

  // State efek petak tetap dihitung dalam satu transaksi Firebase, tetapi UI
  // baru memperlihatkannya satu detik setelah pion tiba.
  if (updates.cardPopup) {
    updates.cardPopup = {
      ...updates.cardPopup,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.pendingAction) {
    updates.pendingAction = {
      ...updates.pendingAction,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.debtState) {
    updates.debtState = {
      ...updates.debtState,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.playerPaymentNotice) {
    updates.playerPaymentNotice = {
      ...updates.playerPaymentNotice,
      revealAt: presentation.effectsRevealAt
    };
  }

  updates[`players/${mySeat}/money`] = playerMoney;

  await roomRef.update(updates);
  await addLogs(logs);

  scheduleActiveMoveResolution({
    status: "playing",
    isRolling: true,
    lastMove: updates.lastMove
  });
  } catch (error) {
    normalRouletteInProgress = false;
    if (roomState) renderUI();
    throw error;
  }
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
    const popupId = `${Date.now()}_${seat}_go_jail_${Math.random().toString(16).slice(2)}`;
    updates[`players/${seat}/position`] = 10;
    updates[`players/${seat}/inJail`] = true;
    updates[`players/${seat}/jailAttempts`] = 0;
    updates[`players/${seat}/roulette12Streak`] = 0;
    updates.pendingExtraRoll = null;
    updates.cardPopup = {
      id: popupId,
      deckType: "system",
      deck: "Penjara",
      title: "MASUK PENJARA!",
      text: `${player.name} berhenti di petak Masuk Penjara dan langsung dipindahkan ke Penjara.`,
      seat,
      playerName: player.name
    };
    updates.pendingAction = {
      type: "goJailPopup",
      seat,
      cardId: popupId
    };
    logs.push(`${player.name} masuk penjara.`);
    return playerMoney;
  }

  if (tile.type === "tax") {
    const popupId = `${Date.now()}_${seat}_tax_${tile.amount}_${Math.random().toString(16).slice(2)}`;
    const exemptionCards = Number(player.taxExemptionCards || 0);

    if (exemptionCards > 0) {
      updates.cardPopup = {
        id: popupId,
        deckType: "tax",
        deck: "Pajak",
        title: `Pajak ${formatMoney(tile.amount)}`,
        text: `${player.name} memiliki kartu Bebas Pajak. Gunakan kartu atau tetap bayar pajak ke Uang Pajak.`,
        seat,
        playerName: player.name
      };
      updates.pendingAction = {
        type: "taxExemptionChoice",
        seat,
        amount: Number(tile.amount),
        cardId: popupId
      };
      logs.push(`${player.name} terkena pajak ${formatMoney(tile.amount)} dan dapat menggunakan kartu Bebas Pajak.`);
      return playerMoney;
    }

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

function makeCardPendingAction(type, seat, card, extra = {}) {
  return {
    type,
    seat: Number(seat),
    cardId: card.id,
    deckKey: card.id.startsWith("community-") ? "community" : "chance",
    ...extra
  };
}

function getOwnedBuildingSummary(ownerSeat, stateLike = roomState) {
  return getOwnedPropertyIds(ownerSeat, stateLike).reduce((summary, propertyId) => {
    const property = PROPERTY_DATA[propertyId];
    if (property?.kind !== "city") return summary;
    const level = Number(stateLike?.propertyState?.[propertyId]?.level || 0);
    if (level >= 5) summary.hotels += 1;
    else summary.houses += Math.max(0, level);
    return summary;
  }, { houses: 0, hotels: 0 });
}

function getCardBuildEligiblePropertyIds(ownerSeat, stateLike = roomState) {
  return getOwnedPropertyIds(ownerSeat, stateLike).filter(propertyId => {
    const property = PROPERTY_DATA[propertyId];
    const level = Number(stateLike?.propertyState?.[propertyId]?.level || 0);
    return property?.kind === "city" && level < 5;
  });
}

function drawAndApplyCard(tileType, seat, playerMoney, updates, logs) {
  const deckKey = tileType === "community" ? "community" : "chance";
  const card = drawNextDeckCard(deckKey, updates);
  const player = roomState.players[seat];
  const popupId = `${Date.now()}_${seat}_${deckKey}_${card.id}_${Math.random().toString(16).slice(2)}`;

  updates.cardPopup = {
    id: popupId,
    deckType: deckKey,
    deck: card.deck,
    cardId: card.id,
    title: card.title,
    text: card.text,
    seat,
    playerName: player.name
  };

  updates.pendingAction = makeCardPendingAction("card", seat, card, { popupId });
  logs.push(`${player.name} mengambil kartu ${card.deck}: ${card.title}.`);

  return applyCardEffect(card, seat, playerMoney, updates, logs);
}

function applyCardEffect(card, seat, playerMoney, updates, logs) {
  const player = roomState.players[seat];
  const effect = card.effect || {};

  if (effect.type === "money") {
    const amount = Number(effect.amount || 0);
    playerMoney += amount;
    logs.push(`${player.name} menerima ${formatMoney(amount)}.`);
    return playerMoney;
  }

  if (effect.type === "payBank") {
    const amount = Number(effect.amount || 0);
    playerMoney -= amount;
    logs.push(`${player.name} membayar ${formatMoney(amount)} untuk ${effect.reason || "biaya kartu"}.`);
    return applyDebtRequirement(seat, playerMoney, updates, `${effect.reason || "biaya kartu"} ${formatMoney(amount)}`, logs);
  }

  if (effect.type === "payTax") {
    const amount = Number(effect.amount || 0);
    playerMoney -= amount;
    updates.taxPool = Number(updates.taxPool ?? roomState.taxPool ?? 0) + amount;
    logs.push(`${player.name} membayar denda ${formatMoney(amount)} ke Uang Pajak.`);
    return applyDebtRequirement(seat, playerMoney, updates, `denda ${formatMoney(amount)}`, logs);
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

  if (effect.type === "birthday") {
    const amount = Number(effect.amount || 0);
    const payerSeats = getActiveSeatsFromState(roomState).filter(activeSeat => Number(activeSeat) !== Number(seat));
    let totalReceived = 0;

    payerSeats.forEach(payerSeat => {
      const payer = roomState.players?.[payerSeat];
      if (!payer || payer.bankrupt) return;
      const nextMoney = Number(payer.money || 0) - amount;
      updates[`players/${payerSeat}/money`] = nextMoney;
      totalReceived += amount;
      logs.push(`${payer.name} membayar ${player.name} ${formatMoney(amount)} untuk ulang tahun.`);
      if (nextMoney < 0) {
        updates[`deferredDebtReasons/${payerSeat}`] = `pembayaran ulang tahun kepada ${player.name}`;
      }
    });

    playerMoney += totalReceived;
    if (totalReceived > 0) {
      logs.push(`${player.name} menerima total ${formatMoney(totalReceived)} dari pemain lain.`);
    }
    return playerMoney;
  }

  if (effect.type === "roadRepair") {
    const summary = getOwnedBuildingSummary(seat, roomState);
    const amount = (summary.houses * Number(effect.houseAmount || 0))
      + (summary.hotels * Number(effect.hotelAmount || 0));
    if (amount > 0) {
      playerMoney -= amount;
      logs.push(`${player.name} membayar perbaikan jalan ${formatMoney(amount)} untuk ${summary.houses} rumah dan ${summary.hotels} hotel.`);
      return applyDebtRequirement(seat, playerMoney, updates, `perbaikan jalan ${formatMoney(amount)}`, logs);
    }
    logs.push(`${player.name} tidak memiliki rumah atau hotel, sehingga tidak membayar biaya perbaikan jalan.`);
    return playerMoney;
  }

  if (effect.type === "storeJailFree") {
    const nextCount = Number(player.jailFreeCards || 0) + 1;
    updates[`players/${seat}/jailFreeCards`] = nextCount;
    logs.push(`${player.name} menyimpan satu kartu Bebas Penjara.`);
    return playerMoney;
  }

  if (effect.type === "storeTaxExemption") {
    const nextCount = Number(player.taxExemptionCards || 0) + 1;
    updates[`players/${seat}/taxExemptionCards`] = nextCount;
    logs.push(`${player.name} menyimpan satu kartu Bebas Pajak.`);
    return playerMoney;
  }

  if (effect.type === "jail") {
    updates[`players/${seat}/position`] = 10;
    updates[`players/${seat}/inJail`] = true;
    updates[`players/${seat}/jailAttempts`] = 0;
    updates[`players/${seat}/roulette12Streak`] = 0;
    updates.pendingExtraRoll = null;
    logs.push(`${player.name} langsung masuk penjara dari kartu ${card.deck}.`);
    return playerMoney;
  }

  if (effect.type === "moveToFreeParking") {
    updates.pendingAction = makeCardPendingAction("cardFreeParking", seat, card, {
      popupId: updates.cardPopup?.id || ""
    });
    logs.push(`${player.name} akan menuju Parkir Bebas setelah kartu ditutup.`);
    return playerMoney;
  }

  if (effect.type === "cardMove") {
    updates.pendingAction = makeCardPendingAction("cardMove", seat, card, {
      targetTile: Number(effect.tile || 0),
      passStartBonus: Number(effect.passStartBonus || 0),
      alwaysMoney: Number(effect.alwaysMoney || 0),
      applyLanding: effect.applyLanding !== false
    });
    logs.push(`${player.name} akan berpindah ke ${getTileName(BOARD[Number(effect.tile || 0)])} setelah kartu ditutup.`);
    return playerMoney;
  }

  if (effect.type === "choiceFineOrChance") {
    updates.pendingAction = makeCardPendingAction("cardChoiceFineOrChance", seat, card, {
      amount: Number(effect.amount || 10)
    });
    return playerMoney;
  }

  if (effect.type === "choiceMoveBack") {
    updates.pendingAction = makeCardPendingAction("cardChoiceMoveBack", seat, card, {
      choices: Array.isArray(effect.choices) ? effect.choices : [2, 5]
    });
    return playerMoney;
  }

  if (effect.type === "chooseBuild") {
    updates.pendingAction = makeCardPendingAction("cardChooseBuild", seat, card, {
      eligiblePropertyIds: getCardBuildEligiblePropertyIds(seat, roomState)
    });
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
  updates.playerPaymentNotice = {
    id: `${Date.now()}_${seat}_${ownerSeat}_${rent}_${Math.random().toString(16).slice(2)}`,
    payerSeat: Number(seat),
    receiverSeat: ownerSeat,
    amount: rent,
    text: `${player.name} membayar ${owner.name} ${formatMoney(rent)}`,
    createdAt: Date.now()
  };

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
      // Kompleks lengkap hanya menggandakan tarif efektif sekali.
      // Daftar harga dasar pada kartu properti tetap tidak berubah.
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
      updates[`deferredDebtReasons/${mySeat}`] = null;
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
      updates[`deferredDebtReasons/${mySeat}`] = null;
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
  if (Number(player.money || 0) < 50) {
    return;
  }

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


function clearJailRouletteResolutionTimer() {
  if (jailRouletteResolutionTimer) {
    clearTimeout(jailRouletteResolutionTimer);
  }
  jailRouletteResolutionTimer = null;
  scheduledJailRouletteId = "";
}

function scheduleJailRouletteResolution(stateLike = roomState) {
  const roulette = stateLike?.lastRoulette;
  const rouletteSeat = Number(roulette?.seat ?? stateLike?.currentSeat);
  const player = stateLike?.players?.[rouletteSeat];
  const canResolve = Boolean(
    roomRef
    && stateLike?.status === "playing"
    && stateLike?.isRolling
    && roulette?.id
    && roulette?.source === "jail"
    && rouletteSeat === Number(mySeat)
    && Number(stateLike.currentSeat) === Number(mySeat)
    && player?.inJail
    && !player?.bankrupt
  );

  if (!canResolve) {
    if (scheduledJailRouletteId && scheduledJailRouletteId !== roulette?.id) {
      clearJailRouletteResolutionTimer();
    }
    return;
  }

  if (scheduledJailRouletteId === roulette.id
    && (jailRouletteResolutionTimer || jailRouletteResolutionRunning)) return;

  clearJailRouletteResolutionTimer();
  scheduledJailRouletteId = roulette.id;
  jailRouletteInProgress = true;

  const revealAt = Number(roulette.revealAt || (Number(roulette.createdAt || Date.now()) + ROULETTE_SPIN_MS));
  const delay = Math.max(80, revealAt - Date.now() + 120);

  jailRouletteResolutionTimer = setTimeout(async () => {
    jailRouletteResolutionTimer = null;
    jailRouletteResolutionRunning = true;
    const resolvingId = scheduledJailRouletteId;

    try {
      await resolveJailRoulette(resolvingId);
    } catch (error) {
      console.error("Gagal menyelesaikan roulette penjara.", error);
    } finally {
      if (scheduledJailRouletteId === resolvingId) {
        scheduledJailRouletteId = "";
      }
      jailRouletteResolutionRunning = false;
      jailRouletteInProgress = false;

      // Jika request sempat gagal sebelum state berubah, snapshot terbaru akan
      // dijadwalkan ulang. Pada proses sukses validasi resolver langsung berhenti.
      setTimeout(() => scheduleJailRouletteResolution(roomState), 180);
    }
  }, delay);
}

function appendMoveRevealTimeline(updates, presentation) {
  if (updates.cardPopup) {
    updates.cardPopup = {
      ...updates.cardPopup,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.pendingAction) {
    updates.pendingAction = {
      ...updates.pendingAction,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.debtState) {
    updates.debtState = {
      ...updates.debtState,
      revealAt: presentation.effectsRevealAt
    };
  }
  if (updates.playerPaymentNotice) {
    updates.playerPaymentNotice = {
      ...updates.playerPaymentNotice,
      revealAt: presentation.effectsRevealAt
    };
  }
}

async function moveAfterThirdJailAttempt(latest, roulette) {
  const seat = Number(roulette.seat ?? mySeat);
  const player = latest?.players?.[seat];
  if (!player?.inJail || Number(latest.currentSeat) !== seat) return;

  roomState = latest;

  const result = Number(roulette.result || 0);
  const from = Number(player.position || 10);
  const to = (from + result) % BOARD_SIZE;
  const passedStart = from + result >= BOARD_SIZE;
  const previousLaps = Number(player.lapsCompleted || 0);
  const nextLaps = previousLaps + (passedStart ? 1 : 0);
  const boardActiveAfterMove = previousLaps >= 1 || passedStart;
  const completedFirstLap = previousLaps < 1 && passedStart;
  const createdAt = Number(roulette.createdAt || Date.now());
  const presentation = makeRouletteMovePresentation(createdAt, from, result, passedStart);

  let playerMoney = Number(player.money || 0) + (passedStart ? PASS_START_BONUS : 0);
  const updates = {
    isRolling: true,
    lastDice: [0, result],
    lastRoulette: {
      ...roulette,
      source: "jail-release",
      revealAt: presentation.rouletteRevealAt
    },
    lastMove: {
      id: roulette.id,
      seat,
      from,
      to,
      steps: result,
      dice: [0, result],
      passedStart,
      startBonus: passedStart ? PASS_START_BONUS : 0,
      presentation,
      createdAt
    },
    pendingAction: null,
    pendingExtraRoll: null
  };

  updates[`players/${seat}/position`] = to;
  updates[`players/${seat}/money`] = playerMoney;
  updates[`players/${seat}/lapsCompleted`] = nextLaps;
  updates[`players/${seat}/inJail`] = false;
  updates[`players/${seat}/jailAttempts`] = 0;
  updates[`players/${seat}/roulette12Streak`] = 0;

  const logs = [
    `${player.name} menyelesaikan percobaan roulette penjara ke-3, bebas dari penjara, dan langsung bergerak ${result} langkah dari petak ${from} ke petak ${to}.`
  ];

  if (passedStart) {
    logs.push(`${player.name} melewati START dan menerima $200.`);
  }

  if (completedFirstLap) {
    logs.push(`${player.name} menyelesaikan putaran pertama. Seluruh petak kini aktif untuk pemain ini.`);
  }

  if (boardActiveAfterMove) {
    playerMoney = applyLandingEffect(to, seat, playerMoney, result, updates, logs);
  }

  appendMoveRevealTimeline(updates, presentation);
  updates[`players/${seat}/money`] = playerMoney;

  await roomRef.update(updates);
  await addLogs(logs);

  scheduleActiveMoveResolution({
    status: "playing",
    isRolling: true,
    lastMove: updates.lastMove
  });
}

async function resolveJailRoulette(rouletteId) {
  if (!roomRef || !rouletteId) return;

  const latest = (await roomRef.once("value")).val();
  const roulette = latest?.lastRoulette;
  const seat = Number(roulette?.seat ?? latest?.currentSeat);
  const player = latest?.players?.[seat];

  if (!latest
    || latest.status !== "playing"
    || !latest.isRolling
    || roulette?.id !== rouletteId
    || roulette?.source !== "jail"
    || seat !== Number(mySeat)
    || Number(latest.currentSeat) !== seat
    || !player?.inJail
    || player?.bankrupt) {
    return;
  }

  const result = Number(roulette.result || 0);
  const attempts = Math.max(1, Number(roulette.attempt || (Number(player.jailAttempts || 0) + 1)));

  // Percobaan ketiga selalu membebaskan pemain dan hasil roulette yang sama
  // langsung dipakai untuk menggerakkan pion. Tidak ada roulette tambahan.
  if (attempts >= 3) {
    await moveAfterThirdJailAttempt(latest, roulette);
    return;
  }

  if (result === 12) {
    // Pertahankan lock sampai seluruh proses keberhasilan selesai agar tidak ada
    // aksi lain yang menyela sebelum status penjara benar-benar dibersihkan.
    await addRemoteLog(`${player.name} mendapat angka 12 pada roulette penjara dan bebas dari penjara. Pemain dapat langsung bermain pada giliran ini.`);
    await roomRef.update({
      [`players/${seat}/inJail`]: false,
      [`players/${seat}/jailAttempts`]: 0,
      [`players/${seat}/roulette12Streak`]: 0,
      [`lastRoulette/source`]: "jail-success",
      isRolling: false
    });
    return;
  }

  // Pada percobaan pertama dan kedua, isRolling sengaja tetap true sampai
  // finishTurn memindahkan currentSeat. Ini menutup celah yang sebelumnya
  // membuat pemain dapat menekan roulette berulang kali dalam satu giliran.
  await roomRef.update({
    [`players/${seat}/jailAttempts`]: attempts
  });
  await addRemoteLog(`${player.name} gagal keluar dari penjara karena roulette mendapat angka ${result}. Percobaan ${attempts}/3; giliran langsung berpindah.`);
  await finishTurn();
}

async function rollForJailRoulette() {
  if (!canIUseJailAction() || jailRouletteInProgress) return;
  jailRouletteInProgress = true;

  const result = Math.floor(Math.random() * 12) + 1;
  const createdAt = Date.now();
  const rouletteId = `${createdAt}_${mySeat}_jail_${Math.random().toString(16).slice(2)}`;

  try {
    const transaction = await roomRef.transaction(room => {
      const player = room?.players?.[mySeat];
      if (!room
        || room.status !== "playing"
        || Number(room.currentSeat) !== Number(mySeat)
        || room.isRolling
        || room.pendingAction
        || room.debtState
        || !player?.inJail
        || player?.bankrupt) {
        return;
      }

      const attempts = Number(player.jailAttempts || 0) + 1;
      const previousRotation = Number(room.lastRoulette?.rotation || 0);
      const rotation = getRouletteFinalRotation(previousRotation, result);

      room.isRolling = true;
      room.pendingExtraRoll = null;
      room.lastDice = [0, result];
      room.lastRoulette = {
        id: rouletteId,
        result,
        rotation,
        createdAt,
        revealAt: createdAt + ROULETTE_SPIN_MS,
        source: "jail",
        seat: Number(mySeat),
        attempt: attempts
      };
      return room;
    });

    if (!transaction.committed) {
      jailRouletteInProgress = false;
      return;
    }

    scheduleJailRouletteResolution(transaction.snapshot.val());
  } catch (error) {
    jailRouletteInProgress = false;
    throw error;
  }
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
  let latest = (await roomRef.once("value")).val();
  if (!latest) return;

  // Setelah kartu terakhir pada satu siklus selesai diproses, deck langsung
  // dikocok ulang menjadi 20/20 sebelum permainan berlanjut.
  const deckResetUpdates = {};
  appendDeckResetUpdates(latest, deckResetUpdates);
  if (Object.keys(deckResetUpdates).length) {
    await roomRef.update(deckResetUpdates);
    latest = (await roomRef.once("value")).val();
    if (!latest) return;
  }

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

  let activeSeats = getActiveSeatsFromState(latest);

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

  const getNextSeat = (seats, currentSeat) => {
    const currentIndex = seats.indexOf(Number(currentSeat));
    return currentIndex === -1 ? seats[0] : seats[(currentIndex + 1) % seats.length];
  };

  let nextSeat = getNextSeat(activeSeats, latest.currentSeat);
  const updates = {
    isRolling: false,
    pendingAction: null,
    pendingExtraRoll: null,
    debtState: null,
    cardPopup: null
  };
  const bankruptcyLogs = [];
  let safety = 0;

  // Pembayaran antar pemain dari kartu ulang tahun dapat membuat pemain lain
  // minus di luar gilirannya. Saat gilirannya tiba, pemain wajib menjual aset.
  while (activeSeats.length > 1 && safety < MAX_GAME_PLAYERS + 2) {
    safety += 1;
    const candidate = latest.players?.[nextSeat];
    const candidateMoney = Number(candidate?.money || 0);
    if (candidateMoney >= 0) break;

    const ownedIds = getOwnedPropertyIds(nextSeat, latest);
    const reason = latest.deferredDebtReasons?.[nextSeat] || "kewajiban pembayaran kartu";

    if (ownedIds.length > 0) {
      updates.currentSeat = nextSeat;
      updates.debtState = {
        seat: Number(nextSeat),
        reason,
        deficit: Math.abs(candidateMoney),
        resumeTurn: true,
        createdAt: Date.now()
      };
      updates[`deferredDebtReasons/${nextSeat}`] = null;
      await roomRef.update(updates);
      await addRemoteLog(`${candidate?.name || "Pemain"} harus menjual properti untuk menutup saldo minus ${formatMoney(Math.abs(candidateMoney))}.`);
      return;
    }

    updates[`players/${nextSeat}/money`] = 0;
    updates[`players/${nextSeat}/bankrupt`] = true;
    updates[`players/${nextSeat}/inJail`] = false;
    updates[`players/${nextSeat}/jailAttempts`] = 0;
    updates[`deferredDebtReasons/${nextSeat}`] = null;
    bankruptcyLogs.push(`${candidate?.name || "Pemain"} bangkrut karena tidak memiliki properti untuk menutup saldo minus.`);
    activeSeats = activeSeats.filter(seat => Number(seat) !== Number(nextSeat));
    if (activeSeats.length <= 1) break;
    nextSeat = getNextSeat(activeSeats, latest.currentSeat);
  }

  if (activeSeats.length <= 1) {
    await roomRef.update(updates);
    if (bankruptcyLogs.length) await addLogs(bankruptcyLogs);
    await finishTurn();
    return;
  }

  updates.currentSeat = nextSeat;
  await roomRef.update(updates);
  if (bankruptcyLogs.length) await addLogs(bankruptcyLogs);
  await addRemoteLog(`Giliran berpindah ke ${latest.players[nextSeat]?.name || `Pemain ${nextSeat + 1}`}.`);
}


function getAfkTimeoutForKind(kind) {
  return Number(AFK_ACTION_TIMEOUTS_MS[kind] || 0);
}

function getAfkPendingActionLabel(actionType) {
  const labels = {
    buy: "Tidak membeli otomatis",
    build: "Melewati pembangunan otomatis",
    freeParkingChoice: "Memilih bonus Parkir Bebas otomatis",
    freeMove: "Memilih petak tujuan otomatis",
    roulette12Bonus: "Roulette bonus otomatis",
    tripleTwelveJail: "Menutup informasi penjara otomatis",
    goJailPopup: "Menutup informasi penjara otomatis",
    taxExemptionChoice: "Menggunakan kartu Bebas Pajak otomatis",
    cardMove: "Menjalankan perpindahan kartu otomatis",
    cardFreeParking: "Menjalankan kartu Parkir Bebas otomatis",
    cardChoiceFineOrChance: "Membayar denda kartu otomatis",
    cardChoiceMoveBack: "Memilih langkah mundur otomatis",
    cardChooseBuild: "Melewati pembangunan kartu otomatis",
    card: "Menutup kartu otomatis",
    taxPopup: "Menutup informasi pajak otomatis"
  };
  return labels[actionType] || "Menjalankan aksi otomatis";
}

function getAfkActionDescriptor(stateLike = roomState) {
  if (!stateLike || !roomRef || !["orderRoll", "playing"].includes(stateLike.status)) return null;
  if (isGamePausedForDisconnect(stateLike) || stateLike.isRolling) return null;

  if (stateLike.status === "orderRoll") {
    const order = stateLike.orderRoll;
    const queue = normalizeSeatArray(order?.queue);
    const currentIndex = Number(order?.currentIndex || 0);
    const seat = Number(queue[currentIndex] ?? stateLike.currentSeat);
    if (!Number.isInteger(seat) || order?.completed) return null;
    const kind = "startingOrder";
    return {
      kind,
      seat,
      label: "Roulette penentuan giliran otomatis",
      durationMs: getAfkTimeoutForKind(kind),
      availableAt: Date.now(),
      signature: [
        stateLike.status,
        kind,
        seat,
        currentIndex,
        Number(order?.round || 1),
        normalizeSeatArray(order?.histories?.[seat]).length,
        String(order?.activeRollId || "")
      ].join("|")
    };
  }

  const seat = Number(stateLike.currentSeat);
  const player = stateLike.players?.[seat];
  if (!Number.isInteger(seat) || !player || player.bankrupt || !player.inGame) return null;

  const action = stateLike.pendingAction;
  if (action && Number(action.seat) === seat) {
    const kind = String(action.type || "");
    const durationMs = getAfkTimeoutForKind(kind);
    if (!durationMs) return null;
    const revealAt = Number(action.revealAt || stateLike.cardPopup?.revealAt || 0);
    return {
      kind,
      seat,
      label: getAfkPendingActionLabel(kind),
      durationMs,
      availableAt: Math.max(Date.now(), revealAt || 0),
      signature: [
        stateLike.status,
        kind,
        seat,
        String(action.cardId || action.popupId || action.propertyId || ""),
        Number(action.revealAt || 0),
        String(stateLike.cardPopup?.id || ""),
        String(stateLike.lastMove?.id || ""),
        String(stateLike.lastRoulette?.id || "")
      ].join("|")
    };
  }

  if (stateLike.debtState && Number(stateLike.debtState.seat) === seat) {
    const kind = "debt";
    return {
      kind,
      seat,
      label: "Menjual properti otomatis",
      durationMs: getAfkTimeoutForKind(kind),
      availableAt: Date.now(),
      signature: [
        stateLike.status,
        kind,
        seat,
        Number(stateLike.debtState.createdAt || 0),
        Number(player.money || 0),
        getOwnedPropertyIds(seat, stateLike).length
      ].join("|")
    };
  }

  if (player.inJail) {
    const kind = "jail";
    return {
      kind,
      seat,
      label: "Roulette penjara otomatis",
      durationMs: getAfkTimeoutForKind(kind),
      availableAt: Date.now(),
      signature: [stateLike.status, kind, seat, Number(player.jailAttempts || 0), String(stateLike.lastRoulette?.id || "")].join("|")
    };
  }

  const kind = "roll";
  return {
    kind,
    seat,
    label: "Roulette otomatis",
    durationMs: getAfkTimeoutForKind(kind),
    availableAt: Date.now(),
    signature: [
      stateLike.status,
      kind,
      seat,
      Number(player.position || 0),
      Number(player.roulette12Streak || 0),
      String(stateLike.lastRoulette?.id || "")
    ].join("|")
  };
}

function renderAfkActionTimer() {
  const descriptor = afkActionDescriptor;
  const visible = Boolean(descriptor && afkActionDeadlineAt > 0);
  const remainingMs = visible ? Math.max(0, afkActionDeadlineAt - Date.now()) : 0;
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const actorName = descriptor ? (roomState?.players?.[descriptor.seat]?.name || "Pemain") : "";
  const label = descriptor
    ? (Number(descriptor.seat) === Number(mySeat) ? descriptor.label : `${actorName}: ${descriptor.label}`)
    : "";
  const urgent = visible && seconds <= 5;

  if (els.turnTimer) {
    els.turnTimer.classList.toggle("hidden", !visible);
    els.turnTimer.classList.toggle("urgent", urgent);
  }
  if (els.turnTimerLabel) els.turnTimerLabel.textContent = label;
  if (els.turnTimerValue) els.turnTimerValue.textContent = String(seconds);

  const orderVisible = visible && descriptor?.kind === "startingOrder";
  if (els.orderAfkTimer) {
    els.orderAfkTimer.classList.toggle("hidden", !orderVisible);
    els.orderAfkTimer.classList.toggle("urgent", orderVisible && urgent);
  }
  if (els.orderAfkTimerValue) els.orderAfkTimerValue.textContent = String(seconds);

  const cardVisible = visible
    && Boolean(roomState?.pendingAction)
    && !localPopupOpen;
  if (els.cardAfkTimer) {
    els.cardAfkTimer.classList.toggle("hidden", !cardVisible);
    els.cardAfkTimer.classList.toggle("urgent", cardVisible && urgent);
  }
  if (els.cardAfkTimerValue) els.cardAfkTimerValue.textContent = String(seconds);
}

function clearAfkActionTimer() {
  if (afkActionTimeout) clearTimeout(afkActionTimeout);
  if (afkCountdownInterval) clearInterval(afkCountdownInterval);
  afkActionTimeout = null;
  afkCountdownInterval = null;
  afkActionSignature = "";
  afkActionDeadlineAt = 0;
  afkActionDescriptor = null;
  afkAutoActionInProgress = false;
  renderAfkActionTimer();
}

function armAfkActionTimeout(delayMs) {
  if (afkActionTimeout) clearTimeout(afkActionTimeout);
  afkActionDeadlineAt = Date.now() + Math.max(0, Number(delayMs || 0));
  renderAfkActionTimer();
  afkActionTimeout = setTimeout(() => {
    afkActionTimeout = null;
    handleAfkActionTimeout().catch(error => {
      console.warn("Aksi otomatis AFK gagal dijalankan.", error);
    });
  }, Math.max(30, Number(delayMs || 0)));
}

function syncAfkActionTimer(stateLike = roomState, { force = false } = {}) {
  const descriptor = getAfkActionDescriptor(stateLike);
  if (!descriptor) {
    clearAfkActionTimer();
    return;
  }

  if (!force && afkActionSignature === descriptor.signature && afkActionDeadlineAt > 0) {
    afkActionDescriptor = descriptor;
    renderAfkActionTimer();
    return;
  }

  if (afkActionTimeout) clearTimeout(afkActionTimeout);
  if (afkCountdownInterval) clearInterval(afkCountdownInterval);
  afkActionSignature = descriptor.signature;
  afkActionDescriptor = descriptor;
  const delay = Math.max(0, Number(descriptor.availableAt || Date.now()) - Date.now()) + descriptor.durationMs;
  armAfkActionTimeout(delay);
  afkCountdownInterval = setInterval(renderAfkActionTimer, 250);
}

function chooseAfkDebtPropertyId(stateLike, seat) {
  const player = stateLike?.players?.[seat];
  if (!player) return "";
  const deficit = Math.max(0, Math.abs(Number(player.money || 0)));
  const candidates = getOwnedPropertyIds(seat, stateLike)
    .map(propertyId => ({ propertyId, value: getPropertyLiquidationValue(propertyId, stateLike) }))
    .filter(item => item.value > 0);
  if (!candidates.length) return "";

  const covering = candidates
    .filter(item => item.value >= deficit)
    .sort((a, b) => a.value - b.value || a.propertyId.localeCompare(b.propertyId));
  if (covering.length) return covering[0].propertyId;

  candidates.sort((a, b) => b.value - a.value || a.propertyId.localeCompare(b.propertyId));
  return candidates[0].propertyId;
}

async function waitForAfkStateUpdate(delayMs = 180) {
  await new Promise(resolve => setTimeout(resolve, delayMs));
  if (!roomRef) return null;
  const latest = (await roomRef.once("value")).val();
  if (latest) roomState = latest;
  return latest;
}

async function executeAfkAutomaticAction(descriptor) {
  if (!roomRef || !descriptor || Number(descriptor.seat) !== Number(mySeat)) return;

  const latest = (await roomRef.once("value")).val();
  if (!latest) return;
  roomState = latest;
  const currentDescriptor = getAfkActionDescriptor(latest);
  if (!currentDescriptor || currentDescriptor.signature !== descriptor.signature) return;

  switch (descriptor.kind) {
    case "startingOrder":
      await rollStartingOrder();
      return;
    case "roll":
      if (latest.orderRoll?.completed && latest.orderRoll?.resultId) {
        localDismissedOrderResultId = latest.orderRoll.resultId;
        renderOrderOverlay();
      }
      await rollDice();
      return;
    case "jail":
      await rollForJailRoulette();
      return;
    case "buy":
    case "build":
      await skipCurrentAction();
      return;
    case "freeParkingChoice": {
      if (Number(latest.taxPool || 0) > 0) {
        await collectFreeParkingTax();
        return;
      }
      await beginFreeMoveSelection();
      const afterSelection = await waitForAfkStateUpdate(220);
      const eligible = normalizeTileIndices(afterSelection?.pendingAction?.eligibleIndices);
      if (afterSelection?.pendingAction?.type === "freeMove" && eligible.length) {
        const target = eligible[Math.floor(Math.random() * eligible.length)];
        await chooseFreeMoveTarget(target);
      }
      return;
    }
    case "freeMove": {
      const eligible = normalizeTileIndices(latest.pendingAction?.eligibleIndices);
      if (eligible.length) {
        const target = eligible[Math.floor(Math.random() * eligible.length)];
        await chooseFreeMoveTarget(target);
      }
      return;
    }
    case "roulette12Bonus": {
      await acceptRoulette12Bonus();
      await waitForAfkStateUpdate(220);
      if (canIRoll()) await rollDice();
      return;
    }
    case "tripleTwelveJail":
    case "goJailPopup":
    case "cardMove":
    case "cardFreeParking":
    case "card":
    case "taxPopup":
      await closeCardAndFinishTurn();
      return;
    case "taxExemptionChoice":
      if (Number(latest.players?.[mySeat]?.taxExemptionCards || 0) > 0) {
        await useTaxExemptionCard();
      } else {
        await payPendingTax();
      }
      return;
    case "cardChoiceFineOrChance":
      await payCardFineInsteadOfChance();
      return;
    case "cardChoiceMoveBack": {
      const choices = normalizeTileIndices(latest.pendingAction?.choices).filter(value => [2, 5].includes(value));
      const selected = choices.length ? choices[Math.floor(Math.random() * choices.length)] : 2;
      await chooseCardMoveBack(selected);
      return;
    }
    case "cardChooseBuild":
      await skipCardSpecialAction();
      return;
    case "debt": {
      const propertyId = chooseAfkDebtPropertyId(latest, mySeat);
      if (!propertyId) return;
      renderActionPanel();
      const select = document.getElementById("debtPropertySelect");
      if (!select) return;
      select.value = propertyId;
      await sellSelectedPropertyForDebt();
      return;
    }
    default:
      return;
  }
}

async function handleAfkActionTimeout() {
  const descriptor = afkActionDescriptor;
  if (!descriptor || afkAutoActionInProgress) return;

  const currentDescriptor = getAfkActionDescriptor(roomState);
  if (!currentDescriptor || currentDescriptor.signature !== descriptor.signature) {
    syncAfkActionTimer(roomState, { force: true });
    return;
  }

  // Pointer/tombol yang ditekan tepat saat timer habis diberi kesempatan untuk
  // menyelesaikan handler manual lebih dulu agar tidak terjadi dua keputusan.
  if (Number(descriptor.seat) === Number(mySeat)
    && Date.now() - lastLocalGameInteractionAt < AFK_MANUAL_INTERACTION_GRACE_MS) {
    armAfkActionTimeout(AFK_RETRY_AFTER_INTERACTION_MS);
    return;
  }

  if (Number(descriptor.seat) !== Number(mySeat)) {
    renderAfkActionTimer();
    return;
  }

  afkAutoActionInProgress = true;
  try {
    await executeAfkAutomaticAction(descriptor);
  } finally {
    afkAutoActionInProgress = false;
    setTimeout(() => {
      if (roomRef && roomState) syncAfkActionTimer(roomState, { force: true });
    }, 350);
  }
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
    const phase = getCurrentMovePresentationPhase();
    if (roomState?.lastRoulette?.source === "jail") {
      els.statusText.textContent = "Roulette penjara sedang berputar. Pemain harus mendapat angka 12 untuk bebas.";
    } else if (phase === "roulette") {
      els.statusText.textContent = "Roulette sedang berputar. Hasil akan muncul setelah putaran selesai.";
    } else if (phase === "result") {
      els.statusText.textContent = "Hasil roulette sudah keluar. Pion akan mulai bergerak dalam 1 detik.";
    } else if (phase === "moving") {
      els.statusText.textContent = "Pion sedang bergerak menuju petak tujuan.";
    } else if (phase === "arrived") {
      els.statusText.textContent = "Pion sudah tiba. Menyiapkan efek petak...";
    } else if (phase === "none") {
      els.statusText.textContent = "Pion sedang bergerak. Tunggu sampai proses selesai.";
    } else {
      els.statusText.textContent = "Tunggu sampai proses giliran selesai.";
    }
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
    } else if (roomState.pendingAction.type === "goJailPopup") {
      els.statusText.textContent = `${actor?.name || "Pemain aktif"} berhenti di petak Masuk Penjara dan dipindahkan ke Penjara.`;
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
  renderPlayerPaymentToast();
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

  if (!shouldShow) {
    if (disconnectCountdownTimer) clearInterval(disconnectCountdownTimer);
    disconnectCountdownTimer = null;
    return;
  }

  const renderCountdown = () => {
    if (!roomState) return;
    const currentDisconnected = getDisconnectedGamePlayers(roomState);
    if (!currentDisconnected.length) return;

    const names = currentDisconnected.map(player => player.name || `Pemain ${Number(player.seat) + 1}`);
    const nameText = names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} dan ${names[names.length - 1]}`;
    const remainingValues = currentDisconnected
      .map(getDisconnectDeadline)
      .filter(deadline => deadline > 0)
      .map(deadline => Math.max(0, deadline - Date.now()))
      .filter(value => Number.isFinite(value));
    const remainingMs = remainingValues.length ? Math.min(...remainingValues) : DISCONNECT_GRACE_MS;
    const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

    if (els.disconnectTitle) els.disconnectTitle.textContent = "Permainan Dijeda";
    if (els.disconnectText) {
      els.disconnectText.textContent = `Menunggu ${nameText} terhubung kembali. Jika tidak kembali, pemain akan dikeluarkan otomatis.`;
    }
    if (els.disconnectCountdown) {
      els.disconnectCountdown.textContent = `${remainingSeconds} detik`;
    }
  };

  renderCountdown();
  if (!disconnectCountdownTimer) {
    disconnectCountdownTimer = setInterval(() => {
      renderCountdown();
      expireDisconnectedPlayers();
    }, 1000);
  }
}

async function handleDisconnectLeave() {
  if (!roomRef || mySeat === null) {
    await returnToSetupView();
    return;
  }
  await leaveRoom();
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
    const jailCards = Number(player.jailFreeCards || 0);
    const canPayFine = enabled && Number(player.money || 0) >= 50;
    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(player.name)} di Penjara</div>
      <div class="action-sub">
        Percobaan keluar: ${Number(player.jailAttempts || 0)}/3. Setiap giliran hanya tersedia satu percobaan roulette.
        Dapatkan angka 12 untuk langsung bebas. Pada percobaan ke-3, pemain otomatis bebas dan langsung maju sesuai hasil roulette tersebut.
      </div>
      ${jailCards > 0 ? `
        <div class="action-row single">
          <button class="primary" onclick="useJailFreeCard(event)" ${enabled ? "" : "disabled"}>Gunakan Kartu Bebas Penjara (${jailCards})</button>
        </div>
      ` : ""}
      <div class="action-row">
        <button class="gold" onclick="rollForJailRoulette()" ${enabled ? "" : "disabled"}>Coba Roulette 12</button>
        <button class="primary" onclick="payJailFine()" ${canPayFine ? "" : "disabled"} title="${canPayFine ? "Bayar $50 untuk bebas" : "Uang tidak cukup untuk membayar $50"}">Bayar $50 Bebas</button>
      </div>
      ${Number(player.money || 0) < 50 ? `<div class="action-sub jail-insufficient-note">Uang tidak cukup. Gunakan kartu Bebas Penjara atau coba Roulette 12.</div>` : ""}
    `;
    return;
  }

  if (roomState.isRolling) {
    const phase = getCurrentMovePresentationPhase();
    if (roomState?.lastRoulette?.source === "jail") {
      els.actionPanel.innerHTML = `
        <div class="action-title">Roulette Penjara</div>
        <div class="action-sub">Roulette sedang berputar. Angka 12 akan membebaskan pemain tanpa membayar.</div>
      `;
    } else if (phase === "roulette") {
      els.actionPanel.innerHTML = `
        <div class="action-title">Roulette Berputar</div>
        <div class="action-sub">Hasil masih disembunyikan sampai animasi roulette selesai.</div>
      `;
    } else if (phase === "result") {
      els.actionPanel.innerHTML = `
        <div class="action-title">Hasil Roulette</div>
        <div class="action-sub">Pion akan mulai bergerak satu detik setelah hasil muncul.</div>
      `;
    } else if (phase === "moving") {
      els.actionPanel.innerHTML = `
        <div class="action-title">Pion Bergerak</div>
        <div class="action-sub">Tunggu pion sampai benar-benar tiba di petak tujuan.</div>
      `;
    } else if (phase === "arrived" || phase === "done") {
      els.actionPanel.innerHTML = `
        <div class="action-title">Memproses Petak</div>
        <div class="action-sub">Pion sudah tiba. Efek petak akan muncul sesaat lagi.</div>
      `;
    } else {
      els.actionPanel.innerHTML = `
        <div class="action-title">Pion Bergerak</div>
        <div class="action-sub">Tunggu pion sampai proses perpindahan selesai.</div>
      `;
    }
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

  if (action.type === "goJailPopup") {
    els.actionPanel.innerHTML = `
      <div class="action-title">MASUK PENJARA</div>
      <div class="action-sub">${escapeHTML(actor?.name || "Pemain aktif")} berhenti di petak Masuk Penjara dan dipindahkan ke Penjara.</div>
      <div class="action-row single">
        <button class="primary" onclick="closeCardAndFinishTurn()" ${enabled ? "" : "disabled"}>Tutup & Lanjutkan</button>
      </div>
    `;
    return;
  }

  if (action.type === "taxExemptionChoice") {
    const amount = Number(action.amount || 0);
    const cards = Number(actor?.taxExemptionCards || 0);
    els.actionPanel.innerHTML = `
      <div class="action-title">PILIH AKSI PAJAK</div>
      <div class="action-sub">${escapeHTML(actor?.name || "Pemain")} dapat menggunakan kartu Bebas Pajak atau membayar ${formatMoney(amount)} ke Uang Pajak.</div>
      <div class="action-row">
        <button class="gold" onclick="useTaxExemptionCard(event)" ${enabled && cards > 0 ? "" : "disabled"}>Gunakan Kartu (${cards})</button>
        <button class="primary" onclick="payPendingTax(event)" ${enabled ? "" : "disabled"}>Bayar ${formatMoney(amount)}</button>
      </div>
    `;
    return;
  }

  if (action.type === "cardMove") {
    els.actionPanel.innerHTML = `
      <div class="action-title">${escapeHTML(roomState.cardPopup?.title || "Pindah dari Kartu")}</div>
      <div class="action-sub">Tutup kartu untuk memindahkan pion ke ${escapeHTML(getTileName(BOARD[Number(action.targetTile || 0)]))}. Efek petak tujuan tetap berlaku.</div>
      <div class="action-row single">
        <button class="primary" onclick="closeCardAndFinishTurn()" ${enabled ? "" : "disabled"}>Tutup & Bergerak</button>
      </div>
    `;
    return;
  }

  if (action.type === "cardChoiceFineOrChance") {
    const amount = Number(action.amount || 10);
    els.actionPanel.innerHTML = `
      <div class="action-title">PILIH EFEK KARTU</div>
      <div class="action-sub">Bayar denda ${formatMoney(amount)} atau ambil satu kartu Kesempatan.</div>
      <div class="action-row">
        <button class="danger" onclick="payCardFineInsteadOfChance(event)" ${enabled ? "" : "disabled"}>Bayar ${formatMoney(amount)}</button>
        <button class="primary" onclick="drawChanceInsteadOfFine(event)" ${enabled ? "" : "disabled"}>Ambil Kesempatan</button>
      </div>
    `;
    return;
  }

  if (action.type === "cardChoiceMoveBack") {
    els.actionPanel.innerHTML = `
      <div class="action-title">PILIH MUNDUR</div>
      <div class="action-sub">Pilih mundur 2 petak atau 5 petak. Efek petak tempat berhenti tetap dijalankan.</div>
      <div class="action-row">
        <button class="gold" onclick="chooseCardMoveBack(2, event)" ${enabled ? "" : "disabled"}>Mundur 2</button>
        <button class="primary" onclick="chooseCardMoveBack(5, event)" ${enabled ? "" : "disabled"}>Mundur 5</button>
      </div>
    `;
    return;
  }

  if (action.type === "cardChooseBuild") {
    const eligibleIds = getCardBuildEligiblePropertyIds(Number(action.seat), roomState);
    const options = eligibleIds.map(propertyId => {
      const property = PROPERTY_DATA[propertyId];
      const level = Number(roomState.propertyState?.[propertyId]?.level || 0);
      const nextLabel = level >= 4 ? "Hotel" : `Rumah ${level + 1}`;
      return `<option value="${escapeHTML(propertyId)}">${escapeHTML(property.name)} — ${nextLabel} (${formatMoney(property.buildingCost)})</option>`;
    }).join("");
    els.actionPanel.innerHTML = `
      <div class="action-title">BANGUN DARI KARTU</div>
      <div class="action-sub">Pilih satu kota milikmu. Biaya mengikuti harga bangunan kota dan level bertambah satu tahap.</div>
      ${eligibleIds.length ? `
        <div class="free-move-mobile-picker">
          <select id="cardBuildPropertySelectPanel" aria-label="Pilih tanah untuk dibangun">${options}</select>
          <button class="primary" onclick="buildSelectedPropertyFromCard(event)" ${enabled ? "" : "disabled"}>Bangun</button>
        </div>
      ` : `<div class="action-sub">Tidak ada kota milikmu yang masih dapat dibangun.</div>`}
      <div class="action-row single">
        <button class="danger" onclick="skipCardSpecialAction(event)" ${enabled ? "" : "disabled"}>Lewati Kartu</button>
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
  const revealAt = Number(roulette.revealAt || (Number(roulette.createdAt || 0) + ROULETTE_SPIN_MS));
  const isWaitingForResult = Boolean(roulette.id && result && Date.now() < revealAt);

  const showResult = () => {
    if (roomState?.lastRoulette?.id !== roulette.id) return;
    if (els.rouletteResult) els.rouletteResult.textContent = result || "-";
    if (els.rouletteCaption) els.rouletteCaption.textContent = result || "-";
  };

  if (isWaitingForResult) {
    if (els.rouletteResult) els.rouletteResult.textContent = "";
    if (els.rouletteCaption) els.rouletteCaption.textContent = "-";
  } else {
    showResult();
  }

  if (!els.rouletteWheel) return;

  if (roulette.id && roulette.id !== lastRouletteId) {
    lastRouletteId = roulette.id;
    if (rouletteRevealTimer) clearTimeout(rouletteRevealTimer);

    const elapsed = Math.max(0, Date.now() - Number(roulette.createdAt || Date.now()));
    const remainingSpin = Math.max(0, ROULETTE_SPIN_MS - elapsed);

    if (remainingSpin > 30) {
      playRouletteSpinSound(roulette.id, remainingSpin);
      els.rouletteWheel.style.transition = `transform ${remainingSpin}ms cubic-bezier(.12,.72,.14,1)`;
      requestAnimationFrame(() => {
        els.rouletteWheel.style.transform = `rotate(${Number(roulette.rotation || 0)}deg)`;
      });

      rouletteRevealTimer = setTimeout(() => {
        rouletteRevealTimer = null;
        showResult();
      }, Math.max(20, revealAt - Date.now()));
    } else {
      els.rouletteWheel.style.transition = "none";
      els.rouletteWheel.style.transform = `rotate(${Number(roulette.rotation || 0)}deg)`;
      showResult();
    }
  } else {
    // Snapshot Firebase tambahan tidak boleh memulai ulang animasi roulette.
    if (!isWaitingForResult) {
      els.rouletteWheel.style.transition = "none";
      els.rouletteWheel.style.transform = `rotate(${Number(roulette.rotation || 0)}deg)`;
    }
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

function clearRouletteSpinSound() {
  rouletteSoundTimers.forEach(timer => clearTimeout(timer));
  rouletteSoundTimers = [];
}

function playRouletteSpinSound(soundId, durationMs = ROULETTE_SPIN_MS) {
  if (!soundId || rouletteSoundId === soundId) return;
  rouletteSoundId = soundId;
  clearRouletteSpinSound();

  const audioContext = unlockMoneyAudio();
  if (!audioContext || audioContext.state !== "running") return;

  const duration = Math.max(300, Number(durationMs || ROULETTE_SPIN_MS));
  const ticks = 22;

  for (let index = 0; index < ticks; index++) {
    const progress = index / Math.max(1, ticks - 1);
    const easedProgress = 1 - Math.pow(1 - progress, 1.7);
    const delay = Math.round(easedProgress * Math.max(0, duration - 80));
    const timer = setTimeout(() => {
      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(760 + (progress * 260), now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.025, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.045);
    }, delay);
    rouletteSoundTimers.push(timer);
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

function buildTimedMoneyChanges(seat, fromMoney, toMoney, state) {
  const from = Number(fromMoney || 0);
  const to = Number(toMoney || 0);
  const move = roomState?.lastMove;
  const presentation = getMovePresentation(move);
  const isFreshRouletteMove = Boolean(
    roomState?.isRolling
    && move?.id
    && ["roulette", "cardMove"].includes(presentation?.type)
    && state.lastMoveMoneyId !== move.id
  );

  if (!isFreshRouletteMove) {
    return [{ from, to, delta: to - from, notBefore: 0 }];
  }

  state.lastMoveMoneyId = move.id;
  const effectAt = Number(presentation.effectsRevealAt || 0);

  // Bonus START ditampilkan tepat ketika pion mencapai petak START. Jika pada
  // langkah yang sama ada sewa/pajak/kartu, perubahan sisanya baru tampil
  // setelah pion tiba di tujuan dan jeda efek selesai.
  if (Number(move.seat) === Number(seat) && move.passedStart && Number(move.startBonus || 0) > 0) {
    const bonus = Number(move.startBonus || PASS_START_BONUS);
    const afterStart = from + bonus;
    const changes = [{
      from,
      to: afterStart,
      delta: bonus,
      notBefore: Number(presentation.startBonusAt || presentation.pawnStartAt || 0)
    }];

    if (afterStart !== to) {
      changes.push({
        from: afterStart,
        to,
        delta: to - afterStart,
        notBefore: effectAt
      });
    }
    return changes;
  }

  return [{
    from,
    to,
    delta: to - from,
    notBefore: effectAt
  }];
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
      settleTimer: null,
      lastMoveMoneyId: ""
    };
    playerMoneyAnimationStates.set(normalizedSeat, state);
    return state;
  }

  if (normalizedMoney !== state.observed) {
    const changes = buildTimedMoneyChanges(normalizedSeat, state.observed, normalizedMoney, state);
    state.queue.push(...changes.filter(change => Number(change.delta || 0) !== 0));
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
    const waitUntil = Number(changeData.notBefore || 0);
    const waitMs = Math.max(0, waitUntil - Date.now());
    if (waitMs > 0) {
      await waitForMoneyAnimation(waitMs);
      if (generation !== moneyAnimationGeneration) return;
    }

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


function isVoiceChatSupported() {
  return Boolean(
    window.RTCPeerConnection
    && navigator.mediaDevices
    && typeof navigator.mediaDevices.getUserMedia === "function"
  );
}

function getVoiceIceServers() {
  const configured = window.VOICE_ICE_SERVERS;
  if (Array.isArray(configured) && configured.length) return configured;
  return DEFAULT_VOICE_ICE_SERVERS;
}

function getVoiceSpeakerPreferenceKey(remoteSeat) {
  const remote = roomState?.players?.[remoteSeat];
  const identity = remote?.id || `seat-${remoteSeat}`;
  return `atho_voice_speaker_muted_${roomCode}_${identity}`;
}

function isRemoteSpeakerMuted(remoteSeat) {
  const key = getVoiceSpeakerPreferenceKey(remoteSeat);
  if (voiceSpeakerMuted.has(key)) return voiceSpeakerMuted.get(key) === true;

  let muted = false;
  try {
    muted = localStorage.getItem(key) === "1";
  } catch (error) {
    console.warn("Preferensi speaker tidak dapat dibaca.", error);
  }

  voiceSpeakerMuted.set(key, muted);
  return muted;
}

function saveRemoteSpeakerMuted(remoteSeat, muted) {
  const key = getVoiceSpeakerPreferenceKey(remoteSeat);
  voiceSpeakerMuted.set(key, Boolean(muted));
  try {
    localStorage.setItem(key, muted ? "1" : "0");
  } catch (error) {
    console.warn("Preferensi speaker tidak dapat disimpan.", error);
  }
}

function getVoiceControlIcon(kind, disabled) {
  const slash = disabled
    ? '<line x1="4" y1="4" x2="28" y2="28" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" />'
    : "";

  if (kind === "mic") {
    return `
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect x="11" y="4" width="10" height="16" rx="5" fill="currentColor"></rect>
        <path d="M7 15.5a9 9 0 0 0 18 0M16 24v5M11 29h10" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"></path>
        ${slash}
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M5 12h6l7-6v20l-7-6H5z" fill="currentColor"></path>
      <path d="M22 11a7 7 0 0 1 0 10M25 7a12 12 0 0 1 0 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path>
      ${slash}
    </svg>
  `;
}

function unlockVoiceAudioPlayback() {
  voiceInteractionUnlocked = true;
  voicePeers.forEach(peer => {
    if (!peer?.audio || peer.audio.muted) return;
    peer.audio.play().catch(() => {});
  });
}

async function sendVoiceSignal(remoteSeat, payload) {
  if (!voiceNetworkStarted || !roomRef || mySeat === null) return;
  const remotePlayer = roomState?.players?.[remoteSeat];
  if (!remotePlayer?.id || !isPlayerConnectedInState(roomState, remotePlayer)) return;

  const message = {
    fromSeat: Number(mySeat),
    fromPlayerId: myPlayerId,
    authUid: currentAuthUid,
    targetPlayerId: remotePlayer.id,
    createdAt: firebase.database.ServerValue.TIMESTAMP
  };

  if (payload?.description) {
    message.description = {
      type: payload.description.type,
      sdp: payload.description.sdp || ""
    };
  }

  if (payload?.candidate) {
    message.candidate = payload.candidate;
  }

  await db.ref(`voiceSignals/${roomCode}/${remoteSeat}`).push().set(message);
}

async function negotiateVoicePeer(peer) {
  if (!peer || peer.closed || peer.makingOffer || !voiceNetworkStarted) return;
  if (peer.pc.signalingState !== "stable") return;

  try {
    peer.makingOffer = true;
    await peer.pc.setLocalDescription();
    if (peer.pc.localDescription) {
      await sendVoiceSignal(peer.remoteSeat, { description: peer.pc.localDescription });
    }
  } catch (error) {
    console.warn(`Negosiasi voice dengan seat ${peer.remoteSeat} gagal.`, error);
  } finally {
    peer.makingOffer = false;
  }
}

function closeVoicePeer(remoteSeat) {
  const peer = voicePeers.get(Number(remoteSeat));
  if (!peer) return;

  peer.closed = true;
  if (peer.reconnectTimer) clearTimeout(peer.reconnectTimer);
  peer.reconnectTimer = null;

  try {
    peer.pc.onicecandidate = null;
    peer.pc.onicecandidateerror = null;
    peer.pc.ontrack = null;
    peer.pc.onnegotiationneeded = null;
    peer.pc.onconnectionstatechange = null;
    peer.pc.close();
  } catch (error) {
    console.warn("Peer voice gagal ditutup dengan bersih.", error);
  }

  if (peer.audio) {
    peer.audio.pause();
    peer.audio.srcObject = null;
    peer.audio.remove();
  }

  voicePeers.delete(Number(remoteSeat));
}

function ensureVoicePeer(remoteSeat) {
  const normalizedSeat = Number(remoteSeat);
  if (!voiceNetworkStarted || !isVoiceChatSupported() || normalizedSeat === Number(mySeat)) return null;
  if (voicePeers.has(normalizedSeat)) return voicePeers.get(normalizedSeat);

  const remotePlayer = roomState?.players?.[normalizedSeat];
  if (!remotePlayer?.id || !isPlayerConnectedInState(roomState, remotePlayer)) return null;

  const pc = new RTCPeerConnection({
    iceServers: getVoiceIceServers(),
    iceCandidatePoolSize: 4
  });
  const audio = document.createElement("audio");
  audio.autoplay = true;
  audio.playsInline = true;
  audio.setAttribute("playsinline", "");
  audio.className = "voice-remote-audio";
  audio.dataset.seat = String(normalizedSeat);
  audio.muted = isRemoteSpeakerMuted(normalizedSeat);
  document.body.appendChild(audio);

  const peer = {
    remoteSeat: normalizedSeat,
    pc,
    audio,
    transceiver: null,
    makingOffer: false,
    ignoreOffer: false,
    isSettingRemoteAnswerPending: false,
    polite: Number(mySeat) > normalizedSeat,
    pendingCandidates: [],
    reconnectTimer: null,
    closed: false
  };

  voicePeers.set(normalizedSeat, peer);

  peer.transceiver = pc.addTransceiver("audio", {
    direction: localVoiceMicEnabled && localVoiceStream ? "sendrecv" : "recvonly"
  });

  const localTrack = localVoiceStream?.getAudioTracks?.()[0] || null;
  if (localTrack && localVoiceMicEnabled) {
    peer.transceiver.sender.replaceTrack(localTrack).catch(error => {
      console.warn("Track microphone gagal dipasang ke peer baru.", error);
    });
  }

  pc.onicecandidate = event => {
    if (!event.candidate) return;
    const candidate = typeof event.candidate.toJSON === "function"
      ? event.candidate.toJSON()
      : {
          candidate: event.candidate.candidate,
          sdpMid: event.candidate.sdpMid,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          usernameFragment: event.candidate.usernameFragment || null
        };

    sendVoiceSignal(normalizedSeat, { candidate }).catch(error => {
      console.warn("ICE candidate voice gagal dikirim.", error);
    });
  };

  pc.onicecandidateerror = event => {
    console.warn(`ICE voice seat ${normalizedSeat} mengalami error.`, {
      errorCode: event?.errorCode,
      errorText: event?.errorText,
      url: event?.url
    });
  };

  pc.ontrack = event => {
    const stream = event.streams?.[0] || new MediaStream([event.track]);
    audio.srcObject = stream;
    audio.muted = isRemoteSpeakerMuted(normalizedSeat);
    if (voiceInteractionUnlocked || !audio.muted) {
      audio.play().catch(() => {});
    }
  };

  pc.onnegotiationneeded = () => {
    // Seat lebih kecil menjadi inisiator pertama agar Safari/Chrome tidak
    // saling membuat offer pada saat yang sama. Setelah koneksi terbentuk,
    // kedua sisi tetap boleh melakukan renegosiasi ketika mic berubah.
    if (!pc.remoteDescription && Number(mySeat) > normalizedSeat) return;
    negotiateVoicePeer(peer);
  };

  pc.onconnectionstatechange = () => {
    const state = pc.connectionState;
    if (state === "connected") {
      if (peer.reconnectTimer) clearTimeout(peer.reconnectTimer);
      peer.reconnectTimer = null;
      refreshVoiceControlButtons();
      return;
    }

    if (state !== "failed" && state !== "disconnected" && state !== "closed") return;
    if (peer.reconnectTimer) clearTimeout(peer.reconnectTimer);

    peer.reconnectTimer = setTimeout(() => {
      peer.reconnectTimer = null;
      const currentRemote = roomState?.players?.[normalizedSeat];
      const shouldReconnect = voiceNetworkStarted
        && currentRemote?.id
        && isPlayerConnectedInState(roomState, currentRemote);

      closeVoicePeer(normalizedSeat);
      if (shouldReconnect) {
        const replacement = ensureVoicePeer(normalizedSeat);
        if (replacement) setTimeout(() => negotiateVoicePeer(replacement), 120);
      }
      refreshVoiceControlButtons();
    }, state === "failed" ? 600 : 4500);
  };

  if (Number(mySeat) < normalizedSeat) {
    setTimeout(() => negotiateVoicePeer(peer), 100 + normalizedSeat * 20);
  }
  return peer;
}

async function processVoiceSignal(snapshot, retryCount = 0) {
  const message = snapshot.val();
  if (!message || !voiceNetworkStarted || mySeat === null) return;

  const createdAt = Number(message.createdAt || 0);
  const serverNow = getFirebaseServerNow();
  if (createdAt && serverNow - createdAt > VOICE_SIGNAL_MAX_AGE_MS) {
    snapshot.ref.remove().catch(() => {});
    return;
  }
  if (createdAt && createdAt < voiceSignalStartedAt - 5000) {
    snapshot.ref.remove().catch(() => {});
    return;
  }
  if (message.targetPlayerId !== myPlayerId) {
    snapshot.ref.remove().catch(() => {});
    return;
  }

  const remoteSeat = Number(message.fromSeat);
  if (!Number.isInteger(remoteSeat) || remoteSeat === Number(mySeat)) {
    snapshot.ref.remove().catch(() => {});
    return;
  }

  const remotePlayer = roomState?.players?.[remoteSeat];
  if ((!remotePlayer?.id || remotePlayer.id !== message.fromPlayerId) && retryCount < 30) {
    setTimeout(() => {
      processVoiceSignal(snapshot, retryCount + 1).catch(() => {});
    }, 200);
    return;
  }
  if (!remotePlayer?.id || remotePlayer.id !== message.fromPlayerId) {
    snapshot.ref.remove().catch(() => {});
    return;
  }

  const peer = ensureVoicePeer(remoteSeat);
  if (!peer || peer.closed) {
    snapshot.ref.remove().catch(() => {});
    return;
  }

  try {
    if (message.description) {
      const description = message.description;
      const readyForOffer = !peer.makingOffer
        && (peer.pc.signalingState === "stable" || peer.isSettingRemoteAnswerPending);
      const offerCollision = description.type === "offer" && !readyForOffer;
      peer.ignoreOffer = !peer.polite && offerCollision;
      if (peer.ignoreOffer) {
        snapshot.ref.remove().catch(() => {});
        return;
      }

      if (offerCollision && peer.polite && peer.pc.signalingState !== "stable") {
        await peer.pc.setLocalDescription({ type: "rollback" }).catch(() => {});
      }

      peer.isSettingRemoteAnswerPending = description.type === "answer";
      await peer.pc.setRemoteDescription(description);
      peer.isSettingRemoteAnswerPending = false;

      while (peer.pendingCandidates.length) {
        const candidate = peer.pendingCandidates.shift();
        await peer.pc.addIceCandidate(candidate).catch(error => {
          console.warn("ICE candidate tertunda gagal diterapkan.", error);
        });
      }

      if (description.type === "offer") {
        await peer.pc.setLocalDescription();
        if (peer.pc.localDescription) {
          await sendVoiceSignal(remoteSeat, { description: peer.pc.localDescription });
        }
      }
    }

    if (message.candidate) {
      if (peer.pc.remoteDescription) {
        await peer.pc.addIceCandidate(message.candidate);
      } else {
        peer.pendingCandidates.push(message.candidate);
      }
    }
    snapshot.ref.remove().catch(() => {});
  } catch (error) {
    if (!peer.ignoreOffer) {
      console.warn(`Signal voice dari seat ${remoteSeat} gagal diproses.`, error);
    }
    if (retryCount < 3 && voiceNetworkStarted) {
      setTimeout(() => {
        processVoiceSignal(snapshot, retryCount + 1).catch(() => {});
      }, 250 * (retryCount + 1));
    } else {
      snapshot.ref.remove().catch(() => {});
    }
  }
}

function syncVoicePeers(stateLike = roomState) {
  if (!voiceNetworkStarted || !stateLike?.players) return;

  const activeRemoteSeats = new Set(
    Object.values(stateLike.players)
      .filter(player => player?.id)
      .filter(player => Number(player.seat) !== Number(mySeat))
      .filter(player => isPlayerConnectedInState(stateLike, player))
      .map(player => Number(player.seat))
  );

  activeRemoteSeats.forEach(seat => ensureVoicePeer(seat));
  Array.from(voicePeers.keys()).forEach(seat => {
    if (!activeRemoteSeats.has(Number(seat))) closeVoicePeer(seat);
  });

  refreshVoiceControlButtons();
}

async function attachLocalMicrophoneToPeers(track) {
  const tasks = [];

  voicePeers.forEach(peer => {
    if (!peer?.transceiver || peer.closed) return;
    tasks.push((async () => {
      await peer.transceiver.sender.replaceTrack(track || null);
      peer.transceiver.direction = track ? "sendrecv" : "recvonly";
      await negotiateVoicePeer(peer);
    })());
  });

  await Promise.allSettled(tasks);
}

async function toggleLocalMicrophone() {
  if (voiceToggleInProgress) return;
  if (!isVoiceChatSupported()) {
    alert("Voice chat tidak didukung oleh browser ini atau halaman belum menggunakan HTTPS.");
    return;
  }

  voiceToggleInProgress = true;
  unlockVoiceAudioPlayback();

  try {
    if (localVoiceMicEnabled) {
      const oldStream = localVoiceStream;
      localVoiceMicEnabled = false;
      localVoiceStream = null;
      await attachLocalMicrophoneToPeers(null);
      oldStream?.getTracks?.().forEach(track => track.stop());
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        }
      });

      localVoiceStream = stream;
      localVoiceMicEnabled = true;
      const track = stream.getAudioTracks()[0] || null;
      if (!track) throw new Error("Track audio tidak tersedia.");
      await attachLocalMicrophoneToPeers(track);

      if (voiceConnectivityCheckTimer) clearTimeout(voiceConnectivityCheckTimer);
      voiceConnectivityCheckTimer = setTimeout(() => {
        voiceConnectivityCheckTimer = null;
        const remoteConnected = Object.values(roomState?.players || {})
          .some(player => player?.id
            && Number(player.seat) !== Number(mySeat)
            && isPlayerConnectedInState(roomState, player));
        const peerConnected = Array.from(voicePeers.values())
          .some(peer => peer?.pc?.connectionState === "connected");
        if (remoteConnected && !peerConnected) {
          console.warn("Mic aktif, tetapi peer voice belum terhubung. Jaringan mungkin memerlukan TURN server.");
        }
      }, 8000);
    }
  } catch (error) {
    localVoiceMicEnabled = false;
    await attachLocalMicrophoneToPeers(null).catch(() => {});
    localVoiceStream?.getTracks?.().forEach(track => track.stop());
    localVoiceStream = null;
    console.warn("Microphone gagal diaktifkan.", error);
    alert("Microphone tidak dapat diaktifkan. Periksa izin microphone pada browser lalu coba lagi.");
  } finally {
    voiceToggleInProgress = false;
    refreshVoiceControlButtons();
  }
}

function toggleRemoteSpeaker(remoteSeat) {
  const normalizedSeat = Number(remoteSeat);
  const muted = !isRemoteSpeakerMuted(normalizedSeat);
  saveRemoteSpeakerMuted(normalizedSeat, muted);

  const peer = voicePeers.get(normalizedSeat);
  if (peer?.audio) {
    peer.audio.muted = muted;
    if (!muted) {
      unlockVoiceAudioPlayback();
      peer.audio.play().catch(() => {});
    }
  }

  refreshVoiceControlButtons();
}

function updateVoiceControlButton(row, player, playerConnected) {
  const button = row?.querySelector('[data-role="voice-control"]');
  if (!button || !player?.id) return;

  const seat = Number(player.seat);
  const supported = isVoiceChatSupported();
  button.classList.remove("hidden", "voice-mic", "voice-speaker", "voice-on", "voice-off", "voice-offline");

  if (seat === Number(mySeat)) {
    const micOff = !localVoiceMicEnabled;
    button.classList.add("voice-mic", micOff ? "voice-off" : "voice-on");
    button.innerHTML = getVoiceControlIcon("mic", micOff);
    button.disabled = !supported || voiceToggleInProgress;
    button.setAttribute("aria-label", micOff ? "Aktifkan microphone saya" : "Matikan microphone saya");
    button.title = micOff ? "Mic mati — ketuk untuk menyalakan" : "Mic aktif — ketuk untuk mematikan";
    return;
  }

  const speakerOff = isRemoteSpeakerMuted(seat);
  button.classList.add("voice-speaker", speakerOff ? "voice-off" : "voice-on");
  if (!playerConnected) button.classList.add("voice-offline");
  button.innerHTML = getVoiceControlIcon("speaker", speakerOff);
  button.disabled = !supported || !playerConnected;
  button.setAttribute("aria-label", speakerOff
    ? `Nyalakan suara ${player.name}`
    : `Matikan suara ${player.name}`);
  const connectionState = voicePeers.get(seat)?.pc?.connectionState || "new";
  const connectionLabel = {
    new: "menyiapkan",
    connecting: "menghubungkan",
    connected: "terhubung",
    disconnected: "terputus sementara",
    failed: "gagal",
    closed: "ditutup"
  }[connectionState] || connectionState;
  button.title = playerConnected
    ? `${speakerOff ? `Speaker ${player.name} mati` : `Speaker ${player.name} aktif`} • Voice ${connectionLabel}`
    : `${player.name} sedang offline`;
}

function refreshVoiceControlButtons() {
  if (!els.playersList || !roomState?.players) return;
  els.playersList.querySelectorAll('.player-row[data-seat]').forEach(row => {
    const seat = Number(row.dataset.seat);
    const player = roomState.players?.[seat];
    if (!player?.id) return;
    updateVoiceControlButton(row, player, isPlayerConnectedInState(roomState, player));
  });
}

async function startVoiceChatNetwork() {
  if (voiceNetworkStarted || !roomRef || mySeat === null) return;
  voiceNetworkStarted = true;
  voiceSignalStartedAt = getFirebaseServerNow();

  if (!isVoiceChatSupported()) {
    refreshVoiceControlButtons();
    return;
  }

  voiceSignalInboxRef = db.ref(`voiceSignals/${roomCode}/${mySeat}`);
  voiceSignalHandler = snapshot => {
    processVoiceSignal(snapshot).catch(error => {
      console.warn("Signal voice gagal diproses.", error);
    });
  };
  voiceSignalInboxRef.on("child_added", voiceSignalHandler);
  syncVoicePeers(roomState);
}

async function stopVoiceChatNetwork() {
  if (voiceConnectivityCheckTimer) clearTimeout(voiceConnectivityCheckTimer);
  voiceConnectivityCheckTimer = null;
  if (voiceSignalInboxRef && voiceSignalHandler) {
    voiceSignalInboxRef.off("child_added", voiceSignalHandler);
  }

  try {
    await voiceSignalInboxRef?.remove();
  } catch (error) {
    console.warn("Inbox signaling voice tidak dapat dibersihkan.", error);
  }

  Array.from(voicePeers.keys()).forEach(closeVoicePeer);
  localVoiceStream?.getTracks?.().forEach(track => track.stop());
  localVoiceStream = null;
  localVoiceMicEnabled = false;
  voiceNetworkStarted = false;
  voiceSignalInboxRef = null;
  voiceSignalHandler = null;
  voiceSignalStartedAt = 0;
  voiceToggleInProgress = false;
}

function createPlayerRow(seat) {
  const row = document.createElement("div");
  row.className = "player-row player-detail-trigger";
  row.dataset.seat = String(Number(seat));
  row.tabIndex = 0;
  row.setAttribute("role", "button");
  row.setAttribute("aria-label", `Lihat detail pemain ${Number(seat) + 1}`);
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
    <button class="voice-control-button hidden" data-role="voice-control" type="button" aria-label="Voice chat"></button>
  `;
  const voiceButton = row.querySelector('[data-role="voice-control"]');
  voiceButton.addEventListener("pointerdown", event => event.stopPropagation());
  voiceButton.addEventListener("touchstart", event => event.stopPropagation(), { passive: true });
  voiceButton.addEventListener("keydown", event => event.stopPropagation());
  voiceButton.addEventListener("click", async event => {
    event.preventDefault();
    event.stopPropagation();
    const targetSeat = Number(row.dataset.seat);
    if (targetSeat === Number(mySeat)) {
      await toggleLocalMicrophone();
    } else {
      toggleRemoteSpeaker(targetSeat);
    }
  });
  row.addEventListener("click", () => showPlayerDetailPopup(Number(row.dataset.seat)));
  row.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    showPlayerDetailPopup(Number(row.dataset.seat));
  });
  return row;
}

function shouldApplyTurnOrderLocally() {
  const resultId = roomState?.orderRoll?.resultId || "";
  if (roomState?.status === "playing" && resultId && resultId !== localDismissedOrderResultId) {
    return false;
  }
  return true;
}

function getDisplayedPlayerPositionLabel(player) {
  const move = roomState?.lastMove;
  const presentation = getMovePresentation(move);
  const isMovingPlayer = move?.id
    && roomState?.lastRoulette?.id === move.id
    && Number(move.seat) === Number(player?.seat)
    && presentation?.type === "roulette"
    && Date.now() < Number(presentation.effectsRevealAt || 0);

  if (!isMovingPlayer) return `Petak ${Number(player?.position || 0)}`;
  if (Date.now() < Number(presentation.pawnStartAt || 0)) {
    return `Petak ${Number(move.from || 0)}`;
  }
  if (Date.now() < Number(presentation.arrivalAt || 0)) {
    return "Sedang bergerak";
  }
  return `Petak ${Number(move.to || 0)}`;
}

function getVisiblePlayerSortKey(player) {
  const seat = Number(player.seat);
  if (isSpectator(player)) return 100 + seat;
  if (player?.bankrupt) return 50 + seat;
  if (player?.leftAt) return 75 + seat;

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
    .filter(player => player?.id || player.bankrupt || player?.leftAt || isPlayerConnectedInState(roomState, player))
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
    const playerLeft = Boolean(player?.leftAt) && !player?.id && !playerConnected;
    row.classList.toggle("active", !playerLeft && !spectator && seat === Number(roomState.currentSeat) && !player.bankrupt);
    row.classList.toggle("bankrupt", Boolean(player.bankrupt));
    row.classList.toggle("disconnected", (playerLeft || !playerConnected) && !player.bankrupt);
    row.classList.toggle("spectator", spectator);

    const dot = row.querySelector('[data-role="dot"]');
    const name = row.querySelector('[data-role="name"]');
    const sub = row.querySelector('[data-role="sub"]');
    const owned = row.querySelector('[data-role="owned"]');
    const money = row.querySelector('[data-role="money"]');
    const moneyChange = row.querySelector('[data-role="money-change"]');

    dot.style.background = player.color || (spectator ? "#607d8b" : PLAYER_COLORS[seat]);
    dot.textContent = getPlayerDisplayNumber(player);
    name.textContent = playerLeft
      ? `${player.name} • KELUAR`
      : player.bankrupt
        ? `${player.name} • BANGKRUT`
        : spectator ? `${player.name} • PENONTON` : player.name;

    if (playerLeft) {
      const leftText = player.leftReason === "disconnect-timeout"
        ? "Koneksi tidak kembali dalam 30 detik"
        : "Keluar dari permainan";
      sub.textContent = leftText;
      owned.innerHTML = '<span class="owned-tag bankrupt-tag">TIDAK LAGI BERMAIN</span>';
      playerMoneyAnimationStates.delete(seat);
      money.textContent = "KELUAR";
      moneyChange.textContent = "";
      money.classList.remove("money-value-pop");
    } else if (spectator) {
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
      const positionText = getDisplayedPlayerPositionLabel(player);
      sub.textContent = `${positionText} • ${connectionText}${orderText} • ${activationText} • Tanah ${ownedIds.length}${player.inJail ? ` • Penjara ${Number(player.jailAttempts || 0)}/3` : ""}`;
      owned.innerHTML = ownedTags || `<span class="owned-tag">Belum punya tanah</span>`;
      const moneyState = queuePlayerMoneyChange(seat, player.money);
      setDisplayedPlayerMoney(seat, moneyState.displayed);
    }

    updateVoiceControlButton(row, player, playerConnected);
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

function renderPlayerPaymentToast() {
  if (!els.playerPaymentToast) return;
  const notice = roomState?.playerPaymentNotice;

  if (!notice?.id) {
    els.playerPaymentToast.classList.add("hidden");
    return;
  }

  const revealAt = Number(notice.revealAt || notice.createdAt || Date.now());
  const hideAt = revealAt + PLAYER_PAYMENT_TOAST_MS;
  const now = Date.now();

  if (now < revealAt) {
    els.playerPaymentToast.classList.add("hidden");
    if (playerPaymentToastTimer) clearTimeout(playerPaymentToastTimer);
    playerPaymentToastTimer = setTimeout(() => {
      playerPaymentToastTimer = null;
      renderPlayerPaymentToast();
    }, Math.max(30, revealAt - now + 20));
    return;
  }

  if (now >= hideAt) {
    els.playerPaymentToast.classList.add("hidden");
    els.playerPaymentToast.classList.remove("show");
    return;
  }

  if (playerPaymentToastId !== notice.id) {
    playerPaymentToastId = notice.id;
    els.playerPaymentToast.textContent = notice.text || "Pembayaran antar pemain";
    els.playerPaymentToast.classList.remove("hidden", "show");
    void els.playerPaymentToast.offsetWidth;
    els.playerPaymentToast.classList.add("show");
  } else {
    els.playerPaymentToast.classList.remove("hidden");
  }

  if (playerPaymentToastTimer) clearTimeout(playerPaymentToastTimer);
  playerPaymentToastTimer = setTimeout(() => {
    playerPaymentToastTimer = null;
    if (roomState?.playerPaymentNotice?.id === notice.id) {
      els.playerPaymentToast.classList.add("hidden");
      els.playerPaymentToast.classList.remove("show");
    }
  }, Math.max(30, hideAt - now));
}

function renderCardPopup() {
  if (localPopupOpen) return;

  const popup = roomState?.cardPopup;

  if (!popup || popup.id === localHiddenCardId) {
    els.cardOverlay.classList.add("hidden");
    return;
  }

  const revealAt = Number(popup.revealAt || roomState?.pendingAction?.revealAt || 0);
  if (revealAt > Date.now() || (revealAt > 0 && roomState?.isRolling)) {
    els.cardOverlay.classList.add("hidden");
    scheduleMoveEffectsRender(Math.max(revealAt, Date.now() + 90));
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
  const isBlockingPopup = [
    "card", "taxPopup", "cardFreeParking", "cardMove", "cardChoiceFineOrChance",
    "cardChoiceMoveBack", "cardChooseBuild", "taxExemptionChoice", "roulette12Bonus",
    "tripleTwelveJail", "goJailPopup"
  ].includes(actionType);
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

  if (actionType === "taxExemptionChoice") {
    const amount = Number(roomState.pendingAction?.amount || 0);
    const cards = Number(roomState.players?.[roomState.pendingAction?.seat]?.taxExemptionCards || 0);
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = `
      <button class="gold" type="button" onclick="useTaxExemptionCard(event)" ${isActor && cards > 0 ? "" : "disabled"}>
        Gunakan Bebas Pajak (${cards})
      </button>
      <button class="primary" type="button" onclick="payPendingTax(event)" ${isActor ? "" : "disabled"}>
        Bayar ${formatMoney(amount)}
      </button>
    `;
    els.cardContinueBtn.classList.add("hidden");
    return;
  }

  if (actionType === "cardChoiceFineOrChance") {
    const amount = Number(roomState.pendingAction?.amount || 10);
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = `
      <button class="danger" type="button" onclick="payCardFineInsteadOfChance(event)" ${isActor ? "" : "disabled"}>Bayar ${formatMoney(amount)}</button>
      <button class="primary" type="button" onclick="drawChanceInsteadOfFine(event)" ${isActor ? "" : "disabled"}>Ambil Kesempatan</button>
    `;
    els.cardContinueBtn.classList.add("hidden");
    return;
  }

  if (actionType === "cardChoiceMoveBack") {
    els.cardActions.classList.add("hidden");
    els.cardActions.innerHTML = "";
    els.cardContinueBtn.classList.remove("hidden");
    els.cardContinueBtn.textContent = "Lihat Posisi di Papan";
    els.cardContinueBtn.disabled = false;
    return;
  }

  if (actionType === "cardChooseBuild") {
    const seat = Number(roomState.pendingAction?.seat);
    const eligibleIds = getCardBuildEligiblePropertyIds(seat, roomState);
    const options = eligibleIds.map(propertyId => {
      const property = PROPERTY_DATA[propertyId];
      const level = Number(roomState.propertyState?.[propertyId]?.level || 0);
      const nextLabel = level >= 4 ? "Hotel" : `Rumah ${level + 1}`;
      return `<option value="${escapeHTML(propertyId)}">${escapeHTML(property.name)} — ${nextLabel} (${formatMoney(property.buildingCost)})</option>`;
    }).join("");
    els.cardActions.classList.remove("hidden");
    els.cardActions.innerHTML = eligibleIds.length ? `
      <select id="cardBuildPropertySelectPopup" aria-label="Pilih tanah untuk dibangun">${options}</select>
      <button class="primary" type="button" onclick="buildSelectedPropertyFromCard(event)" ${isActor ? "" : "disabled"}>Bangun</button>
      <button class="danger" type="button" onclick="skipCardSpecialAction(event)" ${isActor ? "" : "disabled"}>Lewati</button>
    ` : `
      <button class="danger" type="button" onclick="skipCardSpecialAction(event)" ${isActor ? "" : "disabled"}>Tidak Ada Tanah — Tutup</button>
    `;
    els.cardContinueBtn.classList.add("hidden");
    return;
  }

  if (actionType === "cardMove") {
    els.cardContinueBtn.textContent = isActor ? "Tutup & Bergerak" : "Menunggu Pemain Aktif";
    els.cardContinueBtn.disabled = !isActor;
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


function makeCardMovePresentation(createdAt, from, steps, passedStart = false, directDuration = 0) {
  const startedAt = Number(createdAt || Date.now());
  const pawnStartAt = startedAt + 260;
  const moveDuration = directDuration > 0
    ? Math.max(220, Number(directDuration))
    : getPawnMoveDuration(Math.max(0, Number(steps || 0)));
  const arrivalAt = pawnStartAt + moveDuration;
  const effectsRevealAt = arrivalAt + EFFECTS_AFTER_ARRIVAL_MS;
  const normalizedFrom = ((Number(from || 0) % BOARD_SIZE) + BOARD_SIZE) % BOARD_SIZE;
  const startStep = passedStart ? BOARD_SIZE - normalizedFrom : 0;
  const startBonusAt = passedStart
    ? pawnStartAt + getPawnStepArrivalOffset(startStep)
    : 0;

  return {
    type: "cardMove",
    pawnStartAt,
    arrivalAt,
    effectsRevealAt,
    startBonusAt,
    moveDuration
  };
}

async function resolveCardMoveAction(options = {}) {
  if (!roomRef || !canIAct()) return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  const acceptedTypes = ["cardMove", "cardChoiceMoveBack"];
  if (!latest || !acceptedTypes.includes(action?.type) || Number(action.seat) !== Number(mySeat)) return;

  roomState = latest;
  const player = latest.players?.[mySeat];
  if (!player) return;

  const from = Number(player.position || 0);
  const backwardSteps = Math.max(0, Number(options.backwardSteps || 0));
  const target = backwardSteps > 0
    ? ((from - backwardSteps) % BOARD_SIZE + BOARD_SIZE) % BOARD_SIZE
    : Number(action.targetTile ?? 0);
  const direct = backwardSteps > 0 || Boolean(options.direct);
  const clockwiseSteps = backwardSteps > 0 ? 0 : getClockwiseDistance(from, target);
  const passedStart = backwardSteps > 0 ? false : doesClockwiseMovePassStart(from, target);
  const passStartBonus = passedStart ? Number(action.passStartBonus || 0) : 0;
  const alwaysMoney = Number(action.alwaysMoney || 0);
  const totalBonus = passStartBonus + alwaysMoney;
  const createdAt = Date.now();
  const moveId = `${createdAt}_${mySeat}_card_move_${Math.random().toString(16).slice(2)}`;
  const presentation = makeCardMovePresentation(
    createdAt,
    from,
    direct ? 0 : clockwiseSteps,
    passedStart,
    direct ? DIRECT_PAWN_MOVE_MS : 0
  );
  const updates = {
    pendingAction: null,
    cardPopup: null,
    isRolling: true,
    lastMove: {
      id: moveId,
      seat: mySeat,
      from,
      to: target,
      steps: direct ? 0 : clockwiseSteps,
      direct,
      backward: backwardSteps > 0,
      ...(direct ? { duration: DIRECT_PAWN_MOVE_MS } : {}),
      passedStart,
      startBonus: passStartBonus,
      presentation,
      createdAt
    }
  };

  let nextMoney = Number(player.money || 0) + totalBonus;
  const previousLaps = Number(player.lapsCompleted || 0);
  const nextLaps = previousLaps + (passedStart ? 1 : 0);
  updates[`players/${mySeat}/position`] = target;
  updates[`players/${mySeat}/money`] = nextMoney;
  updates[`players/${mySeat}/lapsCompleted`] = nextLaps;

  const logs = [`${player.name} berpindah dari kartu menuju ${getTileName(BOARD[target])}.`];
  if (passStartBonus > 0) {
    logs.push(`${player.name} melewati START dari kartu dan menerima ${formatMoney(passStartBonus)}.`);
  }
  if (alwaysMoney > 0) {
    logs.push(`${player.name} menerima ${formatMoney(alwaysMoney)} dari kartu.`);
  }
  if (previousLaps < 1 && passedStart) {
    logs.push(`${player.name} menyelesaikan putaran pertama. Seluruh petak kini aktif untuk pemain ini.`);
  }

  const applyLanding = action.applyLanding !== false;
  const boardActiveAfterMove = previousLaps >= 1 || passedStart;
  if (applyLanding && boardActiveAfterMove) {
    nextMoney = applyLandingEffect(
      target,
      mySeat,
      nextMoney,
      Number(latest.lastRoulette?.result || 7),
      updates,
      logs
    );
    updates[`players/${mySeat}/money`] = nextMoney;
  }

  if (updates.cardPopup) updates.cardPopup = { ...updates.cardPopup, revealAt: presentation.effectsRevealAt };
  if (updates.pendingAction) updates.pendingAction = { ...updates.pendingAction, revealAt: presentation.effectsRevealAt };
  if (updates.debtState) updates.debtState = { ...updates.debtState, revealAt: presentation.effectsRevealAt };
  if (updates.playerPaymentNotice) updates.playerPaymentNotice = { ...updates.playerPaymentNotice, revealAt: presentation.effectsRevealAt };

  await roomRef.update(updates);
  await addLogs(logs);
  scheduleActiveMoveResolution({ status: "playing", isRolling: true, lastMove: updates.lastMove });
}

async function payCardFineInsteadOfChance(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "cardChoiceFineOrChance") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  const player = latest?.players?.[mySeat];
  if (!latest || !player || action?.type !== "cardChoiceFineOrChance" || Number(action.seat) !== Number(mySeat)) return;

  roomState = latest;
  const amount = Number(action.amount || 10);
  const updates = {
    pendingAction: null,
    cardPopup: null,
    taxPool: Number(latest.taxPool || 0) + amount
  };
  const logs = [`${player.name} memilih membayar denda ${formatMoney(amount)} ke Uang Pajak.`];
  let nextMoney = Number(player.money || 0) - amount;
  nextMoney = applyDebtRequirement(mySeat, nextMoney, updates, `denda kartu ${formatMoney(amount)}`, logs);
  updates[`players/${mySeat}/money`] = nextMoney;

  await roomRef.update(updates);
  await addLogs(logs);
  if (!updates.debtState && !updates[`players/${mySeat}/bankrupt`]) await finishTurn();
  else if (updates[`players/${mySeat}/bankrupt`]) await finishTurn();
}

async function drawChanceInsteadOfFine(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "cardChoiceFineOrChance") return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  const player = latest?.players?.[mySeat];
  if (!latest || !player || action?.type !== "cardChoiceFineOrChance" || Number(action.seat) !== Number(mySeat)) return;

  roomState = latest;
  const updates = { pendingAction: null, cardPopup: null };
  const logs = [`${player.name} memilih mengambil kartu Kesempatan sebagai pengganti denda.`];
  let nextMoney = Number(player.money || 0);
  nextMoney = drawAndApplyCard("chance", mySeat, nextMoney, updates, logs);
  updates[`players/${mySeat}/money`] = nextMoney;
  await roomRef.update(updates);
  await addLogs(logs);
}

async function chooseCardMoveBack(steps, event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (![2, 5].includes(Number(steps))) return;
  await resolveCardMoveAction({ backwardSteps: Number(steps), direct: true });
}

async function buildSelectedPropertyFromCard(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "cardChooseBuild") return;

  const localContainer = event?.currentTarget?.parentElement;
  const select = localContainer?.querySelector?.("select")
    || document.getElementById("cardBuildPropertySelectPanel")
    || document.getElementById("cardBuildPropertySelectPopup");
  const propertyId = String(select?.value || "");
  if (!PROPERTY_DATA[propertyId]) return;

  const latest = (await roomRef.once("value")).val();
  const action = latest?.pendingAction;
  const player = latest?.players?.[mySeat];
  const propertyState = latest?.propertyState?.[propertyId];
  const property = PROPERTY_DATA[propertyId];
  if (!latest || !player || action?.type !== "cardChooseBuild" || Number(action.seat) !== Number(mySeat)) return;
  if (property.kind !== "city" || Number(propertyState?.owner) !== Number(mySeat)) return;

  const level = Number(propertyState?.level || 0);
  if (level >= 5) return;
  const cost = Number(property.buildingCost || 0);
  if (Number(player.money || 0) < cost) {
    alert(`Uang tidak cukup. Biaya bangunan ${property.name} adalah ${formatMoney(cost)}.`);
    return;
  }

  const nextLevel = level + 1;
  const buildLabel = nextLevel >= 5 ? "hotel" : `rumah ke-${nextLevel}`;
  await roomRef.update({
    [`players/${mySeat}/money`]: Number(player.money || 0) - cost,
    [`propertyState/${propertyId}/level`]: nextLevel,
    pendingAction: null,
    cardPopup: null
  });
  await addRemoteLog(`${player.name} menggunakan kartu Dana Umum untuk membangun ${buildLabel} di ${property.name} seharga ${formatMoney(cost)}.`);
  await finishTurn();
}

async function skipCardSpecialAction(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct()) return;
  const actionType = roomState?.pendingAction?.type;
  if (!['cardChooseBuild'].includes(actionType)) return;
  await roomRef.update({ pendingAction: null, cardPopup: null });
  await addRemoteLog(`${roomState.players?.[mySeat]?.name || "Pemain"} tidak menggunakan kesempatan membangun dari kartu.`);
  await finishTurn();
}

async function useTaxExemptionCard(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "taxExemptionChoice") return;

  const latest = (await roomRef.once("value")).val();
  const player = latest?.players?.[mySeat];
  const action = latest?.pendingAction;
  if (!latest || !player || action?.type !== "taxExemptionChoice" || Number(action.seat) !== Number(mySeat)) return;
  if (Number(player.taxExemptionCards || 0) <= 0) return;

  await roomRef.update({
    [`players/${mySeat}/taxExemptionCards`]: Number(player.taxExemptionCards || 0) - 1,
    pendingAction: null,
    cardPopup: null
  });
  await addRemoteLog(`${player.name} menggunakan kartu Bebas Pajak dan tidak membayar ${formatMoney(action.amount || 0)}.`);
  await finishTurn();
}

async function payPendingTax(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIAct() || roomState?.pendingAction?.type !== "taxExemptionChoice") return;

  const latest = (await roomRef.once("value")).val();
  const player = latest?.players?.[mySeat];
  const action = latest?.pendingAction;
  if (!latest || !player || action?.type !== "taxExemptionChoice" || Number(action.seat) !== Number(mySeat)) return;

  roomState = latest;
  const amount = Number(action.amount || 0);
  const updates = {
    pendingAction: null,
    cardPopup: null,
    taxPool: Number(latest.taxPool || 0) + amount
  };
  const logs = [`${player.name} memilih membayar pajak ${formatMoney(amount)} ke Uang Pajak.`];
  let nextMoney = Number(player.money || 0) - amount;
  nextMoney = applyDebtRequirement(mySeat, nextMoney, updates, `pajak ${formatMoney(amount)}`, logs);
  updates[`players/${mySeat}/money`] = nextMoney;
  await roomRef.update(updates);
  await addLogs(logs);
  if (!updates.debtState || updates[`players/${mySeat}/bankrupt`]) await finishTurn();
}

async function useJailFreeCard(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!roomRef || !canIUseJailAction()) return;

  const latest = (await roomRef.once("value")).val();
  const player = latest?.players?.[mySeat];
  if (!latest || !player?.inJail || Number(player.jailFreeCards || 0) <= 0) return;

  await roomRef.update({
    [`players/${mySeat}/jailFreeCards`]: Number(player.jailFreeCards || 0) - 1,
    [`players/${mySeat}/inJail`]: false,
    [`players/${mySeat}/jailAttempts`]: 0
  });
  await addRemoteLog(`${player.name} menggunakan kartu Bebas Penjara dan dapat langsung bermain pada giliran ini.`);
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
  const sourceDeckLabel = action.deckKey === "community" ? "Dana Umum" : "Kesempatan";
  await addLogs([
    `${player.name} berpindah ke Parkir Bebas dari kartu ${sourceDeckLabel}.`,
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
    const blockingForMe = [
      "card", "taxPopup", "cardFreeParking", "cardMove", "cardChoiceFineOrChance",
      "cardChoiceMoveBack", "cardChooseBuild", "taxExemptionChoice", "roulette12Bonus",
      "tripleTwelveJail", "goJailPopup"
    ].includes(actionType) && Number(roomState?.pendingAction?.seat) === Number(mySeat);

    if (!blockingForMe) {
      hideCardPopupLocal();
    }
    return;
  }

  if (actionType === "cardFreeParking") {
    await resolveFreeParkingCard();
    return;
  }

  if (actionType === "cardMove") {
    await resolveCardMoveAction();
    return;
  }

  if (actionType === "cardChoiceMoveBack") {
    hideCardPopupLocal();
    return;
  }

  if (["cardChoiceFineOrChance", "cardChooseBuild", "taxExemptionChoice"].includes(actionType)) {
    return;
  }

  if (!["card", "taxPopup", "tripleTwelveJail", "goJailPopup"].includes(actionType)) return;

  const actor = roomState.players[mySeat];

  await roomRef.update({
    pendingAction: null,
    cardPopup: null
  });

  await addRemoteLog(`${actor.name} menutup popup dan mengakhiri aksi.`);
  await finishTurn();
}

function getPlayerPropertyLevelLabel(property, level) {
  if (property?.kind !== "city") return property?.kind === "airport" ? "Bandara" : "Perusahaan";
  const normalizedLevel = Number(level || 0);
  if (normalizedLevel >= 5) return "Hotel";
  if (normalizedLevel <= 0) return "Tanah";
  return `Rumah ${normalizedLevel}`;
}

function showPlayerDetailPopup(seat) {
  const player = roomState?.players?.[seat];
  if (!player?.id && !player?.bankrupt) return;

  const spectator = isSpectator(player);
  const ownedIds = spectator ? [] : getOwnedPropertyIds(seat, roomState);
  const propertyWealth = ownedIds.reduce((total, propertyId) => {
    return total + getPropertyLiquidationValue(propertyId, roomState);
  }, 0);
  const money = Number(player.money || 0);
  const totalWealth = money + propertyWealth;

  const propertyRows = ownedIds.length
    ? ownedIds.map(propertyId => {
        const property = PROPERTY_DATA[propertyId];
        const propertyState = roomState?.propertyState?.[propertyId] || { level: 0 };
        const value = getPropertyLiquidationValue(propertyId, roomState);
        const markerColor = property.kind === "city" ? property.color : (property.kind === "airport" ? "#607d8b" : "#4d7fcc");
        return `
          <div class="player-property-item">
            <span class="player-property-color" style="background:${escapeHTML(markerColor)}"></span>
            <div class="player-property-main">
              <strong>${escapeHTML(property.name)}</strong>
              <span>${escapeHTML(getPlayerPropertyLevelLabel(property, propertyState.level))}</span>
            </div>
            <span class="player-property-value">${formatMoney(value)}</span>
          </div>
        `;
      }).join("")
    : `<div class="history-empty">${spectator ? "Penonton tidak memiliki aset permainan." : "Belum memiliki tanah."}</div>`;

  localPopupOpen = true;
  els.cardActions.innerHTML = "";
  els.cardActions.classList.add("hidden");
  els.cardContinueBtn.classList.remove("hidden");
  els.cardOverlay.classList.remove("hidden");
  els.cardPopup.className = "card-popup player-detail";
  els.cardDeckLabel.textContent = "Detail Pemain";
  els.cardPlayerName.textContent = spectator ? "Mode Penonton" : (player.bankrupt ? "Status Bangkrut" : "Pemain Monopoly");
  els.cardTitle.textContent = player.name || `Pemain ${Number(seat) + 1}`;
  els.cardText.innerHTML = `
    <div class="player-detail-summary">
      <div class="player-detail-stat"><span>Uang</span><strong>${formatMoney(money)}</strong></div>
      <div class="player-detail-stat"><span>Total Kekayaan</span><strong>${formatMoney(totalWealth)}</strong></div>
      <div class="player-detail-stat"><span>Nilai Jual Aset</span><strong>${formatMoney(propertyWealth)}</strong></div>
      <div class="player-detail-stat"><span>Jumlah Tanah</span><strong>${ownedIds.length}</strong></div>
      <div class="player-detail-stat"><span>Bebas Penjara</span><strong>${Number(player.jailFreeCards || 0)}</strong></div>
      <div class="player-detail-stat"><span>Bebas Pajak</span><strong>${Number(player.taxExemptionCards || 0)}</strong></div>
    </div>
    <div class="player-property-list">${propertyRows}</div>
  `;
  els.cardContinueBtn.textContent = "Tutup";
  els.cardContinueBtn.disabled = false;
}

function showPropertyDetailPopup(propertyId) {
  const actionType = roomState?.pendingAction?.type;
  if (Date.now() < suppressBoardInputUntil
    || freeMoveSelectionStarting
    || [
      "freeParkingChoice", "freeMove", "cardFreeParking", "cardMove",
      "cardChoiceFineOrChance", "cardChoiceMoveBack", "cardChooseBuild",
      "taxExemptionChoice"
    ].includes(actionType)) {
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
    els.cardText.innerHTML = `
      <div class="detail-card-meta">Harga tanah <strong>${formatMoney(price)}</strong> • Hipotik <strong>${formatMoney(property.mortgage)}</strong>${hasComplexBonus ? " • Kompleks lengkap: sewa saat ini ×2" : ""}</div>
      <table class="popup-rent-table">
        ${property.rents.map((rent, index) => `<tr><td>${RENT_LABELS[index]}</td><td>${formatMoney(rent)}</td></tr>`).join("")}
        <tr><td>Harga bangunan</td><td>${formatMoney(property.buildingCost)}</td></tr>
        <tr><td>Level saat ini</td><td>${RENT_LABELS[Number(ps.level || 0)]}</td></tr>
        <tr><td>Sewa saat ini${hasComplexBonus ? " (×2)" : ""}</td><td>${owner ? formatMoney(currentRent) : "-"}</td></tr>
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

function maybeAnimateLastMove(force = false) {
  if (!roomState?.lastMove || !gameScene) return;

  const move = roomState.lastMove;
  if (!force && move.id === lastAnimatedMoveId) return;

  lastAnimatedMoveId = move.id;
  gameScene.schedulePawnMove(move);
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
    this.chanceDeckCountText = null;
    this.communityDeckCountText = null;
    this.tileSize = 56;
    this.tileShade = null;
    this.freeMoveCenterShade = null;
    this.freeMoveHint = null;
    this.propertyMarkerSignature = "";
    this.moveStartTimers = new Map();
  }

  create() {
    gameScene = this;
    this.drawBoard();

    if (roomState) {
      this.renderRoomState(roomState);
    }

    this.scale.on("resize", () => {
      this.drawBoard();
      if (roomState) {
        this.renderRoomState(roomState);
        maybeAnimateLastMove(true);
      }
    });

    this.installMobileBoardTapFallback();
  }

  installMobileBoardTapFallback() {
    const canvas = this.game?.canvas;
    if (!canvas || this.mobileTouchEndHandler) return;

    // Phaser pointerup tetap menjadi handler utama. Fallback native ini khusus
    // perangkat sentuh yang kadang tidak meneruskan pointerup ke objek Phaser.
    // Sebelumnya fallback hanya aktif saat memilih petak Parkir Bebas, sehingga
    // tap tanah untuk membuka detail tidak bekerja pada sebagian browser mobile.
    this.mobileTouchStartHandler = (event) => {
      const touch = event.touches?.[0];
      if (!touch || event.touches?.length !== 1) {
        this.mobileTouchStart = null;
        return;
      }

      this.mobileTouchStart = {
        x: touch.clientX,
        y: touch.clientY,
        at: Date.now()
      };
    };

    this.mobileTouchCancelHandler = () => {
      this.mobileTouchStart = null;
    };

    this.mobileTouchEndHandler = (event) => {
      const touch = event.changedTouches?.[0];
      if (!touch) return;

      const start = this.mobileTouchStart;
      this.mobileTouchStart = null;

      // Jangan menganggap swipe/scroll sebagai tap petak.
      if (start) {
        const distance = Math.hypot(touch.clientX - start.x, touch.clientY - start.y);
        const duration = Date.now() - Number(start.at || 0);
        if (distance > 24 || duration > 900) return;
      }

      const tileIndex = this.getTileIndexFromClientPoint(touch.clientX, touch.clientY);
      if (tileIndex === null) return;

      const boardTile = BOARD[tileIndex];
      const actionType = roomState?.pendingAction?.type;
      const canHandleTap = actionType === "freeMove" || boardTile?.type === "property";
      if (!canHandleTap) return;

      event.preventDefault();
      event.stopPropagation();
      this.handleTileTap(tileIndex);
    };

    // Capture dipakai agar fallback tetap menerima touchend walaupun Phaser atau
    // browser menghentikan bubbling pada canvas. De-dupe di handleTileTap menjaga
    // agar pointerup Phaser dan touchend native tidak membuka popup dua kali.
    canvas.addEventListener("touchstart", this.mobileTouchStartHandler, { passive: true, capture: true });
    canvas.addEventListener("touchcancel", this.mobileTouchCancelHandler, { passive: true, capture: true });
    canvas.addEventListener("touchend", this.mobileTouchEndHandler, { passive: false, capture: true });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      canvas.removeEventListener("touchstart", this.mobileTouchStartHandler, true);
      canvas.removeEventListener("touchcancel", this.mobileTouchCancelHandler, true);
      canvas.removeEventListener("touchend", this.mobileTouchEndHandler, true);
      this.mobileTouchStartHandler = null;
      this.mobileTouchCancelHandler = null;
      this.mobileTouchEndHandler = null;
      this.mobileTouchStart = null;
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
    this.moveStartTimers.forEach(timer => timer?.remove?.(false));
    this.moveStartTimers.clear();
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

    const drawDeckCounter = (x, y, backgroundColor, label, count) => {
      const shadow = this.add.rectangle(x, y + tile * 0.06, tile * 2.75, tile * 1.42, 0x000000, 0.10);
      shadow.setStrokeStyle(0, 0x000000);
      const cardBox = this.add.rectangle(x, y, tile * 2.75, tile * 1.42, backgroundColor);
      cardBox.setStrokeStyle(2.5, 0x14213d);
      this.add.text(x, y - tile * 0.23, label, {
        fontFamily: "Arial",
        fontSize: `${Math.max(9, Math.floor(tile * .19))}px`,
        fontStyle: "bold",
        color: "#101010",
        align: "center"
      }).setOrigin(.5);
      return this.add.text(x, y + tile * 0.24, `${count}/20`, {
        fontFamily: "Arial",
        fontSize: `${Math.max(11, Math.floor(tile * .25))}px`,
        fontStyle: "bold",
        color: "#101010"
      }).setOrigin(.5);
    };

    this.chanceDeckCountText = drawDeckCounter(
      startX + tile * 3.35,
      startY + tile * 3.1,
      0xb8d9ab,
      "KESEMPATAN",
      getDeckRemainingCount(roomState, "chance")
    );
    this.communityDeckCountText = drawDeckCounter(
      startX + tile * 7.65,
      startY + tile * 3.1,
      0xcf8db8,
      "DANA UMUM",
      getDeckRemainingCount(roomState, "community")
    );

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

    const taxShadow = this.add.rectangle(startX + tile * 5.5, startY + tile * 7.55, tile * 2.55, tile * .86, 0x000000, 0.10);
    taxShadow.setStrokeStyle(0, 0x000000);
    const taxBox = this.add.rectangle(startX + tile * 5.5, startY + tile * 7.48, tile * 2.55, tile * .86, 0xf1d38c);
    taxBox.setStrokeStyle(3, 0x14213d);
    const taxInner = this.add.rectangle(startX + tile * 5.72, startY + tile * 7.48, tile * 1.6, tile * .44, 0x2d4038);
    taxInner.setStrokeStyle(2, 0x7fb98b);
    this.add.text(startX + tile * 5.5, startY + tile * 6.9, "UANG PAJAK", {
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
    if (this.chanceDeckCountText) {
      this.chanceDeckCountText.setText(`${getDeckRemainingCount(state, "chance")}/20`);
    }
    if (this.communityDeckCountText) {
      this.communityDeckCountText.setText(`${getDeckRemainingCount(state, "community")}/20`);
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

        const pendingMove = state.lastMove;
        const pendingPresentation = getMovePresentation(pendingMove);
        const shouldPreserveMoveStart = pendingMove?.id
          && pendingMove.id !== lastAnimatedMoveId
          && Number(pendingMove.seat) === seat
          && Number(pendingPresentation?.arrivalAt || (pendingMove.createdAt || 0) + Number(pendingMove.duration || 0)) > Date.now();

        if (shouldPreserveMoveStart) {
          this.setPawnPosition(seat, Number(pendingMove.from || 0), false);
        } else if (!this.animatingSeats.has(seat)) {
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


  schedulePawnMove(move) {
    if (!move?.id) return;

    const seat = Number(move.seat);
    const pawn = this.pawns[seat];
    if (!pawn || !this.tiles.length) return;

    const existingTimer = this.moveStartTimers.get(seat);
    existingTimer?.remove?.(false);
    this.moveStartTimers.delete(seat);

    const presentation = getMovePresentation(move);
    const startAt = Number(presentation?.pawnStartAt || Date.now());
    const defaultDuration = move.direct
      ? Math.max(220, Number(move.duration || DIRECT_PAWN_MOVE_MS))
      : getPawnMoveDuration(move.steps);
    const arrivalAt = Number(presentation?.arrivalAt || (startAt + defaultDuration));
    const now = Date.now();

    this.animatingSeats.add(seat);
    this.tweens.killTweensOf(pawn);
    pawn.setScale(1);
    this.setPawnPosition(seat, Number(move.from || 0), false);

    if (now >= arrivalAt) {
      this.setPawnPosition(seat, Number(move.to || 0), false);
      this.animatingSeats.delete(seat);
      return;
    }

    const startMovement = () => {
      this.moveStartTimers.delete(seat);
      const elapsed = Math.max(0, Date.now() - startAt);

      if (move.direct) {
        const remainingDuration = Math.max(220, arrivalAt - Date.now());
        this.animatePawnDirect(seat, Number(move.from || 0), Number(move.to || 0), remainingDuration);
        return;
      }

      const totalSteps = Math.max(0, Number(move.steps || 0));
      let completedSteps = 0;
      for (let step = 1; step <= totalSteps; step++) {
        if (getPawnStepArrivalOffset(step) <= elapsed) completedSteps = step;
      }

      const currentPosition = (Number(move.from || 0) + completedSteps) % BOARD_SIZE;
      const remainingSteps = Math.max(0, totalSteps - completedSteps);
      this.setPawnPosition(seat, currentPosition, false);

      if (!remainingSteps) {
        this.setPawnPosition(seat, Number(move.to || currentPosition), false);
        this.animatingSeats.delete(seat);
        return;
      }

      this.animatePawnMove(seat, currentPosition, remainingSteps);
    };

    const delay = Math.max(0, startAt - now);
    if (delay <= 20) {
      startMovement();
    } else {
      const timer = this.time.delayedCall(delay, startMovement);
      this.moveStartTimers.set(seat, timer);
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
        duration: PAWN_STEP_MS,
        ease: "Linear",
        onComplete: () => {
          this.setPawnPosition(seat, pos, false);
          if (step >= steps) {
            moveOneStep();
          } else {
            this.time.delayedCall(PAWN_STEP_GAP_MS, moveOneStep);
          }
        }
      });

      this.tweens.add({
        targets: pawn,
        scaleX: 1.16,
        scaleY: 1.16,
        duration: Math.max(100, Math.floor(PAWN_STEP_MS / 2)),
        yoyo: true,
        ease: "Sine.easeOut"
      });
    };

    moveOneStep();
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

  // Batalkan penulisan Room List yang mungkin masih membawa snapshot sebelum
  // pemain keluar. Tanpa ini, timer lama dapat menimpa hitungan terbaru.
  if (roomDirectorySyncTimer) clearTimeout(roomDirectorySyncTimer);
  roomDirectorySyncTimer = null;

  const latest = (await roomRef.once("value")).val();
  const leavingPlayer = latest?.players?.[mySeat];
  const updates = {};

  const participantSeats = getActiveSeatsFromState(latest);
  const remainingParticipants = participantSeats.filter(seat => seat !== Number(mySeat));
  const gameEndsAfterLeave = latest?.status === "playing"
    && isPlayerGameParticipant(leavingPlayer, latest)
    && remainingParticipants.length <= 1;
  const assetSettlement = latest?.status === "playing"
    && isPlayerGameParticipant(leavingPlayer, latest)
    && !gameEndsAfterLeave
    ? appendLeavingAssetSettlementUpdates(latest, mySeat, updates)
    : null;
  const assetSettlementText = describeLeavingAssetSettlement(assetSettlement);

  // Tahap pertama mempertahankan id/authUid sampai seluruh perubahan game,
  // presence, dan Room List berhasil disimpan. Rules room yang ada memang
  // mensyaratkan anggota penulis tetap tercatat pada newData selama update.
  // Seat baru dilepas pada tahap kedua melalui path pemainnya sendiri.
  updates[`players/${mySeat}/connected`] = false;
  updates[`players/${mySeat}/inGame`] = false;
  updates[`players/${mySeat}/isHost`] = false;
  updates[`players/${mySeat}/disconnectedAt`] = firebase.database.ServerValue.TIMESTAMP;
  updates[`players/${mySeat}/roulette12Streak`] = 0;
  const preserveExitRecord = ["orderRoll", "playing", "finished"].includes(latest?.status)
    && isMonopolyPlayer(leavingPlayer);
  updates[`players/${mySeat}/leftAt`] = preserveExitRecord
    ? firebase.database.ServerValue.TIMESTAMP
    : null;
  updates[`players/${mySeat}/leftReason`] = preserveExitRecord ? "manual" : "";
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
        text: winnerSeat !== null
          ? "Semua pemain lain sudah bangkrut atau keluar. Game dinyatakan selesai."
          : "Tidak ada pemain aktif yang tersisa.",
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
        updates.isRolling = false;
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
        text: `Permainan tetap berlanjut dengan ${remainingParticipants.length} pemain.${assetSettlementText ? ` ${assetSettlementText}` : ""}`,
        seat: remainingParticipants[0] ?? null,
        playerName: leavingPlayer?.name || "Pemain"
      };
    }
  }

  const leaveLog = latest?.status === "lobby" && newHostName
    ? `${leavingPlayer?.name || "Pemain"} keluar dari room. ${newHostName} menjadi host baru.`
    : `${leavingPlayer?.name || "Pemain"} keluar dari game.`;
  const leaveLogTimestamp = Date.now();
  updates[`logs/${leaveLogTimestamp}`] = leaveLog;
  if (assetSettlementText) {
    updates[`logs/${leaveLogTimestamp + 1}`] = assetSettlementText;
  }

  const remainingConnectedMembers = Object.values(latest?.players || {})
    .filter(player => Number(player?.seat) !== Number(mySeat))
    .filter(player => player?.id && isPlayerConnectedInState(latest, player));
  const remainingPlayerCount = remainingConnectedMembers.filter(isMonopolyPlayer).length;
  const remainingSpectatorCount = remainingConnectedMembers.filter(isSpectator).length;
  const roomWillBeEmpty = remainingConnectedMembers.length === 0;
  const emptySinceValue = roomWillBeEmpty ? firebase.database.ServerValue.TIMESTAMP : null;
  updates.emptySince = emptySinceValue;
  updates.lastActivityAt = firebase.database.ServerValue.TIMESTAMP;

  const leavingRoomCode = roomCode;
  const listingAfterLeave = {
    roomCode: leavingRoomCode,
    roomName: cleanRoomName(latest?.roomName || `Room ${leavingRoomCode}`),
    visibility: normalizeVisibility(latest?.visibility || "public"),
    requiresPassword: latest?.requiresPassword === true,
    status: String(updates.status || latest?.status || "lobby"),
    playerCount: remainingPlayerCount,
    spectatorCount: remainingSpectatorCount,
    maxPlayers: MAX_GAME_PLAYERS,
    maxSpectators: MAX_ROOM_MEMBERS - MAX_GAME_PLAYERS,
    createdAt: Number(latest?.createdAt || Date.now()),
    lastActivityAt: firebase.database.ServerValue.TIMESTAMP,
    emptySince: emptySinceValue
  };

  const rootUpdates = {};
  Object.entries(updates).forEach(([path, value]) => {
    rootUpdates[`rooms/${leavingRoomCode}/${path}`] = value;
  });
  Object.entries(listingAfterLeave).forEach(([key, value]) => {
    rootUpdates[`roomLookup/${leavingRoomCode}/${key}`] = value;
  });
  rootUpdates[`roomDirectory/${leavingRoomCode}`] = listingAfterLeave.visibility === "unlisted"
    ? null
    : listingAfterLeave;

  await stopVoiceChatNetwork();
  clearAfkActionTimer();

  if (roomWillBeEmpty) {
    // Tidak ada anggota lain yang masih terhubung. Hapus semua node room saat
    // identitas pemain terakhir masih tercatat agar Firebase Rules dapat
    // memverifikasi bahwa penghapus memang anggota terakhir yang sah.
    // onDisconnect dibatalkan lebih dulu supaya callback lama tidak membuat
    // ulang sebagian node setelah room utama dihapus.
    await detachCurrentPresence({ cancelDisconnect: true });

    await db.ref().update({
      [`roomDirectory/${leavingRoomCode}`]: null,
      [`roomLookup/${leavingRoomCode}`]: null,
      [`voiceSignals/${leavingRoomCode}`]: null,
      [`roomAccess/${leavingRoomCode}`]: null,
      [`roomSecrets/${leavingRoomCode}`]: null,
      [`roomCleanupCandidates/${leavingRoomCode}`]: null
    });

    // Lepaskan listener sebelum remove agar client ini tidak menampilkan alert
    // "Room sudah tidak tersedia" untuk aksi keluar yang memang disengaja.
    roomRef.off();
    try {
      await db.ref(`rooms/${leavingRoomCode}`).remove();
    } catch (error) {
      // Jika penghapusan gagal, sambungkan kembali agar pemain tidak kehilangan
      // state lokal secara diam-diam dan error dapat ditangani caller.
      roomRef = db.ref(`rooms/${leavingRoomCode}`);
      await setupCurrentPresence();
      subscribeRoom();
      throw error;
    }
  } else {
    // Simpan state permainan + metadata directory lebih dulu ketika authUid
    // pemain masih menjadi anggota sah room. Setelah commit berhasil, lepaskan
    // seat dalam operasi terpisah agar update tidak ditolak Firebase Rules.
    await db.ref().update(rootUpdates);
    await roomRef.child(`players/${mySeat}`).update({
      id: "",
      authUid: ""
    });
    await detachCurrentPresence({ cancelDisconnect: true });
  }

  resetLocalAnimationTimeline();
  clearRouletteSpinSound();
  if (disconnectExpiryTimer) clearTimeout(disconnectExpiryTimer);
  if (disconnectCountdownTimer) clearInterval(disconnectCountdownTimer);
  disconnectExpiryTimer = null;
  disconnectCountdownTimer = null;
  normalRouletteInProgress = false;
  if (finishedRoomCleanupTimer) clearTimeout(finishedRoomCleanupTimer);
  finishedRoomCleanupTimer = null;
  finishedRoomCleanupInProgress = false;
  roomRef.off();
  roomRef = null;
  roomState = null;
  roomCode = "";
  mySeat = null;
  clearRoomSession();
  resetPlayerMoneyAnimations();
  renderDisconnectOverlay();

  els.appRoot?.classList.remove("game-active");
  els.setupPanel.classList.remove("hidden");
  els.gamePanel.classList.add("hidden");
  els.roomBadge.textContent = "Belum masuk room";
  els.copyRoomBtn.disabled = true;
  els.leaveBtn.disabled = true;
  lastRoomDirectorySignature = "";
  lastRoomDirectorySyncAt = 0;
  showLobbyHome();
}

function handleFirebaseClientError(error, actionLabel = "mengakses room") {
  console.error(`Gagal ${actionLabel}.`, error);
  const code = String(error?.code || error?.message || "");
  const message = code.includes("PERMISSION_DENIED") || code.includes("permission-denied")
    ? "Akses Firebase ditolak. Pastikan Anonymous Authentication aktif dan database.rules.json sudah di-deploy. Room lama tanpa authUid harus dibuat ulang."
    : `Gagal ${actionLabel}. Periksa koneksi internet dan konfigurasi Firebase.`;
  alert(message);
}

els.confirmProfileBtn?.addEventListener("click", confirmPlayerProfile);
els.playerNameInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") confirmPlayerProfile();
});
els.editProfileBtn?.addEventListener("click", openEditProfile);
els.closeEditProfileBtn?.addEventListener("click", () => setOverlayVisible(els.editProfileOverlay, false));
els.saveProfileBtn?.addEventListener("click", saveEditedProfile);
els.editPlayerNameInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") saveEditedProfile();
});

els.openCreateRoomBtn?.addEventListener("click", openCreateRoomModal);
els.closeCreateRoomBtn?.addEventListener("click", () => setOverlayVisible(els.createRoomOverlay, false));
document.querySelectorAll('input[name="roomVisibility"]').forEach(input => {
  input.addEventListener("change", updateCreateRoomPasswordField);
});
els.createRoomBtn.addEventListener("click", () => {
  createRoom().catch(error => handleFirebaseClientError(error, "membuat room"));
});
els.roomNameInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") createRoom().catch(error => handleFirebaseClientError(error, "membuat room"));
});

els.openJoinCodeBtn?.addEventListener("click", openJoinCodeModal);
els.closeJoinCodeBtn?.addEventListener("click", () => setOverlayVisible(els.joinCodeOverlay, false));
els.joinRoomBtn.addEventListener("click", () => {
  els.joinRoomBtn.disabled = true;
  joinRoom()
    .catch(error => handleFirebaseClientError(error, "bergabung ke room"))
    .finally(() => {
      els.joinRoomBtn.disabled = false;
    });
});
els.roomCodeInput?.addEventListener("input", () => {
  els.roomCodeInput.value = normalizeRoomCode(els.roomCodeInput.value);
});
els.roomCodeInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") els.joinRoomBtn?.click();
});

els.closeRoomPasswordBtn?.addEventListener("click", () => {
  setOverlayVisible(els.roomPasswordOverlay, false);
  pendingJoinContext = null;
});
els.confirmRoomPasswordBtn?.addEventListener("click", confirmRoomPassword);
els.roomPasswordInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") confirmRoomPassword();
});
els.refreshRoomListBtn?.addEventListener("click", () => {
  refreshRoomDirectory().catch(error => handleFirebaseClientError(error, "memperbarui daftar room"));
});
els.roomList?.addEventListener("click", event => {
  const button = event.target.closest("[data-room-code]");
  if (!button || button.disabled) return;
  const code = normalizeRoomCode(button.dataset.roomCode);
  const entry = normalizeDirectoryEntry(code, latestRoomDirectory?.[code] || {});
  button.disabled = true;
  requestJoinRoom(code, entry)
    .catch(error => handleFirebaseClientError(error, "bergabung ke room"))
    .finally(() => {
      if (document.body.contains(button)) button.disabled = false;
    });
});

[els.editProfileOverlay, els.createRoomOverlay, els.joinCodeOverlay, els.roomPasswordOverlay].forEach(overlay => {
  overlay?.addEventListener("click", event => {
    if (event.target !== overlay) return;
    setOverlayVisible(overlay, false);
    if (overlay === els.roomPasswordOverlay) pendingJoinContext = null;
  });
});

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
els.leaveBtn.addEventListener("click", () => {
  if (manualLeaveInProgress) return;
  manualLeaveInProgress = true;
  els.leaveBtn.disabled = true;
  leaveRoom()
    .catch(error => handleFirebaseClientError(error, "keluar dari room"))
    .finally(() => {
      manualLeaveInProgress = false;
      if (roomRef) els.leaveBtn.disabled = false;
    });
});
els.disconnectLeaveBtn?.addEventListener("click", handleDisconnectLeave);
els.historyFab?.addEventListener("click", openHistoryModal);
els.historyCloseBtn?.addEventListener("click", closeHistoryModal);
els.historyCloseTopBtn?.addEventListener("click", closeHistoryModal);
els.historyOverlay?.addEventListener("click", (event) => {
  if (event.target === els.historyOverlay) closeHistoryModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (els.historyOverlay && !els.historyOverlay.classList.contains("hidden")) {
    closeHistoryModal();
    return;
  }
  const openLobbyOverlay = [els.roomPasswordOverlay, els.createRoomOverlay, els.joinCodeOverlay, els.editProfileOverlay]
    .find(overlay => overlay && !overlay.classList.contains("hidden"));
  if (openLobbyOverlay) {
    setOverlayVisible(openLobbyOverlay, false);
    if (openLobbyOverlay === els.roomPasswordOverlay) pendingJoinContext = null;
  }
});
els.cardCloseBtn.addEventListener("click", closeCardAndFinishTurn);
els.cardContinueBtn.addEventListener("click", closeCardAndFinishTurn);

// Interaksi manual tepat sebelum timer habis diberi prioritas atas aksi AFK.
const noteLocalGameInteraction = event => {
  if (!els.gamePanel || !event?.target || !els.gamePanel.contains(event.target)) return;
  lastLocalGameInteractionAt = Date.now();
};
document.addEventListener("pointerdown", noteLocalGameInteraction, true);
document.addEventListener("keydown", noteLocalGameInteraction, true);

// Browser HP mengizinkan audio setelah interaksi pengguna pertama.
document.addEventListener("pointerdown", unlockMoneyAudio, { passive: true });
document.addEventListener("keydown", unlockMoneyAudio);
document.addEventListener("pointerdown", unlockVoiceAudioPlayback, { passive: true });
document.addEventListener("touchstart", unlockVoiceAudioPlayback, { passive: true });
document.addEventListener("keydown", unlockVoiceAudioPlayback);

[els.createRoomBtn, els.joinRoomBtn, els.openCreateRoomBtn, els.openJoinCodeBtn, els.refreshRoomListBtn]
  .filter(Boolean)
  .forEach(button => { button.disabled = true; });

initializeLobbyFlow();
firebaseReadyPromise = initFirebase();
firebaseReadyPromise
  .then(async () => {
    [els.createRoomBtn, els.joinRoomBtn, els.openCreateRoomBtn, els.openJoinCodeBtn, els.refreshRoomListBtn]
      .filter(Boolean)
      .forEach(button => { button.disabled = false; });
    const restored = await restoreRoomSession();
    if (!els.appRoot?.classList.contains("game-active")) {
      showLobbyHome();
    }
    return restored;
  })
  .catch((error) => {
    console.error("Firebase gagal diinisialisasi.", error);
    alert("Firebase Authentication gagal. Pastikan Anonymous Authentication sudah diaktifkan di Firebase Console.");
  });
