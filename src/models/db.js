const mysql = require("mysql2");
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jurnal pkl",
});
koneksi.connect((err) => {
    if (err) {
        console.error("Eror koneksi ke database", err.stack);
        return;
    }
    console.log("Berhasil koneksi ke database jurnal_pkl");
});
module.exports = koneksi;