// Validasi status membership (lihat laporan 2.6.5).
// Active -> boleh check-in | Expired -> ditolak | Suspended -> ditolak

const STATUS = Object.freeze({
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  SUSPENDED: 'Suspended',
});

function toDateOnly(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error('Tanggal tidak valid');
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Menentukan status efektif member.
 * - Suspended selalu menang (dinonaktifkan manual oleh admin).
 * - Expired otomatis jika hari ini melewati tanggal berakhir.
 * - Pada tanggal berakhir itu sendiri, member masih Active.
 */
function resolveStatus(member, today = new Date()) {
  if (!member) throw new Error('Data member tidak ditemukan');
  if (member.status === STATUS.SUSPENDED) return STATUS.SUSPENDED;

  const end = toDateOnly(member.tanggalBerakhir);
  const now = toDateOnly(today);
  return now > end ? STATUS.EXPIRED : STATUS.ACTIVE;
}

function canCheckIn(member, today = new Date()) {
  return resolveStatus(member, today) === STATUS.ACTIVE;
}

module.exports = { STATUS, resolveStatus, canCheckIn };
