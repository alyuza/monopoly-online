# At Thohiriyah Monopoly Board Game Online

Game papan multiplayer berbasis:
- **Phaser 3** untuk papan, interaksi petak, dan animasi pion;
- **Firebase Realtime Database** untuk sinkronisasi room dan permainan antarperangkat;
- **Vercel** atau static hosting lain untuk deployment.

## Fitur saat ini

- Profil nama pemain tersimpan di browser dan dapat diedit dari lobby;
- Room Browser realtime dengan room Public, Private, dan Unlisted;
- Buat room memakai nama room, visibilitas, serta password opsional sesuai tipe room;
- Join room melalui kartu Room List atau kode khusus untuk room Unlisted;
- klaim kursi atomik untuk mencegah dua perangkat menimpa seat yang sama;
- maksimal 4 pemain Monopoly dan 2 penonton;
- host memulai permainan;
- giliran tersinkron secara realtime;
- roulette 1–12 dengan posisi visual yang sesuai hasil;
- animasi pion per petak dan perpindahan langsung untuk efek khusus;
- uang awal $1,500 dan bonus melewati START;
- pembelian kota, bandara, dan perusahaan;
- pembayaran sewa dan perhitungan grup properti;
- pembangunan rumah sampai hotel;
- penanda kepemilikan pada setiap properti dengan warna pion pemain, termasuk indikator 1–4 rumah dan hotel;
- kartu Dana Umum dan Kesempatan;
- pajak dan kumpulan Uang Pajak;
- Parkir Bebas dengan pilihan tanah tujuan;
- kartu **Menuju Parkir Bebas** yang membuka pilihan mengambil Uang Pajak atau memilih petak tujuan;
- penjara, pembayaran denda, dan percobaan dadu kembar;
- popup detail properti dan riwayat permainan;
- tampilan responsive untuk iPhone, Android, dan tablet;
- layout landscape-first dengan mode portrait yang tetap dapat digunakan.

## Lobby dan tipe room

Setelah nama pemain dikonfirmasi, pengguna langsung masuk ke halaman **Room List**. Daftar diperbarui secara realtime dan diurutkan berdasarkan jumlah pemain terbanyak, kemudian status lobby, jumlah spectator, dan aktivitas terbaru.

- **Public 🌐** muncul pada Room List dan dapat dimasuki tanpa password.
- **Private 🔒** muncul pada Room List, tetapi membutuhkan password sebelum klaim seat dilakukan.
- **Unlisted 🔗** tidak muncul pada Room List dan hanya dapat dibuka melalui menu **Masuk dengan Kode**. Password bersifat opsional.

Room yang sudah mulai hanya menerima spectator pada seat 5–6. Room lobby dengan empat pemain masih dapat menerima spectator apabila slot penonton tersedia. Proses join tetap memakai Firebase transaction sehingga seat terakhir tidak dapat direbut dua browser secara bersamaan.

Password tidak disimpan sebagai teks biasa. Client membuat bukti SHA-256 dengan salt, sedangkan hash pembanding disimpan pada node `roomSecrets` yang tidak dapat dibaca client. Model ini cukup untuk lobby MVP, tetapi belum memiliki rate limiting server; untuk production dengan ancaman brute-force, pindahkan verifikasi password ke callable Cloud Function.

## Penghapusan room kosong

Function `cleanupInactiveRooms` berjalan terjadwal dan memeriksa node presence aktual. Room ditandai kosong hanya setelah tidak ada koneksi aktif. Setelah kosong selama **5 menit**, function menghapus:

- `rooms/{roomCode}`;
- `roomDirectory/{roomCode}`;
- `roomLookup/{roomCode}`;
- `roomSecrets/{roomCode}`;
- `roomAccess/{roomCode}`;
- `voiceSignals/{roomCode}`.

Masa lima menit berada jauh di atas grace reconnect 30 detik sehingga refresh, perpindahan jaringan singkat, atau browser yang sesaat berada di background tidak langsung menghapus room.

## Cara setup Firebase

1. Buka Firebase Console dan buat project.
2. Aktifkan **Authentication > Sign-in method > Anonymous**.
3. Aktifkan **Realtime Database**.
4. Tambahkan Web App dan salin konfigurasi ke `firebase-config.js`.
5. Deploy rules terbaru dari root project:

