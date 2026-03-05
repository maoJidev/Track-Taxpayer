import apiClient, { authApiClient } from "../../../main/services/client";

// APIs สำหรับระบบ ภ.ง.ด. 91 (Vision API) 
export async function fetchPND91ByNid(nid, year = "67", params = {}) {
    if (!nid || nid === '-') return null;
    const response = await apiClient.get(`/api/pnd91/${year}/taxpayer/findbytxpnid/${encodeURIComponent(nid)}`, { params });
    return response.data;
}

// APIs สำหรับระบบ Tracking (จาก port 8081)
export async function fetchTaxpayer91ByNid(nid) {
    if (!nid || nid === '-') return null;
    const response = await authApiClient.get(`/api/taxpayer91/search/nid/${nid}`);
    return response.data;
}

export async function fetchPND91ByMinTax(minTax, year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd91/${year}/taxpayer/findtaxamtgoe/${encodeURIComponent(minTax)}`, { params });
    return response.data;
}

export async function fetchPND91Search(keyword, year = "67", params = {}) {
    if (!keyword) return [];
    const response = await apiClient.get(`/api/pnd91/${year}/taxpayer/search/${encodeURIComponent(keyword)}`, { params });
    return response.data;
}

export async function fetchPND91ByDln(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd91/${year}/taxpayer/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงรายละเอียดข้อมูลผู้เสียภาษี ภ.ง.ด. 91 จาก DLN
export async function fetchPND91DetailTaxpayer(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd91/${year}/taxpayer/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงข้อมูลที่อยู่และข้อมูลทั่วไป ภ.ง.ด. 91 จาก DLN
export async function fetchPND91DetailCommon(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd91/${year}/common/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงรายได้และการคำนวณภาษี ภ.ง.ด. 91 จาก DLN
export async function fetchPND91DetailPnd(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd91/${year}/pnd/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}
