import {
    getVal,
    extractYear,
    extractFullName,
    MAPPER_CONFIGS,
    mapEnrichedGeneric
} from "../../../main/utils/commonMapper";

/**
 * แปลงข้อมูลรายการ ภ.ง.ด. 94 ให้เป็นรูปแบบมาตรฐานของระบบ
 */
export function mapPND94ListItem(raw) {
    if (!raw) return null;
    const year = extractYear(raw);
    const config = MAPPER_CONFIGS["94"][year] || MAPPER_CONFIGS["94"]["67"];

    const fullName = extractFullName(raw);
    const income = Number(getVal(raw, config.totalIncome) || 0);
    const taxPayable = Number(getVal(raw, config.taxSum) || getVal(raw, MAPPER_CONFIGS.common.financials.pay) || 0);

    return {
        taxId: (getVal(raw, MAPPER_CONFIGS.common.nid) || "").replace(/-/g, ""),
        name: fullName,
        dln: raw.dln || '-',
        totalIncome: income,
        taxPayable,
        status: raw.recordUseInd || 'A',
        isEnriched: false,
        risks: { sent94not90: true },
        standard: {
            name: fullName,
            dln: raw.dln || '-',
            year: year,
            financials: {
                totalIncome,
                taxPayable,
                netTax: Number(getVal(raw, MAPPER_CONFIGS.common.financials.tax) || 0)
            }
        },
        raw: raw
    };
}

// ฟังก์ชันเสริมข้อมูล (Enrichment) สำหรับ ภ.ง.ด. 94 โดยใช้ Common Mapper
export const mapPND94Enriched = (base, tp, cm, pnd) => mapEnrichedGeneric('94', base, tp, cm, pnd);
