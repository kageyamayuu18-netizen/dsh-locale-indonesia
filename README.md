# dsh-locale-indonesia

Bahasa Indonesia untuk DeepSeek Harness.

Plugin ini melakukan tiga hal:

1. Menambahkan **Bahasa Indonesia** ke **Pengaturan → Bahasa** dan menerjemahkan antarmuka (termasuk teks yang lebih baru dari aplikasi).
2. Menyuntik system prompt global agar **semua model/agent menjawab dalam Bahasa Indonesia**, apa pun bahasa pertanyaan yang diberikan.
3. Menyediakan terjemahan Indonesia untuk teks antarmuka **DSH Plugin Hub**.

## Instalasi

```bash
dsh plugin --profile web add dsh-locale-indonesia
```

Di aplikasi desktop: buka **Settings → Plugin Hub**, cari `dsh-locale-indonesia`, lalu klik **Install**. Restart aplikasi setelah instalasi.

## Pemakaian

1. Buka **Pengaturan → Bahasa**.
2. Pilih **Bahasa Indonesia**.

Setelah itu:
- Antarmuka memakai Bahasa Indonesia.
- Model menjawab dalam Bahasa Indonesia secara otomatis.
- Tampilan Plugin Hub juga ikut terjemahan.

## Menonaktifkan paksaan bahasa jawaban

Secara bawaan plugin menyuntik instruksi: *selalu jawab dalam Bahasa Indonesia, kecuali pengguna meminta bahasa lain secara eksplisit*.

Untuk menonaktifkannya, ubah di `index.js`:

```js
const ENABLE_RESPONSE_PROMPT = false
```

Lalu restart aplikasi.

## Catatan kompatibilitas

- DSH `>= 0.2.2-rc.5`.
- Saat DeepSeek Harness diperbarui, mungkin ada teks baru yang belum diterjemahkan; teks itu akan tampil dalam Bahasa Inggris sampai kamus diperbarui.
- Terjemahan Plugin Hub mengikuti versi kamus yang dibawa plugin ini. Jika Plugin Hub diperbarui dan ada kunci baru, sebagian teks bisa kembali ke Inggris sampai plugin ini diperbarui.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
