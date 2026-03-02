import {
    fetchTaxpayerPage,
    fetchTaxpayerByNid,
    fetchTaxpayerByKeyword
} from "../../../main/api/Mainlist";
import {
    fetchPND94ByNid,
    fetchPND94Search
} from "../api/taxpayer94Api";
import { mapPND94ListItem } from "../utils/taxpayer94Mapper";
import { mapTaxpayer90OfficialItem, mapPND90ReportItem } from "../../pnd90/utils/taxpayer90Mapper";
import { cacheStore, UnifiedService } from "../../../main/services/unifiedService";

/**
 * PND 94 Service
 *
 * Strategy:
 *   List view  → Use fetchTaxpayerPage (from Mainlist) as data source.
 *   Search     → If NID (13-digit) → fetchPND94ByNid first; fall back to fetchTaxpayerByNid (Unified).
 *              → Keyword           → fetchPND94Search; fall back to fetchTaxpayerByKeyword (Unified).
 * 
 * นี้ช่วยให้ Service นี้ "Clean" ขึ้น โดยไม่เรียกใช้ API ข้ามไปยัง Folder PND 90 โดยตรง
 */

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

export const Taxpayer94Service = {
    async getAll(params = {}, force = false, year = "67", officeParams = {}) {
        const { regionCode, stCode, ssCode } = officeParams;
        const { page = 0, size = 20, sortBy = 'none' } = params;
        const { sortBy: apiSortBy, direction } = toOfficialSortParams(sortBy, year);
        const cacheKey = `taxpayer94_page_${year}_${page}_${size}_${apiSortBy}_${direction}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;

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
            console.error(`[Taxpayer94Service] getAll failed: ${error.message}`);
            throw error;
        }
    },

    async searchPND94(query, year = "67", officeParams = {}, force = false) {
        if (!query) return this.getAll({}, force, year, officeParams);

        const { regionCode, stCode, ssCode } = officeParams;
        const cacheKey = `pnd94_search_${query}_${year}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;

        const cleanQuery = String(query).replace(/-/g, "").trim();
        const isNid = /^\d{13}$/.test(cleanQuery);

        // ALWAYS force refresh on NID search to clear old fallback cache
        const shouldForce = force || isNid;

        if (!shouldForce && cacheStore.searches.has(cacheKey)) {
            return cacheStore.searches.get(cacheKey);
        }

        try {
            let raw;
            if (isNid) {
                raw = await fetchPND94ByNid(cleanQuery, year, officeParams).catch(() => null);
            } else {
                raw = await fetchPND94Search(query, year, officeParams).catch(() => null);
            }

            const rawList = Array.isArray(raw) ? raw : (raw ? [raw] : []);

            const mappedItems = rawList.map(item => mapPND94ListItem(item));

            const result = {
                content: mappedItems,
                totalElements: mappedItems.length,
                totalPages: 1,
                isSearch: true
            };
            cacheStore.searches.set(cacheKey, result);
            UnifiedService.saveCache();
            return result;
        } catch (error) {
            console.error(`[Taxpayer94Service] searchPND94 Error:`, error);
            throw error;
        }
    }
};
