import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddSiswa = () => {
    const [tempatPklList, setTempatPklList] = useState([]);
    const token = localStorage.getItem('token');

    // Ambil data tempat PKL saat komponen dimuat
    useEffect(() => {
        const fetchTempatPkl = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/tempatpkl", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setTempatPklList(data); // Sesuaikan dengan format respons API
            } catch (error) {
                console.error("Error fetching tempat PKL:", error);
            }
        };
        fetchTempatPkl();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            if (el.name) {
                fData[el.name] = el.value;
            }
        }
        try {
            const response = await fetch("http://localhost:3000/api/siswa/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fData),
            });

            if (!response.ok) throw new Error("Gagal menyimpan data");

            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Simpan berhasil",
                timer: 1000,
            }).then(() => {
                window.location.href = "/admin/siswa";
            });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                text: "Gagal menyimpan data",
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Data Siswa</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Siswa</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/siswa" className="btn btn-primary float-start">Lihat Data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="Id_tempatpkl">Id Tempat PKL</label>
                                            <select name="Id_tempatpkl" className="form-control">
                                                <option value="">=== Pilih Tempat PKL ===</option>
                                                {tempatPklList.map((tempat) => (
                                                    <option key={tempat.id} value={tempat.id}>
                                                        {tempat.id}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nama_siswa">Nama Siswa</label>
                                            <input type="text" name="nama_siswa" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="kelas">Kelas</label>
                                            <input type="text" name="kelas" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nomer_telepon">Nomer Telepon</label>
                                            <input type="text" name="nomer_telepon" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="form-control" />
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
};

export default AddSiswa;
