import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toThaiYear } from '../../main/utils/commonMapper';

/**
 * Reusable Risk Assessment Component for PND90, 91, 94
 * @param {Object} risks - Risk indicators from TaxpayerService
 * @param {string} formCode - e.g., "ภ.ง.ด. 90", "ภ.ง.ด. 94"
 * @param {string} year - Tax year
 * @param {string} compareYear - Comparison tax year (e.g. year - 1)
 */
const RiskAssessment = ({ risks, formCode, year, compareYear }) => {
    // Normalize years to 4-digit Thai format
    const displayYear = toThaiYear(year);
    const displayCompareYear = toThaiYear(compareYear || String(parseInt(year || "67") - 1));

    if (!risks) {
        return (
            <div className="p-4 bg-light rounded-3 text-center text-muted">
                <div className="spinner-border spinner-border-sm mb-2" role="status"></div>
                <div className="small">กำลังประเมินความเสี่ยง...</div>
            </div>
        );
    }

    // Filter out the relevant risks for display
    // Note: PND94 might only have 'sent94not90', 
    // while PND90 has income67Less66, taxAmt67Less66, etc.
    const activeRisks = [];

    if (risks.incomeDecrease) {
        activeRisks.push({
            id: 'risk1',
            title: 'ความเสี่ยงเงินได้ลดลง (Risk 1)',
            description: `${formCode} ปี ${displayYear} รายงานยอดเงินได้น้อยกว่าปี ${displayCompareYear}`,
            variant: 'danger'
        });
    }

    if (risks.taxAmtDecrease) {
        activeRisks.push({
            id: 'risk2',
            title: 'ความเสี่ยงยอดภาษีลดลง (Risk 2)',
            description: `${formCode} ปี ${displayYear} มียอดภาษีที่ชำระน้อยกว่าปี ${displayCompareYear}`,
            variant: 'danger'
        });
    }

    if (risks.sentBaseNotCompare) {
        activeRisks.push({
            id: 'risk5_2',
            title: 'ความเสี่ยงยื่นแบบไม่สม่ำเสมอ (Risk 5)',
            description: `ยื่นแบบปี ${displayYear} แต่ไม่มีข้อมูลการยื่นในปี ${displayCompareYear}`,
            variant: 'warning'
        });
    }

    if (risks.sent94not90) {
        activeRisks.push({
            id: 'sent94not90',
            title: 'สถานะยื่นครึ่งปี (ภ.ง.ด. 94)',
            description: 'ตรวจพบการยื่นแบบ ภ.ง.ด. 94 แต่ไม่พบการยื่น ภ.ง.ด. 90 ประจำปี',
            variant: 'warning'
        });
    }

    if (risks.spouseHasIncome) {
        activeRisks.push({
            id: 'spouseRisk',
            title: 'ความเสี่ยงคู่สมรส',
            description: 'คู่สมรสระบุไม่มีเงินได้ แต่ตรวจพบข้อมูลภาษีหัก ณ ที่จ่าย',
            variant: 'danger'
        });
    }

    // Case: NORMAL (No Risks)
    if (activeRisks.length === 0) {
        const periodText = formCode.includes('94') ? 'สถานะยื่นครึ่งปี' : 'สถานะยื่นทั้งปี';
        return (
            <div className="card border-0 shadow-sm overflow-hidden border-start border-4 border-success mb-3">
                <div className="card-body p-4 bg-success bg-opacity-10">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold fs-5 text-dark">{periodText} ({formCode})</span>
                        <span className="text-success fw-bold d-flex align-items-center">
                            <CheckCircle size={18} className="me-2" /> ปกติ
                        </span>
                    </div>
                    <p className="small text-dark mb-0 opacity-75">
                        สถานะการยื่นแบบปกติ
                    </p>
                </div>
            </div>
        );
    }

    // Case: HAS RISKS
    return (
        <div className="d-flex flex-column gap-3 mb-3">
            {activeRisks.map((risk) => (
                <div
                    key={risk.id}
                    className={`card border-0 shadow-sm overflow-hidden border-start border-4 border-${risk.variant}`}
                >
                    <div className={`card-body p-4 bg-${risk.variant} bg-opacity-10`}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold fs-5 text-dark">{risk.title}</span>
                            <AlertCircle size={20} className={`text-${risk.variant}`} />
                        </div>
                        <p className="small text-dark mb-0 opacity-75">
                            {risk.description}
                        </p>
                    </div>
                </div>
            ))}
            <div className="p-3 bg-light rounded-3 text-center small text-muted">
                วิเคราะห์อัตโนมัติจากฐานข้อมูลกลาง
            </div>
        </div>
    );
};

export default RiskAssessment;
