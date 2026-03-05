import React from 'react';
import { Search, ChevronLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaxpayerNotFound = ({ taxId, error, onRetry }) => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center p-4 font-sarabun">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body p-5 text-center">
                    <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-circle" style={{ width: '100px', height: '100px' }}>
                        <Search size={48} />
                    </div>

                    <h2 className="display-6 fw-bold text-navy mb-3">ไม่พบข้อมูลผู้เสียภาษี</h2>

                    <div className="p-3 bg-light border rounded-3 mb-4 text-start">
                        <div className="d-flex align-items-center gap-2 mb-2 text-secondary small fw-bold">
                            <AlertCircle size={16} /> ข้อมูลการตรวจสอบ
                        </div>
                        <ul className="list-unstyled mb-0 small text-dark">
                            <li className="mb-1"><strong>เลขประจำตัว:</strong> <code className="bg-white px-2 py-1 rounded border">{taxId}</code></li>
                            <li><strong>สถานะ:</strong> {error || 'ไม่พบข้อมูลในระบบในช่วงปีที่ตรวจสอบ (2567 - 2565)'}</li>
                        </ul>
                    </div>

                    <p className="text-secondary mb-5">
                        ระบบไม่สามารถค้นหาข้อมูลรายละเอียดเชิงลึกของผู้เสียภาษีรายนี้ได้
                        กรุณาตรวจสอบเลขประจำตัวประชาชน หรือลองเลือกปีภาษีอื่นในหน้าหลัก
                    </p>

                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                        <button
                            className="btn btn-navy btn-lg px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                            onClick={() => onRetry && onRetry()}
                        >
                            <RefreshCw size={20} /> ลองใหม่อีกครั้ง
                        </button>
                        <button
                            className="btn btn-outline-secondary btn-lg px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            <ChevronLeft size={20} /> ย้อนกลับหน้าก่อนหน้า
                        </button>
                    </div>
                </div>

                <div className="bg-navy p-3 text-center">
                    <span className="text-white-50 small">หากคุณมั่นใจว่ามีข้อมูลในระบบ กรุณาติดต่อผู้ดูแลระบบเพื่อตรวจสอบ API Gateway</span>
                </div>
            </div>
        </div>
    );
};

export default TaxpayerNotFound;
