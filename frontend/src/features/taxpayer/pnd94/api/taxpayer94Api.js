import apiClient from "../../../main/services/client";

// APIs สำหรับระบบ ภ.ง.ด. 94
// ดึงรายการผู้ที่ยื่น ภ.ง.ด. 94 แต่ยังไม่ได้ยื่น ภ.ง.ด. 90 (จากระบบ Tracking)
export async function fetchPND94SentNotPND90List(year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd94/${year}/sent94not90list`, { params });
    return response.data;
}

// ตรวจสอบสถานะว่ายื่น 94 แต่ไม่ยื่น 90 หรือไม่ รายบุคคล
export async function fetchPND94SentNot90Status(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/sent94not90/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงข้อมูลทั่วไป ภ.ง.ด. 94 จาก DLN
export async function fetchPND94DetailCommon(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/common/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

// ดึงข้อมูลรายได้และภาษี ภ.ง.ด. 94 จาก DLN
export async function fetchPND94DetailPnd(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/pnd/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

export async function fetchPND94ByNid(nid, year = "67", params = {}) {
    if (!nid || nid === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/taxpayer/findbytxpnid/${encodeURIComponent(nid)}`, { params });
    return response.data;
}

export async function fetchPND94ByMinTax(minTax, year = "67", params = {}) {
    const response = await apiClient.get(`/api/pnd94/${year}/taxpayer/findtaxamtgoe/${encodeURIComponent(minTax)}`, { params });
    return response.data;
}

// ดึงข้อมูลผู้เสียภาษี ภ.ง.ด. 94 จาก DLN
export async function fetchPND94DetailTaxpayer(dln, year = "67") {
    if (!dln || dln === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/taxpayer/findbydln/${encodeURIComponent(dln)}`);
    return response.data;
}

export async function fetchPND94HasNid(nid, year = "67") {
    if (!nid || nid === '-') return null;
    const response = await apiClient.get(`/api/pnd94/${year}/taxpayer/has/${nid}`);
    return response.data;
}

export async function fetchPND94Search(keyword, year = "67", params = {}) {
    if (!keyword) return [];
    const response = await apiClient.get(`/api/pnd94/${year}/taxpayer/search/${encodeURIComponent(keyword)}`, { params });
    return response.data;
}
