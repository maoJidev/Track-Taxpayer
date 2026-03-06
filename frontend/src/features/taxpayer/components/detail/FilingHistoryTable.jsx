import React from 'react';
import { LayoutGrid } from 'lucide-react';

/**
 * Component สำหรับแสดงตารางประวัติการยื่นแบบย้อนหลัง (History)
 */
const FilingHistoryTable = ({ data }) => {
    // ฟังก์ชันช่วยจัดรูปแบบเงินตรา
    const formatCurrency = (val) => {
        return (val || 0).toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const historyKeys = Object.keys(data.history || {}).sort((a, b) => b - a);

    return (
        <section className="mb-5">
            <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                <LayoutGrid size={20} className="me-2" /> ประวัติการยื่นแบบรายปี
            </h5>
            <div className="table-responsive rounded-3 border bg-white shadow-sm">
                <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.8rem' }}>
                    <thead className="bg-navy text-white">
                        <tr>
                            <th className="py-2 px-2 text-center" style={{ width: '80px' }}>ปีภาษี</th>
                            <th className="py-2 px-2 text-end">เงินได้</th>
                            <th className="py-2 px-2 text-end">ค่าลดหย่อน</th>
                            <th className="py-2 px-2 text-end">ภาษีที่ชำระ</th>
                            <th className="py-2 px-2 text-center" style={{ width: '120px' }}>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyKeys.map(yr => {
                            const record = data.history[yr];
                            return (
                                <tr key={yr}>
                                    <td className="px-2 py-2 text-center fw-bold">{record.year}</td>
                                    <td className="px-2 py-2 text-end font-monospace">{formatCurrency(record.income)}</td>
                                    <td className="px-2 py-2 text-end font-monospace text-secondary">{formatCurrency(record.allowance)}</td>
                                    <td className="px-2 py-2 text-end font-monospace text-navy fw-bold">{formatCurrency(record.tax)}</td>
                                    <td className="px-2 py-2 text-center">
                                        <span className={`badge ${record.income > 0 ? 'bg-success bg-opacity-10 text-success border border-success' : 'bg-light text-muted border'} w-100`}>
                                            {record.income > 0 ? 'ยื่นแบบแล้ว' : 'ไม่พบข้อมูล'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {historyKeys.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted fst-italic">ไม่พบประวัติการยื่นแบบย้อนหลัง</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default FilingHistoryTable;
