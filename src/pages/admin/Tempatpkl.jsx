import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"

const Tempatpkl  = () => {
    const [dataTempatpkl, setTempatpkl] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/tempatpkl', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setTempatpkl(data);
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
                fetch('http://localhost:3000/api/tempatpkl/' + id, {
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
                        <h1 className="m-0">Data Tempatpkl</h1>
                    </div>{/* /.col */}
                    <div className="col">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Tempatpkl</li>
                        </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
      <section className="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Link to="/admin/addtempatpkl" className="btn btn-primary"  >Tambah tempatpkl</Link>
                    <table className="table table-striped table-bordered mt-2" style={{ backgroundColor: '#E5E1DA' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Perusahaan</th>
                            <th>Alamat Perusahaan</th>
                            <th>Bidang Usaha</th>
                            <th>Email Perusahaan</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTempatpkl.length > 0 ? (
                            dataTempatpkl.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama_perusahaan}</td>
                                    <td>{item.alamat_perusahaan}</td>
                                    <td>{item.bidang_usaha}</td>
                                    <td>{item.email_perusahaan}</td>
                                    <td>
                                        <Link to={`/admin/edittempatpkl/${item.id}`} className="btn btn-warning me-2">
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

export default Tempatpkl;
