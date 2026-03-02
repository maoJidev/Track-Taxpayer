import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Taxpayer91Service } from '../service/taxpayer91Service';
import { UnifiedService } from '../../../main/services/unifiedService';
import { useTaxpayerFilters } from '../../../main/hooks/useTaxpayerFilters';

export const useTaxpayer91List = (storageKey, initialParams = {}) => {
    const {
        filters,
        setPage,
        setSearchQuery,
        setPageSize,
        setYear,
        setOffices,
        updateFilter
    } = useTaxpayerFilters(storageKey, initialParams);

    const { searchQuery, page, pageSize, sortBy, year, regionCode, stCode, ssCode } = filters;
    const officeParams = useMemo(() => ({ regionCode, stCode, ssCode }), [regionCode, stCode, ssCode]);

    const [allData, setAllData] = useState([]);
    const [apiMeta, setApiMeta] = useState({ totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enrichingMap, setEnrichingMap] = useState({});

    const isServerPaged = !searchQuery;
    const searchTimeoutRef = useRef(null);
    const fetchIdRef = useRef(0);

    const fetchData = useCallback(async (query = '') => {
        const isOfficeMissing = !regionCode && !stCode && !ssCode;
        if (isOfficeMissing && !query) {
            setAllData([]);
            setApiMeta({ totalPages: 0, totalElements: 0 });
            return;
        }

        const currentFetchId = ++fetchIdRef.current;
        setLoading(true);
        setError(null);

        if (!page || query) setAllData([]);

        try {
            let result;
            if (query) {
                result = await Taxpayer91Service.searchByKeyword(query, false, year, officeParams);
                setApiMeta({ totalPages: 0, totalElements: 0 });
            } else {
                result = await Taxpayer91Service.getAll(
                    { page, size: pageSize, sortBy },
                    false,
                    year,
                    officeParams
                );
                setApiMeta({
                    totalPages: result.totalPages ?? 1,
                    totalElements: result.totalElements ?? 0
                });
            }
            if (currentFetchId !== fetchIdRef.current) return;
            setAllData(result.content || []);
        } catch (err) {
            console.error(`Fetch PND 91 Error:`, err);
            setError(`เกิดข้อผิดพลาดในการโหลดข้อมูล (${err.message})`);
        } finally {
            if (currentFetchId === fetchIdRef.current) setLoading(false);
        }
    }, [year, searchQuery, page, pageSize, sortBy, regionCode, stCode, ssCode]);

    useEffect(() => {
        const query = searchQuery ?? '';
        const timer = searchTimeoutRef.current;
        if (timer) clearTimeout(timer);
        if (query) {
            searchTimeoutRef.current = setTimeout(() => fetchData(query), 500);
            return () => clearTimeout(searchTimeoutRef.current);
        }
        fetchData(query);
    }, [searchQuery, fetchData]);

    const processedData = useMemo(() => {
        let filtered = [...allData];

        if (searchQuery && !isServerPaged) {
            const q = (searchQuery || '').toLowerCase().trim();
            filtered = filtered.filter(item =>
                (item.taxId || '').includes(q) ||
                (item.name || '').toLowerCase().includes(q)
            );
        }

        if (sortBy && sortBy !== 'none') {
            const cleanThaiName = (name) => {
                if (!name) return "";
                return name.replace(/^(นาย|นางสาว|นาง|น\.ส\.|น\.ส|ด\.ช\.|ด\.ญ\.|(ว่าที่\s*)?([ก-ฮ]\.)+[ก-ฮ]?|(ว่าที่\s*)?[ก-ฮ]{2,}\s*[ก-ฮ]\.)\s*/, "").trim();
            };

            filtered.sort((a, b) => {
                if (sortBy === 'income_desc') return (b.totalIncome || 0) - (a.totalIncome || 0);
                if (sortBy === 'income_asc') return (a.totalIncome || 0) - (b.totalIncome || 0);
                if (sortBy === 'name_asc') return cleanThaiName(a.name).localeCompare(cleanThaiName(b.name), 'th');
                if (sortBy === 'name_desc') return cleanThaiName(b.name).localeCompare(cleanThaiName(a.name), 'th');
                return 0;
            });
        }

        return filtered;
    }, [allData, searchQuery, sortBy, isServerPaged]);

    const paginatedData = useMemo(() => {
        if (isServerPaged) return processedData;
        const start = page * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, page, pageSize, isServerPaged]);

    const handleRefresh = () => {
        UnifiedService.clearCache();
        fetchData(searchQuery);
    };

    const handleEnrich = async (id, dln) => {
        if (enrichingMap[id]) return;
        setEnrichingMap(prev => ({ ...prev, [id]: true }));
        try {
            const enrichedData = await UnifiedService.enrichSingleItem(id, dln, false, year);
            setAllData(prevData => prevData.map(d =>
                d.taxId === id ? { ...d, ...enrichedData, isEnriched: true } : d
            ));
        } catch (err) {
            console.error("PND 91 Single Enrichment Error:", err);
            setAllData(prevData => prevData.map(d =>
                d.taxId === id ? { ...d, isEnriched: true, enrichmentError: true } : d
            ));
        } finally {
            setEnrichingMap(prev => ({ ...prev, [id]: false }));
        }
    };

    const allDataRef = useRef(allData);
    useEffect(() => { allDataRef.current = allData; }, [allData]);

    useEffect(() => {
        if (loading || allData.length === 0) return;
        let isStopped = false;

        const processBackground = async () => {
            const getNextBatch = () => {
                const currentData = allDataRef.current;
                const inViewUnenriched = currentData
                    .slice(page * pageSize, (page + 1) * pageSize)
                    .filter(item => !item.isEnriched && !enrichingMap[item.taxId]);
                if (inViewUnenriched.length > 0) return inViewUnenriched.slice(0, 5);
                const restUnenriched = currentData.filter(item => !item.isEnriched && !enrichingMap[item.taxId]);
                return restUnenriched.slice(0, 5);
            };

            while (!isStopped) {
                const batch = getNextBatch();
                if (batch.length === 0) break;
                await Promise.all(batch.map(item => handleEnrich(item.taxId, item.dln)));
                await new Promise(r => setTimeout(r, 100));
            }
        };

        processBackground();
        return () => { isStopped = true; };
    }, [loading, allData.length, page]);

    return {
        data: paginatedData,
        loading,
        error,
        enrichingMap,
        totalPages: isServerPaged ? apiMeta.totalPages : Math.ceil(processedData.length / pageSize),
        totalElements: isServerPaged ? apiMeta.totalElements : processedData.length,
        filters,
        setPage,
        setSearchQuery,
        setPageSize,
        setSortBy: (val) => updateFilter('sortBy', val),
        setRiskFilter: (val) => updateFilter('filterRisk', val),
        setYear,
        setOffices,
        handleRefresh,
        handleEnrich
    };
};
