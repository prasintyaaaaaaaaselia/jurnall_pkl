import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layouts";
import Dashboard from "./pages/admin/Dashboard";
import AuthLayout from "./layouts/AuthLayouts";
import Login from "./pages/auth/login";
import Siswa from "./pages/admin/Siswa";
import AddSiswa from "./pages/admin/AddSiswa";
import EditSiswa from "./pages/admin/EditSiswa";
import Tempatpkl from "./pages/admin/Tempatpkl";
import AddTempatpkl from "./pages/admin/AddTempatpkl";
import EditTempatpkl from "./pages/admin/EditTempatpkl";
import Jurnalharian from "./pages/admin/Jurnalharian";
import AddJurnalharian from "./pages/admin/AddJurnalharian";
import EditJurnalharian from "./pages/admin/EditJurnalharian";

// Fungsi untuk mengecek apakah data pengguna sudah login dengan memerikasa token di localStroage
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

//komponen untuk melindungi rute yang hanya bisa diakses oleh pengguna yang sudah login
const ProtectedRoute = ({ component: Component }) =>  {
  return isAuthenticated() ?  <Component/> : <Navigate to="/" replace/>
};

const App = () => {
  return (
    
    <>
      <Router>
      <Routes>
        {/* Rute untuk bagian admin, hanya bisa diakses jika pengguna sudah login*/}
        <Route path="/admin/*" element={isAuthenticated() ? <Layout /> : <Navigate to='/' replace />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="siswa" element={<Siswa />} />
          <Route path="addsiswa" element={<AddSiswa />} />
          <Route path="editsiswa/:id" element={<EditSiswa />} />
          <Route path="tempatpkl" element={<Tempatpkl/>} />
          <Route path="addtempatpkl" element={<AddTempatpkl/>} />
          <Route path="edittempatpkl/:id" element={<EditTempatpkl/>} />
          <Route path="jurnalharian" element={<Jurnalharian/>} />
          <Route path="addjurnalharian" element={<AddJurnalharian/>} />
          <Route path="editjurnalharian/:id" element={<EditJurnalharian/>} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
      </Router>
    </>
  );
};


export default App;
