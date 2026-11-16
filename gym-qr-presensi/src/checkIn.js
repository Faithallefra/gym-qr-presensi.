// Alur presensi: QR dipindai -> cari member -> validasi -> catat (2.6.4 & 2.6.6)

const { parseQrPayload } = require('./qrCode');
const { resolveStatus, STATUS } = require('./membershipValidator');

function checkIn(payload, members, now = new Date()) {
  const memberId = parseQrPayload(payload);
  if (!memberId) {
    return { berhasil: false, alasan: 'QR Code tidak valid' };
  }

  const member = members.find((m) => m.id === memberId);
  if (!member) {
    return { berhasil: false, alasan: 'Member tidak ditemukan' };
  }

  const status = resolveStatus(member, now);
  if (status !== STATUS.ACTIVE) {
    return { berhasil: false, alasan: `Membership ${status}`, memberId };
  }

  return {
    berhasil: true,
    memberId,
    nama: member.nama,
    waktu: now.toISOString(),
  };
}

module.exports = { checkIn };
