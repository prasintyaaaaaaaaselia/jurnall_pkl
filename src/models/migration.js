const mysql = require("mysql2");
const konekMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

const createsiswaTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS siswa(
        id INT AUTO_INCREMENT PRIMARY KEY,
        Id_tempatpkl INT,
        nama_siswa varchar(100),
        kelas varchar(20),
        nomer_telepon varchar(20),
        email varchar(100) UNIQUE,
        password varchar(100),
        created_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) `;
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("eror buat table siswa", err.stack);
        return;
    }
    console.log("table siswa berhasil di buat");
});
};

const createtempatpklTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS tempatpkl(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_perusahaan varchar(255),
        alamat_perusahaan TEXT,
        bidang_usaha varchar(100),
        email_perusahaan varchar(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) `;
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("eror buat table tempatpkl", err.stack);
        return;
    }
    console.log("table tempatpkl berhasil di buat");
});
};

const createjurnalharianTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS jurnalharian(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_siswa INT,
        tanggal_kegiatan DATE,
        waktu_mulai TIME,
        waktu_selesai TIME,
        deskripsi_kegiatan TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) `;
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("eror buat table jurnalharian", err.stack);
        return;
    }
    console.log("table jurnalharian berhasil di buat");
});
};

const migration = () => {
    konekMysql.connect((err) => {
        if (err) {
            console.error("Eror koneksi ke database", err.stack);
            return;
        }
        console.log("berhasil konek mysql");
        konekMysql.query(
            "CREATE DATABASE IF NOT EXISTS jurnal_pkl",
            (err, result) => {
                if (err) {
                    console.error("Error membuat database", err.stack);
                    return;
                }
                console.log("Database berhasil dibuat atau sudah ada,");

                const koneksi = require("./db");
                createsiswaTable(koneksi);
                createtempatpklTable(koneksi);
                createjurnalharianTable(koneksi);

                konekMysql.end();
            }
        );
    });
};

module.exports = migration;