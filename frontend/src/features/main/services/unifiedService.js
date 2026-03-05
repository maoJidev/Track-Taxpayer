import {
    fetchAddressDetail,
    fetchRiskIncomeDecrease,
    fetchRiskTaxDecrease,
    fetchRiskSentNotStatus,
    fetchRiskSpouseIncome
} from "../api/commonApi";
import {
    fetchPND90ByNid,
    fetchPND90DetailTaxpayer,
    fetchPND90DetailCommon,
    fetchPND90DetailPnd,
    fetchTaxpayer90ByNid
} from "../../taxpayer/pnd90/api/taxpayer90Api";
import {
    fetchPND91DetailTaxpayer,
    fetchPND91DetailCommon,
    fetchPND91DetailPnd,
    fetchTaxpayer91ByNid
} from "../../taxpayer/pnd91/api/taxpayer91Api";
import {
    fetchPND94ByNid,
    fetchPND94DetailTaxpayer,
    fetchPND94DetailCommon,
    fetchPND94DetailPnd,
    fetchPND94SentNot90Status,
    fetchPND94HasNid,
    fetchTaxpayer94ByNid
} from "../../taxpayer/pnd94/api/taxpayer94Api";
import {
    getVal,
    mapEnrichedGeneric
} from "../utils/commonMapper";
import { OfficeService } from "./officeService";
import {
    mapPND90ReportItem,
    mapPND90Enriched,
    mapTaxpayer90OfficialItem
} from "../../taxpayer/pnd90/utils/taxpayer90Mapper";
import { mapPND91Enriched } from "../../taxpayer/pnd91/utils/taxpayer91Mapper";
import {
    mapPND94ListItem,
    mapPND94Enriched
} from "../../taxpayer/pnd94/utils/taxpayer94Mapper";

const STORAGE_KEY = 'tack_taxpayer_cache'; // คีย์สำหรับเก็บข้อมูล Cache ใน Session Storage

const loadCache = () => { // ฟังก์ชันสำหรับโหลดข้อมูล Cache จาก Session Storage
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                reports: new Map(parsed.reports || []),
                searches: new Map(parsed.searches || []),
                unified: new Map(parsed.unified || []),
                address: new Map(parsed.address || []),
                enrichment: new Map(parsed.enrichment || [])
            };
        }
    } catch (e) {
        console.warn("Failed to load cache from sessionStorage", e);
    }
    return {
        reports: new Map(),
        searches: new Map(),
        unified: new Map(),
        address: new Map(),
        enrichment: new Map()
    };
};

