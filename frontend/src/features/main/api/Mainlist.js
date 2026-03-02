import apiClient, { authApiClient } from "../services/client";

/**
 * Mainlist API — Central source for Paging and Unified Search
 * 
 * นี้คือจุดรวม API หลักที่ใช้ข้ามโมดูล (PND 90, 91, 94) 
 * เพื่อให้แต่ละ Service มีความสะอาด (Clean) และไม่เรียกข้ามโมดูลกันไปมา
 */

// 1. Paging API (ศูนย์กลางข้อมูลแบบแบ่งหน้าสำหรับรายการ ภ.ง.ด. ทั้งหมด)
export async function fetchTaxpayerPage(params = {}) {
    const { page = 0, size = 50, sortBy = 'recNo', direction = 'asc', regionCode, stCode, ssCode } = params;
    const query = { page, size, sortBy, direction };

    let url = '/api/taxpayer90/page';

    // ลำดับความสำคัญ: หากมีการระบุรหัสสาขา (ssCode) ให้ใช้ Path เฉพาะสำหรับระดับสาขา
    if (ssCode) {
        url = `/api/taxpayer90/ss/${ssCode}/page`;
    }
    // หากไม่มีรหัสสาขา ให้ใช้ Path ของระดับพื้นที่ (stCode) หากมีการระบุไว้
    else if (stCode) {
        url = `/api/taxpayer90/st/${stCode}/page`;
    }

    const response = await authApiClient.get(url, { params: query });
    return response.data;
}

// ชื่อเรียกอื่น (Alias) เพื่อรองรับเวอร์ชันเก่า แต่แนะนำให้เปลี่ยนไปใช้ fetchTaxpayerPage ในอนาคต
export const fetchTaxpayer90Page = fetchTaxpayerPage;

export async function fetchTaxpayerByNid(nid, year = "67") {
    if (!nid || nid === '-') return null;
    // ค่าเริ่มต้นจะใช้ PND 90 Vision API เป็นแหล่งข้อมูลหลัก (Base Registry Fallback)
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/findbytxpnid/${nid}`);
    return response.data;
}


export async function fetchTaxpayerByKeyword(keyword, year = "67") {
    if (!keyword) return [];
    const response = await apiClient.get(`/api/pnd90/${year}/taxpayer/search/${encodeURIComponent(keyword)}`);
    return response.data;
}