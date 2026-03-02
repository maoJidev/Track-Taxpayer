import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Building2, User, Settings, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from 'react';

import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isTaxpayerOpen, setIsTaxpayerOpen] = useState(true);

    const handleLogout = () => {
        Swal.fire({
            title: 'ออกจากระบบ?',
            text: "คุณต้องการออกจากระบบใช่หรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'ออกจากระบบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: 'ออกจากระบบเรียบร้อยแล้ว',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/');
                });
            }
        });
    };


    return (
        <div className="sidebar d-flex flex-column bg-navy text-white">
            <NavLink to="/" className="sidebar-brand text-decoration-none text-white d-block mb-3">
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-white rounded p-1" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/images/favicon.ico" alt="Logo" style={{ maxHeight: '24px' }} />
                    </div>
                    <span className="sidebar-brand-text fs-5 fw-bold">TrackTaxpayer</span>
                </div>
            </NavLink>

            <div className="sidebar-menu flex-grow-1">
                <small className="text-uppercase text-white-50 fw-bold px-3 mb-3 d-block" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Main Menu</small>
                <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} className="me-3" />
                    <span>ภาพรวม</span>
                </NavLink>
                <div className="sidebar-item">
                    <div
                        className={`sidebar-link cursor-pointer d-flex align-items-center justify-content-between ${isTaxpayerOpen ? 'text-white' : ''}`}
                        onClick={() => setIsTaxpayerOpen(!isTaxpayerOpen)}
                    >
                        <div className="d-flex align-items-center">
                            <Users size={20} className="me-3" />
                            <span>ผู้ประกอบการ</span>
                        </div>
                        {isTaxpayerOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>

                    {isTaxpayerOpen && (
                        <div className="sidebar-submenu ps-4 animate__animated animate__fadeIn">
                            <NavLink to="/taxpayers/pnd90" className={({ isActive }) => `sidebar-link small py-2 ${isActive ? 'active' : ''}`}>
                                <div className="d-flex align-items-center">
                                    <div className="dot me-2"></div>
                                    <span>ภ.ง.ด. 90</span>
                                </div>
                            </NavLink>
                            <NavLink to="/taxpayers/pnd91" className={({ isActive }) => `sidebar-link small py-2 ${isActive ? 'active' : ''}`}>
                                <div className="d-flex align-items-center">
                                    <div className="dot me-2"></div>
                                    <span>ภ.ง.ด. 91</span>
                                </div>
                            </NavLink>
                            <NavLink to="/taxpayers/pnd94" className={({ isActive }) => `sidebar-link small py-2 ${isActive ? 'active' : ''}`}>
                                <div className="d-flex align-items-center">
                                    <div className="dot me-2"></div>
                                    <span>ภ.ง.ด. 94</span>
                                </div>
                            </NavLink>
                        </div>
                    )}
                </div>
                <NavLink to="/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <FileText size={20} className="me-3" />
                    <span>รายงาน</span>
                </NavLink>
                <NavLink to="/offices" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Building2 size={20} className="me-3" />
                    <span>จัดการข้อมูลสำนักงาน</span>
                </NavLink>

                <div className="mt-5">
                    <small className="text-uppercase text-white-50 fw-bold px-3 mb-3 d-block" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Account & Settings</small>
                    <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <User size={20} className="me-3" />
                        <span>จัดการบัญชี</span>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <Settings size={20} className="me-3" />
                        <span>ตั้งค่าระบบ</span>
                    </NavLink>
                    <button onClick={handleLogout} className="sidebar-link w-100 text-start border-0 bg-transparent text-danger bg-opacity-10">
                        <LogOut size={20} className="me-3" />
                        <span>ออกจากระบบ</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
