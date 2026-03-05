import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UnifiedService as TaxpayerService } from '../../features/main/services/unifiedService';
import { decodeParam } from '../../features/main/utils/urlUtils';
import { toThaiYear } from '../../features/main/utils/commonMapper';
import {
    User, MapPin, FileText, ChevronLeft, Printer, AlertCircle,
    Bookmark, ExternalLink, RefreshCw, TrendingUp, TrendingDown,
    Minus, Briefcase, Users, LayoutGrid, Activity, Zap
} from 'lucide-react';
import RiskAssessment from '../../features/taxpayer/components/RiskAssessment';
import TaxpayerNotFound from '../../features/main/components/TaxpayerNotFound';

const TaxpayerDetail94 = () => {
    const { taxId: taxIdParam, dln: dlnParam, year: yearParamUrl } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // Decode parameters from URL
    const taxId = decodeParam(taxIdParam);
    const dln = decodeParam(dlnParam);

    // Safety check for year: must be 2-4 digits, else fallback to '67'
    let year = yearParamUrl || "67";
    if (year && (year.length > 4 || isNaN(parseInt(year)) || year === '7992')) {
        console.warn(`[Detail94] Invalid year provided in URL: ${year}. Falling back to default '67'.`);
        year = '67';
    }

    // Dynamic Compare Year State (Default: Year - 1)
    const [compareYear, setCompareYear] = useState(null);

    // Helper for currency
    const formatCurrency = (val) => {
        return (val || 0).toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    useEffect(() => {
        console.log(`[Detail94] Year changed to ${year}. Resetting compareYear to null.`);
        setCompareYear(null);
    }, [year]);

    useEffect(() => {
        console.log(`[Detail94] Refreshing data for compareYear: ${compareYear}`);
        loadData();
    }, [taxId, dln, year, compareYear]);

    const loadData = async (force = false) => {
        if (!taxId || taxId === '-') {
            setError("ไม่พบรหัสผู้เสียภาษี (Tax ID)");
            setLoading(false);
            return;
        }

        console.log(`[Detail94] Loading data for Tax ID: ${taxId}, Year: ${year}, CompareYear: ${compareYear}`);
        setLoading(true);
        setError(null);
        try {
            const basicItem = { taxId, dln };
            const enriched = await TaxpayerService.getUnifiedProfile(basicItem, force, year, compareYear, '94');
            console.log(`[Detail94] Successfully loaded data for years: ${enriched.standard?.year} vs ${enriched.risks?.compareYear}`);
            setData(enriched);

            if (!compareYear && enriched.risks?.compareYear) {
                setCompareYear(enriched.risks.compareYear);
            }
        } catch (err) {
            console.error("Load 94 Detail Error:", err);
            setError(err.message || "ไม่สามารถดึงข้อมูลรายละเอียดได้ในขณะนี้");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-navy font-sarabun">
            <div className="spinner-border me-3" role="status"></div>
            <strong>กำลังโหลดข้อมูลรายละเอียดผู้เสียภาษี...</strong>
        </div>
    );

    if (error) return (
        <TaxpayerNotFound
            taxId={taxId}
            error={error}
            onRetry={loadData}
        />
    );

    if (!data) return null;

    const standard = data.standard || {};
    const fin = standard.financials || {};

    // --- เปรียบเทียบภาษีที่ชำระ ปีปัจจุบัน vs ปีก่อน ---
    const currentTaxPaid = fin.taxPayable || 0;
    const prevTaxPaid = standard.comparison?.taxPayable || 0;
    const taxDiff = currentTaxPaid - prevTaxPaid;
    const taxPctChange = prevTaxPaid > 0
        ? Math.max(-100, Math.min(100, (taxDiff / prevTaxPaid) * 100)).toFixed(2)
        : (currentTaxPaid > 0 ? "100.00" : "0.00");
    const taxIsUp = parseFloat(taxPctChange) > 0;
    const taxIsDown = parseFloat(taxPctChange) < 0;

    return (
        <div className="container-fluid bg-light min-vh-100 py-4 px-4 font-sarabun">
            {/* Action Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-white shadow-sm border-0 px-3 py-2 text-navy fw-bold d-flex align-items-center"
                >
                    <ChevronLeft size={20} className="me-1" />
                    ย้อนกลับ
                </button>
                <div className="d-flex gap-2">
                    <button
                        onClick={() => loadData(true)}
                        className="btn btn-white text-navy border shadow-sm px-3 d-flex align-items-center"
                        disabled={loading}
                    >
                        <RefreshCw size={18} className={`me-2 ${loading ? 'spin' : ''}`} />
                        รีเฟรชข้อมูล
                    </button>
                    <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`btn ${isFollowing ? 'btn-navy' : 'btn-white text-navy'} border shadow-sm px-3 d-flex align-items-center`}
                    >
                        <Bookmark size={18} className={`me-2 ${isFollowing ? 'fill-current' : ''}`} />
                        {isFollowing ? 'ติดตามแล้ว' : 'ติดตาม'}
                    </button>
                    <button className="btn btn-white text-navy border shadow-sm px-3 d-flex align-items-center">
                        <Printer size={18} className="me-2" />
                        พิมพ์แบบ
                    </button>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="mx-auto bg-white shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: '1100px', borderTop: '5px solid #000047' }}>

                {/* 1. Header Hero Section */}
                <div className="p-5 bg-navy text-white">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-2 mb-2 opacity-75">
                                <span className="badge bg-white text-navy px-2 py-1">{standard.formCode || 'ภ.ง.ด. 94'}</span>
                                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)' }}>ครึ่งปี (ม.ค.–มิ.ย.)</span>
                                <small className="fw-bold">ปีภาษี {toThaiYear(standard.year || year)}</small>
                            </div>
                            <h1 className="display-6 fw-bold mb-1">{standard.name}</h1>
                            <div className="d-flex flex-wrap align-items-center gap-3 opacity-75 fs-5">
                                <span className="d-flex align-items-center"><Activity size={18} className="me-2" /> {data.taxId}</span>
                                {data.branch && (
                                    <>
                                        <span className="vr"></span>
                                        <span>สาขา: {data.branch}</span>
                                    </>
                                )}
                                <span className="vr"></span>
                                <div className="d-flex align-items-center gap-2">
                                    <span className={`badge ${data.filedAllYears ? 'bg-success' : 'bg-warning'} text-white`}>
                                        {data.filedAllYears ? 'ยื่นครบทุกปี' : `ยื่นแล้ว ${data.filedYearsCount || 0} ปี`}
                                    </span>
                                    {data.risks?.sent94not90 && (
                                        <span className="badge bg-danger">ยื่น 94 ไม่มี 90</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="row g-5">

                        {/* LEFT COLUMN */}
                        <div className="col-lg-7">

                            {/* Personal Info */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <User size={20} className="me-2" /> ข้อมูลรายละเอียดผู้เสียภาษี
                                </h5>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="small text-secondary fw-bold mb-1">ชื่อ - นามสกุล</label>
                                        <div className="p-2 bg-light rounded text-dark border-start border-3 border-navy">{standard.name}</div>
                                    </div>
                                    <div className="col-sm-2">
                                        <label className="small text-secondary fw-bold mb-1">กลุ่ม PND</label>
                                        <div className="p-2 bg-light rounded text-dark text-center">{data.pndGroup || '-'}</div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label className="small text-secondary fw-bold mb-1">เลขประจำตัวผู้เสียภาษี (TIN)</label>
                                        <div className="p-2 bg-light rounded text-dark font-monospace">{data.tin || '-'}</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="small text-secondary fw-bold mb-1">เพศ</label>
                                        <div className="p-2 bg-light rounded text-dark">{standard.labels?.sex || '-'}</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="small text-secondary fw-bold mb-1">สถานะการยื่น</label>
                                        <div className="p-2 bg-light rounded text-dark">{standard.labels?.filingStatus || '-'}</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="small text-secondary fw-bold mb-1">เลขที่ใบเสร็จ (Rec. No)</label>
                                        <div className="p-2 bg-light rounded text-dark">{data.recNo || '-'}</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="small text-secondary fw-bold mb-1">สถานภาพสมรส</label>
                                        <div className="p-2 bg-light rounded text-dark">{standard.labels?.marital || '-'}</div>
                                    </div>
                                </div>
                            </section>

                            {/* Team & Area Info */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <Users size={20} className="me-2" /> ข้อมูลทีมตรวจสอบและพื้นที่
                                </h5>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="small text-secondary fw-bold mb-1">ทีม (Team)</label>
                                        <div className="p-2 bg-light rounded text-dark border-start border-3 border-info">{data.ops?.team || 'ไม่ระบุทีม'}</div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="small text-secondary fw-bold mb-1">ทีมย่อย (Sub Team)</label>
                                        <div className="p-2 bg-light rounded text-dark">{data.ops?.subteam || 'ไม่ระบุทีมย่อย'}</div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                                            <div className="text-secondary small fw-bold">ภาค (Region)</div>
                                            <div className="fw-bold">{data.ops?.regionName || data.ops?.regionCode || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                                            <div className="text-secondary small fw-bold">พื้นที่ (ST)</div>
                                            <div className="fw-bold">{data.ops?.stName || data.ops?.stCode || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="p-2 bg-light bg-opacity-50 rounded text-center">
                                            <div className="text-secondary small fw-bold">สาขา (SS)</div>
                                            <div className="fw-bold">{data.ops?.ssName || data.ops?.ssCode || '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Business & ISIC Info */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <Briefcase size={20} className="me-2" /> ข้อมูลกิจการและสถานประกอบการ (ISIC)
                                </h5>
                                <div className="card border-0 bg-light rounded-3 p-4 shadow-sm border-top border-5 border-info">
                                    <div className="row g-4">
                                        <div className="col-md-7">
                                            <span className="text-secondary small d-block mb-1">ชื่อร้านค้า / สถานประกอบการ</span>
                                            <span className="fw-bold fs-5 text-navy">{data.business?.shopName || '-'}</span>
                                        </div>
                                        <div className="col-md-5 text-md-end">
                                            <span className="text-secondary small d-block mb-1">สถานะ VAT</span>
                                            <span className={`badge ${data.business?.vatStatus ? 'bg-info' : 'bg-secondary'}`}>
                                                {data.business?.vatStatus || 'ไม่ได้จดทะเบียน'}
                                            </span>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="text-secondary small d-block mb-1">ประเภทธุรกิจ (ISIC)</span>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="badge bg-navy">{data.business?.isicCode}</span>
                                                <span className="fw-bold">{data.business?.isicName || data.business?.type || '-'}</span>
                                            </div>
                                        </div>
                                        {data.business?.shopAddress && (
                                            <div className="col-md-12">
                                                <span className="text-secondary small d-block mb-1">ที่อยู่สถานประกอบการ</span>
                                                <div className="p-2 bg-white rounded border">{data.business?.shopAddress}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Address Info */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <MapPin size={20} className="me-2" /> ข้อมูลทั่วไปและสถานที่ติดต่อ
                                </h5>
                                <div className="card border-0 bg-light rounded-3 p-4">
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <span className="text-secondary small d-block mb-1">ประเภทการยื่น</span>
                                            <span className="fw-bold">{standard.labels?.submissionType || '-'}</span>
                                        </div>
                                        <div className="col-sm-3">
                                            <span className="text-secondary small d-block mb-1">สถานะการยื่น</span>
                                            <span className="fw-bold">{standard.labels?.submissionStatus || '-'}</span>
                                        </div>
                                        <div className="col-sm-3 text-sm-end">
                                            <span className="text-secondary small d-block mb-1">วันที่ยื่นแบบ</span>
                                            <span className="fw-bold">{standard.effDate || '-'}</span>
                                        </div>
                                        <div className="col-12 mt-3 pt-3 border-top">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-secondary small">ที่อยู่ปัจจุบัน</span>
                                                {standard.address && standard.address !== '-' && (
                                                    <a
                                                        href={data.latLong ? `https://www.google.com/maps?q=${data.latLong}` : `https://www.google.com/maps?q=${encodeURIComponent(standard.address)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary small text-decoration-none d-flex align-items-center"
                                                    >
                                                        ดูบนแผนที่ <ExternalLink size={12} className="ms-1" />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="bg-white p-3 rounded border text-dark shadow-sm">
                                                {standard.address || 'ไม่พบข้อมูลที่อยู่'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Spouse Info */}
                            {standard.spouse && (
                                <section>
                                    <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                        <User size={20} className="me-2" /> ข้อมูลรายละเอียดคู่สมรส
                                    </h5>
                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <label className="small text-secondary fw-bold mb-1">ชื่อ - นามสกุล (คู่สมรส)</label>
                                            <div className="p-2 bg-light rounded text-dark border-start border-navy border-3">{standard.spouse.name}</div>
                                        </div>
                                        <div className="col-sm-12">
                                            <label className="small text-secondary fw-bold mb-1">เลขประจำตัวผู้เสียภาษี (คู่สมรส)</label>
                                            <div className="p-2 bg-light rounded text-dark font-monospace">{standard.spouse.nid}</div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-lg-5">

                            {/* Risk Assessment */}
                            <section className="mb-5">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="text-navy fw-bold mb-0 d-flex align-items-center">
                                        <AlertCircle size={20} className="me-2" /> การวิเคราะห์ความเสี่ยง
                                    </h5>
                                    {/* Compare Year Selector */}
                                    <div className="d-flex align-items-center bg-white border rounded-pill px-3 py-1 shadow-sm">
                                        <span className="small text-secondary me-2 fw-bold">เทียบกับปี:</span>
                                        <select
                                            className="form-select form-select-sm border-0 py-0 fw-bold text-primary"
                                            style={{ width: 'auto', boxShadow: 'none', cursor: 'pointer' }}
                                            value={compareYear}
                                            onChange={(e) => setCompareYear(e.target.value)}
                                            disabled={loading}
                                        >
                                            {[1, 2, 3].map(diff => {
                                                const y = parseInt(standard.year || year || "67") - diff;
                                                return <option key={y} value={String(y)}>{toThaiYear(y)}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <RiskAssessment
                                    risks={data.risks}
                                    formCode="ภ.ง.ด. 94"
                                    year={standard.year || year}
                                    compareYear={compareYear}
                                />
                            </section>

                            {/* Filing History Table */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <LayoutGrid size={20} className="me-2" /> ประวัติการยื่นแบบรายปี
                                </h5>
                                <div className="table-responsive rounded-3 border bg-white shadow-sm">
                                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.8rem' }}>
                                        <thead className="bg-navy text-white">
                                            <tr>
                                                <th className="py-2 px-2 text-center" style={{ width: '80px' }}>ปีภาษี</th>
                                                <th className="py-2 px-2 text-end">เงินได้</th>
                                                <th className="py-2 px-2 text-end">ค่าลดหย่อน</th>
                                                <th className="py-2 px-2 text-end">ภาษีที่ชำระ</th>
                                                <th className="py-2 px-2 text-center" style={{ width: '120px' }}>สถานะ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(data.history || {}).sort((a, b) => b - a).map(yr => {
                                                const record = data.history[yr];
                                                return (
                                                    <tr key={yr}>
                                                        <td className="px-2 py-2 text-center fw-bold">{record.year}</td>
                                                        <td className="px-2 py-2 text-end font-monospace">{formatCurrency(record.income)}</td>
                                                        <td className="px-2 py-2 text-end font-monospace text-secondary">{formatCurrency(record.allowance)}</td>
                                                        <td className="px-2 py-2 text-end font-monospace text-navy fw-bold">{formatCurrency(record.tax)}</td>
                                                        <td className="px-2 py-2 text-center">
                                                            <span className={`badge ${record.income > 0 ? 'bg-success bg-opacity-10 text-success border border-success' : 'bg-light text-muted border'} w-100`}>
                                                                {record.income > 0 ? 'ยื่นแบบแล้ว' : 'ไม่พบข้อมูล'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {Object.keys(data.history || {}).length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-4 text-muted fst-italic">ไม่พบประวัติการยื่นแบบย้อนหลัง</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Tax Comparison Table */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <FileText size={20} className="me-2" /> เปรียบเทียบภาษีที่ชำระ (เทียบปีก่อนหน้า)
                                </h5>
                                <div className="table-responsive rounded-3 border bg-white overflow-hidden shadow-sm">
                                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="py-2 px-3 text-secondary small border-0">รายการ</th>
                                                <th className="py-2 px-3 text-end text-secondary small border-0 text-nowrap">ปี {toThaiYear(compareYear)}</th>
                                                <th className="py-2 px-3 text-end text-secondary small border-0 text-nowrap">ปี {toThaiYear(year)}</th>
                                                <th className="py-2 px-3 text-center text-secondary small border-0">เปลี่ยนแปลง</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="px-3 py-2 border-0 fw-bold text-navy">ภาษีที่ชำระรวม</td>
                                                <td className="px-3 py-2 text-end text-secondary font-monospace border-0">{formatCurrency(prevTaxPaid)}</td>
                                                <td className="px-3 py-2 text-end fw-bold text-dark font-monospace border-0">{formatCurrency(currentTaxPaid)}</td>
                                                <td className="px-3 py-2 text-center border-0">
                                                    {(currentTaxPaid > 0 || prevTaxPaid > 0) ? (
                                                        <div className={`d-flex align-items-center justify-content-center gap-1 fw-bold ${taxIsUp ? 'text-success' : taxIsDown ? 'text-danger' : 'text-warning'}`}>
                                                            {taxIsUp && <TrendingUp size={14} />}
                                                            {taxIsDown && <TrendingDown size={14} />}
                                                            {!taxIsUp && !taxIsDown && <Minus size={14} />}
                                                            <span>{taxIsUp ? '+' : taxIsDown ? '-' : ''}{Math.abs(taxPctChange)}%</span>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-2 border-0 text-muted small">เงินได้สุทธิ</td>
                                                <td className="px-3 py-2 text-end text-secondary font-monospace border-0 small">
                                                    {formatCurrency(standard.comparison?.netIncome || 0)}
                                                </td>
                                                <td className="px-3 py-2 text-end text-dark font-monospace border-0 small">
                                                    {formatCurrency(fin.netIncome || 0)}
                                                </td>
                                                <td className="px-3 py-2 text-center border-0">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Financial Summary — PND 94 Specific */}
                            <section>
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <FileText size={20} className="me-2" /> รายละเอียดภาษี (แบบ ภ.ง.ด. 94)
                                </h5>
                                <div className="card border-0 shadow-sm p-4 bg-navy text-white rounded-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="opacity-75">เงินได้รวมพึงประเมิน</span>
                                        <span className="fw-bold">{formatCurrency(fin.totalIncome)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="opacity-75">ค่าลดหย่อนรวม</span>
                                        <span className="text-danger fw-bold">(-) {formatCurrency(fin.totalAllowance)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 pt-2 border-top border-white border-opacity-25 fw-bold">
                                        <span className="opacity-75">เงินได้สุทธิ</span>
                                        <span className="text-warning">{formatCurrency(fin.netIncome)}</span>
                                    </div>

                                    <div className="hr my-3 border-white border-opacity-10"></div>

                                    <div className="d-flex justify-content-between mb-2 opacity-75 small">
                                        <span>ภาษีคำนวณได้</span>
                                        <span>{formatCurrency(fin.netTax)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 opacity-75 small">
                                        <span>ภาษีหัก ณ ที่จ่าย (WHT)</span>
                                        <span>{formatCurrency(fin.whtAmount || 0)}</span>
                                    </div>

                                    {/* PND 94 Special Tax — Badge highlight */}
                                    {fin.taxSpec !== undefined && fin.taxSpec !== null && (
                                        <div className="d-flex justify-content-between mb-2 opacity-90 small">
                                            <span className="d-flex align-items-center gap-1">
                                                <Zap size={12} className="text-warning" />
                                                <span>ภาษีเงินได้พิเศษ</span>
                                            </span>
                                            <span className="fw-bold text-warning">{formatCurrency(fin.taxSpec)}</span>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between mb-2 opacity-75 small">
                                        <span>เงินเพิ่ม (Surcharge)</span>
                                        <span>{formatCurrency(fin.surcharge)}</span>
                                    </div>
                                    {fin.penCrimAmt > 0 && (
                                        <div className="d-flex justify-content-between mb-2 opacity-75 small">
                                            <span>ค่าปรับทางอาญา</span>
                                            <span className="text-danger">{formatCurrency(fin.penCrimAmt)}</span>
                                        </div>
                                    )}

                                    <div className="p-3 bg-white bg-opacity-10 rounded-3 text-center border border-white border-opacity-10 mt-3">
                                        <div className="small fw-bold text-white-50 text-uppercase mb-1">ภาษีสุทธิที่ต้องชำระเพิ่ม</div>
                                        <div className="display-6 fw-bold text-white">
                                            {formatCurrency(fin.taxPayable || 0)}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-light text-center border-top">
                    <div className="d-flex justify-content-center gap-4 mb-2">
                        {data.remark && <span className="small text-navy fw-bold"><AlertCircle size={14} className="me-1" /> หมายเหตุ: {data.remark}</span>}
                        {data.spProject && <span className="small text-info fw-bold"><Bookmark size={14} className="me-1" /> โครงการพิเศษ: {data.spProject}</span>}
                    </div>
                    <p className="text-secondary mb-0 small italic mx-auto" style={{ maxWidth: '600px' }}>
                        ข้อมูลนี้ดึงจากระบบฐานข้อมูลอัตภาพแบบเรียลไทม์ ปรับปรุงล่าสุดอัตโนมัติ
                        (รหัสลำดับที่: {data.recNo})
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaxpayerDetail94;
