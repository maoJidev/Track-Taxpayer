import { useAuth } from "../../auth/contexts/AuthContext";
import { User } from 'lucide-react';

const Topbar = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar-premium topbar d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-2 pe-2 border-end" style={{ height: '40px' }}>
                    <img src="/images/logo.png" alt="RD Logo" width="50%" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <span className="topbar-brand">ระบบติดตามรายผู้ประกอบการในท้องที่</span>
                    <span className="topbar-subbrand" style={{ marginTop: '-2px' }}>The Revenue Department</span>
                </div>
            </div>


            <div className="d-flex align-items-center gap-3 pe-3">
                <div className="text-end d-none d-md-block">
                    <div className="fw-bold text-navy lh-1 mb-1" style={{ fontSize: '0.9rem' }}>
                        {user ? user.name : "ไม่ได้เข้าสู่ระบบ"}
                    </div>
                    <div className="text-muted fw-medium" style={{ fontSize: '0.75rem', letterSpacing: '0.3px' }}>
                        {user ? `${{
                            'Region': 'สำนักงานสรรพากรภาค (ภาค)',
                            'ST': 'สำนักงานสรรพากรพื้นที่ (สธ)',
                            'SS': 'สำนักงานสรรพากรพื้นที่สาขา (สส)'
                        }[user.role] || user.role} - ${user.stOfficeName || ''}` : ""}
                    </div>
                </div>
                <div className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center border border-light" style={{ width: '40px', height: '40px', transition: 'all 0.2s' }}>
                    <User size={20} className="text-navy" />
                </div>
            </div>
        </nav >
    );
};


export default Topbar;
