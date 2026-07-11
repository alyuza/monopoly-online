# Setup Voice Chat

## Perilaku

- Tombol pada kartu diri sendiri adalah tombol microphone.
- Microphone default **mati** dan baru meminta izin saat ditekan.
- Tombol pada kartu pengguna lain adalah tombol speaker lokal.
- Mematikan speaker hanya membisukan pengguna tersebut pada perangkatmu dan tidak memengaruhi perangkat lain.
- Pemain dan spectator dapat ikut voice chat selama masih terhubung ke room.

## Persyaratan browser

- Jalankan melalui HTTPS atau localhost.
- Izinkan akses microphone ketika browser meminta izin.
- Pada iPhone, periksa **Settings > Safari > Microphone** jika izin pernah ditolak.

## Firebase Rules

Deploy `database.rules.json` terbaru karena signaling WebRTC memakai node:

```text
voiceSignals/{roomCode}/{targetSeat}/{signalId}
```

Audio tidak diunggah atau disimpan di Firebase. Node tersebut hanya berisi offer, answer, dan ICE candidate sementara.

```bash
npx firebase-tools deploy --only database
```

## STUN dan TURN

Konfigurasi berada di `firebase-config.js`:

```js
window.VOICE_ICE_SERVERS = [
  { urls: ["stun:stun.l.google.com:19302"] }
];
```

STUN biasanya cukup untuk testing pada Wi-Fi atau sebagian jaringan seluler. Untuk koneksi yang lebih konsisten antaroperator, corporate network, atau carrier-grade NAT, tambahkan TURN server:

```js
window.VOICE_ICE_SERVERS = [
  { urls: ["stun:stun.l.google.com:19302"] },
  {
    urls: "turn:turn.domainkamu.com:3478",
    username: "TEMP_USERNAME",
    credential: "TEMP_PASSWORD"
  }
];
```

Untuk production, gunakan credential TURN sementara dari backend, bukan password permanen yang disimpan di repository publik.
