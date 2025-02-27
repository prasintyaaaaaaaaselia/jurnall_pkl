import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Swal from "sweetalert2";

const EditTempatpkl = () => {
    const {id} = useParams();
    const [nama_perusahaan, setNama_Perusahaan] = useState('');
    const [alamat_perusahaan, setAlamat_perusahaan] = useState('');
    const [bidang_usaha, setBidang_usaha] = useState('');
    const [email_perusahaan, setEmail_Perusahaan] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        getTempatpkl();
    }, []);
    const handleChange = (event) =>{
        const name = event.target.name;
        name === 'nama_perusahaan'?setNama_Perusahaan(event.target.value):'';
        name === 'alamat_perusahaan'?setAlamat_perusahaan(event.target.value):'';
        name === 'bidang_usaha'?setBidang_usaha(event.target.value):'';
        name === 'email_perusahaan'?setEmail_Perusahaan(event.target.value):'';
    }
    const getTempatpkl= async () => {
        const response = await fetch('http://localhost:3000/api/tempatpkl/'+id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNama_Perusahaan(data.nama_perusahaan);
        setAlamat_perusahaan(data.alamat_perusahaan);
        setBidang_usaha(data.bidang_usaha);
        setEmail_Perusahaan(data.email_perusahaan);
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for(let elm of frmel.elements){
            fData[elm.name] = elm.value;
        }
        const response = await fetch('http://localhost:3000/api/tempatpkl/'+id,{
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify(fData),
        });
        if (!response.ok){
            console.log(error => console.error);
        } else {
            event.target.reset();
            Swal.fire({
            icon: "success",
            text: "Update berhasil",
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                    <div className="card-header">
                        <Link to="/admin/tempatpkl" className="btn btn-primary float-start">Lihat Data</Link>
                        <h2 className="text-center">Edit Data Tempatpkl</h2>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="card-body">
                                <div className="form-group">
                                <label htmlFor="nama_perusahaan">Nama Perusahaan</label>
                                <input type="text" value={nama_perusahaan} onChange={handleChange} name="nama_perusahaan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="alamat_perusahaan">Alamat Perusahaan</label>
                                <input type="text" value={alamat_perusahaan} onChange={handleChange} name="alamat_perusahaan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bidang_usaha">Bidang Usaha</label>
                                <input type="text" value={bidang_usaha} onChange={handleChange} name="bidang_usaha" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_perusahaan">Email Perusahaan</label>
                                <input type="text" value={email_perusahaan} onChange={handleChange} name="email_perusahaan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" className="form-control" />
                                <span className="text-danger">Kosongkan jika tidak ingin mengubah password</span>
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

export default EditTempatpkl;
