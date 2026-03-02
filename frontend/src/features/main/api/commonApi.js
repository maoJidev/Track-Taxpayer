import apiClient from "../services/client";

// Address API
export async function fetchAddressDetail(id) {
    if (!id) return null;
    const response = await apiClient.get(`/api/address/findbyid/${id}`);
    return response.data;
}

// RD10x Risk APIs
export async function fetchRiskIncomeDecrease(nid, baseYear, compareYear) {
    if (!nid || !baseYear || !compareYear) return null;
    const url = `/api/rd10x/isincomelessthancompare/${nid}/${baseYear}/${compareYear}`;
    console.log(`[API] GET ${url}`);
    const response = await apiClient.get(url);
    return response.data;
}

export async function fetchRiskTaxDecrease(nid, baseYear, compareYear) {
    if (!nid || !baseYear || !compareYear) return null;
    const url = `/api/rd10x/istaxamtlessthancompare/${nid}/${baseYear}/${compareYear}`;
    console.log(`[API] GET ${url}`);
    const response = await apiClient.get(url);
    return response.data;
}

// Risk 5: Filed in Base Year but NOT in Compare Year (Dynamic)
export async function fetchRiskSentNotStatus(nid, baseYear, compareYear) {
    if (!nid || !baseYear || !compareYear) return null;
    const url = `/api/rd10x/issent90baseyearnotcompareyear/${nid}/${baseYear}/${compareYear}`;
    console.log(`[API] GET ${url}`);
    const response = await apiClient.get(url);
    return response.data;
}

export async function fetchRiskSpouseIncome(nid, year, type = '90') {
    if (!nid || !year) return null;
    const endpoint = type === '91' ? 'is91spohaswhld' : 'is90spohaswhld';
    const response = await apiClient.get(`/api/rd10x/${endpoint}/${nid}/${year}`);
    return response.data;
}
