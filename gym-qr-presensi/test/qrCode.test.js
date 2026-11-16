const test = require('node:test');
const assert = require('node:assert');
const { generateMemberId, buildQrPayload, parseQrPayload } = require('../src/qrCode');

test('generateMemberId menghasilkan format GYM-TAHUN-NNNN', () => {
  assert.strictEqual(generateMemberId(7, 2026), 'GYM-2026-0007');
});

test('generateMemberId menolak nomor urut tidak valid', () => {
  assert.throws(() => generateMemberId(0), /positif/);
});

test('payload QR dapat dibuat dan diparse kembali', () => {
  const id = generateMemberId(12, 2026);
  assert.strictEqual(parseQrPayload(buildQrPayload(id)), id);
});

test('payload sembarang ditolak', () => {
  assert.strictEqual(parseQrPayload('halo-dunia'), null);
  assert.strictEqual(parseQrPayload(''), null);
});
