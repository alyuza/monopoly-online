# Update: Aset Pemain Keluar dan Roulette Penjara

## Perubahan

- Tablet portrait 701–1100 px mengikuti susunan mobile, dengan papan selebar layar dan panel Aksi/Data Pemain di kiri serta Kontrol Giliran di kanan.
- Layout laptop/desktop tidak diubah.
- Saat pemain keluar ketika game sedang berlangsung, seluruh properti beserta rumah/hotel dikembalikan ke bank.
- Uang pemain yang keluar dibagi rata kepada pemain aktif yang tersisa menggunakan pembulatan ke bawah; sisa pembagian dihapus.
- Aturan pelepasan aset berlaku untuk keluar manual dan pengeluaran otomatis setelah disconnect 30 detik.
- Jika pemain keluar saat roulette atau animasi giliran masih berjalan, lock `isRolling` dibersihkan agar pemain berikutnya tidak terkunci.
- Percobaan roulette penjara dibatasi satu kali per giliran.
- Gagal pada percobaan ke-1 atau ke-2 mengakhiri giliran.
- Pada percobaan ke-3, pemain otomatis bebas dan langsung maju sesuai angka roulette ke-3. Efek petak tujuan tetap diproses seperti perpindahan biasa.
- Tombol Bayar $50 dinonaktifkan jika saldo pemain kurang dari $50. Sistem tidak memaksa penjualan properti untuk membayar bebas penjara.
- Kartu "Pilih Mundur" dapat ditutup untuk melihat posisi papan. Pilihan mundur 2/5 petak hanya dilakukan melalui panel Aksi Petak.
- Daftar harga sewa pada popup properti selalu menampilkan tarif dasar.
- Kompleks lengkap hanya mengalikan `Sewa saat ini` sebesar 2×, bukan mengalikan daftar harga lalu mengalikan kembali.

## Tidak diubah

Voice chat, Parkir Bebas, kartu, roulette 12 beruntun di luar penjara, urutan pemain, spectator, reconnect, money animation, penjualan aset karena utang, kebangkrutan, dan Firebase Security Rules tetap menggunakan behavior sebelumnya.
