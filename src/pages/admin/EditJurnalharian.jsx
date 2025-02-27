import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Swal from "sweetalert2";

const EditJurnalharian = () => {
    const {id} = useParams();
    const [id_siswa, setId_Siswa] = useState('');
    const [tanggal_kegiatan, setTanggal_Kegiatan] = useState('');
    const [waktu_mulai, setWaktu_Mulai] = useState('');
    const [waktu_selesai, setWaktu_Selesai] = useState('');
    const [deskripsi_kegiatan, setDeskripsi_Kegiatan] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        getJurnalharian();
    }, []);
    const handleChange = (event) =>{
        const name = event.target.name;
        name === 'id_siswa'?setId_Siswa(event.target.value):'';
        name === 'tanggal_kegiatan'?setTanggal_Kegiatan(event.target.value):'';
        name === 'waktu_mulai'?setWaktu_Mulai(event.target.value):'';
        name === 'waktu_selesai'?setWaktu_Selesai(event.target.value):'';
        name === 'deskripsi_kegiatan'?setDeskripsi_Kegiatan(event.target.value):'';
    }
    const getJurnalharian= async () => {
        const response = await fetch('http://localhost:3000/api/jurnalharian/'+id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setId_Siswa(data.id_siswa);
        setTanggal_Kegiatan(data.tanggal_kegiatan);
        setWaktu_Mulai(data.waktu_mulai);
        setWaktu_Selesai(data.waktu_selesai);
        setDeskripsi_Kegiatan(data.deskripsi_kegiatan);
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for(let elm of frmel.elements){
            fData[elm.name] = elm.value;
        }
        const response = await fetch('http://localhost:3000/api/jurnalharian/'+id,{
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
                    window.location.href = '/admin/jurnalharian';
                })

            } 
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
                            <li className="breadcrumb-item active">Input Jurnalharian</li>
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
                        <Link to="/admin/jurnalharian" className="btn btn-primary float-start">Lihat Data</Link>
                        <h2 className="text-center">Edit Data Jurnalharian</h2>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="card-body">
                                <div className="form-group">
                                <label htmlFor="Id_siswa">Id Siswa</label>
                                <input type="text" value={id_siswa} onChange={handleChange} name="id_siswa" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tanggal_kegatan">Tanggal Kegiatan</label>
                                <input type="date" value={tanggal_kegiatan} onChange={handleChange} name="tanggal_kegiatan" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="waktu_mulai">Waktu Mulai</label>
                                <input type="time" value={waktu_mulai} onChange={handleChange} name="waktu_mulai" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="waktu_selesai">Waktu Selesai</label>
                                <input type="time" value={waktu_selesai} onChange={handleChange} name="waktu_selesai" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="deskripsi_kegiatan">Deskripsi Kegiatan</label>
                                <input type="text" value={deskripsi_kegiatan} onChange={handleChange} name="deskripsi_kegiatan" className="form-control" />
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

export default EditJurnalharian;
