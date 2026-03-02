import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const RiskBadges = ({ risks, isEnriched, onEnrich, enriching, compact = false }) => {
    if (!isEnriched) {
        return (
            <button
                className="btn btn-sm btn-outline-warning rounded-pill py-1 px-3"
                onClick={onEnrich}
                disabled={enriching}
            >
                {enriching ? (
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                ) : (
                    <AlertCircle size={14} className="me-1" />
                )}
                เช็คความเสี่ยง
            </button>
        );
    }

    const riskList = [
        { key: 'income67Less66', label: 'เงินได้ลดลง', color: 'danger' },
        { key: 'taxAmt67Less66', label: 'ภาษีลดลง', color: 'danger' },
        { key: 'sent66Not67', label: 'ไม่ยื่นปี 67', color: 'warning' },
        { key: 'spouseHasIncome', label: 'คู่สมรสมีรายได้', color: 'info' },
        { key: 'sent94not90', label: 'ไม่ยื่น 90', color: 'danger' }
    ];

    const activeRisks = riskList.filter(r => risks && risks[r.key]);

    if (activeRisks.length === 0) {
        return (
            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-25 shadow-sm">
                <CheckCircle2 size={14} className="me-1" />
                ปกติ
            </span>
        );
    }

    if (compact) {
        return (
            <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 border border-danger border-opacity-25 shadow-sm">
                <AlertCircle size={14} className="me-1" />
                เสี่ยง ({activeRisks.length})
            </span>
        );
    }

    return (
        <div className="d-flex flex-wrap gap-1 justify-content-center">
            {activeRisks.map((r, idx) => (
                <span
                    key={idx}
                    className={`badge bg-${r.color} bg-opacity-10 text-${r.color} border border-${r.color} border-opacity-25 px-2 py-1 shadow-sm`}
                    style={{ fontSize: '10.5px', fontWeight: 'bold' }}
                >
                    {r.label}
                </span>
            ))}
        </div>
    );
};

export default RiskBadges;
