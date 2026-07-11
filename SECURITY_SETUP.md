# Firebase Security Setup

## Urutan deployment yang aman

1. Aktifkan **Authentication > Sign-in method > Anonymous**.
2. Deploy file client terbaru (`index.html`, `game.js`, dan `firebase-config.js`).
3. Hapus room testing lama yang belum memiliki `authUid`.
4. Deploy `database.rules.json`.
5. Buat room baru dan uji menggunakan dua browser/perangkat.
6. Konfigurasikan App Check, deploy site key, pantau metrik, lalu aktifkan enforcement.

## Deploy rules dengan CLI

```bash
npx firebase-tools login
npx firebase-tools use at-thohiriyah-board-game
npx firebase-tools deploy --only database
```

## Checklist pengujian

- Browser tanpa login Firebase tidak dapat membaca room.
- Host dapat membuat room baru.
- Pemain kedua dapat join menggunakan kode room.
- Pengguna yang bukan anggota tidak dapat mengubah `status`, `money`, atau `propertyState`.
- Pemain dapat refresh dan kembali ke kursi yang sama.
- Tombol Keluar membersihkan `authUid` dan presence.
- Disconnect dan reconnect tetap berjalan.
- App Check enforcement baru diaktifkan setelah request valid terlihat di metrik.

## Catatan penting

Firebase Web API key bukan secret. Jangan menyimpan service-account JSON, private key, reCAPTCHA secret key, atau kredensial admin di frontend maupun repository publik.

Rules ini adalah hardening client-side yang kuat untuk tahap publik awal, tetapi bukan server-authoritative anti-cheat. Pemain yang sudah sah di dalam room masih dapat mencoba memanipulasi request dari DevTools. Tahap produksi berikutnya adalah memindahkan aksi kritis ke Cloud Functions.

## Rules voice chat

Voice chat menggunakan node sementara:

```text
voiceSignals/{roomCode}/{targetSeat}/{signalId}
```

Hanya UID Firebase yang terdaftar sebagai anggota room yang dapat mengirim signal, dan `fromSeat` harus terikat pada `authUid` pengirim. Penerima atau pengirim dapat menghapus signal setelah diproses.

Setelah mengganti rules, publish `database.rules.json` terbaru. Audio microphone tidak disimpan di Firebase; Firebase hanya menyimpan signal negosiasi WebRTC dalam waktu singkat.
