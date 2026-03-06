import React from 'react';
import { User, MapPin } from 'lucide-react';

/**
 * Component สำหรับแสดงข้อมูลส่วนตัวของผู้เสียภาษี
 */
const TaxpayerPersonalInfo = ({ standard, data }) => {
    return (
        <section className="mb-5">
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <User size={20} className="me-2" /> ข้อมูลรายละเอียดผู้เสียภาษี
            </h5>
            <div className="row g-3">
                <div className="col-sm-6">
                    <label className="small text-secondary fw-bold mb-1">ชื่อ - นามสกุล</label>
                    <div className="p-2 bg-light rounded text-dark border-start border-3 border-navy">{standard.name}</div>
                </div>
                <div className="col-sm-2">
                    <label className="small text-secondary fw-bold mb-1">กลุ่ม PND</label>
                    <div className="p-2 bg-light rounded text-dark text-center">{data.pndGroup || '-'}</div>
                </div>
                <div className="col-sm-4">
                    <label className="small text-secondary fw-bold mb-1">เลขประจำตัวผู้เสียภาษี (TIN)</label>
                    <div className="p-2 bg-light rounded text-dark font-monospace">{data.tin || '-'}</div>
                </div>
                {/* บางแบบฟอร์มอาจไม่มีข้อมูลเพศหรือสถานะการยื่น ให้ตรวจสอบก่อนแสดงผล */}
                {standard.labels?.sex && (
                    <div className="col-sm-3">
                        <label className="small text-secondary fw-bold mb-1">เพศ</label>
                        <div className="p-2 bg-light rounded text-dark">{standard.labels.sex}</div>
                    </div>
                )}
                {standard.labels?.filingStatus && (
                    <div className="col-sm-3">
                        <label className="small text-secondary fw-bold mb-1">สถานะการยื่น</label>
                        <div className="p-2 bg-light rounded text-dark">{standard.labels.filingStatus}</div>
                    </div>
                )}
                <div className="col-sm-3">
                    <label className="small text-secondary fw-bold mb-1">เลขที่ใบเสร็จ (Rec. No)</label>
                    <div className="p-2 bg-light rounded text-dark">{data.recNo || '-'}</div>
                </div>
            </div>
        </section>
    );
};

export default TaxpayerPersonalInfo;
