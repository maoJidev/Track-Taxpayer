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
    fetchPND91DetailPnd
} from "../../taxpayer/pnd91/api/taxpayer91Api";
import {
    fetchPND94ByNid,
    fetchPND94DetailTaxpayer,
    fetchPND94DetailCommon,
    fetchPND94DetailPnd,
    fetchPND94SentNot90Status,
    fetchPND94HasNid
} from "../../taxpayer/pnd94/api/taxpayer94Api";
import {
    getVal,
    mapEnrichedGeneric
} from "../utils/commonMapper";
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
        const finalCompareYear = compareYear || String(parseInt(effectiveYear) - 1);
        const cacheKey = `${taxId}_unified_${effectiveYear}_vs_${finalCompareYear}_${formType}`;

        if (force) {
            cacheStore.unified.delete(cacheKey);
        } else if (cacheStore.unified.has(cacheKey) && cacheStore.unified.get(cacheKey).isFullyEnriched) {
            return cacheStore.unified.get(cacheKey);
        }

        try {
            let activeDln = dln;

            if ((!activeDln || activeDln === '-') && taxId) {
                try {
                    let nidData;
                    if (formType === '91') {
                        nidData = await fetchPND91ByNid(taxId, effectiveYear);
                    } else if (formType === '94') {
                        nidData = await fetchPND94ByNid(taxId, effectiveYear);
                    } else {
                        nidData = await fetchPND90ByNid(taxId, effectiveYear);
                    }

                    let firstMatch = Array.isArray(nidData) ? nidData[0] : nidData;
                    let foundDln = getVal(firstMatch, ['dln', 'DLN']);

                    // กรณีสำรอง: หาก 91/94 ไม่พบเลขที่เอกสาร (DLN) ให้ลองค้นหาจาก 90 ซึ่งเป็นแหล่งข้อมูลพื้นฐานหลัก
                    if (!foundDln && (formType === '91' || formType === '94')) {
                        console.log(`[UnifiedService] No DLN found for PND ${formType}, falling back to PND 90 lookup for NID: ${taxId}`);
                        const fallbackData = await fetchPND90ByNid(taxId, effectiveYear).catch(() => null);
                        if (fallbackData) {
                            firstMatch = Array.isArray(fallbackData) ? fallbackData[0] : fallbackData;
                            foundDln = getVal(firstMatch, ['dln', 'DLN']);
                        }
                    }

                    if (foundDln) activeDln = foundDln;
                } catch (lookupErr) {
                    console.warn(`[UnifiedService] DLN lookup failed for PND ${formType}: ${lookupErr.message}`);
                    // Second Fallback Attempt if lookup itself crashed (e.g. 404)
                    if (formType === '94' || formType === '91') {
                        try {
                            const fallbackData = await fetchPND90ByNid(taxId, effectiveYear);
                            const firstMatch = Array.isArray(fallbackData) ? fallbackData[0] : fallbackData;
                            const foundDln = getVal(firstMatch, ['dln', 'DLN']);
                            if (foundDln) activeDln = foundDln;
                        } catch (fError) {
                            console.warn(`[UnifiedService] Final fallback to PND 90 also failed: ${fError.message}`);
                        }
                    }
                }
            }

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

            if (!activeDln || activeDln === '-') {
                throw new Error(`ไม่พบเลขที่เอกสาร (DLN) สำหรับผู้เสียภาษีรายนี้ในปี ${effectiveYear} (NID: ${taxId})`);
            }

            const isPnd94 = activeDln.startsWith('ภงด94');
            const isPnd91 = activeDln.startsWith('ภงด91');

            let tp, cm, pnd;
            if (isPnd94) {
                const [rawTp, rawCm, rawPnd] = await Promise.all([
                    fetchPND94DetailTaxpayer(activeDln, effectiveYear).catch(() => null),
                    fetchPND94DetailCommon(activeDln, effectiveYear).catch(() => null),
                    fetchPND94DetailPnd(activeDln, effectiveYear).catch(() => null)
                ]);
                tp = Array.isArray(rawTp) ? rawTp[0] : rawTp;
                cm = Array.isArray(rawCm) ? rawCm[0] : rawCm;
                pnd = Array.isArray(rawPnd) ? rawPnd[0] : rawPnd;
            } else if (isPnd91) {
                const [rawTp, rawCm, rawPnd] = await Promise.all([
                    fetchPND91DetailTaxpayer(activeDln, effectiveYear).catch(() => null),
                    fetchPND91DetailCommon(activeDln, effectiveYear).catch(() => null),
                    fetchPND91DetailPnd(activeDln, effectiveYear).catch(() => null)
                ]);
                tp = Array.isArray(rawTp) ? rawTp[0] : rawTp;
                cm = Array.isArray(rawCm) ? rawCm[0] : rawCm;
                pnd = Array.isArray(rawPnd) ? rawPnd[0] : rawPnd;
            } else {
                const [rawTp, rawCm, rawPnd] = await Promise.all([
                    fetchPND90DetailTaxpayer(activeDln, effectiveYear).catch(() => null),
                    fetchPND90DetailCommon(activeDln, effectiveYear).catch(() => null),
                    fetchPND90DetailPnd(activeDln, effectiveYear).catch(() => null)
                ]);
                tp = Array.isArray(rawTp) ? rawTp[0] : rawTp;
                cm = Array.isArray(rawCm) ? rawCm[0] : rawCm;
                pnd = Array.isArray(rawPnd) ? rawPnd[0] : rawPnd;
            }

            const [r1, r2, r4, r5, pnd94s] = await Promise.all([
                fetchRiskIncomeDecrease(taxId, effectiveYear, finalCompareYear).catch(() => null),
                fetchRiskTaxDecrease(taxId, effectiveYear, finalCompareYear).catch(() => null),
                fetchRiskSentNotStatus(taxId, effectiveYear, finalCompareYear).catch(() => null),
                fetchRiskSpouseIncome(taxId, effectiveYear, formType).catch(() => null),
                isPnd94 ? fetchPND94SentNot90Status(dln, effectiveYear).catch(() => null) : Promise.resolve(null)
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

            // กฎเหล็ก: ห้ามผสมข้อมูลจาก Tracking (8081) และ Vision (8080) ในการเรียกดูรายละเอียดเชิงลึก
            // สร้างออบเจ็กต์พื้นฐานเพื่อป้องกันฟิลด์จาก Tracking API ปนกับข้อมูลจาก Vision API
            const baseForDetail = {
                taxId: pnd90Item.taxId,
                dln: activeDln,
                year: effectiveYear,
                standard: {
                    name: (pnd90Item.standard?.name || pnd90Item.name || '-'),
                    dln: activeDln,
                    year: effectiveYear
                }
            };

            const enrichedItem = isPnd94 ? mapPND94Enriched(baseForDetail, tp, cm, pnd) :
                isPnd91 ? mapPND91Enriched(baseForDetail, tp, cm, pnd, comparePnd) :
                    mapPND90Enriched(baseForDetail, tp, cm, pnd, comparePnd);

            enrichedItem.risks = {
                incomeDecrease: r1 === true || r1 === 'true',
                taxAmtDecrease: r2 === true || r2 === 'true',
                sentBaseNotCompare: r4 === true || r4 === 'true',
                spouseHasIncome: r5 === true || r5 === 'true',
                sent94not90: pnd94s === true || pnd94s === 'true',
                compareYear: finalCompareYear
            };

            cacheStore.unified.set(cacheKey, enrichedItem);
            saveCache(cacheStore);
            return enrichedItem;
        } catch (error) {
            console.error(`[UnifiedService] Error enriching profile:`, error);
            return { ...pnd90Item, isFullyEnriched: true, enrichmentError: error.message };
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
