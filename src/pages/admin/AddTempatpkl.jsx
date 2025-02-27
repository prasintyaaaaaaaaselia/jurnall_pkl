import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddTempatpkl = () => {
    const token = localStorage.getItem('token');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {}
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://localhost:3000/api/tempatpkl/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });
        if (!response.ok){
            console.log(error => console.error);
        } else {
            event.target.reset();
            Swal.fire({
            icon: "success",
            text: "Simpan berhasil",
            timer: 1000
        }).then(res => {
            window.location.href = '/admin/tempatpkl';
                })
            }
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
                            <li className="breadcrumb-item active">Input Tempatpkl</li>
                        </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
      <section className="content">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                        <Link to="/admin/tempatpkl" className="btn btn-primary float-start">Lihat Data</Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                <label htmlfor="nama_perusahaan">Nama Perusahaan</label>
                                <input type="text" name="nama_perusahaan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="alamat_perusahaan">Alamat Perusahaan</label>
                                <input type="text" name="alamat_perusahaan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bidang_usaha">Bidang Usaha</label>
                                <input type="text" name="bidang_usaha" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_perusahaan">Email Perusahaan</label>
                                <input type="email" name="email_perusahaan" className="form-control" />
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

export default AddTempatpkl;
