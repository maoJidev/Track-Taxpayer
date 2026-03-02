import apiClient, { authApiClient } from "../../../main/services/client";

export async function fetchTaxpayer90ByNid(nid) {
    if (!nid || nid === '-') return null;
    const response = await authApiClient.get(`/api/taxpayer90/search/nid/${nid}`);
    return response.data;
}

export async function fetchTaxpayer90ByTin(tin) {
    if (!tin || tin === '-') return null;
    const response = await authApiClient.get(`/api/taxpayer90/search/tin/${tin}`);
    return response.data;
}

// APIs สำหรับระบบ ภ.ง.ด. 90 (ดึงข้อมูลจากระบบ Vision เดิม)
export async function fetchPND90Report(year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd90/${year}/report/top100`, { params });
    return response.data;
}

export async function fetchPND90StandardReport(params = {}, year = "67") {
    const response = await apiClient.get(`/api/pnd90/${year}/report`, { params });
    return response.data;
}

export async function fetchPND90ByNid(nid, year = "67", params = {}) {
    if (!nid || nid === '-') return null;
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/findbytxpnid/${nid}`, { params });
    return response.data;
}

export async function fetchPND90ByMinTax(minTax, year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/findtaxamtgoe/${minTax}`, { params });
    return response.data;
}

export async function fetchPND90ByTinNidName(kw, year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/findbytinnidname/${encodeURIComponent(kw)}`, { params });
    return response.data;
}

export async function fetchPND90SearchLegacy(keyword, year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/search/${encodeURIComponent(keyword)}`, { params });
    return response.data;
}

export async function fetchSearchByKeyword(keyword, params = {}) {
    const { page = 0, size = 20, stCode } = params;
    const query = { keyword, page, size };
    let url = '/api/taxpayer90/search'; // กำหนด URL พื้นฐานสำหรับการค้นหาทั่วไป

    // หากมีการระบุรหัสสำนักงานพื้นที่ (stCode) ให้สลับไปใช้ Path ค้นหาระดับพื้นที่
    if (stCode) {
        url = `/api/taxpayer90/st/${stCode}/search`;
    }

    const response = await authApiClient.get(url, { params: query });
    return response.data;
}

// ดึงรายละเอียดข้อมูลผู้เสียภาษี (Taxpayer Info) จาก DLN
export async function fetchPND90DetailTaxpayer(dln, year = "67") {
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงรายละเอียดข้อมูลที่อยู่อาศัยและข้อมูลทั่วไป (Common Info) จาก DLN
export async function fetchPND90DetailCommon(dln, year = "67") {
    const response = await apiClient.get(`/api/pnd90/${year}/common/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงรายละเอียดข้อมูลรายได้และการคำนวณภาษี (PND Info) จาก DLN
export async function fetchPND90DetailPnd(dln, year = "67") {
    const response = await apiClient.get(`/api/pnd90/${year}/pnd/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}