```bash
npx firebase-tools login
npx firebase-tools use at-thohiriyah-board-game
npx firebase-tools deploy --only database
```

6. Install dependency function dan deploy cleanup room:

```bash
cd functions
npm install
cd ..
npx firebase-tools deploy --only functions:cleanupInactiveRooms
```

Frontend lobby tetap dapat digunakan tanpa function cleanup, tetapi room kosong tidak akan terhapus otomatis secara andal apabila tidak ada browser yang masih aktif.

## Menjalankan secara lokal

Paling mudah menggunakan VS Code Live Server:

1. Buka folder project di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

Jangan membuka `index.html` langsung melalui `file://`, karena library eksternal dan Firebase lebih stabil saat dijalankan melalui local web server.

## Deploy ke Vercel

Pastikan file utama bernama `index.html`, kemudian push project ke repository:

```bash
git add .
git commit -m "Update responsive mobile and gameplay"
git push
```

Import repository tersebut ke Vercel dan deploy sebagai static site.

## Catatan tampilan mobile

- Landscape adalah orientasi yang direkomendasikan karena papan dan panel kontrol dapat terlihat berdampingan.
- Portrait tetap didukung; papan, riwayat, dan panel kontrol akan disusun vertikal.
- Safe area iPhone dan perangkat berponi sudah diperhitungkan melalui `env(safe-area-inset-*)`.

## Aturan Parkir Bebas

Saat pemain mendarat di Parkir Bebas, termasuk melalui kartu Kesempatan, pemain wajib memilih salah satu bonus:

1. Mengambil seluruh Uang Pajak dan mengakhiri giliran.
2. Memilih satu petak tujuan yang menguntungkan. Petak yang dapat dipilih adalah properti kosong, properti milik sendiri, Dana Umum, atau Kesempatan. Properti lawan, pajak, penjara, Masuk Penjara, START, dan Parkir Bebas tidak dapat dipilih.

Saat mode pemilihan aktif, petak yang tidak dapat dipilih diredupkan dan petak tujuan diberi highlight kuning. Jika rute searah permainan dari Parkir Bebas menuju petak pilihan melewati START, pemain menerima bonus $200. Petak yang memberikan bonus tersebut ditandai dengan label **+$200**.

## Animasi perubahan saldo

Setiap pemasukan atau pengeluaran akan ditampilkan pada kartu pemain sebagai indikator seperti **+$50** atau **-$50**. Indikator muncul dan memudar terlebih dahulu; saldo baru ditampilkan setelah animasi selesai. Efek suara koin dibuat langsung dengan Web Audio API sehingga project tidak memerlukan file audio tambahan. Browser akan mengaktifkan suara setelah pemain melakukan interaksi pertama pada halaman.

## Perbaikan animasi saldo V2

- Baris Data Pemain tidak lagi dipindahkan ulang pada setiap snapshot Firebase, sehingga kartu pemain dan angka saldo tidak berkedip saat pion bergerak.
- Animasi pemasukan/pengeluaran yang sedang berjalan tidak restart ketika status room, log, atau giliran berubah.
- Efek suara memakai satu bunyi transaksi pendek. Nada pembentuk suara dimainkan bersamaan, bukan berurutan, sehingga satu transaksi tidak terdengar seperti dua atau tiga transaksi.
- Kelas efek pop saldo dibersihkan setelah animasi selesai agar tidak hidup kembali pada render berikutnya.

## Tampilan mobile satu layar

Pada perangkat portrait dengan lebar hingga 700 px, antarmuka disusun agar komponen utama berada dalam satu layar:

- header dan informasi room dibuat ringkas;
- papan memakai hampir seluruh lebar layar tanpa ruang hijau berlebih di luar bingkai papan;
- Aksi Petak dan Data Pemain berada di kolom kiri bawah papan;
- Kontrol Giliran dan roulette berada di kolom kanan;
- Riwayat lama disembunyikan dari alur utama dan dapat dibuka melalui tombol bundar di dekat roulette;
- popup Riwayat Permainan menampilkan seluruh log dan dapat digulir.

Perubahan ini tidak mengubah aturan Parkir Bebas, animasi saldo, suara koin, marker kepemilikan, perhitungan sewa, maupun sinkronisasi Firebase.

## Riwayat penting permainan

