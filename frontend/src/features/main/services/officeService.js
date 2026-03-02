// src/features/main/services/officeService.js
import apiClient, { authApiClient } from './client';

/**
 * Office Management Service
 * Handles API calls for office hierarchy (Region → ST → SS)
 */

export const OfficeService = {
    /**
     * Get all regions
     * @returns {Promise<Array>} List of regions
     */
    async getRegions() {
        try {
            const response = await authApiClient.get('/api/offices/regions');
            return response.data.data || response.data; // Support both structures
        } catch (error) {
            console.error('[OfficeService] Failed to fetch regions:', error);
            throw error;
        }
    },

    /**
     * Get ST offices by region code
     * @param {string} regionCode - Region code
     * @returns {Promise<Array>} List of ST offices
     */
    async getSTOfficesByRegion(regionCode) {
        if (!regionCode) return [];

        try {
            const response = await authApiClient.get(`/api/offices/st/region/${regionCode}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch ST offices for region ${regionCode}:`, error);
            throw error;
        }
    },

    /**
     * Get SS offices by ST code
     * @param {string} stCode - ST office code
     * @returns {Promise<Array>} List of SS offices
     */
    async getSSOfficesByST(stCode) {
        if (!stCode) return [];


        try {
            const response = await authApiClient.get(`/api/offices/ss/st/${stCode}`);
            const data = response.data.data || response.data;
            // Filter only active offices (ktbStatus === 1) as per guide
            return Array.isArray(data) ? data.filter(ss => ss.ktbStatus === 1) : data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch SS offices for ST ${stCode}:`, error);
            throw error;
        }
    },

    /**
     * Get office hierarchy based on user role and office codes
     * @param {string} userRole - User role (Region, ST, SS)
     * @param {Object} userOffices - User's office codes
     * @returns {Promise<Object>} Filtered office hierarchy
     */
    async getOfficeHierarchy(userRole, userOffices = {}) {
        const { regionCode, stCode, ssCode } = userOffices;

        try {
            let regions = [];
            let stOffices = [];
            let ssOffices = [];

            switch (userRole) {
                case 'Region':
                    regions = await this.getRegions();
                    if (regionCode) {
                        stOffices = await this.getSTOfficesByRegion(regionCode);
                    }
                    break;

                case 'ST':
                    if (regionCode) {
                        regions = await this.getRegions();
                        stOffices = await this.getSTOfficesByRegion(regionCode);
                    }
                    if (stCode) {
                        ssOffices = await this.getSSOfficesByST(stCode);
                    }
                    break;

                case 'SS':
                    // SS users have everything pre-filled
                    if (regionCode) {
                        regions = await this.getRegions();
                    }
                    if (regionCode && stCode) {
                        stOffices = await this.getSTOfficesByRegion(regionCode);
                    }
                    if (stCode && ssCode) {
                        ssOffices = await this.getSSOfficesByST(stCode);
                    }
                    break;

                default:
                    console.warn(`[OfficeService] Unknown role: ${userRole}`);
            }

            return {
                regions,
                stOffices,
                ssOffices
            };
        } catch (error) {
            console.error('[OfficeService] Failed to fetch office hierarchy:', error);
            throw error;
        }
    },

    /**
     * Get Region by code
     */
    async getRegionByCode(code) {
        if (!code) return null;
        try {
            const response = await authApiClient.get(`/api/offices/regions/${code}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch region ${code}:`, error);
            return null;
        }
    },

    /**
     * Get ST Office by code
     */
    async getSTOfficeByCode(code) {
        if (!code) return null;
        try {
            const response = await authApiClient.get(`/api/offices/st/${code}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch ST office ${code}:`, error);
            return null;
        }
    },

    /**
     * Get SS Office by code
     */
    async getSSOfficeByCode(code) {
        if (!code) return null;
        try {
            const response = await authApiClient.get(`/api/offices/ss/${code}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch SS office ${code}:`, error);
            return null;
        }
    },

    /**
     * Get SS Offices by Region code
     */
    async getSSOfficesByRegion(regionCode) {
        if (!regionCode) return [];
        try {
            const response = await authApiClient.get(`/api/offices/ss/region/${regionCode}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch SS offices for region ${regionCode}:`, error);
            throw error;
        }
    },

    /**
     * Get SS Offices by KTB Status
     */
    async getSSOfficesByKTBStatus(status) {
        try {
            console.log(`[OfficeService] Fetching SS offices by KTB status: ${status}`);
            const response = await authApiClient.get(`/api/offices/ss/ktb/${status}`);
            return response.data.data || response.data;
        } catch (error) {
            console.error(`[OfficeService] Failed to fetch SS offices by KTB status ${status}:`, error);
            throw error;
        }
    },

    /**
     * Find office name by code
     * @param {string} type - Office type (region, st, ss)
     * @param {string} code - Office code
     * @returns {Promise<string|null>} Office name
     */
    async getOfficeName(type, code) {
        if (!code) return null;

        try {
            let data;
            if (type === 'region') data = await this.getRegionByCode(code);
            else if (type === 'st') data = await this.getSTOfficeByCode(code);
            else if (type === 'ss') data = await this.getSSOfficeByCode(code);

            if (data) {
                return data.regionOfficeName || data.stOfficeName || data.ssOfficeName || null;
            }
        } catch (e) {
            console.warn(`[OfficeService] Could not find name for ${type} ${code}`);
        }
        return null;
    }
};
