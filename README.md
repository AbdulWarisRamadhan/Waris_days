# Waris Days — Android APK

Paket sumber Waris Days yang siap dibangun menjadi APK Android menggunakan GitHub Actions. Tidak perlu memasang Android Studio di komputer pribadi; runner GitHub menyiapkan Java, Android SDK, dan proyek native Capacitor saat workflow berjalan.

## Cara menghasilkan APK

1. Ekstrak ZIP ini. Unggah **isi folder** ke repository GitHub baru, misalnya `waris-days`, pada branch `main`.
2. Buka tab **Actions** di repository. Jika GitHub meminta, aktifkan workflow Actions untuk repository tersebut.
3. Pilih **Build Waris Days APK** di panel kiri, lalu tekan **Run workflow** dan konfirmasi **Run workflow**.
4. Tunggu sampai workflow berstatus hijau (**Success**), buka halaman run yang selesai, lalu pada bagian **Artifacts** unduh **Waris-Days-APK**.
5. Ekstrak file artifact dan salin `app-debug.apk` ke HP Android. Buka file itu untuk memasang. Bila diminta, izinkan browser atau aplikasi File memasang aplikasi dari sumber tersebut.

Setiap push ke branch `main`/`master` yang mengubah aplikasi atau workflow juga akan memicu build otomatis.

## Pengujian dasar lokal (opsional)

Memerlukan Node.js 22 atau lebih baru:

```bash
npm install
npm run verify
```

Workflow GitHub menghasilkan proyek Android menggunakan Capacitor, lalu membangun APK debug. Output berada di `android/app/build/outputs/apk/debug/app-debug.apk`.

## Penyimpanan data

Data aplikasi sekarang disimpan lokal di perangkat melalui `localStorage` WebView. Data tidak otomatis disinkronkan ke cloud. Ekspor backup secara berkala jika fitur ekspor tersedia dan berfungsi pada perangkat yang dipakai; menghapus data aplikasi atau mencopot pemasangan dapat menghilangkan data lokal.

## Catatan keamanan distribusi

APK yang dihasilkan adalah **debug APK** yang bisa dipasang untuk pemakaian pribadi dan uji coba. Ini belum merupakan build release yang ditandatangani untuk publikasi di Play Store. Untuk memasang versi baru di atas versi lama, tanda tangan harus cocok; jika Android menolak pembaruan, cadangkan data lalu copot versi lama sebelum memasang APK baru.

## Struktur proyek

- `www/index.html` — aplikasi Waris Days.
- `capacitor.config.json` — identitas dan folder aplikasi.
- `.github/workflows/build-apk.yml` — build APK otomatis.
- `scripts/check-web.mjs` — pemeriksaan struktur HTML dan sintaks JavaScript sebelum build.
