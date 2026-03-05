import {
    fetchTaxpayerPage,
    fetchTaxpayerByNid,
    fetchSearchByKeyword
} from "../../../main/api/Mainlist";
import {
    fetchPND90ByNid,
    fetchPND90ByMinTax,
    fetchPND90ByTinNidName,
    fetchPND90SearchLegacy,
    fetchTaxpayer90ByNid
} from "../api/taxpayer90Api";
import {
    mapTaxpayer90OfficialItem,
    mapPND90ReportItem
} from "../utils/taxpayer90Mapper";
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

export const Taxpayer90Service = {
    async getAll(params = {}, force = false, year = "67", officeParams = {}) {
        const { regionCode, stCode, ssCode } = officeParams;
        const { page = 0, size = 20, sortBy = 'none' } = params;
        const { sortBy: apiSortBy, direction } = toOfficialSortParams(sortBy, year);
        const cacheKey = `taxpayer90_page_${year}_${page}_${size}_${apiSortBy}_${direction}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;

        if (!force && cacheStore.reports.has(cacheKey)) {
            return cacheStore.reports.get(cacheKey);
        }

        try {
            const raw = await fetchTaxpayerPage({
                page, size, sortBy: apiSortBy, direction,
                regionCode: regionCode || undefined,
                stCode: stCode || undefined,
                ssCode: ssCode || undefined
            });
            const content = (Array.isArray(raw.content) ? raw.content : []).map(item => mapTaxpayer90OfficialItem(item, year));

            const result = {
                content,
                totalPages: raw.totalPages ?? 1,
                totalElements: raw.totalElements ?? content.length,
                number: raw.number ?? page,
                size: raw.size ?? size
            };

            cacheStore.reports.set(cacheKey, result);
            UnifiedService.saveCache();
            return result;
        } catch (error) {
            console.error(`[Taxpayer90Service] getAll failed: ${error.message}`);
            throw error;
        }
    },

    async searchByKeyword(query, force = false, year = "67", officeParams = {}) {
        const { regionCode, stCode, ssCode } = officeParams;
        const cacheKey = `search_90_${query}_${year}_${regionCode || 'all'}_${stCode || 'all'}_${ssCode || 'all'}`;
        if (!force && cacheStore.searches.has(cacheKey)) {
            return cacheStore.searches.get(cacheKey);
        }

        const cleanQuery = String(query).replace(/-/g, "").trim();
        const isNid = /^\d{13}$/.test(cleanQuery);

        try {
            let result;
            if (isNid) {
                // For NID results, use the specific Vision API
                const raw = await fetchPND90ByNid(cleanQuery, year);
                const rawList = Array.isArray(raw) ? raw : (raw ? [raw] : []);
                const mappedItems = rawList.map(item => mapPND90ReportItem(item, year));
                result = {
                    content: mappedItems,
                    totalElements: mappedItems.length,
                    totalPages: 1,
                    isSearch: true
                };
            } else {
                // For names, use the new auth API which supports flexible searching
                const raw = await fetchSearchByKeyword(query, {
                    stCode: stCode || undefined,
                    page: 0,
                    size: 100
                });
                const rawList = raw.content || [];
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
            console.error(`[Taxpayer90Service] Search failed: ${error.message}`);
            throw error;
        }
    }
};
