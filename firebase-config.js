// 1) Buka Firebase Console.
// 2) Buat project.
// 3) Aktifkan Realtime Database.
// 4) Buat Web App, lalu copy firebaseConfig ke bawah ini.
// 5) Setelah config terisi, game online bisa dipakai.

window.FIREBASE_CONFIG = {
   apiKey: "AIzaSyBLGctGhLNVykMEvsM7nwvEI1YktMy6XaA",
  authDomain: "at-thohiriyah-board-game.firebaseapp.com",
  databaseURL: "https://at-thohiriyah-board-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "at-thohiriyah-board-game",
  storageBucket: "at-thohiriyah-board-game.firebasestorage.app",
  messagingSenderId: "625237920613",
  appId: "1:625237920613:web:5f30cf4aaeed48dc23ef8c"
};

// Opsional tetapi direkomendasikan sebelum App Check enforcement diaktifkan.
// Isi dengan reCAPTCHA v3 Site Key milik domain game, bukan secret key.
// Biarkan kosong selama setup awal agar game tetap dapat dijalankan.
window.FIREBASE_APP_CHECK_SITE_KEY = "";


// Konfigurasi WebRTC voice chat. STUN cukup untuk testing pada banyak jaringan.
// Untuk koneksi production yang stabil lintas operator/NAT, tambahkan TURN server.
window.VOICE_ICE_SERVERS = [
  {
    urls: [
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302"
    ]
  }
  // Contoh TURN:
  // { urls: "turn:turn.domainkamu.com:3478", username: "USER", credential: "PASSWORD" }
];
