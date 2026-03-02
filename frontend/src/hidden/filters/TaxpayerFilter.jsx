import { Search, Printer, RefreshCw, Filter, AlertCircle, TrendingUp, Users } from "lucide-react";
import { TAX_STATUS, TAX_STATUS_LABEL, FILING_CHANNEL, FILING_CHANNEL_LABEL } from "../../constants";

const TaxpayerFilter = ({ filters, onFilterChange, onReset, businessTypes = [], years = [] }) => {
    return (
        <div className="card shadow-sm border-0 mb-4 overflow-hidden">
            {/* 1. Primary Search Header */}
            <div className="bg-navy p-4">
                <div className="row align-items-center">
                    <div className="col-lg-8 mb-3 mb-lg-0">
                        <label className="form-label small fw-bold text-white-50 text-uppercase mb-2">ค้นหาข้อมูลหลัก (TAX ID / ชื่อ)</label>
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="input-group-text bg-white border-0 py-0 pe-1">
                                <Search size={22} className="text-secondary opacity-50" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 px-2"
                                placeholder="พิมพ์เลขประจำตัวผู้เสียภาษี 13 หลัก หรือ ชื่อผู้ประกอบการ..."
                                value={filters.search}
                                onChange={(e) => onFilterChange("search", e.target.value)}
                                style={{ fontSize: '1.05rem', fontWeight: '500' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-lg-end align-items-end flex-wrap gap-2">
                        <button className="btn btn-navy-light text-white border border-white border-opacity-25 px-3" onClick={() => window.print()}>
                            <Printer size={18} className="me-2" /> รายงาน
                        </button>
                        <button className="btn btn-light px-3" onClick={onReset}>
                            <RefreshCw size={18} className="me-2" /> ล้างค่ากรอง
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-body p-4 bg-light bg-opacity-50">
                {/* 2. Quick Action Tracker Row */}
                <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase mb-3 d-flex align-items-center gap-2">
                        <Filter size={14} /> Quick Tracker (ตัวช่วยติดตามด่วน)
                    </label>
                    <div className="d-flex flex-wrap gap-2">
                        {[
                            { id: 'รวบรวมทั้งหมด', label: 'รวบรวมทั้งหมด', icon: <Filter size={16} /> },
                            { id: 'overdue', label: 'ค้างยื่นแบบ (Overdue)', icon: <AlertCircle size={16} />, color: 'danger' },
                            { id: 'highIncome', label: 'รายได้ > 1 ล้าน (High Income)', icon: <TrendingUp size={16} />, color: 'warning text-dark' },
                            { id: 'multiShop', label: 'หลายกิจการ (Multi-Shop)', icon: <Users size={16} />, color: 'primary' },
                        ].map((q) => (
                            <button
                                key={q.id}
                                className={`btn d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 shadow-sm transition-all ${filters.quickFilter === q.id
                                    ? `btn-${q.color || 'navy'}`
                                    : 'btn-white text-dark border'
                                    }`}
                                onClick={() => onFilterChange("quickFilter", q.id)}
                            >
                                {q.icon} <span className="small fw-bold">{q.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="my-4 opacity-5" />

                {/* 3. Logical Filter Grid */}
                <div className="row g-4 align-items-end">
                    {/* Period Setting Group */}
                    <div className="col-xl-6">
                        <div className="p-3 rounded-4 border bg-white shadow-sm border-opacity-50">
                            <label className="form-label small fw-bold text-muted text-uppercase mb-2">กำหนดช่วงเวลาและประเภทแบบ</label>
                            <div className="row g-2">
                                <div className="col-md-3">
                                    <select
                                        className="form-select border-0 bg-light"
                                        value={filters.year}
                                        onChange={(e) => onFilterChange("year", e.target.value)}
                                    >
                                        <option value="ทั้งหมด">ปีภาษี...</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-5">
                                    <select
                                        className="form-select border-0 bg-light"
                                        value={filters.formType}
                                        onChange={(e) => {
                                            const type = e.target.value;
                                            onFilterChange("formType", type);
                                            // Reset period logic: Always reset to ensure data doesn't "disappear"
                                            onFilterChange("filingWindow", "ทั้งหมด");
                                            onFilterChange("month", "ทั้งหมด");
                                        }}
                                    >
                                        <option value="ทั้งหมด">เลือกประเภทแบบ...</option>
                                        <option value="90">ภ.ง.ด. 90 (บุคคลธรรมดา/รายปี)</option>
                                        <option value="91">ภ.ง.ด. 91 (เงินเดือน/รายปี)</option>
                                        <option value="94">ภ.ง.ด. 94 (กลางปี)</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select
                                        className="form-select border-0 bg-navy bg-opacity-10 fw-bold"
                                        disabled={filters.formType === "ทั้งหมด"}
                                        value={filters.formType === "91" ? filters.month : filters.filingWindow}
                                        onChange={(e) => {
                                            if (filters.formType === "91") onFilterChange("month", e.target.value);
                                            else onFilterChange("filingWindow", e.target.value);
                                        }}
                                    >
                                        <option value="ทั้งหมด">ทุกงวด/ช่วงเวลา</option>
                                        {filters.formType === "94" && <option value="ครึ่งปี">งวดกึ่งปี (ม.ค.-มิ.ย.)</option>}
                                        {(filters.formType === "90" || filters.formType === "91") && <option value="ปีภาษี">งวดรายปี (ม.ค.-ธ.ค.)</option>}
                                        {filters.formType === "91" && ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="col-xl-6">
                        <div className="row g-3">
                            <div className="col-md-5">
                                <label className="form-label small fw-bold text-muted text-uppercase">กลุ่มธุรกิจ (ดึงจากข้อมูลจริง)</label>
                                <select
                                    className="form-select border-0 bg-white shadow-sm border"
                                    value={filters.businessType}
                                    onChange={(e) => onFilterChange("businessType", e.target.value)}
                                >
                                    <option value="ทั้งหมด">ทั้งหมดทุกประเภท</option>
                                    {businessTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-7">
                                <label className="form-label small fw-bold text-muted text-uppercase">สถานะการยื่น (หลัก)</label>
                                <div className="d-flex gap-2">
                                    {[
                                        { label: "ทั้งหมด", value: "ทั้งหมด", color: "secondary" },
                                        { label: TAX_STATUS_LABEL.completed, value: TAX_STATUS.COMPLETED, color: "success" },
                                        { label: TAX_STATUS_LABEL.notFiled, value: TAX_STATUS.NOT_FILED, color: "danger" },
                                    ].map((s) => (
                                        <button
                                            key={s.value}
                                            className={`btn btn-sm px-3 rounded-pill transition-all ${filters.status === s.value ? `btn-${s.color}` : `btn-outline-${s.color}`}`}
                                            onClick={() => onFilterChange("status", s.value)}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxpayerFilter;
