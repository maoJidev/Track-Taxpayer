import React from "react";
import { User, Mail, Phone, Shield, MapPin, Briefcase } from "lucide-react";
import { useAuth } from "../features/auth/contexts/AuthContext";

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-5 text-center text-muted">กำลังโหลดข้อมูลโปรไฟล์...</div>;
    if (!user) return <div className="p-5 text-center text-muted">ไม่พบข้อมูลผู้ใช้งาน</div>;

    const department = [
        user.regionOfficeName,
        user.stOfficeName,
        user.ssOfficeName
    ].filter(Boolean).join(' / ') || 'ไม่ระบุ';

    const roleThai = {
        'Region': 'สำนักงานสรรพากรภาค (ภาค)',
        'ST': 'สำนักงานสรรพากรพื้นที่ (สธ)',
        'SS': 'สำนักงานสรรพากรพื้นที่สาขา (สส)'
    }[user.role] || user.role;

    return (
        <div className="container-fluid py-4">
            <h4 className="fw-bold mb-4">จัดการบัญชีผู้ใช้งาน</h4>

            <div className="row">
                <div className="col-md-4">
                    {/* User Profile Card */}
                    <div className="card shadow-sm border-0 mb-4 text-center p-4">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="bg-light rounded-circle p-4">
                                <User size={64} className="text-primary" />
                            </div>
                        </div>
                        <h5 className="fw-bold mb-1">{user.name}</h5>
                        <p className="text-muted small mb-3">{roleThai}</p>
                        <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
                            สถานะ: {user.userStatus || 'ใช้งานปกติ'}
                        </div>
                        <p className="text-secondary small">รหัสผู้ใช้งาน: {user.userId}</p>
                    </div>
                </div>

                <div className="col-md-8">
                    {/* Details Card */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3 border-0">
                            <h6 className="fw-bold mb-0">ข้อมูลส่วนตัว</h6>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted small">ชื่อ-นามสกุล</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><User size={18} /></span>
                                            <input type="text" className="form-control border-start-0 ps-0 bg-white" value={user.name} disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted small">ตำแหน่ง / สิทธิ์การใช้งาน</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><Briefcase size={18} /></span>
                                            <input type="text" className="form-control border-start-0 ps-0 bg-white" value={roleThai} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted small">อีเมล</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><Mail size={18} /></span>
                                            <input type="email" className="form-control border-start-0 ps-0 bg-white" value={user.email || 'ไม่ระบุ'} disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted small">เบอร์โทรศัพท์</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><Phone size={18} /></span>
                                            <input type="text" className="form-control border-start-0 ps-0 bg-white" value={user.telNo || 'ไม่ระบุ'} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-muted small">สังกัด / หน่วยงาน</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><MapPin size={18} /></span>
                                        <input type="text" className="form-control border-start-0 ps-0 bg-white" value={department} disabled />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">ความปลอดภัย</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-light p-2 rounded"><Shield size={20} className="text-secondary" /></div>
                                    <div>
                                        <div className="fw-bold">รหัสผ่าน</div>
                                        <div className="small text-muted">จัดการผ่านระบบ Single Sign-On (SSO)</div>
                                    </div>
                                </div>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" disabled>เปลี่ยนรหัสผ่าน</button>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-light p-2 rounded"><User size={20} className="text-secondary" /></div>
                                    <div>
                                        <div className="fw-bold">การยืนยันตัวตน 2 ขั้นตอน (2FA)</div>
                                        <div className="small text-muted">จัดการผ่านระบบส่วนกลาง</div>
                                    </div>
                                </div>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" disabled>ตั้งค่า</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
