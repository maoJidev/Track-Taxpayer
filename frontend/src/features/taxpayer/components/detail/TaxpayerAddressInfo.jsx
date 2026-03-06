import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * Component สำหรับแสดงข้อมูลสถานที่ติดต่อและที่อยู่ปัจจุบัน
 */
const TaxpayerAddressInfo = ({ standard, data }) => {
    return (
        <section className="mb-5">
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <MapPin size={20} className="me-2" /> ข้อมูลทั่วไปและสถานที่ติดต่อ
            </h5>
            <div className="card border-0 bg-light rounded-3 p-4">
                <div className="row g-3">
                    <div className="col-sm-6">
                        <span className="text-secondary small d-block mb-1">ประเภทการยื่น</span>
                        <span className="fw-bold">{standard.labels?.submissionType || '-'}</span>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                        <span className="text-secondary small d-block mb-1">วันที่ยื่นแบบ</span>
                        <span className="fw-bold">{standard.effDate || '-'}</span>
                    </div>
                    <div className="col-12 mt-3 pt-3 border-top">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-secondary small">ที่อยู่ปัจจุบัน</span>
                            {standard.address && standard.address !== '-' && (
                                <a
                                    href={data.ops?.latLong ? `https://www.google.com/maps?q=${data.ops.latLong}` : `https://www.google.com/maps?q=${encodeURIComponent(standard.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary small text-decoration-none d-flex align-items-center"
                                >
                                    ดูบนแผนที่ <ExternalLink size={12} className="ms-1" />
                                </a>
                            )}
                        </div>
                        <div className="bg-white p-3 rounded border text-dark shadow-sm">
                            {standard.address || 'ไม่พบข้อมูลที่อยู่'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TaxpayerAddressInfo;