Riwayat hanya menyimpan maksimal **22 kejadian penting terbaru**. Pergerakan pion, hasil roulette rutin, dan perpindahan giliran tidak dicatat. Riwayat tetap mencatat transaksi uang, sewa, pajak, pembelian properti, pembangunan rumah/hotel, pengambilan kartu, penjara, Parkir Bebas, pemain bergabung/keluar, serta hasil permainan.


## Revisi utilitas, rumah, popup, dan penjara

- Sewa Perusahaan Air dan Perusahaan Listrik tidak lagi mengikuti hasil roulette. Satu perusahaan mengenakan sewa 2× nilai hipotik ($150), sedangkan kepemilikan kedua perusahaan mengenakan sewa 5× nilai hipotik ($375).
- Penanda rumah dan hotel selalu disusun horizontal dari kiri ke kanan pada semua sisi papan.
- Popup detail properti diperkecil menjadi sekitar tiga perempat lebar sebelumnya.
- Percobaan keluar penjara tanpa membayar menggunakan roulette. Pemain bebas jika mendapat angka 12; jika gagal tiga kali, pemain tetap dibebaskan pada percobaan ketiga.

## Perbaikan sentuhan Parkir Bebas di iPhone

- Tombol **Pilih Petak Tujuan** menghentikan propagasi sentuhan agar tap tidak menembus popup dan membuka detail properti di belakangnya.
- Papan menolak pembukaan detail properti selama mode pilihan Parkir Bebas aktif.
- Pemilihan petak memakai event `pointerup` dan fallback `touchend` khusus perangkat sentuh.
- Canvas menggunakan `touch-action: none` agar Safari iPhone mengirimkan koordinat tap ke Phaser secara konsisten.
- Tersedia pilihan petak melalui dropdown di panel Aksi Petak pada layar HP sebagai jalur cadangan, sehingga permainan tidak dapat terkunci apabila tap canvas tidak diterima perangkat.

## Aturan aktivasi setelah satu putaran

Setiap pemain memulai permainan dalam status **petak belum aktif**. Efek petak baru berlaku untuk pemain tersebut setelah ia melewati START satu kali.

Sebelum putaran pertama selesai, pemain tidak dapat:

- membeli atau membayar sewa properti;
- mengambil kartu Dana Umum atau Kesempatan;
- terkena pajak atau denda;
- masuk penjara dari petak Masuk Penjara;
- menggunakan bonus Parkir Bebas.

Saat pertama kali melewati START, pemain menerima bonus START seperti biasa dan seluruh efek petak langsung aktif untuk pemain tersebut, termasuk efek petak tempat ia berhenti pada langkah itu.

## Saldo minus, penjualan properti, dan kebangkrutan

Jika saldo pemain menjadi negatif karena sewa, pajak, atau denda, giliran tidak dapat dilanjutkan sebelum saldo ditutup.

Pemain harus menjual satu properti secara penuh melalui menu **Aksi Petak**. Nilai jual dihitung sebagai:

- nilai hipotik tanah; ditambah
- 50% dari seluruh biaya rumah atau hotel yang telah dibangun.

Saat properti dijual, kepemilikan dan seluruh bangunan pada properti tersebut kembali ke bank. Jika saldo masih negatif, pemain harus menjual properti lain.

Jika tidak ada properti yang tersisa dan saldo tetap negatif, pemain dinyatakan **bangkrut**. Pionnya dikeluarkan dari permainan, gilirannya dilewati, dan pemain tetap terhubung sebagai penonton. Permainan pemain lain tetap berjalan sampai hanya tersisa satu pemain aktif.


## Perbaikan koneksi, host, dan sewa kompleks

- Label bonus **+$200** pada pemilihan tujuan Parkir Bebas ditempatkan di bagian atas petak agar tidak menutupi marker rumah atau hotel.
- Jika seorang pemain memiliki seluruh properti dalam satu kompleks warna, sewa kota dikalikan dua pada semua level: tanah kosong, rumah 1–4, maupun hotel.
- Jika host keluar saat lobby, hak host otomatis dipindahkan ke pemain terhubung dengan nomor kursi terendah.
- Presence pemain memakai Firebase `onDisconnect()` dan node koneksi unik per tab/perangkat. Permainan dijeda dan menampilkan popup saat pemain aktif kehilangan koneksi.
- Room dan kursi pemain disimpan di `localStorage`. Refresh halaman akan menghubungkan pemain kembali ke room yang sama; pemain baru benar-benar keluar setelah menekan tombol **Keluar**.
- Pemain yang bergabung setelah game dimulai tidak dimasukkan ke urutan giliran aktif, sedangkan pemain yang hanya terputus koneksi tetap dipertahankan sebagai peserta sampai kembali atau menekan Keluar.

