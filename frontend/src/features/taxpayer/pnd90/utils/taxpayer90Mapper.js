import {
    getVal,
    extractYear,
    extractFullName,
    formatThaiDate,
    MAPPER_CONFIGS,
    mapEnrichedGeneric
} from "../../../main/utils/commonMapper";

/**
 * แปลงข้อมูลผู้เสียภาษี ภ.ง.ด. 90 จาก API ให้เป็นรูปแบบที่ระบบหน้าบ้านเลือกใช้
 */
export function mapTaxpayer90OfficialItem(raw, targetYear = '67') {
    if (!raw) return null;
    const nid = (getVal(raw, 'nid') || '').replace(/-/g, '').trim();
    const name = getVal(raw, 'taxpayerName') || '-';

    const history = {};
    const trackedYears = ['64', '65', '66', '67', '68', '69']; // รายปีที่ต้องการตรวจสอบประวัติย้อนหลัง
    let filedCount = 0;
    let totalTaxSum = 0;

    trackedYears.forEach(y => {
        const inc = getVal(raw, [`y${y}TotInc4018Amt`, `y${y}TotInc401Amt`, `y${y}TotIncAmt`]);
        const tax = getVal(raw, `y${y}TotTaxAmt`);
        const alw = getVal(raw, [`y${y}TotAlwAmt`, `y${y}TotAlwAmtC`]);

        if (inc !== null && inc !== undefined && inc !== 0) {
            filedCount++;
            totalTaxSum += Number(tax || 0);
        }

        if (inc !== null && inc !== undefined) {
            history[y] = {
                year: `25${y}`,
                income: Number(inc),
                allowance: Number(alw || 0),
                tax: Number(tax || 0),
                status: getVal(raw, `y${y}FileStatus`) || 'ยื่นแล้ว'
            };
        }
    });

    // จัดเตรียมข้อมูลสำหรับปีหลักที่ต้องการแสดงผล
    const targetYShort = targetYear.toString().slice(-2);
    const totalIncome = Number(getVal(raw, `y${targetYShort}TotInc4018Amt`) || 0);

    const backendFiledCount = parseInt(getVal(raw, 'filedYearsCount') || 0);
    const finalFiledCount = backendFiledCount > 0 ? backendFiledCount : filedCount;
    const finalTotalTax = Number(getVal(raw, 'totalTaxAllYears') ?? totalTaxSum);

    return {
        taxId: nid,
        tin: getVal(raw, 'tin'),
        name,
        branch: getVal(raw, 'branch'),
        dln: getVal(raw, 'dln') || '-',
        recNo: getVal(raw, ['recNo', 'recno']),
        pndGroup: (getVal(raw, ['pndGroup', 'pndgroup']) || '').trim(),
        totalIncome,
        year: targetYear,
        fullAddress: getVal(raw, 'fullAddress'),
        addressDetail: {
            no: getVal(raw, 'addressNo'),
            moo: getVal(raw, 'addrMoo'),
            street: getVal(raw, 'addrStreet'),
            tumbon: getVal(raw, 'addrTumbon'),
            amphur: getVal(raw, 'addrAmphur')
        },
        business: {
            type: getVal(raw, 'busType'),
            shopName: getVal(raw, 'shopName'),
            shopAddress: getVal(raw, 'shopAddress'),
            isicCode: getVal(raw, 'isicCode'),
            isicName: getVal(raw, 'isicName'),
            vatStatus: getVal(raw, 'vatStatus')
        },
        ops: {
            team: getVal(raw, 'team'),
            subteam: getVal(raw, 'subteam'),
            regionCode: getVal(raw, ['regionOfficeCode', 'regionofficecode']),
            stCode: getVal(raw, ['stOfficeCode', 'stofficecode']),
            ssCode: getVal(raw, ['ssOfficeCode', 'ssofficecode']),
            latLong: getVal(raw, 'latLong')
        },
        remark: getVal(raw, 'remark'),
        spProject: getVal(raw, 'spProject'),
        neverFiled: getVal(raw, 'neverFiled') ?? (finalFiledCount === 0),
        filedAllYears: getVal(raw, 'filedAllYears') ?? (finalFiledCount >= 4),
        filedYearsCount: finalFiledCount,
        totalTaxAllYears: finalTotalTax,
        history,
        isEnriched: true,
        isFullyEnriched: true,
        standard: {
            name,
            dln: raw.dln || '-',
            year: targetYear,
            financials: { totalIncome },
            address: raw.fullAddress,
            shopName: raw.shopName
        }
    };
}

/**
 * แปลงข้อมูลผู้เสียภาษีสำหรับหน้าสรุปรายงาน (Report Top 100 / List)
 */
export function mapPND90ReportItem(raw, targetYear) {
    if (!raw) return null;
    const year = targetYear || extractYear(raw);
    const config = MAPPER_CONFIGS["90"][year] || MAPPER_CONFIGS["90"]["67"];

    const fullName = extractFullName(raw, raw.fullName || raw.name || '-');
    const totalIncome = Number(getVal(raw, config.totalIncome) || getVal(raw, ['totalIncome', 'totalincome', 'assIncAmt', 'assincamt']) || 0);

    let filedYearsCount = parseInt(getVal(raw, 'filedYearsCount') || 0);
    if (filedYearsCount === 0) {
        const trackedYears = ['64', '65', '66', '67', '68', '69'];
        trackedYears.forEach(y => {
            const inc = getVal(raw, `y${y}TotInc4018Amt`);
            if (inc !== null && inc !== undefined && inc !== 0) filedYearsCount++;
        });
    }

    return {
        taxId: (getVal(raw, MAPPER_CONFIGS.common.nid) || "").replace(/-/g, ""),
        name: fullName,
        dln: raw.dln || '-',
        totalIncome,
        year,
        effDate: formatThaiDate(getVal(raw, ['effdate', 'effDate'])),
        filedYearsCount: filedYearsCount || (totalIncome > 0 ? 1 : 0),
        isEnriched: false,
        isFullyEnriched: false,
        standard: {
            name: fullName,
            dln: raw.dln || '-',
            year,
            financials: { totalIncome }
        }
    };
}

// ฟังก์ชันเสริมข้อมูล (Enrichment) โดยใช้ Common Mapper สำหรับ ภ.ง.ด. 90
export const mapPND90Enriched = (base, tp, cm, pnd, comparePnd) => mapEnrichedGeneric('90', base, tp, cm, pnd, comparePnd);
