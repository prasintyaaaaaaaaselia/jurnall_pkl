import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"

const Jurnalharian  = () => {
    const [datajurnalharian, setJurnalharian] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/jurnalharian', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setJurnalharian(data);
    }

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/jurnalharian/' + id, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then(response => response.json())
                .then(res => {
                    window.location.reload();
                });
            }
        });
    }
  return (
    <>
        <div className="content-header">
            <div className="container=fluid">
                <div className="row mb-2">
                    <div className="col">
                        <h1 className="m-0">Data Jurnalharian</h1>
                    </div>{/* /.col */}
                    <div className="col">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Jurnalharian</li>
                        </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
      <section className="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Link to="/admin/addjurnalharian" className="btn btn-primary"  >Tambah Jurnalharian</Link>
                    <table className="table table-striped table-bordered mt-2" style={{ backgroundColor: '#E5E1DA' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id Siswa</th>
                            <th>Tanggal Kegiatan</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Selesai</th>
                            <th>Deskripsi Kegiatan</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datajurnalharian.length > 0 ? (
                            datajurnalharian.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id_siswa}</td>
                                    <td>{item.tanggal_kegiatan}</td>
                                    <td>{item.waktu_mulai}</td>
                                    <td>{item.waktu_selesai}</td>
                                    <td>{item.deskripsi_kegiatan}</td>
                                    <td>
                                        <Link to={`/admin/editjurnalharian/${item.id}`} className="btn btn-warning me-2">
                                            <i className="fas fa-edit"></i>Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>Hapus</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Data Kosong</td>
                            </tr>
                        ) 
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Jurnalharian;
