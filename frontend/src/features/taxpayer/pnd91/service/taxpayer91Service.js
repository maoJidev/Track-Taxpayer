import {
    fetchTaxpayerPage,
    fetchTaxpayerByNid,
    fetchSearchByKeyword
} from "../../../main/api/Mainlist";
import {
    fetchPND91ByNid,
    fetchPND91Search,
    fetchPND91ByMinTax
} from "../api/taxpayer91Api";
import {
    mapPND91ReportItem
} from "../utils/taxpayer91Mapper";
import {
    mapTaxpayer90OfficialItem
} from "../../pnd90/utils/taxpayer90Mapper";
import { cacheStore, UnifiedService } from "../../../main/services/unifiedService";

function toOfficialSortParams(sortBy, year = "67") {
    const yearShort = String(year).slice(-2);
    if (!sortBy || sortBy === 'none') return { sortBy: 'recNo', direction: 'asc' };

    switch (sortBy) {
        case 'income_desc': return { sortBy: `y${yearShort}TotInc4018Amt`, direction: 'desc' };
        case 'income_asc': return { sortBy: `y${yearShort}TotInc4018Amt`, direction: 'asc' };
        case 'name_asc': return { sortBy: 'taxpayerName', direction: 'asc' };
        case 'name_desc': return { sortBy: 'taxpayerName', direction: 'desc' };
        default: return { sortBy: 'recNo', direction: 'asc' };
    }
}

export const Taxpayer91Service = {
    async getAll(params = {}, force = false, year = "67", officeParams = {}) {
        const { regionCode, stCode, ssCode } = officeParams;
        const { page = 0, size = 20, sortBy = 'none' } = params;
        const { sortBy: apiSortBy, direction } = toOfficialSortParams(sortBy, year);
        const cacheKey = `pnd91_page_${year}_${page}_${size}_${apiSortBy}_${direction}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;

        if (!force && cacheStore.reports.has(cacheKey)) {
            return cacheStore.reports.get(cacheKey);
        }

        try {
            // BACKEND API IS NOT READY YET.
            // Temporarily returning an empty list to prevent crashes/errors on the frontend.
            const result = {
                content: [],
                totalPages: 1,
                totalElements: 0,
                number: page,
                size: size
            };

            cacheStore.reports.set(cacheKey, result);
            UnifiedService.saveCache();
            return result;
        } catch (error) {
            console.error(`[Taxpayer91Service] getAll failed: ${error.message}`);
            throw error;
        }
    },

    async searchByKeyword(query, force = false, year = "67", officeParams = {}) {
        const { regionCode, stCode, ssCode } = officeParams;
        const cacheKey = `search_91_${query}_${year}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;

        const cleanQuery = String(query).replace(/-/g, "").trim();
        const isNid = /^\d{13}$/.test(cleanQuery);

        // ALWAYS force refresh on NID search to clear old fallback cache
        const shouldForce = force || isNid;

        if (!shouldForce && cacheStore.searches.has(cacheKey)) {
            return cacheStore.searches.get(cacheKey);
        }

        try {
            let result;
            if (isNid) {
                // สำหรับ NID (เลข 13 หลัก) ให้ใช้ Vision API เดิม
                const raw = await fetchPND91ByNid(cleanQuery, year).catch(() => null);
                const rawList = Array.isArray(raw) ? raw : (raw ? [raw] : []);
                const mappedItems = rawList.map(item => mapPND91ReportItem(item));

                result = {
                    content: mappedItems,
                    totalElements: mappedItems.length,
                    totalPages: 1,
                    isSearch: true
                };
            } else {
                // สำหรับการค้นหาด้วยชื่อ/คำค้นหาอื่นๆ ให้ใช้ Unified Search API (Centralized)
                const raw = await fetchSearchByKeyword(query, {
                    stCode: stCode || undefined,
                    page: 0,
                    size: 100
                });
                const rawList = raw.content || [];
                // ใช้ Mapper ของ PND 90 Official เพื่อแปลงข้อมูลที่ได้จาก Search API
                const mappedItems = rawList.map(item => mapTaxpayer90OfficialItem(item, year));

                result = {
                    content: mappedItems,
                    totalElements: raw.totalElements || mappedItems.length,
                    totalPages: raw.totalPages || 1,
                    isSearch: true
                };
            }
            cacheStore.searches.set(cacheKey, result);
            UnifiedService.saveCache();
            return result;
        } catch (error) {
            console.error(`[Taxpayer91Service] Search failed: ${error.message}`);
            throw error;
        }
    }
};
