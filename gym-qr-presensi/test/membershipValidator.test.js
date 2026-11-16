const test = require('node:test');
const assert = require('node:assert');
const { resolveStatus, canCheckIn, STATUS } = require('../src/membershipValidator');

const hariIni = new Date(2026, 8, 10); // 10 September 2026

test('member dengan masa berlaku di masa depan berstatus Active', () => {
  const m = { status: 'Active', tanggalBerakhir: '2026-12-31' };
  assert.strictEqual(resolveStatus(m, hariIni), STATUS.ACTIVE);
});

test('member masih Active pada hari terakhir membership', () => {
  const m = { status: 'Active', tanggalBerakhir: '2026-09-10' };
  assert.strictEqual(resolveStatus(m, hariIni), STATUS.ACTIVE);
});

test('member menjadi Expired otomatis setelah tanggal berakhir', () => {
  const m = { status: 'Active', tanggalBerakhir: '2026-09-09' };
  assert.strictEqual(resolveStatus(m, hariIni), STATUS.EXPIRED);
  assert.strictEqual(canCheckIn(m, hariIni), false);
});

test('member Suspended ditolak walau masa berlaku masih ada', () => {
  const m = { status: 'Suspended', tanggalBerakhir: '2026-12-31' };
  assert.strictEqual(resolveStatus(m, hariIni), STATUS.SUSPENDED);
  assert.strictEqual(canCheckIn(m, hariIni), false);
});

test('data member kosong melempar error', () => {
  assert.throws(() => resolveStatus(null, hariIni), /tidak ditemukan/);
});
