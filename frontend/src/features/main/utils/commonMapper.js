/**
 * Standard Mappings based on Data Dictionary & README
 */

export const TAX_STATUS_LABELS = {
    "1": "ปกติ (Normal)",
    "2": "ระงับชั่วคราว (Suspended)",
    "3": "แจ้งยกเลิก (Cancelled)",
    "8": "เสียชีวิต (Deceased)",
    "A": "ใช้งานล่าสุด (Active)",
    "I": "ยกเลิก (Inactive)",
    "0": "ไม่ระบุ"
};

export const MARITAL_STATUS_LABELS = {
    "1": "โสด (Single)",
    "2": "สมรส (Married - Joint)",
    "3": "สมรส (Married - Separate)",
    "4": "สมรส (Married - Separate)",
    "5": "หม้าย (Widowed)",
    "6": "หย่า (Divorced)",
    "B": "สมรส (ยื่นรวมชุด)",
    "7": "สมรส (Deceased/Other)",
    "0": "ไม่ระบุ"
};

/**
 * Mapping Configurations per Year and Type
 */
export const MAPPER_CONFIGS = {
    common: {
        nid: ['tcltxpnid', 'txpnid', 'tclTxpNid', 'txpNid', 'nid', 'taxId', 'taxid', 'id'],
        name: {
            title: ['txpttltext', 'txpTtlText'],
            first: ['txpfname', 'txpFName'],
            last: ['txplname', 'txpLName']
        },
        financials: {
            tax: ['tcltaxamt', 'tclTaxAmt'],
            penalty: ['tclpenamt', 'tclPenAmt'],
            surcharge: ['tclsuramt', 'tclSurAmt'],
            pay: ['tclpayamt', 'tclPayAmt']
        }
    },
    "90": {
        "67": { totalIncome: ['txptotassinc4018amtc', 'txpTotAssInc4018AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht4018amt', 'txpTotWht4018Amt'] },
        "66": { totalIncome: ['txptotassinc4018amtc', 'txpTotAssInc4018AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht4018amt', 'txpTotWht4018Amt'] },
        "65": { totalIncome: ['txptotassinc4018amtc', 'txpTotAssInc4018AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht4018amt', 'txpTotWht4018Amt'] },
        "64": { totalIncome: ['txptotassinc4018amtc', 'txpTotAssInc4018AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht4018amt', 'txpTotWht4018Amt'] }
    },
    "91": {
        "67": { totalIncome: ['txptotassinc401amtc', 'txpTotAssInc401AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht401amt', 'txpTotWht401Amt'] },
        "66": { totalIncome: ['txptotassinc401amtc', 'txpTotAssInc401AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht401amt', 'txpTotWht401Amt'] },
        "65": { totalIncome: ['txptotassinc401amtc', 'txpTotAssInc401AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht401amt', 'txpTotWht401Amt'] },
        "64": { totalIncome: ['txptotassinc401amtc', 'txpTotAssInc401AmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], wht: ['txptotwht401amt', 'txpTotWht401Amt'] }
    },
    "94": {
        "67": { totalIncome: ['txptotassincamtc', 'txpTotAssIncAmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], surcharge: ['txpsuramt', 'txpSurAmt'], taxSpec: ['txptaxspecamt', 'txpTaxSpecAmt'], wht: ['txptotwhtamtc', 'txpTotWhtAmtC'] },
        "66": { totalIncome: ['txptotassincamtc', 'txpTotAssIncAmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], surcharge: ['txpsuramt', 'txpSurAmt'] },
        "65": { totalIncome: ['txptotassincamtc', 'txpTotAssIncAmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], surcharge: ['txpsuramt', 'txpSurAmt'] },
        "64": { totalIncome: ['txptotassincamtc', 'txpTotAssIncAmtC'], totalAllowance: ['txptotalwamtc', 'txpTotAlwAmtC'], netIncome: ['txpnetincamtc', 'txpNetIncAmtC'], taxSum: ['txptaxsumspecamt', 'txpTaxSumSpecAmt'], surcharge: ['txpsuramt', 'txpSurAmt'] }
    }
};

/**
 * Robust Field Value Lookup (Case-insensitive & Multiple Fallbacks)
 */
export function getVal(obj, keys) {
    if (!obj) return null;
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const k of keyList) {
        if (!k) continue;
        if (obj[k] !== undefined) return obj[k];
        if (typeof k === 'string') {
            const lowerK = k.toLowerCase();
            const foundKey = Object.keys(obj).find(key => key.toLowerCase() === lowerK);
            if (foundKey) return obj[foundKey];
        }
    }
    return null;
}

/**
 * Helper to build full address from Common API data
 */
export function buildFullAddress(cm) {
    if (!cm) return '-';

    const subDistId = getVal(cm, ['addrSubDistId', 'addrsubdistid']);
    const distId = getVal(cm, ['addrDistId', 'addrdistid']);
    const provId = getVal(cm, ['addrProvId', 'addrprovid']);

    const subDistLabel = cm._labels?.[subDistId] || subDistId || getVal(cm, ['subDist', 'subdist']);
    const distLabel = cm._labels?.[distId] || distId || getVal(cm, ['district', 'dist']);
    const provLabel = cm._labels?.[provId] || provId || getVal(cm, ['province', 'prov']);

    const isBkk = String(provId) === '10';
    const sdPrefix = isBkk ? 'แขวง' : 'ตำบล';
    const dPrefix = isBkk ? 'เขต' : 'อำเภอ';

    const parts = [
        getVal(cm, 'addrbldtext') ? `อาคาร${getVal(cm, 'addrbldtext')}` : '',
        getVal(cm, 'addrfloortext') ? `ชั้น ${getVal(cm, 'addrfloortext')}` : '',
        getVal(cm, 'addrroomtext') ? `ห้อง ${getVal(cm, 'addrroomtext')}` : '',
        getVal(cm, 'addrhousetext') ? `เลขที่ ${getVal(cm, 'addrhousetext')}` : '',
        getVal(cm, 'addrmootext') ? `หมู่ที่ ${getVal(cm, 'addrmootext')}` : '',
        getVal(cm, 'addrviltext') ? `หมู่บ้าน${getVal(cm, 'addrviltext')}` : '',
        getVal(cm, 'addrsoitext') ? `ซอย${getVal(cm, 'addrsoitext')}` : '',
        getVal(cm, 'addrstreettext') ? `ถนน${getVal(cm, 'addrstreettext')}` : '',
        subDistLabel ? `${sdPrefix}${subDistLabel}` : '',
        distLabel ? `${dPrefix}${distLabel}` : '',
        provLabel ? `จังหวัด${provLabel}` : '',
        getVal(cm, 'addrpostcodetext') || ''
    ].filter(Boolean);

    return parts.join(' ') || '-';
}

export function formatThaiDate(str) {
    if (!str) return '-';
    const clean = str.toString().trim();
    if (clean.length !== 8) return clean || '-';
    const y = clean.substring(0, 4);
    const m = clean.substring(4, 6);
    const d = clean.substring(6, 8);
    return `${d}/${m}/${y}`;
}

/**
 * Unified Name Extractor
 */
export function extractFullName(raw, defaultName = '-') {
    const c = MAPPER_CONFIGS.common.name;
    const title = (getVal(raw, c.title) || "").trim();
    const first = (getVal(raw, c.first) || "").trim();
    const last = (getVal(raw, c.last) || "").trim();

    if (first || last) {
        return `${title}${first} ${last}`.trim();
    }
    return defaultName;
}

/**
 * Unified Year Extractor
 */
export function extractYear(raw) {
    let y = getVal(raw, ['taxYear', 'formYear', 'formyear', 'taxyear']);
    if (!y && raw.dln && raw.dln.length > 24) {
        const extracted = raw.dln.substring(20, 24);
        const yrNum = parseInt(extracted);
        if ((yrNum >= 2560 && yrNum <= 2575) || (yrNum >= 60 && yrNum <= 75)) y = extracted;
    }
    return (y && y !== '7992') ? String(y) : '67';
}

/**
 * Normalize year to 4-digit Thai Year (e.g. 67 -> 2567, 2567 -> 2567)
 */
export function toThaiYear(y) {
    if (!y) return '-';
    const s = String(y);
    if (s.length <= 2) return `25${s.padStart(2, '0')}`;
    if (s.length === 4 && s.startsWith('25')) return s;
    if (s.length === 4 && parseInt(s) < 2500) return String(parseInt(s) + 543);
    return s;
}

/**
 * Generic Enriched Mapper (Internal)
 */
export function mapEnrichedGeneric(type, baseItem, tpRaw, cmRaw, pndRaw, comparePndRaw = null) {
    const year = baseItem.year || extractYear(cmRaw || tpRaw || pndRaw);
    const config = MAPPER_CONFIGS[type][year] || MAPPER_CONFIGS[type]["67"];
    const commonNames = MAPPER_CONFIGS.common.name;

    const pickBest = (...vals) => {
        for (const v of vals) {
            const sv = String(v || '').trim();
            if (v !== undefined && v !== null && sv !== "" && sv !== "?" && sv !== "-") return v;
        }
        return vals[vals.length - 1];
    };

    const fullName = extractFullName(tpRaw || baseItem, baseItem.standard?.name);

    const titleText = (getVal(tpRaw, commonNames.title) || "").trim();
    let rawSex = String(getVal(tpRaw, 'txpsexid') || '0');
    let sexLabel = "ไม่ระบุ";
    if (rawSex === '1') sexLabel = "ชาย";
    else if (rawSex === '2') sexLabel = "หญิง";
    else {
        const t = titleText.toLowerCase();
        if (t.includes("นาง") || t.includes("น.ส.") || t.includes("นางสาว")) sexLabel = "หญิง";
        else if (t.includes("นาย")) sexLabel = "ชาย";
    }

    const income = Number(getVal(pndRaw, config.totalIncome) || baseItem.totalIncome || 0);

    const getIncomeSources = (pnd, type) => {
        if (!pnd) return [];
        const sources = [
            { category: '40(1)', label: 'เงินเดือน', amount: Number(getVal(pnd, ['txptotassinc401amtc', 'txpAssInc401AmtC', 'assInc401AmtC', 'txpTotAssInc401AmtC', 'txptotassinc401amt', 'txpAssInc401Amt', 'assInc401Amt']) || 0) },
            { category: '40(2)', label: 'รับจ้าง/ค่านายหน้า', amount: Number(getVal(pnd, ['txptotassinc402amtc', 'txpAssInc402AmtC', 'assInc402AmtC', 'txpTotAssInc402AmtC', 'txptotassinc402amt', 'txpAssInc402Amt', 'assInc402Amt']) || 0) },
            { category: '40(3)', label: 'ค่าลิขสิทธิ์', amount: Number(getVal(pnd, ['txptotassinc403amtc', 'txpAssInc403AmtC', 'assInc403AmtC', 'txpTotAssInc403AmtC', 'txptotassinc403amt', 'txpAssInc403Amt', 'assInc403Amt']) || 0) },
            { category: '40(4)', label: 'เงินปันผล', amount: Number(getVal(pnd, ['txptotassinc404amtc', 'txpAssInc404AmtC', 'assInc404AmtC', 'txpTotAssInc404AmtC', 'txptotassinc404amt', 'txpAssInc404Amt', 'assInc404Amt']) || 0) },
            { category: '40(5)', label: 'ค่าเช่า', amount: Number(getVal(pnd, ['txptotassinc405amtc', 'txpAssInc405AmtC', 'assInc405AmtC', 'txpTotAssInc405AmtC', 'txptotassinc405amt', 'txpAssInc405Amt', 'assInc405Amt']) || 0) },
            { category: '40(6)', label: 'วิชาชีพอิสระ', amount: Number(getVal(pnd, ['txptotassinc406amtc', 'txpAssInc406AmtC', 'assInc406AmtC', 'txpTotAssInc406AmtC', 'txptotassinc406amt', 'txpAssInc406Amt', 'assInc406Amt']) || 0) },
            { category: '40(7)', label: 'รับเหมาก่อสร้าง', amount: Number(getVal(pnd, ['txptotassinc407amtc', 'txpAssInc407AmtC', 'assInc407AmtC', 'txpTotAssInc407AmtC', 'txptotassinc407amt', 'txpAssInc407Amt', 'assInc407Amt']) || 0) },
            { category: '40(8)', label: 'ธุรกิจอื่นๆ', amount: Number(getVal(pnd, ['txptotassinc408amtc', 'txpAssInc408AmtC', 'assInc408AmtC', 'txpTotAssInc408AmtC', 'txptotassinc408amt', 'txpAssInc408Amt', 'assInc408Amt']) || 0) }
        ];

        // Specific fallback for PND 91: It only has 40(1), which is its total income
        if (type === '91') {
            const idx401 = sources.findIndex(s => s.category === '40(1)');
            if (sources[idx401].amount === 0) {
                sources[idx401].amount = Number(getVal(pnd, config.totalIncome) || 0);
            }
        }

        return sources.filter(s => s.amount > 0);
    };

    const finalFiledCount = Math.max(Number(baseItem.filedYearsCount || 0), (income > 0 || tpRaw || pndRaw) ? 1 : 0);
    const finalFiledAllYears = baseItem.filedAllYears || (finalFiledCount >= 4);

    // Extract history from tpRaw if available
    const history = {};
    const trackedYears = ['64', '65', '66', '67', '68', '69'];
    if (tpRaw) {
        trackedYears.forEach(y => {
            const inc = getVal(tpRaw, [`y${y}TotInc4018Amt`, `y${y}TotInc401Amt`, `y${y}TotIncAmt`]);
            const tax = getVal(tpRaw, `y${y}TotTaxAmt`);
            const alw = getVal(tpRaw, [`y${y}TotAlwAmt`, `y${y}TotAlwAmtC`]);

            if (inc !== null && inc !== undefined) {
                history[y] = {
                    year: `25${y}`,
                    income: Number(inc),
                    allowance: Number(alw || 0),
                    tax: Number(tax || 0),
                    status: getVal(tpRaw, `y${y}FileStatus`) || 'ยื่นแล้ว'
                };
            }
        });
    }

    const mergedItem = {
        ...baseItem,
        history,
        tin: pickBest(getVal(tpRaw, ['txptin', 'tcltxptin']), getVal(cmRaw, ['txptin', 'tin']), getVal(pndRaw, 'txptin'), baseItem.tin),
        branch: pickBest(getVal(cmRaw, 'subid'), getVal(tpRaw, 'subid'), baseItem.branch),
        recNo: pickBest(getVal(cmRaw, ['recno', 'recNo']), getVal(pndRaw, ['recno', 'recNo']), baseItem.recNo),
        pndGroup: pickBest(getVal(cmRaw, ['pndgroup', 'pndGroup', 'pnd_group']), getVal(pndRaw, ['pndgroup', 'pndGroup']), baseItem.pndGroup),
        filedYearsCount: finalFiledCount,
        filedAllYears: finalFiledAllYears,
        totalIncome: income,
        isFullyEnriched: true,
        _parts: { taxpayer: tpRaw, common: cmRaw, pnd: pndRaw, comparePnd: comparePndRaw },
        business: {
            ...baseItem.business,
            shopName: pickBest(getVal(cmRaw, ['addrshoptext', 'shopName']), getVal(tpRaw, 'txpshopname'), baseItem.business?.shopName),
            type: pickBest(getVal(cmRaw, ['bustype', 'busType']), getVal(pndRaw, ['bustype', 'busType']), baseItem.business?.type),
            isicCode: pickBest(getVal(cmRaw, ['isiccode', 'isicCode']), getVal(pndRaw, ['isiccode', 'isicCode']), baseItem.business?.isicCode),
            isicName: pickBest(getVal(cmRaw, ['isicname', 'isicName']), getVal(pndRaw, ['isicname', 'isicName']), baseItem.business?.isicName),
            vatStatus: pickBest(getVal(cmRaw, ['vatstatus', 'vatStatus']), baseItem.business?.vatStatus)
        },
        ops: {
            ...baseItem.ops,
            regionCode: pickBest(getVal(cmRaw, ['regionalofficecode', 'regionOfficeCode', 'regioncode', 'regionCode']), getVal(pndRaw, ['regionalofficecode', 'regionOfficeCode', 'regioncode', 'regionCode']), baseItem.ops?.regionCode),
            stCode: pickBest(getVal(cmRaw, ['stofficecode', 'stOfficeCode', 'stcode', 'stCode']), getVal(pndRaw, ['stofficecode', 'stOfficeCode', 'stcode', 'stCode']), baseItem.ops?.stCode),
            ssCode: pickBest(getVal(cmRaw, ['ssofficecode', 'ssOfficeCode', 'sscode', 'ssCode']), getVal(pndRaw, ['ssofficecode', 'ssOfficeCode', 'sscode', 'ssCode']), baseItem.ops?.ssCode),
            regionName: baseItem.ops?.regionName,
            stName: baseItem.ops?.stName,
            ssName: baseItem.ops?.ssName,
            team: pickBest(getVal(cmRaw, 'team'), getVal(tpRaw, 'team'), baseItem.ops?.team),
            subteam: pickBest(getVal(cmRaw, 'subteam'), getVal(tpRaw, 'subteam'), baseItem.ops?.subteam),
        },
        standard: {
            ...baseItem.standard,
            name: fullName,
            dln: cmRaw?.dln || baseItem.dln,
            year: getVal(cmRaw, ['taxYear', 'formYear', 'taxyear']) || year,
            formCode: getVal(cmRaw, 'formCode') || (type === '94' ? 'ภ.ง.ด. 94' : 'ภ.ง.ด. 90'),
            effDate: formatThaiDate(getVal(cmRaw, 'effDate') || baseItem.effDate),
            shopName: pickBest(getVal(cmRaw, ['addrshoptext', 'shopName']), baseItem.standard?.shopName, '-'),
            address: buildFullAddress(cmRaw) || baseItem.standard?.address,
            contact: {
                birthDate: formatThaiDate(getVal(tpRaw, 'txpBirthDate')),
                email: getVal(tpRaw, 'txpEmailText') || '-',
            },
            financials: {
                totalIncome: income || undefined,
                totalAllowance: Number(getVal(pndRaw, config.totalAllowance) || 0),
                netIncome: Number(getVal(pndRaw, config.netIncome) || 0),
                netTax: Number(getVal(pndRaw, ['txpNetTaxAmt', 'txpnettaxamt', 'txptaxamt', 'txpTaxAmt', 'txptottaxamt', 'txpTotTaxAmt']) || getVal(tpRaw, MAPPER_CONFIGS.common.financials.tax) || 0),
                taxPayable: Number(getVal(pndRaw, config.taxSum) || getVal(tpRaw, MAPPER_CONFIGS.common.financials.pay) || 0),
                surcharge: Number(getVal(pndRaw, config.surcharge) || getVal(tpRaw, MAPPER_CONFIGS.common.financials.surcharge) || 0),
                penCrimAmt: Number(getVal(pndRaw, 'txpPenCrimAmt') || getVal(tpRaw, 'txpPenCrimAmt') || 0),
                taxSpec: type === '94' ? Number(getVal(pndRaw, config.taxSpec) || 0) : undefined,
                whtAmount: Number(getVal(pndRaw, [config.wht, 'txptotwhtamtc', 'txpwhtamt', 'txpwht']) || 0),
                addTaxAmt: Number(getVal(pndRaw, ['txpAddTaxAmt', 'txpaddtaxamt']) || 0)
            },
            incomeSources: type === '90' || type === '91' ? getIncomeSources(pndRaw, type) : [],
            comparison: {
                incomeSources: (type === '90' || type === '91') ? getIncomeSources(comparePndRaw, type) : []
            },
            labels: {
                submissionType: (getVal(cmRaw, 'subInd') || '0') === '0' ? 'ยื่นปกติ' : 'ยื่นเพิ่มเติม',
                submissionStatus: (getVal(cmRaw, 'subLateInd') || '0') === '0' ? 'ภายในกำหนด' : 'เกินกำหนด',
                recordUse: (getVal(cmRaw, 'recordUseInd') || 'A') === 'A' ? 'ปกติ (Active)' : 'ยกเลิก (Inactive)',
                sex: sexLabel,
                marital: MARITAL_STATUS_LABELS[String(getVal(cmRaw, 'txpMryStaInd') || '').trim()] || (getVal(tpRaw, 'spoNid') ? "สมรส" : "โสด"),
                status: getVal(pndRaw, 'txpStaInd') || getVal(tpRaw, 'txpStaInd') || '-',
                filingStatus: String(getVal(tpRaw, 'jointId') || '') === '1' ? 'ยื่นคนเดียว' : 'ยื่นร่วม'
            },
            spouse: getVal(tpRaw, 'spoNid') ? {
                nid: String(getVal(tpRaw, 'spoNid')).replace(/-/g, ""),
                name: `${getVal(tpRaw, 'spoTtlText') || ""}${getVal(tpRaw, 'spoFName') || ""} ${getVal(tpRaw, 'spoLName') || ""}`.trim() || '-',
                birthDate: formatThaiDate(getVal(tpRaw, 'spoBirthDate')),
                passportId: getVal(tpRaw, 'spoPassportId') || '-',
                nationId: getVal(tpRaw, 'spo NationId') || '-'
            } : null
        }
    };

    return mergedItem;
}
