import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddJurnalharian = () => {
    const token = localStorage.getItem('token');
    const [siswaList, setSiswaList] = useState([]);
    const [idSiswa, setIdSiswa] = useState("");

    // Ambil data siswa dari API
    useEffect(() => {
        getSiswa();
    }, []);

    const getSiswa = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/siswa", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data siswa");
            }

            const data = await response.json();
            setSiswaList(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire({
                icon: "error",
                text: "Gagal mengambil data siswa!",
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {}
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        
        const response = await fetch("http://localhost:3000/api/jurnalharian/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.error("Gagal menyimpan jurnal harian");
            Swal.fire({
                icon: "error",
                text: "Gagal menyimpan jurnal harian!",
            });
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Simpan berhasil",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/jurnalharian';
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Data Jurnal Harian</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Jurnal Harian</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/jurnalharian" className="btn btn-primary float-start">Lihat Data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="id_siswa">Id Siswa</label>
                                            <select 
                                                name="id_siswa" 
                                                className="form-control" 
                                                value={idSiswa} 
                                                onChange={(e) => setIdSiswa(e.target.value)}
                                            >
                                                <option value="">=== Pilih ID Siswa ===</option>
                                                {siswaList.map((siswa) => (
                                                    <option key={siswa.id} value={siswa.id}>
                                                        {siswa.id}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tanggal_kegiatan">Tanggal Kegiatan</label>
                                            <input type="date" name="tanggal_kegiatan" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="waktu_mulai">Waktu Mulai</label>
                                            <input type="time" name="waktu_mulai" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="waktu_selesai">Waktu Selesai</label>
                                            <input type="time" name="waktu_selesai" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deskripsi_kegiatan">Deskripsi Kegiatan</label>
                                            <input type="text" name="deskripsi_kegiatan" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddJurnalharian;
