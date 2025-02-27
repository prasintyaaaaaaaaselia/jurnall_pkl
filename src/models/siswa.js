const koneksi = require("./db");
const bcrypt = require('bcryptjs')

const selectsiswa = (callback) => {
    const q = "SELECT * FROM siswa";
    koneksi.query(q, callback);
};
const insertsiswa = ( Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password, callback) => {
    if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const q = "INSERT INTO siswa(Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password) VALUES(?,?,?,?,?,?) ";
    koneksi.query(q, [Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, hashedPassword], callback)
    } else {
        console.error("password harus di isi")
    }
};
const selectsiswaById = (id, callback) => {
    const q = "SELECT * FROM siswa where id=?";
    koneksi.query(q, [id], callback);
};
const updatesiswa = (id, Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password, callback) => {
    if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const q = "update siswa set Id_tempatpkl=?, nama_siswa=?,kelas=?,nomer_telepon=?,email=?,password=? where id=?";
    koneksi.query(q, [Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password, id], callback);
    } else {
        const q ="update siswa set Id_tempatpkl=?,nama_siswa=?,kelas=?,nomer_telepon=?,email=?, password=? where id =? ";
        koneksi.query(q, [Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, id], callback);
    }
};
const deletesiswa = (id, callback) => {
    const q = "DELETE FROM siswa where id=?";
    koneksi.query(q, [id], callback);
};

 const selectsiswaByEmail=(email,callback)=>{
    const q=`select * from siswa where email=?`
    koneksi.query(q,[email],callback)
};

module.exports = {
    selectsiswa,
    selectsiswaByEmail,
    insertsiswa,
    selectsiswaById,
    updatesiswa,
    deletesiswa
    
}