# At Thohiriyah Board Game Online MVP

Ini adalah tahap awal game board online berbasis:
- Phaser untuk papan dan animasi pion
- Firebase Realtime Database untuk sinkronisasi antar-HP
- Vercel untuk hosting

## Fitur MVP

- Buat room
- Join room pakai kode
- Maksimal 4 pemain
- Host bisa mulai game
- Giliran realtime
- Lempar dadu
- Pion bergerak animasi per petak
- Uang awal $1,500
- Melewati START mendapat $200
- Data tersimpan di Firebase dan tidak hilang saat refresh

## Cara setup Firebase

1. Buka Firebase Console.
2. Buat project baru.
3. Masuk ke Build > Realtime Database.
4. Klik Create Database.
5. Pilih region terdekat.
6. Untuk testing awal, gunakan rules berikut:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

Rules ini hanya untuk testing. Kalau game sudah mau dipakai publik, rules harus diperketat.

7. Masuk ke Project Settings.
8. Tambahkan Web App.
9. Copy konfigurasi firebaseConfig.
10. Buka file `firebase-config.js`.
11. Ganti semua placeholder `PASTE_...` dengan config dari Firebase.

## Cara menjalankan lokal

Paling mudah pakai VS Code Live Server:

1. Buka folder ini di VS Code.
2. Install extension Live Server.
3. Klik kanan `index.html`.
4. Pilih Open with Live Server.

## Cara deploy ke Vercel

Pastikan file utama bernama `index.html`.

```bash
git add .
git commit -m "Initial online MVP"
git push
```

Lalu import repository ke Vercel.

## Catatan

MVP ini belum memiliki tanah, beli properti, kartu, dan penjara. Itu masuk tahap berikutnya.
Tahap awal ini dibuat untuk membuktikan multiplayer realtime dan animasi pion sudah berjalan.