const saveCache = (store) => { // ฟังก์ชันสำหรับบันทึกข้อมูล Cache ลงใน Session Storage
    try {
        const d = new Date();
        const toStore = {
            reports: Array.from(store.reports.entries()),
            searches: Array.from(store.searches.entries()),
            unified: Array.from(store.unified.entries()),
            address: Array.from(store.address.entries()),
            enrichment: Array.from(store.enrichment.entries()),
            _timestamp: d.getTime()
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (e) {
        console.warn("Failed to save cache to sessionStorage", e);
    }
};

export const cacheStore = loadCache();

export const UnifiedService = {
    /**
     * ดึงข้อมูลความเสี่ยงและสถานะเพิ่มเติมสำหรับรายการผู้เสียภาษี (Enrichment)
     */
    async enrichSingleItem(taxId, dln = null, force = false, year = "67", compareYear = null) {
        if (!taxId) return null;
        const finalCompareYear = compareYear || String(parseInt(year) - 1);
        const cacheKey = `enrich_${taxId}_${dln || 'nodln'}_${year}_vs_${finalCompareYear}`;

        if (!force && cacheStore.enrichment.has(cacheKey)) {
            return cacheStore.enrichment.get(cacheKey);
        }

        try {
            const isPnd94Item = dln && dln.startsWith('ภงด94');

            // กฎเหล็ก: ห้ามเรียกใช้ Vision API (พอร์ต 8080) ในส่วนของการแสดงรายการ (List) 
            // ให้ใช้เฉพาะข้อมูลความเสี่ยง (RD10X) และข้อมูลสถานะการติดตาม (8081) เท่านั้น เพื่อความรวดเร็ว
            const [r1, r2, r4, r5, hasPND94Status] = await Promise.all([
                fetchRiskIncomeDecrease(taxId, year, finalCompareYear).catch(() => false),
                fetchRiskTaxDecrease(taxId, year, finalCompareYear).catch(() => false),
                fetchRiskSentNotStatus(taxId, year, finalCompareYear).catch(() => false),
                fetchRiskSpouseIncome(taxId, year).catch(() => false),
                !isPnd94Item ? fetchPND94HasNid(taxId, year).catch(() => false) : Promise.resolve(true)
            ]);

            const hasPND94 = hasPND94Status === true || hasPND94Status === 'true' || isPnd94Item;
            // PND94 info removed from list enrichment to avoid 8080 calls
            const isPnd91Item = dln && dln.startsWith('ภงด91');

            const enrichResult = {
                risks: {
                    incomeDecrease: r1 === true || r1 === 'true',
                    taxAmtDecrease: r2 === true || r2 === 'true',
                    sentBaseNotCompare: r4 === true || r4 === 'true',
                    spouseHasIncome: r5 === true || r5 === 'true',
                    hasPND94: hasPND94
                },
                totalIncome: undefined,
                pnd94Info: null,
                isPnd91: isPnd91Item,
                compareYear: finalCompareYear
            };

            cacheStore.enrichment.set(cacheKey, enrichResult);
            saveCache(cacheStore);
            return enrichResult;
        } catch (e) {
            console.error(`[UnifiedService] Enrichment failed for ${taxId}`, e);
            throw e;
        }
    },

    /**
     * ดึงข้อมูลโปรไฟล์ผู้เสียภาษีแบบละเอียด (Unified Profile) รวมข้อมูลทั่วไปและความเสี่ยง
     */
    async getUnifiedProfile(pnd90Item, force = false, year = "67", compareYear = null, formType = '90') {
        if (!pnd90Item) return null;
        const taxId = pnd90Item.taxId;
        const dln = pnd90Item.dln;

        if (!taxId || taxId === '-') {
            throw new Error(`ไม่สามารถดึงข้อมูลได้เนื่องจากแผนผังข้อมูลไม่สมบูรณ์ (Missing Tax ID for FormType: ${formType})`);
        }

        const effectiveYear = year || pnd90Item.year || "67";
        // If compareYear is provided explicitly (e.g. from UI selector), use it.
        // Otherwise, we will calculate it later after we know the actualYear from the fallback loop.
        const explicitCompareYear = compareYear;
        const cacheKey = `${taxId}_unified_${effectiveYear}_vs_${explicitCompareYear || 'fallback'}_${formType}`;

        if (force) {
            cacheStore.unified.delete(cacheKey);
        } else if (cacheStore.unified.has(cacheKey) && cacheStore.unified.get(cacheKey).isFullyEnriched) {
            return cacheStore.unified.get(cacheKey);
        }

        try {
            let activeDln = dln;
            let actualYear = effectiveYear;
            let tp, cm, pnd;
            let nidData = null;

            // --- เริ่มต้นระบบ Loop ถอยหลังเพื่อหาข้อมูลปีล่าสุดที่มี (Fallback Loop) ---
            const startYear = parseInt(effectiveYear);
            const minYear = 65; // ค้นหาถอยหลังถึงปี 65 (2565) ตามที่ผู้ใช้กำหนด
            let foundData = false;
            let yearsFiledCount = 0;

            for (let currentYear = startYear; currentYear >= minYear; currentYear--) {
                const yearStr = String(currentYear).padStart(2, '0');
                // console.log(`[UnifiedService] Checking data for ${taxId} in year ${yearStr}...`);

                try {
                    // 1. ค้นหาเลขที่เอกสาร (DLN) จาก NID ในปีนั้นๆ
                    let currentNidData;
                    if (formType === '91') {
                        currentNidData = await fetchPND91ByNid(taxId, yearStr);
                    } else if (formType === '94') {
                        currentNidData = await fetchPND94ByNid(taxId, yearStr);
                    } else {
                        currentNidData = await fetchPND90ByNid(taxId, yearStr);
                    }

                    let firstMatch = Array.isArray(currentNidData) ? currentNidData[0] : currentNidData;
                    let foundDln = getVal(firstMatch, ['dln', 'DLN']);

                    // กรณีสำรอง: หากไม่พบในระบบที่ระบุ ให้ลองหาใน PND 90 (ฐานข้อมูลหลัก)
                    if (!foundDln && (formType === '91' || formType === '94')) {
                        const fallbackData = await fetchPND90ByNid(taxId, yearStr).catch(() => null);
                        if (fallbackData) {
                            firstMatch = Array.isArray(fallbackData) ? fallbackData[0] : fallbackData;
                            foundDln = getVal(firstMatch, ['dln', 'DLN']);
                        }
                    }

                    if (foundDln) {
                        // 2. หากเจอ DLN ให้ลองดึงข้อมูลรายละเอียด (Common/PND Detail) เพื่อยืนยันว่ามีข้อมูลจริงๆ
                        const isPnd94InYear = foundDln.startsWith('ภงด94');
                        const isPnd91InYear = foundDln.startsWith('ภงด91');

                        const yearFetchPromises = isPnd94InYear ? [
                            fetchPND94DetailTaxpayer(foundDln, yearStr),
                            fetchPND94DetailCommon(foundDln, yearStr),
                            fetchPND94DetailPnd(foundDln, yearStr)
                        ] : isPnd91InYear ? [
                            fetchPND91DetailTaxpayer(foundDln, yearStr),
                            fetchPND91DetailCommon(foundDln, yearStr),
                            fetchPND91DetailPnd(foundDln, yearStr)
                        ] : [
                            fetchPND90DetailTaxpayer(foundDln, yearStr),
                            fetchPND90DetailCommon(foundDln, yearStr),
                            fetchPND90DetailPnd(foundDln, yearStr)
                        ];

                        const [rawTp, rawCm, rawPnd] = await Promise.all(yearFetchPromises.map(p => p.catch(() => null)));

                        if (rawTp || rawCm || rawPnd) {
                            yearsFiledCount++;
                            if (!foundData) {
                                activeDln = foundDln;
                                actualYear = yearStr;
                                tp = Array.isArray(rawTp) ? rawTp[0] : rawTp;
                                cm = Array.isArray(rawCm) ? rawCm[0] : rawCm;
                                pnd = Array.isArray(rawPnd) ? rawPnd[0] : rawPnd;
                                foundData = true;
                                console.log(`[UnifiedService] Primary data found in year ${yearStr}`);
                            }
                        }
                    }
                } catch (yearErr) {
                    console.warn(`[UnifiedService] No data in year ${yearStr}: ${yearErr.message}`);
                }
            }

            if (!foundData) {
                throw new Error(`ไม่พบข้อมูลของผู้เสียภาษี (ตรวจสอบตั้งแต่ปี 25${startYear} ถึง 25${minYear})`);
            }


            // กฎเหล็ก: ปีที่เปรียบเทียบ (Compare) ต้องน้อยกว่าปีหลัก (Actual) เสมอ เพื่อป้องกัน UI มึนงง
            let finalCompareYear = explicitCompareYear || String(parseInt(actualYear) - 1);

            if (finalCompareYear === actualYear) {
                console.log(`[UnifiedService] Fallback: Compare year was same as actual (${actualYear}). decrementing.`);
                finalCompareYear = String(parseInt(actualYear) - 1);
            }

            console.log(`[UnifiedService] Final Years: Base=${actualYear}, Compare=${finalCompareYear}`);

            let compareDln = null;
            let comparePnd = null;
            if (finalCompareYear) {
                try {
                    let compareNidData;
                    if (formType === '91') {
                        compareNidData = await fetchPND91ByNid(taxId, finalCompareYear);
                    } else if (formType === '94') {
                        compareNidData = await fetchPND94ByNid(taxId, finalCompareYear);
                    } else {
                        compareNidData = await fetchPND90ByNid(taxId, finalCompareYear);
                    }
                    const compareFirstMatch = Array.isArray(compareNidData) ? compareNidData[0] : compareNidData;
                    compareDln = getVal(compareFirstMatch, ['dln', 'DLN']);
                    if (compareDln) {
                        const isComp91 = compareDln.startsWith('ภงด91');
                        const isComp94 = compareDln.startsWith('ภงด94');
                        let rawComparePnd;
                        if (isComp91) {
                            rawComparePnd = await fetchPND91DetailPnd(compareDln, finalCompareYear).catch(() => null);
                        } else if (isComp94) {
                            rawComparePnd = await fetchPND94DetailPnd(compareDln, finalCompareYear).catch(() => null);
                        } else {
                            rawComparePnd = await fetchPND90DetailPnd(compareDln, finalCompareYear).catch(() => null);
                        }
                        comparePnd = Array.isArray(rawComparePnd) ? rawComparePnd[0] : rawComparePnd;
                    }
                } catch (ce) {
                    console.warn(`[UnifiedService] Comparison data fetch failed for PND ${formType}: ${ce.message}`);
                }
            }

            const isPnd94 = activeDln.startsWith('ภงด94');
            const isPnd91 = activeDln.startsWith('ภงด91');

            const [r1, r2, r4, r5, pnd94s] = await Promise.all([
                fetchRiskIncomeDecrease(taxId, actualYear, finalCompareYear).catch(() => null),
                fetchRiskTaxDecrease(taxId, actualYear, finalCompareYear).catch(() => null),
                fetchRiskSentNotStatus(taxId, actualYear, finalCompareYear).catch(() => null),
                fetchRiskSpouseIncome(taxId, actualYear, formType).catch(() => null),
                isPnd94 ? fetchPND94SentNot90Status(activeDln, actualYear).catch(() => null) : Promise.resolve(null)
            ]);

            if (cm) {
                const addrLabels = {};
                const addressIds = [cm.addrSubDistId || cm.addrsubdistid, cm.addrDistId || cm.addrdistid, cm.addrProvId || cm.addrprovid].filter(Boolean);
                if (addressIds.length > 0) {
                    await Promise.all(addressIds.map(async (id) => {
                        if (cacheStore.address.has(id)) {
                            addrLabels[id] = cacheStore.address.get(id).addDetail;
                            return;
                        }
                        const addrData = await fetchAddressDetail(id).catch(() => null);
                        if (addrData) {
                            addrLabels[id] = addrData.addDetail;
                            cacheStore.address.set(id, addrData);
                        }
                    }));
                }
                if (Object.keys(addrLabels).length > 0) cm._labels = addrLabels;
            }

            // Enrichment (8081 data) - ดึงข้อมูลเพิ่มเติมจากระบบ Tracking เพื่อความสมบูรณ์
            // ข้อมูลส่วนนี้อาจมีหมายเหตุ (remark), รายชื่อทีม (team), และรหัสดึงดูดอื่นๆ
            let trackData = null;
            try {
                if (formType === '91') trackData = await fetchTaxpayer91ByNid(taxId);
                else if (formType === '94') trackData = await fetchTaxpayer94ByNid(taxId);
                else trackData = await fetchTaxpayer90ByNid(taxId);

                if (trackData && Array.isArray(trackData)) trackData = trackData[0];
            } catch (e) {
                console.warn("[UnifiedService] Enrichment fetch failed", e);
            }

            // กฎเหล็ก: ห้ามผสมข้อมูลจาก Tracking (8081) และ Vision (8080) ในการเรียกดูรายละเอียดเชิงลึก
            const baseForDetail = {
                taxId: pnd90Item.taxId,
                dln: activeDln,
                year: actualYear,
                pndGroup: trackData?.pndGroup || trackData?.pndgroup || pnd90Item.pndGroup,
                recNo: trackData?.recNo || trackData?.recno || pnd90Item.recNo,
                remark: trackData?.remark || pnd90Item.remark,
                spProject: trackData?.spProject || pnd90Item.spProject,
                team: trackData?.team,
                subteam: trackData?.subteam,
                latLong: trackData?.latLong,
                filedYearsCount: yearsFiledCount || trackData?.filedYearsCount,
                filedAllYears: yearsFiledCount >= 3,
                ops: {
                    regionCode: trackData?.regionOfficeCode || trackData?.regionofficecode,
                    stCode: trackData?.stOfficeCode || trackData?.stofficecode,
                    ssCode: trackData?.ssOfficeCode || trackData?.ssofficecode,
                },
                business: {
                    isicCode: trackData?.isicCode,
                    isicName: trackData?.isicName,
                    type: trackData?.busType || trackData?.bustype,
                },
                standard: {
                    name: (pnd90Item.standard?.name || pnd90Item.name || tp?.taxpayerName || '-'),
                    dln: activeDln,
                    year: actualYear
                }
            };

            // ดึงชื่อหน่วยงาน (Office Names) ถ้ามีรหัสระบุ
            try {
                const ops = baseForDetail.ops;
                const [regName, stName, ssName] = await Promise.all([
                    ops.regionCode ? OfficeService.getOfficeName('region', ops.regionCode) : null,
                    ops.stCode ? OfficeService.getOfficeName('st', ops.stCode) : null,
                    ops.ssCode ? OfficeService.getOfficeName('ss', ops.ssCode) : null
                ]);
                if (regName) ops.regionName = regName;
                if (stName) ops.stName = stName;
                if (ssName) ops.ssName = ssName;
            } catch (officeError) {
                console.warn("[UnifiedService] Office name resolution failed", officeError);
            }

            // ผสมข้อมูลจากทั้งสองแหล่งเพื่อให้ Mapper สามารถสร้างประวัติย้อนหลัง (y64-y69) ได้ครบถ้วน
            const combinedTp = { ...tp, ...trackData };

            const enrichedItem = isPnd94 ? mapPND94Enriched(baseForDetail, combinedTp, cm, pnd) :
                isPnd91 ? mapPND91Enriched(baseForDetail, combinedTp, cm, pnd, comparePnd) :
                    mapPND90Enriched(baseForDetail, combinedTp, cm, pnd, comparePnd);

            enrichedItem.risks = {
                sent94not90: pnd94s === true || pnd94s === 'true',
                compareYear: finalCompareYear,
                requestedYear: effectiveYear,
                actualYear: actualYear
            };

            cacheStore.unified.set(cacheKey, enrichedItem);
            saveCache(cacheStore);
            return enrichedItem;
        } catch (error) {
            console.error(`[UnifiedService] Error enriching profile:`, error);
            throw error;
        }
    },

    async getTargets() {
        try {
            const stored = localStorage.getItem('tax_targets');
            if (stored) return JSON.parse(stored);
        } catch (e) {
            console.warn("Failed to load targets from localStorage", e);
        }
        return { "90": 2500000000, "91": 800000000, "94": 450000000 }; // Default Mock Targets
    },

    async updateTargets(targets) {
        try {
            localStorage.setItem('tax_targets', JSON.stringify(targets));
            return true;
        } catch (e) {
            console.error("Failed to save targets to localStorage", e);
            throw e;
        }
    },

    clearCache() {
        cacheStore.reports.clear();
        cacheStore.searches.clear();
        cacheStore.unified.clear();
        cacheStore.enrichment.clear();
        sessionStorage.removeItem(STORAGE_KEY);
    },

    saveCache() {
        saveCache(cacheStore);
    }
};
