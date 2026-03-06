import React from 'react';
import { Briefcase } from 'lucide-react';

/**
 * Component สำหรับแสดงข้อมูลกิจการและสถานประกอบการ (ISIC)
 */
const TaxpayerBusinessInfo = ({ data }) => {
    // ซ่อน Component หากไม่มีข้อมูล Business หรือ ISIC Code
    if (!data.business || (!data.business.shopName && !data.business.isicCode)) return null;

    return (
        <section className="mb-5">
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <Briefcase size={20} className="me-2" /> ข้อมูลกิจการและสถานประกอบการ (ISIC)
            </h5>
            <div className="card border-0 bg-light rounded-3 p-4 shadow-sm border-top border-5 border-info">
                <div className="row g-4">
                    <div className="col-md-7">
                        <span className="text-secondary small d-block mb-1">ชื่อร้านค้า / สถานประกอบการ</span>
                        <span className="fw-bold fs-5 text-navy">{data.business.shopName || '-'}</span>
                    </div>
                    <div className="col-md-5 text-md-end">
                        <span className="text-secondary small d-block mb-1">สถานะ VAT</span>
                        <span className={`badge ${data.business.vatStatus ? 'bg-info' : 'bg-secondary'}`}>
                            {data.business.vatStatus || 'ไม่ได้จดทะเบียน'}
                        </span>
                    </div>
                    <div className="col-md-12">
                        <span className="text-secondary small d-block mb-1">ประเภทธุรกิจ (ISIC)</span>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-navy">{data.business.isicCode || '-'}</span>
                            <span className="fw-bold">{data.business.isicName || data.business.type || '-'}</span>
                        </div>
                    </div>
                    {data.business.shopAddress && (
                        <div className="col-md-12">
                            <span className="text-secondary small d-block mb-1">ที่อยู่สถานประกอบการ</span>
                            <div className="p-2 bg-white rounded border">{data.business.shopAddress}</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TaxpayerBusinessInfo;
