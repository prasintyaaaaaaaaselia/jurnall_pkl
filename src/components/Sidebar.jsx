import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/';
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-white-primary elevation-4" style={{ backgroundColor: '#C4D9FF' }}>
                {/* Konten Sidebar */}
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="/images/download__2_-removebg-preview.png" className="brand-image img-circle " style={{ paddingLeft: '3px' }} />        
                    <span className="text-3xl font-bold text-blue-600">JURNAL PKL</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/images/d125ea56-f7eb-44e1-9db2-eb577b06eee9.jpg" className="img-rectangle " alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Seliaprasintya</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                <ul className='nav nav-treeview'>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/dashboard" className="nav-link ">
                                            <i className='nav-icon fas fa-signal' />
                                            <p>Dashboard</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/siswa" className="nav-link ">
                                            <i className='nav-icon fas fa-user' />
                                            <p>Siswa</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/tempatpkl" className="nav-link ">
                                            <i className='nav-icon fas fa-book' />
                                            <p>Tempat Pkl</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/jurnalharian" className="nav-link ">
                                            <i className='nav-icon fas fa-book' />
                                            <p>Jurnal Harian</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <a onClickCapture={Logout} className="nav-link">
                                            <i className='nav-icon fas fa-sign-in-alt' />
                                            <p>Log Out</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    )
}

export default Sidebar