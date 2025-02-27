import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Swal from "sweetalert2";

const EditSiswa = () => {
    const {id} = useParams();
    const [Id_tempatpkl, setId_Tempatpkl] = useState('');
    const [nama_siswa, setNama_Siswa] = useState('');
    const [kelas, setKelas] = useState('');
    const [nomer_telepon, setNomer_Telepon] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        getSiswa();
    }, []);
    const handleChange = (event) =>{
        const name = event.target.name;
        name === 'Id_tempatpkl'?setId_Tempatpkl(event.target.value):'';
        name === 'nama_siswa'?setNama_Siswa(event.target.value):'';
        name === 'kelas'?setKelas(event.target.value):'';
        name === 'nomer_telepon'?setNomer_Telepon(event.target.value):'';
        name === 'email'?setEmail(event.target.value):'';
    }
    const getSiswa= async () => {
        const response = await fetch('http://localhost:3000/api/siswa/'+id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setId_Tempatpkl(data.Id_tempatpkl);
        setNama_Siswa(data.nama_siswa);
        setKelas(data.kelas);
        setNomer_Telepon(data.nomer_telepon);
        setEmail(data.email);
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for(let elm of frmel.elements){
            fData[elm.name] = elm.value;
        }
        const response = await fetch('http://localhost:3000/api/siswa/'+id, {
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
                    window.location.href = '/admin/siswa';
                })

            } 
    }
  return (
    <>
        <div className="content-header">
            <div className="container=fluid">
                <div className="row mb-2">
                    <div className="col">
                        <h1 className="m-0">Data Siswa</h1>
                    </div>{/* /.col */}
                    <div className="col">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Input Siswa</li>
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
                        <Link to="/admin/siswa" className="btn btn-primary float-start">Lihat Data</Link>
                        <h2 className="text-center">Edit Data Siswa</h2>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="Id_tempatpkl">Id Tempatpkl</label>
                                <input type="text" value={Id_tempatpkl} onChange={handleChange} name="Id_tempatpkl" className="form-control" />
                            </div>
                                <div className="form-group">
                                <label htmlFor="nama_siswa">Nama Siswa</label>
                                <input type="text" value={nama_siswa} onChange={handleChange} name="nama_siswa" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="kelas">Kelas</label>
                                <input type="text" value={kelas} onChange={handleChange} name="kelas" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nomer_telepon">Nomer Telepon</label>
                                <input type="tel" value={nomer_telepon} onChange={handleChange} name="nomer_telepon" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" value={email} onChange={handleChange} name="email" className="form-control" />
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

export default EditSiswa;
