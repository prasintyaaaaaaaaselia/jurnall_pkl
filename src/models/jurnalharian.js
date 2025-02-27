const koneksi = require("./db");

const selectjurnalharian = (callback) => {
    const q = "SELECT * FROM jurnalharian";
    koneksi.query(q, callback);
};
const insertjurnalharian = ( id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan, callback) => {
    const q = "INSERT INTO jurnalharian( id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan) VALUES(?,?,?,?,?) ";
    koneksi.query(q, [id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan], callback)
};
const selectjurnalharianById = (id, callback) => {
    const q = "SELECT * FROM jurnalharian where id=?";
    koneksi.query(q, [id], callback);
};
const updatejurnalharian = (id,  id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan, callback) => {
    const q = "update jurnalharian set id_siswa=?,tanggal_kegiatan=?,waktu_mulai=?,waktu_selesai=?,deskripsi_kegiatan=? where id=?";
    koneksi.query(q, [id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan, id], callback);
};
const deletejurnalharian= (id, callback) => {
    const q = "DELETE FROM jurnalharian where id=?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectjurnalharian,
    insertjurnalharian,
    selectjurnalharianById,
    updatejurnalharian,
    deletejurnalharian
}