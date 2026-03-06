import React from 'react';
import { User } from 'lucide-react';

/**
 * Component สำหรับแสดงข้อมูลคู่สมรส (ถ้ามี)
 */
const TaxpayerSpouseInfo = ({ standard }) => {
    if (!standard?.spouse) return null;

    return (
        <section>
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <User size={20} className="me-2" /> ข้อมูลรายละเอียดคู่สมรส
            </h5>
            <div className="row g-3">
                <div className="col-sm-12">
                    <label className="small text-secondary fw-bold mb-1">ชื่อ - นามสกุล (คู่สมรส)</label>
                    <div className="p-2 bg-light rounded text-dark border-start border-navy border-3">{standard.spouse.name}</div>
                </div>
                <div className="col-sm-12">
                    <label className="small text-secondary fw-bold mb-1">เลขประจำตัวผู้เสียภาษี (คู่สมรส)</label>
                    <div className="p-2 bg-light rounded text-dark font-monospace">{standard.spouse.nid}</div>
                </div>
            </div>
        </section>
    );
};

export default TaxpayerSpouseInfo;