## Aturan roulette 12 beruntun

- Jika pemain memperoleh angka **12**, pion tetap bergerak 12 petak dan seluruh efek petak diselesaikan seperti biasa.
- Setelah aksi petak selesai, pemain memperoleh popup bonus dan dapat memutar roulette sekali lagi.
- Jika angka 12 diperoleh dua kali berturut-turut, pemain kembali mendapat satu kesempatan tambahan dengan peringatan bahwa angka 12 berikutnya akan mengirimnya ke penjara.
- Jika angka 12 diperoleh tiga kali berturut-turut, putaran ketiga tidak menjalankan perpindahan normal. Pemain langsung dipindahkan ke penjara, streak di-reset, dan giliran dilanjutkan ke pemain berikutnya setelah popup ditutup.
- Hasil selain 12 langsung mereset hitungan roulette 12 beruntun.
- Bonus roulette diselesaikan setelah transaksi, kartu, pembelian, Parkir Bebas, atau penjualan aset akibat saldo minus selesai, sehingga tidak memotong aksi petak yang sedang berlangsung.
- State roulette 12 disimpan di Firebase sehingga tetap aman ketika halaman di-refresh atau pemain tersambung kembali.

## Penentuan urutan awal dengan roulette

Setelah host menekan **Mulai Game**, permainan memasuki fase penentuan urutan:

1. Setiap pemain Monopoly memperoleh satu kesempatan memutar roulette.
2. Nilai terbesar menjadi urutan pertama, kemudian diikuti nilai berikutnya.
3. Jika terdapat nilai yang sama, hanya pemain yang seri yang melakukan roulette ulang sampai urutannya dapat ditentukan.
4. Nomor dan posisi kartu pada **Data Pemain** berubah mengikuti urutan hasil roulette. Perubahan dilakukan secara visual tanpa memindahkan identitas kursi Firebase, sehingga kepemilikan, presence, reconnect, dan session pemain tetap aman.
5. Setelah popup hasil ditutup, kartu pemain bergeser dengan animasi ke urutan barunya.

Roulette pada fase pembuka tidak dihitung sebagai roulette 12 beruntun dan tidak menggerakkan pion.

## Kapasitas room dan penonton

Satu room mendukung maksimal enam orang:

- kursi 1–4: pemain Monopoly;
- kursi 5–6: penonton.

Penonton dapat melihat papan, roulette, transaksi, animasi, Data Pemain, dan riwayat secara realtime, tetapi tidak memiliki uang, pion, properti, atau giliran. Disconnect penonton tidak menjeda permainan.

Jika permainan sudah dimulai, orang baru hanya dapat bergabung pada slot penonton yang masih kosong. Pemain Monopoly yang me-refresh halaman atau terhubung kembali tetap kembali ke kursi dan permainan yang sama.

## Timeline animasi roulette dan pion

Urutan visual pada giliran normal dibuat konsisten di Chrome dan Safari:

1. Roulette berputar selama sekitar **2,5 detik**. Angka hasil di tengah disembunyikan selama putaran.
2. Setelah roulette berhenti, angka hasil ditampilkan.
3. Pion mulai bergerak **1 detik setelah hasil muncul**.
4. Pion bergerak petak demi petak tanpa dipindahkan lebih dahulu ke posisi akhir oleh snapshot Firebase.
5. Popup, pilihan aksi, pajak, sewa, kartu, atau efek petak lain baru ditampilkan **1 detik setelah pion tiba**.
6. Bonus melewati START ditampilkan saat pion benar-benar mencapai petak START. Jika langkah yang sama juga menghasilkan pajak atau sewa, animasi bonus START dan transaksi tujuan ditampilkan terpisah sesuai waktunya.

Timestamp timeline disimpan pada `lastMove.presentation`, sehingga refresh atau reconnect ketika roulette/pion masih bergerak dapat melanjutkan dari waktu yang sesuai dan tidak membuat pion langsung melompat ke tujuan.

