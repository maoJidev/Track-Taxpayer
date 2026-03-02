import { useState, useEffect, useCallback } from 'react';

export const useTaxpayerFilters = (storageKey, initialParams = {}) => {
    const defaultParams = {
        searchQuery: '',
        page: 0,
        pageSize: 50,
        sortBy: 'none',
        filterIncomeType: 'all',
        filterRisk: 'all',
        quickFilter: 'all',
        year: '67',
        regionCode: '',
        stCode: '',
        ssCode: '',
        ...initialParams
    };

    const loadSavedState = () => {
        if (!storageKey) return defaultParams;
        try {
            const saved = sessionStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : defaultParams;
        } catch (e) {
            console.warn("Failed to load state from sessionStorage", e);
            return defaultParams;
        }
    };

    const [filters, setFilters] = useState(loadSavedState());

    // Sync with initialParams if they change (e.g. when user profile loads from API or session later)
    useEffect(() => {
        if (initialParams.regionCode || initialParams.stCode || initialParams.ssCode) {
            setFilters(prev => {
                const needsSync = (initialParams.regionCode && !prev.regionCode) ||
                    (initialParams.stCode && !prev.stCode) ||
                    (initialParams.ssCode && !prev.ssCode);

                if (needsSync) {
                    return {
                        ...prev,
                        regionCode: initialParams.regionCode || prev.regionCode,
                        stCode: initialParams.stCode || prev.stCode,
                        ssCode: initialParams.ssCode || prev.ssCode
                    };
                }
                return prev;
            });
        }
    }, [initialParams.regionCode, initialParams.stCode, initialParams.ssCode]);

    useEffect(() => {
        if (storageKey) {
            sessionStorage.setItem(storageKey, JSON.stringify(filters));
        }
    }, [filters, storageKey]);

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            ...(key !== 'page' ? { page: 0 } : {})
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(defaultParams);
    }, [defaultParams]);

    const setPage = useCallback((newPage) => {
        updateFilter('page', newPage);
    }, [updateFilter]);

    const setSearchQuery = useCallback((query) => {
        updateFilter('searchQuery', query);
    }, [updateFilter]);

    const setPageSize = useCallback((size) => {
        updateFilter('pageSize', size);
    }, [updateFilter]);

    const setQuickFilter = useCallback((val) => {
        updateFilter('quickFilter', val);
    }, [updateFilter]);

    const setYear = useCallback((val) => {
        updateFilter('year', val);
    }, [updateFilter]);

    const setOffices = useCallback(({ regionCode, stCode, ssCode }) => {
        setFilters(prev => ({
            ...prev,
            regionCode,
            stCode,
            ssCode,
            page: 0 // Reset page on office change
        }));
    }, []);

    return {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        setPage,
        setSearchQuery,
        setPageSize,
        setQuickFilter,
        setYear,
        setOffices
    };
};
