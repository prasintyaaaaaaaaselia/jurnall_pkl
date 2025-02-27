const koneksi = require("./db");

const selecttempatpkl = (callback) => {
    const q = "SELECT * FROM tempatpkl";
    koneksi.query(q, callback);
};
const inserttempatpkl = ( nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan, callback) => {
    const q = "INSERT INTO tempatpkl( nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan) VALUES(?,?,?,?) ";
    koneksi.query(q, [ nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan], callback)
};
const selecttempatpklById = (id, callback) => {
    const q = "SELECT * FROM tempatpkl where id=?";
    koneksi.query(q, [id], callback);
};
const updatetempatpkl = (id,  nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan, callback) => {
    const q = "update tempatpkl set nama_perusahaan=?,alamat_perusahaan=?,bidang_usaha=?,email_perusahaan=? where id=?";
    koneksi.query(q, [nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan, id], callback);
};
const deletetempatpkl= (id, callback) => {
    const q = "DELETE FROM tempatpkl where id=?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selecttempatpkl,
    inserttempatpkl,
    selecttempatpklById,
    updatetempatpkl,
    deletetempatpkl
}