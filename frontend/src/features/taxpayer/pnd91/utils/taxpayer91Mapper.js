import {
    getVal,
    extractYear,
    extractFullName,
    formatThaiDate,
    MAPPER_CONFIGS,
    mapEnrichedGeneric
} from "../../../main/utils/commonMapper";

/**
 * แปลงข้อมูลรายงาน ภ.ง.ด. 91 ให้เป็นรูปแบบมาตรฐานของระบบ
 */
export function mapPND91ReportItem(raw) {
    if (!raw) return null;
    const year = extractYear(raw);
    const config = MAPPER_CONFIGS["91"][year] || MAPPER_CONFIGS["91"]["67"];

    const fullName = extractFullName(raw, raw.fullName || raw.name || '-');
    const totalIncome = Number(getVal(raw, config.totalIncome) || getVal(raw, ['totalIncome', 'totalincome', 'assIncAmt', 'assincamt']) || 0);

    return {
        taxId: (getVal(raw, MAPPER_CONFIGS.common.nid) || "").replace(/-/g, ""),
        name: fullName,
        dln: raw.dln || '-',
        totalIncome,
        year,
        effDate: formatThaiDate(getVal(raw, ['effdate', 'effDate'])),
        isFullyEnriched: false,
        standard: {
            name: fullName,
            dln: raw.dln || '-',
            year,
            financials: { totalIncome }
        }
    };
}

// ฟังก์ชันเสริมข้อมูล (Enrichment) สำหรับ ภ.ง.ด. 91 โดยใช้ Common Mapper
export const mapPND91Enriched = (base, tp, cm, pnd, comparePnd) => mapEnrichedGeneric('91', base, tp, cm, pnd, comparePnd);
