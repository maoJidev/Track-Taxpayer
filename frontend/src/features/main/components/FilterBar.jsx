import React from 'react';
import { Search, Filter, ArrowUpDown, AlertCircle, TrendingUp, Users } from 'lucide-react';

const FilterBar = ({
    searchQuery,
    onSearchChange,
    pageSize,
    onPageSizeChange,
    sortBy,
    onSortChange,
    filterRisk,
    onRiskFilterChange,
    quickFilter,
    onQuickFilterChange,
    year,
    onYearChange,
    placeholder = "ค้นหาชื่อ หรือ เลขบัตร...",
    children
}) => {
    const years = ['68', '67', '66', '65', '64'];

    const quickTrackers = [
        { id: 'all', label: 'รวบรวมทั้งหมด', icon: <Filter size={16} /> },
        { id: 'overdue', label: 'ค้างยื่นแบบ', icon: <AlertCircle size={16} />, color: 'danger' },
        { id: 'highIncome', label: 'รายได้ > 1 ล้าน', icon: <TrendingUp size={16} />, color: 'warning text-dark' },
        { id: 'multiShop', label: 'หลายกิจการ', icon: <Users size={16} />, color: 'primary' },
    ];

    return (
        <div className="card border-0 shadow-sm mb-4 overflow-hidden">
            {/* Quick Tracker Row */}
            <div className="bg-light bg-opacity-50 border-bottom p-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="small fw-bold text-muted text-uppercase d-flex align-items-center gap-2">
                        <Filter size={14} /> Quick Tracker:
                    </span>
                    <div className="d-flex flex-wrap gap-2">
                        {quickTrackers.map((q) => (
                            <button
                                key={q.id}
                                className={`btn btn-sm d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border shadow-sm transition-all ${quickFilter === q.id
                                    ? (q.id === 'all' ? 'btn-navy text-white' : `btn-${q.color || 'navy'}`)
                                    : 'btn-white text-dark'
                                    }`}
                                onClick={() => onQuickFilterChange(q.id)}
                            >
                                {q.icon} <span className="small fw-bold">{q.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-body p-3">
                <div className="row g-3">
                    {/* Primary Search */}
                    <div className="col-lg-4">
                        <label className="small fw-bold text-secondary mb-1">ค้นหา</label>
                        <div className="input-group input-group-sm mb-0">
                            <span className="input-group-text bg-white border-end-0">
                                <Search size={16} className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-1"
                                placeholder={placeholder}
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Year Selection */}
                    <div className="col-lg-2">
                        <label className="small fw-bold text-secondary mb-1">ปีภาษี</label>
                        <select
                            className="form-select form-select-sm"
                            value={year}
                            onChange={(e) => onYearChange(e.target.value)}
                        >
                            {years.map(y => (
                                <option key={y} value={y}>25{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sorting */}
                    <div className="col-lg-3 col-md-6">
                        <label className="small fw-bold text-secondary mb-1">จัดเรียง</label>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text bg-white border-end-0">
                                <ArrowUpDown size={16} className="text-muted" />
                            </span>
                            <select
                                className="form-select border-start-0 ps-1"
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                            >
                                <option value="none">ค่าเริ่มต้น</option>
                                <option value="income_desc">รายได้มากไปน้อย</option>
                                <option value="income_asc">รายได้น้อยไปมาก</option>
                                <option value="name_asc">ชื่อ ก-ฮ</option>
                                <option value="name_desc">ชื่อ ฮ-ก</option>
                            </select>
                        </div>
                    </div>

                    {/* Risk Filter */}
                    <div className="col-lg-2 col-md-3">
                        <label className="small fw-bold text-secondary mb-1">กลุ่มเป้าหมาย</label>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text bg-white border-end-0">
                                <Filter size={16} className="text-muted" />
                            </span>
                            <select
                                className="form-select border-start-0 ps-1"
                                value={filterRisk}
                                onChange={(e) => onRiskFilterChange(e.target.value)}
                            >
                                <option value="all">ทั้งหมด</option>
                                <option value="at_risk">กลุ่มเสี่ยง (พบทุกประเภท)</option>
                                <option value="normal">กลุ่มปกติ (ไม่พบเสี่ยง)</option>
                                <option disabled>────────</option>
                                <option value="income_less">เงินได้ลดลง</option>
                                <option value="tax_less">ภาษีลดลง</option>
                                <option value="no_sent_90">ไม่ยื่นแบบ ภ.ง.ด. 90/94</option>
                                <option value="spouse_income">คู่สมรสมีรายได้</option>
                                <option value="has_pnd94">ยื่น ภ.ง.ด. 94</option>
                            </select>
                        </div>
                    </div>

                    {/* Page Size */}
                    <div className="col-lg-2 col-md-3">
                        <label className="small fw-bold text-secondary mb-1">แถวต่อหน้า</label>
                        <select
                            className="form-select form-select-sm"
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                        >
                            <option value={10}>10 รายการ</option>
                            <option value={20}>20 รายการ</option>
                            <option value={50}>50 รายการ</option>
                            <option value={100}>100 รายการ</option>
                        </select>
                    </div>

                    {children && (
                        <div className="col-12 border-top mt-3 pt-2">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
