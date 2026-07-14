# Patch Aset Pemain Keluar dan Roulette Penjara

## Aset pemain yang keluar

- Berlaku saat pemain keluar manual dan saat dikeluarkan setelah disconnect 30 detik.
- Semua properti milik pemain dikembalikan ke bank.
- Semua level rumah/hotel pada properti tersebut di-reset ke 0.
- Uang tunai positif dibagi rata kepada pemain Monopoly aktif yang tersisa.
- Pembagian memakai `Math.floor`, sehingga saldo selalu bilangan bulat.
- Sisa pembagian dihapus.
- Jika beberapa pemain disconnect dan dikeluarkan bersamaan, mereka tidak menjadi penerima pembagian satu sama lain.
- Jika pemain keluar ketika roulette/animasi masih berjalan, `isRolling` dibersihkan agar giliran berikutnya tidak terkunci.

Contoh:

- $753 dengan 2 pemain tersisa: masing-masing menerima $376, sisa $1 dihapus.
- $753 dengan 3 pemain tersisa: masing-masing menerima $251.

## Roulette penjara

- Awal roulette dikunci memakai Firebase transaction.
- Hanya satu percobaan dapat dilakukan pada setiap giliran.
- Pada kegagalan pertama dan kedua, `isRolling` tetap aktif sampai `currentSeat` berpindah, sehingga roulette tidak dapat ditekan ulang dan pemain berikutnya tidak dapat menyela proses.
- Mendapat angka 12 pada percobaan pertama atau kedua tetap membebaskan pemain dan pemain dapat melakukan roulette normal pada giliran yang sama.
- Pada percobaan ketiga, pemain otomatis bebas dan hasil roulette ketiga langsung dipakai untuk menggerakkan pion.
- Efek petak tujuan, animasi pion, pembayaran, kartu, dan aksi properti tetap diproses melalui logic permainan yang sudah ada.
- Roulette penjara dapat dipulihkan dari snapshot Firebase jika halaman sempat refresh saat animasi berlangsung.

## Validasi yang dijalankan

- Pemeriksaan sintaks `game.js` dengan `node --check`.
- Validasi JSON untuk Firebase rules dan `firebase.json`.
- Simulasi pembagian $753 kepada 2 dan 3 pemain.
- Simulasi pengembalian properti dan reset hotel/rumah.
- Simulasi dua pemain disconnect bersamaan.
- Simulasi kegagalan roulette pertama dengan lock tetap aktif hingga pergantian giliran.
- Simulasi keberhasilan angka 12.
- Simulasi percobaan ketiga yang langsung menggerakkan pion.
