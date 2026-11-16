const test = require('node:test');
const assert = require('node:assert');
const { checkIn } = require('../src/checkIn');

const sekarang = new Date(2026, 8, 10, 8, 30);
const members = [
  { id: 'GYM-2026-0001', nama: 'Faith', status: 'Active', tanggalBerakhir: '2026-12-31' },
  { id: 'GYM-2026-0002', nama: 'Afif', status: 'Active', tanggalBerakhir: '2026-08-01' },
  { id: 'GYM-2026-0003', nama: 'Iman', status: 'Suspended', tanggalBerakhir: '2026-12-31' },
];

test('member Active berhasil check-in', () => {
  const r = checkIn('GYM-2026-0001', members, sekarang);
  assert.strictEqual(r.berhasil, true);
  assert.strictEqual(r.nama, 'Faith');
});

test('member Expired ditolak', () => {
  const r = checkIn('GYM-2026-0002', members, sekarang);
  assert.strictEqual(r.berhasil, false);
  assert.match(r.alasan, /Expired/);
});

test('member Suspended ditolak', () => {
  const r = checkIn('GYM-2026-0003', members, sekarang);
  assert.strictEqual(r.berhasil, false);
  assert.match(r.alasan, /Suspended/);
});

test('QR tidak dikenal ditolak', () => {
  assert.strictEqual(checkIn('GYM-2026-9999', members, sekarang).berhasil, false);
  assert.strictEqual(checkIn('asal', members, sekarang).berhasil, false);
});