## Pembaruan mobile, reconnect, dan informasi pemain

- Layout portrait tidak lagi dikunci ke tinggi satu layar. Halaman dapat di-scroll secara alami sehingga tombol kontrol tidak terpotong pada iPhone atau Android dengan tinggi viewport berbeda.
- Pada mode permainan mobile, papan dan panel permainan ditampilkan lebih dahulu, sedangkan informasi room ditempatkan setelah panel permainan agar area utama lebih mudah dijangkau.
- Pemain yang kehilangan koneksi diberi waktu 30 detik untuk kembali. Selama periode tersebut permainan dijeda dan popup menampilkan hitung mundur. Jika batas waktu terlewati, pemain dikeluarkan dari room; perangkat pemain kembali ke halaman buat/join room.
- Kartu Data Pemain dapat ditekan untuk membuka detail uang, total kekayaan, nilai jual aset, dan daftar properti beserta warna kompleks dan level bangunan.
- Mendarat pada petak Masuk Penjara menampilkan popup sebelum giliran dilanjutkan.
- Pembayaran sewa antar pemain menampilkan notifikasi selama lima detik di bagian bawah tengah papan.
- Roulette memiliki efek suara putaran melalui Web Audio API tanpa file audio tambahan.
- Untuk kompleks lengkap, daftar popup tetap menampilkan tarif dasar dan sewa aktual dikalikan 2× tepat satu kali.

## Deck Dana Umum dan Kesempatan V20

- Masing-masing deck berisi 20 kartu sesuai desain permainan.
- Urutan kartu dikocok saat room dibuat.
- Kartu yang sudah diambil dikeluarkan dari daftar sementara dan tidak dapat muncul lagi pada siklus yang sama.
- Jumlah kartu tersisa ditampilkan di tengah papan dalam format `tersisa/20`.
- Setelah kartu terakhir selesai diproses, deck otomatis dikocok ulang menjadi `20/20`.
- State deck disimpan di Firebase sehingga seluruh perangkat melihat jumlah dan urutan deck yang sama.

Efek yang sudah didukung meliputi pemasukan uang, pembayaran ke bank, denda ke Uang Pajak, mengambil pot pajak, masuk penjara, kartu Bebas Penjara, kartu Bebas Pajak, pembayaran ulang tahun antar pemain, biaya perbaikan rumah/hotel, perpindahan ke kota/bandara/perusahaan, pilihan mundur 2 atau 5 petak, pilihan membayar denda atau mengambil Kesempatan, Parkir Bebas, serta memilih kota milik sendiri untuk membangun dengan harga bangunan kota tersebut.

Kartu Bebas Penjara dapat digunakan melalui panel Aksi Petak saat pemain berada di penjara. Kartu Bebas Pajak menawarkan pilihan penggunaan saat pemain berhenti di petak pajak. Kartu yang menyebut dapat dijual disimpan sebagai inventaris; transaksi jual-beli kartu antar pemain belum diaktifkan karena desain kartu tidak menentukan harga penjualan.

## Voice chat WebRTC

Versi ini menambahkan voice chat maksimal 6 orang di dalam room:

- pada kartu diri sendiri tampil tombol microphone;
- microphone awalnya mati dan baru meminta izin browser saat tombol ditekan;
- pada kartu pemain lain tampil tombol speaker untuk mute/unmute suara pemain tersebut secara lokal;
- spectator juga dapat menggunakan voice chat;
- audio dikirim langsung antar-browser menggunakan WebRTC;
- Firebase Realtime Database hanya digunakan untuk pertukaran offer, answer, dan ICE candidate.

Voice chat memerlukan HTTPS atau localhost. Hosting Vercel sudah menggunakan HTTPS.

Konfigurasi server STUN/TURN berada di `firebase-config.js` melalui `window.VOICE_ICE_SERVERS`. STUN bawaan cukup untuk pengujian pada banyak jaringan, tetapi koneksi antaroperator seluler atau jaringan dengan NAT ketat dapat memerlukan TURN server.

Setelah menambahkan voice chat, deploy ulang `database.rules.json` karena rules memiliki node signaling baru:

```bash
npx firebase-tools deploy --only database
```

Jangan meletakkan credential TURN jangka panjang yang sensitif di repository publik. Untuk production, gunakan credential TURN sementara dari backend.
