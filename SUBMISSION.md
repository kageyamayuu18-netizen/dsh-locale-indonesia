# Submission ke DSH Plugin Hub

Salin isi di bawah ke issue baru di repo `dshplugin/dsh-plugin-hub` (klik tab Issues → New issue), lalu ganti `<owner>` dengan username GitHub Anda.

---

Title:

```
[Plugin submission] <owner>/dsh-locale-indonesia — Bahasa Indonesia language pack for DeepSeek Harness
```

Body:

```markdown
### Repository
https://github.com/<owner>/dsh-locale-indonesia

### One-line value
Menambahkan Bahasa Indonesia ke antarmuka DeepSeek Harness dan membuat semua model menjawab dalam Bahasa Indonesia.

### Category
UI & Experience

### Install command
dsh plugin --profile web add dsh-locale-indonesia

### Compatibility
DeepSeek Harness >= 0.2.2-rc.5; web dan desktop; Node.js >= 22.6.

### License
MIT

### Screenshots / demo
(Tambahkan screenshot Pengaturan → Bahasa dan tampilan Plugin Hub dalam Bahasa Indonesia.)

### Notes
- Menyuntik system prompt global agar model menjawab dalam Bahasa Indonesia; bisa dimatikan lewat ENABLE_RESPONSE_PROMPT di index.js.
- Termasuk terjemahan antarmuka DSH Plugin Hub.
- Tidak menghubungkan ke layanan eksternal; semua kamus disimpan lokal di dalam paket.

### Pre-submission checklist
- [x] Repository is public
- [x] GitHub topic `dsh-plugin` added
- [x] README includes the install command
- [x] Plugin exports an `apply(ctx)` module
- [x] Repository root includes a `package.json`
```
