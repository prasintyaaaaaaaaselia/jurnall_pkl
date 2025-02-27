import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

const data = [
  { name: 'Siswa', jumlah: 7 },
  { name: 'Tempat PKL', jumlah: 2 },
  { name: 'Jurnal Harian', jumlah: 3 }
];

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid"> {/* Lebarkan tampilan */}
        <div className="content-header text-center">
          <h1 className="m-0">Dashboard</h1>
          <ol className="breadcrumb d-flex justify-content-center">
          </ol>
        </div>
        
        <section className="content">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="small-box bg-info text-center">
                <div className="inner">
                  <h4>7</h4>
                  <p>Siswa</p>
                </div>
                <div className="icon">
                  <i className="fas fa-users" />
                </div>
                <a href="Siswa" className="small-box-footer">More info</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="small-box bg-success text-center">
                <div className="inner">
                  <h4>2</h4>
                  <p>Tempat PKL</p>
                </div>
                <div className="icon">
                  <i className="fas fa-university" />
                </div>
                <a href="Tempatpkl" className="small-box-footer">More info</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="small-box bg-warning text-center">
                <div className="inner">
                  <h4>3</h4>
                  <p>Jurnal Harian</p>
                </div>
                <div className="icon">
                  <i className="fas fa-address-book " />
                </div>
                <a href="Jurnalharian" className="small-box-footer">More info</a>
              </div>
            </div>
          </div>
          
          {/* Diagram Statistik dan Tren Statistik Bersampingan */}
          <div className="row mt-4 justify-content-center">
            <div className="col-lg-6"> {/* Sesuaikan lebar */}
              <div className="card">
                <div className="card-header text-center">
                  <h3 className="card-title">Statistik Diagram</h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={500}> {/* Lebih besar */}
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jumlah" fill="#8884d8" barSize={120} /> {/* Perbesar batang agar tidak gepeng */}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-6"> {/* Sesuaikan lebar */}
              <div className="card">
                <div className="card-header text-center">
                  <h3 className="card-title">Statistik Grafik</h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={500}> {/* Lebih besar */}
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="jumlah" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
