# Laporan Praktik Pipeline CI

**Mata Kuliah:** Rekayasa Perangkat Lunak — Tugas Team-Based Project
**Proyek:** Sistem Manajemen Gym dan Presensi Member Berbasis QR Code
**Kelompok:** 10
**Repository:** <ISI URL REPOSITORY>
**Berkas workflow:** `.github/workflows/ci.yml`

## 1. Siapkan
Perintah yang berjalan di lokal:
- `npm run build` → semua modul `src/` berhasil dimuat
- `npm test` → 13 test lulus (validasi membership, QR Code, check-in)

## 2. Otomasikan
Workflow berjalan pada `push` dan `pull_request` ke `main`. Langkah: checkout, setup Node.js 20, install, build check, test.

## 3. Bukti

### 3.1 Run sukses
- URL run: <ISI URL RUN HIJAU>
- Screenshot: `docs/bukti/run-sukses.png`

### 3.2 Run gagal dan perbaikannya
- URL run gagal: <ISI URL RUN MERAH>
- Screenshot: `docs/bukti/run-gagal.png`
- URL run setelah perbaikan: <ISI URL RUN HIJAU KEDUA>

## 4. Ringkasan error dan langkah perbaikan

| Item | Keterangan |
|---|---|
| Langkah yang gagal | `Jalankan test` (`npm test`) |
| Test yang gagal | `member masih Active pada hari terakhir membership` |
| Pesan error | `expected: 'Active'`, `actual: 'Expired'` |
| Penyebab | Di `src/membershipValidator.js`, perbandingan tanggal memakai `now >= end`, sehingga member yang masa berlakunya berakhir **hari ini** langsung dianggap Expired. Sesuai spesifikasi, member masih boleh check-in pada hari terakhir. |
| Perbaikan | Ubah menjadi `now > end` |
| Hasil | 13 dari 13 test lulus, pipeline hijau |

Pelajaran: test pada kasus batas (boundary) menangkap kesalahan logika yang sulit terlihat saat pengujian manual.

## 5. Pembagian peran
| Anggota | Tanggung jawab |
|---|---|
| Faith Razqy Allefra | _contoh: menulis workflow `ci.yml`_ |
| Muh. Afif Hamka | _contoh: menulis unit test dan mensimulasikan error_ |
| Iman Nugraha | _contoh: README, screenshot, dan laporan_ |

## 6. Cara mereproduksi error (untuk demo)
```bash
git checkout -b demo/ci-gagal
# ubah di src/membershipValidator.js:  now > end   ->   now >= end
git commit -am "demo: sengaja buat bug batas tanggal"
git push -u origin demo/ci-gagal      # buka Pull Request, run akan merah
# perbaiki kembali ke: now > end
git commit -am "fix: member masih Active di hari terakhir"
git push                              # run menjadi hijau
```
