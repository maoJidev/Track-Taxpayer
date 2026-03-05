import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { encodeParam } from '../../features/main/utils/urlUtils';
import { useTaxpayer91List } from '../../features/taxpayer/pnd91/hooks/useTaxpayer91List';
import { useAuth } from '../../features/auth/contexts/AuthContext';
import FilterBar from '../../features/main/components/FilterBar';
import Pagination from '../../features/main/components/Pagination';
import SkeletonRow from '../../features/main/components/SkeletonRow';
import CurrencyText from '../../features/main/components/CurrencyText';
import RiskBadges from '../../features/main/components/RiskBadges';
import OfficeSelector from '../../features/main/components/OfficeSelector';
import { RefreshCw, ChevronRight, FileText, Search } from 'lucide-react';

const TaxpayerList91 = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const {
        data,
        loading,
        error,
        enrichingMap,
        totalPages,
        totalElements,
        filters,
        setPage,
        setSearchQuery,
        setPageSize,
        setSortBy,
        setRiskFilter,
        setRegionCode,
        setStCode,
        setSsCode,
        handleRefresh,
        handleEnrich
    } = useTaxpayer91List('taxpayer_list_91_state', user?.offices);

    const { searchQuery, page, pageSize, sortBy, filterRisk, year, regionCode, stCode, ssCode } = filters;

    // Handle office selection change
    const handleOfficeChange = (offices) => {
        console.log('[TaxpayerList91] Office selection changed:', offices);
        setOffices(offices);
    };

    const currentOffices = useMemo(() => ({
        regionCode,
        stCode,
        ssCode
    }), [regionCode, stCode, ssCode]);

    const shouldShowOfficeSelector = !!user;

    const handleRowClick = (item) => {
        const taxId = item.taxId;
        const dln = item.dln || '-';
        if (taxId) {
            navigate(`/taxpayers/pnd91/detail/${encodeParam(taxId)}/${encodeParam(dln)}/${year || '67'}`);
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 py-4 px-4 font-sarabun">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="text-navy fw-bold mb-1">รายชื่อผู้เสียภาษี (ภ.ง.ด. 91)</h3>
                    <p className="text-secondary mb-0 small">การแสดงผลกลุ่มผู้เสียภาษีรายได้ประเภทเงินเดือน (40(1))</p>
                </div>
                <div>
                    <button onClick={handleRefresh} className="btn btn-navy shadow-sm d-flex align-items-center" disabled={loading}>
                        <RefreshCw size={18} className={`me-2 ${loading ? 'spin' : ''}`} />
                        รีเฟรช
                    </button>
                </div>
            </div>

            {/* Office Selector */}
            {shouldShowOfficeSelector && (
                <OfficeSelector
                    userRole={user?.role}
                    userOffices={user?.offices}
                    currentOffices={currentOffices}
                    onOfficeChange={handleOfficeChange}
                    disabled={loading}
                />
            )}

            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterRisk={filterRisk}
                onRiskFilterChange={setRiskFilter}
            />

            <div className="bg-white rounded-4 shadow-sm overflow-hidden border mb-5">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light bg-opacity-50">
                            <tr>
                                <th className="py-4 px-4 text-secondary small fw-bold text-center" style={{ width: '70px' }}>#</th>
                                <th className="py-4 px-4 text-dark fw-bold">ชื่อ - นามสกุล ผู้เสียภาษี</th>
                                <th className="py-4 px-4 text-secondary fw-medium" style={{ width: '180px' }}>เลขประจำตัวประชาชน</th>
                                <th className="py-4 px-3 text-center text-secondary small" style={{ width: '100px' }}>ปีที่ยื่น</th>
                                <th className="py-4 px-4 text-end text-secondary small" style={{ width: '140px' }}>ภาษีรวมทุกปี</th>
                                <th className="py-4 px-4 text-end text-navy fw-bold" style={{ width: '180px' }}>เงินได้ (ปี {year})</th>
                                <th className="py-4 px-3 text-center text-muted small" style={{ width: '120px' }}>ความเสี่ยง</th>
                                <th className="py-4 px-4 text-center" style={{ width: '50px' }}></th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {loading && data.length === 0 ? (
                                Array(pageSize > 10 ? 10 : pageSize).fill(0).map((_, i) => (
                                    <SkeletonRow key={i} columns={8} columnWidths={['30px', '250px', '150px', '120px', '80px', '', '100px', '50px']} />
                                ))
                            ) : error ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5">
                                        <div className="d-inline-block p-4 bg-danger bg-opacity-10 rounded-4 border border-danger border-opacity-25" style={{ maxWidth: '400px' }}>
                                            <AlertCircle size={40} className="text-danger mb-3 mx-auto d-block" />
                                            <h6 className="fw-bold text-dark">ไม่สามารถโหลดข้อมูลได้</h6>
                                            <p className="small text-secondary mb-3">{error}</p>
                                            <button className="btn btn-danger btn-sm px-4 d-inline-flex align-items-center mx-auto shadow-sm" onClick={handleRefresh}>
                                                <RefreshCw size={14} className="me-2" />
                                                ลองใหม่อีกครั้ง
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (!regionCode && !stCode && !ssCode) ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5">
                                        <div className="py-4">
                                            <div className="mb-3">
                                                <span className="material-symbols-outlined text-primary opacity-25" style={{ fontSize: '64px' }}>domain</span>
                                            </div>
                                            <h5 className="text-navy fw-bold mb-2">กรุณาเลือกสำนักงานสรรพากรก่อนค้นหา</h5>
                                            <p className="text-muted small mb-0">โปรดเลือก <b>ภาค</b> หรือ <b>พื้นที่</b> เพื่อระบุขอบเขตในการเรียกข้อมูล</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (regionCode && !stCode) ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5">
                                        <div className="py-4">
                                            <div className="mb-3">
                                                <span className="material-symbols-outlined text-warning opacity-25" style={{ fontSize: '64px' }}>location_on</span>
                                            </div>
                                            <h5 className="text-navy fw-bold mb-2">โปรดใส่ข้อมูล สำนักงานสรรพากรพื้นที่ (ST)</h5>
                                            <p className="text-muted small mb-0">กรุณาเลือกสำนักงานพื้นที่เพื่อระบุขอบเขตข้อมูล</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (stCode && !ssCode) ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5">
                                        <div className="py-4">
                                            <div className="mb-3">
                                                <span className="material-symbols-outlined text-warning opacity-25" style={{ fontSize: '64px' }}>storefront</span>
                                            </div>
                                            <h5 className="text-navy fw-bold mb-2">โปรดใส่ข้อมูล สำนักงานสรรพากรพื้นที่สาขา (SS)</h5>
                                            <p className="text-muted small mb-0">กรุณาเลือกสำนักงานสรรพากรพื้นที่สาขาเพื่อแสดงรายการ</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted small">
                                        <Search size={32} className="mb-3 opacity-25" />
                                        <p className="mb-0">ไม่พบข้อมูลที่ต้องการค้นหา</p>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr key={`${item.taxId}-${item.dln}`} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                                        <td className="px-4 text-secondary small text-center">{(page * pageSize) + index + 1}</td>
                                        <td className="px-4">
                                            <div className="fw-bold text-dark">{item.name}</div>
                                            <div className="text-muted small d-lg-none">{item.taxId}</div>
                                        </td>
                                        <td className="px-4 font-monospace text-secondary small">{item.taxId}</td>
                                        <td className="px-3 text-center">
                                            <span className={`badge ${item.filedAllYears ? 'bg-success' : 'bg-light text-dark border'} rounded-pill px-3`}>
                                                {item.filedYearsCount || 0} ปี
                                            </span>
                                        </td>
                                        <td className="px-4 text-end text-secondary small">
                                            <CurrencyText value={item.totalTaxAllYears} />
                                        </td>
                                        <td className="px-4 text-end">
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="text-secondary mb-1" style={{ fontSize: '11px' }}>ภ.ง.ด. 91</div>
                                                <div className="text-navy fw-bold">
                                                    {(item.totalIncome && item.totalIncome > 0) ? (
                                                        <CurrencyText value={item.totalIncome} />
                                                    ) : (
                                                        <span className="text-danger small">ไม่ได้ยื่น</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 text-center">
                                            <RiskBadges
                                                risks={item.risks}
                                                isEnriched={item.isEnriched}
                                                enriching={enrichingMap[item.taxId]}
                                                onEnrich={(e) => { e.stopPropagation(); handleEnrich(item.taxId, item.dln); }}
                                                compact={true}
                                            />
                                        </td>
                                        <td className="px-4 text-center text-muted py-3"><ChevronRight size={16} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                page={page}
                pageSize={pageSize}
                totalElements={totalElements}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
            />
        </div>
    );
};

export default TaxpayerList91;
