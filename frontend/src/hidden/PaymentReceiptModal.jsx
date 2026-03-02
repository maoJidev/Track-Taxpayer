import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

const PaymentReceiptModal = ({ isOpen, onClose, taxpayer }) => {
    if (!isOpen || !taxpayer) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="modal-content bg-white shadow-lg rounded-4 border-0 overflow-hidden" style={{
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header - Hidden on Print */}
                <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom d-print-none">
                    <h5 className="mb-0 fw-bold">ข้อมูลการชำระภาษี</h5>
                    <button onClick={onClose} className="btn btn-link text-muted p-0 border-0">
                        <X size={24} />
                    </button>
                </div>

                {/* Printable Receipt Area */}
                <div className="modal-body p-4 p-md-5 overflow-auto bg-light" id="printable-receipt">
                    <div className="receipt-card bg-white p-4 p-md-5 shadow-sm rounded-4 position-relative mx-auto" style={{ maxWidth: '400px', border: '1px dashed #e2e8f0' }}>

                        {/* Status Icon */}
                        <div className="text-center mb-4">
                            <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-2">
                                <CheckCircle2 size={40} />
                            </div>
                            <h4 className="fw-bold text-success mb-0">ชำระเงินสำเร็จ</h4>
                            <p className="text-muted small">ขอบคุณที่ชำระภาษีตามกำหนด</p>
                        </div>

                        {/* Receipt Details */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">เลขที่ใบเสร็จ</small>
                                <span className="fw-bold text-dark">{taxpayer.receiptId || 'RC-0000000'}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">วันที่ชำระ</small>
                                <span className="fw-bold text-dark">{taxpayer.paymentDate || '-'}</span>
                            </div>
                            <hr className="my-3 border-dashed" />
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">ชื่อผู้เสียภาษี</small>
                                <span className="fw-bold text-dark">{taxpayer.name}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">เลขประจำตัวผู้เสียภาษี</small>
                                <span className="fw-bold text-dark">{taxpayer.taxId}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">ประเภทแบบ</small>
                                <span className="fw-bold text-dark">ภ.ง.ด. {taxpayer.formType}</span>
                            </div>
                            <hr className="my-3 border-dashed" />
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">จำนวนเงินภาษี</small>
                                <span className="fw-bold text-dark">฿{(taxpayer.taxAmount || 0).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">เงินเพิ่ม/เบี้ยปรับ</small>
                                <span className="fw-bold text-dark">฿{((taxpayer.totalAmount || 0) - (taxpayer.taxAmount || 0)).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-center mb-4">
                            <small className="text-primary d-block mb-1 fw-semibold">จำนวนเงินรวมทั้งสิ้น</small>
                            <h3 className="fw-bold text-primary mb-0">฿{(taxpayer.totalAmount || 0).toLocaleString()}</h3>
                        </div>

                        {/* Footer Info */}
                        <div className="text-center">
                            <p className="text-muted x-small mb-0">นี่คือใบเสร็จรับเงินอิเล็กทรอนิกส์</p>
                            <p className="text-muted x-small">กรมสรรพากร - TrackTaxpayer System</p>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${taxpayer.receiptId}`} alt="QR Code" className="mt-2" style={{ width: '60px' }} />
                        </div>
                    </div>
                </div>

                {/* Footer Actions - Hidden on Print */}
                <div className="modal-footer p-3 border-top d-flex justify-content-center gap-2 d-print-none">
                    <button onClick={handlePrint} className="btn btn-primary px-4 rounded-pill d-flex align-items-center gap-2">
                        <Printer size={18} />
                        พิมพ์ใบเสร็จ (PDF)
                    </button>
                    <button onClick={onClose} className="btn btn-outline-secondary px-4 rounded-pill">
                        ปิดหน้าต่าง
                    </button>
                </div>
            </div>

            {/* Print Specific styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-receipt, #printable-receipt * {
                        visibility: visible;
                    }
                    #printable-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .receipt-card {
                        box-shadow: none !important;
                        border: 1px solid #ccc !important;
                        margin: 20px auto !important;
                    }
                    .modal-overlay {
                        background: white !important;
                        position: static !important;
                        display: block !important;
                    }
                    .modal-content {
                        box-shadow: none !important;
                        border: none !important;
                        position: static !important;
                        max-width: none !important;
                        height: auto !important;
                    }
                }
                .x-small { font-size: 0.75rem; }
                .border-dashed { border-style: dashed !important; opacity: 0.2; }
            `}} />
        </div>
    );
};

export default PaymentReceiptModal;
