import React from 'react';
import { Users } from 'lucide-react';

/**
 * Component สำหรับแสดงข้อมูลทีมตรวจสอบและสำนักงานพื้นที่
 */
const TaxpayerOperationalInfo = ({ data }) => {
    return (
        <section className="mb-5">
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <Users size={20} className="me-2" /> ข้อมูลทีมตรวจสอบและพื้นที่
            </h5>
            <div className="row g-3">
                <div className="col-sm-6">
                    <label className="small text-secondary fw-bold mb-1">ทีม (Team)</label>
                    <div className="p-2 bg-light rounded text-dark border-start border-3 border-info">{data.ops?.team || 'ไม่ระบุทีม'}</div>
                </div>
                <div className="col-sm-6">
                    <label className="small text-secondary fw-bold mb-1">ทีมย่อย (Sub Team)</label>
                    <div className="p-2 bg-light rounded text-dark">{data.ops?.subteam || 'ไม่ระบุทีมย่อย'}</div>
                </div>
                <div className="col-sm-4">
                    <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                        <div className="text-secondary small fw-bold">ภาค (Region)</div>
                        <div className="fw-bold">{data.ops?.regionName || data.ops?.regionCode || '-'}</div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                        <div className="text-secondary small fw-bold">พื้นที่ (ST)</div>
                        <div className="fw-bold">{data.ops?.stName || data.ops?.stCode || '-'}</div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                        <div className="text-secondary small fw-bold">สาขา (SS)</div>
                        <div className="fw-bold">{data.ops?.ssName || data.ops?.ssCode || '-'}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TaxpayerOperationalInfo;
