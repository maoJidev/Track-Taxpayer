import React, { useState, useEffect } from 'react';
import { OfficeService } from '../../features/main/services/officeService';
import {
    Building2,
    MapPin,
    Search,
    RefreshCw,
    Table as TableIcon,
    AlertCircle,
    Building
} from 'lucide-react';

const OfficeManagement = () => {
    const [activeTab, setActiveTab] = useState('regions');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    // Filters for specific endpoints
    const [regionCode, setRegionCode] = useState('');
    const [stCode, setStCode] = useState('');
    const [ssCode, setSsCode] = useState('');
    const [ktbStatus, setKtbStatus] = useState('Y');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'regions', label: 'ภูมิภาค (Region)', icon: <Building2 size={18} /> },
        { id: 'st_by_region', label: 'สท. ตามภูมิภาค', icon: <MapPin size={18} /> },
        { id: 'ss_by_region', label: 'สาขา ตามภูมิภาค', icon: <MapPin size={18} /> },
        { id: 'ss_by_st', label: 'สาขา ตาม สท.', icon: <MapPin size={18} /> },
        { id: 'ss_by_ktb', label: 'สาขา ตาม KTB Status', icon: <Building size={18} /> },
    ];

    const fetchData = async () => {
        const cleanRegion = regionCode.trim();
        const cleanSt = stCode.trim();
        const cleanSs = ssCode.trim();

        console.log(`[OfficeManagement] Fetching data for tab: ${activeTab}`, {
            regionCode: cleanRegion,
            stCode: cleanSt,
            ssCode: cleanSs,
            ktbStatus
        });

        setLoading(true);
        setError(null);
        try {
            let result = [];
            switch (activeTab) {
                case 'regions':
                    result = await OfficeService.getRegions();
                    break;
                case 'st_by_region':
                    if (!cleanRegion) throw new Error('กรุณาระบุรหัสภูมิภาค');
                    result = await OfficeService.getSTOfficesByRegion(cleanRegion);
                    break;
                case 'ss_by_region':
                    if (!cleanRegion) throw new Error('กรุณาระบุรหัสภูมิภาค');
                    result = await OfficeService.getSSOfficesByRegion(cleanRegion);
                    break;
                case 'ss_by_st':
                    if (!cleanSt) throw new Error('กรุณาระบุรหัส สท.');
                    result = await OfficeService.getSSOfficesByST(cleanSt);
                    break;
                case 'ss_by_ktb':
                    result = await OfficeService.getSSOfficesByKTBStatus(ktbStatus);
                    break;
                default:
                    break;
            }
            setData(Array.isArray(result) ? result : (result ? [result] : []));
            setSearchTerm(''); // Reset search when new data is fetched
        } catch (err) {
            setError(err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'regions' || activeTab === 'ss_by_ktb') {
            fetchData();
        } else {
            setData([]);
        }
    }, [activeTab]);

    // Client-side filtering
    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        const lowSearch = searchTerm.toLowerCase();
        return Object.values(item).some(val =>
            String(val || '').toLowerCase().includes(lowSearch)
        );
    });

    const renderTable = () => {
        if (loading) return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <RefreshCw className="animate-spin me-2" />
                <span>กำลังโหลดข้อมูล...</span>
            </div>
        );

        if (error) return (
            <div className="alert alert-danger d-flex align-items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        );

        if (!data || data.length === 0) return (
            <div className="text-center p-5 text-muted bg-light rounded border border-dashed">
                <TableIcon size={48} className="mb-3 opacity-25" />
                <p>ไม่พบข้อมูล หรือยังไม่ได้ค้นหา</p>
            </div>
        );

        const keys = Object.keys(data[0]);

        return (
            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="card-header bg-white border-bottom p-3">
                    <div className="row align-items-center g-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <Search size={16} className="text-muted" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="ค้นหาในตาราง..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        className="btn btn-outline-secondary border-start-0"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <span className="badge bg-light text-dark fw-normal">
                                พบ {filteredData.length} จาก {data.length} รายการ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="bg-light">
                            <tr>
                                {keys.map(key => (
                                    <th key={key} className="px-4 py-3 text-nowrap">{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr key={idx}>
                                    {keys.map(key => (
                                        <td key={`${idx}-${key}`} className="px-4 py-3">
                                            {typeof item[key] === 'object' ? JSON.stringify(item[key]) : String(item[key] ?? '-')}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white text-muted small px-4 py-3">
                    แสดงทั้งหมด {filteredData.length} รายการ
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 bg-light min-vh-100 animate__animated animate__fadeIn">
            <div className="mb-4">
                <h1 className="h3 mb-2 fw-bold text-navy">จัดการข้อมูลสำนักงาน</h1>
                <p className="text-muted">ตรวจสอบและจัดการข้อมูลรหัสสำนักงานในระบบ</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded shadow-sm mb-4 p-2 d-flex flex-wrap gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 border-0 transition-all ${activeTab === tab.id
                            ? 'bg-navy text-white shadow'
                            : 'btn-light text-muted hover-bg-gray-100'
                            }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Filter Panel */}
            {activeTab !== 'regions' && (
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                        <div className="row g-3 align-items-end">
                            {(activeTab === 'st_by_region' || activeTab === 'ss_by_region') && (
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold text-muted">รหัสภูมิภาค (Region Code)</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="เช่น 01, 02..."
                                            value={regionCode}
                                            onChange={(e) => setRegionCode(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && fetchData()}
                                        />
                                        {regionCode && (
                                            <button className="btn btn-outline-secondary" onClick={() => setRegionCode('')}>&times;</button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'ss_by_st' && (
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold text-muted">รหัส สท. (ST Code)</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="เช่น 0101, 0202..."
                                            value={stCode}
                                            onChange={(e) => setStCode(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && fetchData()}
                                        />
                                        {stCode && (
                                            <button className="btn btn-outline-secondary" onClick={() => setStCode('')}>&times;</button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'ss_by_ktb' && (
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold text-muted">สถานะ KTB (Status)</label>
                                    <select
                                        className="form-select"
                                        value={ktbStatus}
                                        onChange={(e) => setKtbStatus(e.target.value)}
                                    >
                                        <option value="Y">ใช้งาน (Y)</option>
                                        <option value="N">ไม่ใช้งาน (N)</option>
                                    </select>
                                </div>
                            )}
                            <div className="col-md-auto">
                                <button
                                    className="btn bg-navy text-white px-4 d-flex align-items-center gap-2 shadow-sm"
                                    onClick={fetchData}
                                    disabled={loading}
                                >
                                    <Search size={18} />
                                    <span>ดึงข้อมูล</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Content */}
            {renderTable()}
        </div>
    );
};

export default OfficeManagement;
