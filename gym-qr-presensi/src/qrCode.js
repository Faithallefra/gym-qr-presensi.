// QR Code hanya berisi identifier member (lihat laporan 2.6.3),
// bukan seluruh data member.

const PREFIX = 'GYM';
const FORMAT = /^GYM-\d{4}-\d{4,}$/;

function generateMemberId(sequence, year = new Date().getFullYear()) {
  if (!Number.isInteger(sequence) || sequence < 1) {
    throw new Error('Nomor urut harus bilangan bulat positif');
  }
  return `${PREFIX}-${year}-${String(sequence).padStart(4, '0')}`;
}

function buildQrPayload(memberId) {
  if (!FORMAT.test(memberId)) {
    throw new Error('Format ID member tidak valid');
  }
  return memberId;
}

function parseQrPayload(payload) {
  const text = String(payload || '').trim();
  return FORMAT.test(text) ? text : null;
}

module.exports = { generateMemberId, buildQrPayload, parseQrPayload };
