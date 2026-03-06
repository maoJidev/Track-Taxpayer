import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UnifiedService as TaxpayerService } from '../../features/main/services/unifiedService';
import { decodeParam } from '../../features/main/utils/urlUtils';
import { toThaiYear } from '../../features/main/utils/commonMapper';
import { User, MapPin, FileText, ChevronLeft, Printer, AlertCircle, Bookmark, ExternalLink, RefreshCw, TrendingUp, TrendingDown, Minus, Briefcase, Users, LayoutGrid, Activity } from 'lucide-react';
import RiskAssessment from '../../features/taxpayer/components/RiskAssessment';
import TaxpayerNotFound from '../../features/main/components/TaxpayerNotFound';

// นำเข้า Shared Components ภายนอกเพื่อลดความซ้ำซ้อนใน Layout หลัก
import TaxpayerPersonalInfo from '../../features/taxpayer/components/detail/TaxpayerPersonalInfo';
import TaxpayerOperationalInfo from '../../features/taxpayer/components/detail/TaxpayerOperationalInfo';
import TaxpayerBusinessInfo from '../../features/taxpayer/components/detail/TaxpayerBusinessInfo';
import TaxpayerAddressInfo from '../../features/taxpayer/components/detail/TaxpayerAddressInfo';
import TaxpayerSpouseInfo from '../../features/taxpayer/components/detail/TaxpayerSpouseInfo';
import FilingHistoryTable from '../../features/taxpayer/components/detail/FilingHistoryTable';

/**
 * หน้าจอแสดงรายละเอียดเชิงลึกของผู้เสียภาษี ภ.ง.ด. 90
 * รวมข้อมูลโปรไฟล์พื้นหลัง, ประวัติการยื่นย้อนหลัง, และผลวิเคราะห์ความเสี่ยง
 */
const TaxpayerDetail90 = () => {
    const { taxId: taxIdParam, dln: dlnParam, year: yearParamUrl } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // ถอดรหัสพารามิเตอร์ที่รับมาจาก URL (Decode)
    const taxId = decodeParam(taxIdParam);
    const dln = decodeParam(dlnParam);

    // ตรวจสอบความถูกต้องของปีภาษี (ปีปัจจุบัน)
    let year = yearParamUrl;
    if (year && (year.length > 4 || isNaN(parseInt(year)) || year === '7992')) {
        console.warn(`[Detail] Invalid year provided in URL: ${year}. Falling back to default '67'.`);
        year = '67';
    }

    // สถานะสำหรับปีภาษีที่ต้องการใช้เปรียบเทียบ (Default = null เพื่อให้ service คำนวณปีที่เหมาะสมที่สุดให้ในครั้งแรก)
    const [compareYear, setCompareYear] = useState(null);

    // ฟังก์ชันช่วยจัดรูปแบบเงินตรา (Currency Formatter)
    const formatCurrency = (val) => {
        return (val || 0).toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    useEffect(() => {
        // Reset compare year when main year changes to let service recalculate
        console.log(`[Detail90] Year changed to ${year}. Resetting compareYear to null.`);
        setCompareYear(null);
    }, [year]);

    useEffect(() => {
        console.log(`[Detail90] Refreshing data for compareYear: ${compareYear}`);
        loadData();
    }, [taxId, dln, year, compareYear]);

    const loadData = async (force = false) => {
        if (!taxId || taxId === '-') {
            setError("ไม่พบรหัสผู้เสียภาษี (Tax ID)");
            setLoading(false);
            return;
        }

        console.log(`[Detail90] Loading data for Tax ID: ${taxId}, Year: ${year}, CompareYear: ${compareYear}`);
        setLoading(true);
        setError(null);
        try {
            // Simplified logic: getUnifiedProfile now handles Step 2 (NID to DLN) internally if dln is missing
            const basicItem = { taxId, dln };
            const enriched = await TaxpayerService.getUnifiedProfile(basicItem, force, year, compareYear, '90');
            console.log(`[Detail90] Successfully loaded data for years: ${enriched.standard?.year} vs ${enriched.risks?.compareYear}`);
            setData(enriched);

            // Sync local state if it was null (initial load fallback)
            if (!compareYear && enriched.risks?.compareYear) {
                setCompareYear(enriched.risks.compareYear);
            }
        } catch (err) {
            console.error("Load 90 Detail Error:", err);
            setError(err.message || "ไม่สามารถดึงข้อมูลรายละเอียดได้ในขณะนี้");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-navy font-sarabun">
            <div className="spinner-border me-3" role="status"></div>
            <strong>กำลังโหลดข้อมูล ภ.ง.ด. 90...</strong>
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

    // --- การจัดเตรียมข้อมูลเพื่อแสดงในตารางเปรียบเทียบรายได้ ---
    const comparisonData = [
        { code: '40(1)', label: 'เงินเดือน/ค่าจ้าง' },
        { code: '40(2)', label: 'รับจ้าง/ค่านายหน้า' },
        { code: '40(3)', label: 'ค่าลิขสิทธิ์/กู๊ดวิลล์' },
        { code: '40(4)', label: 'ดอกเบี้ย/เงินปันผล' },
        { code: '40(5)', label: 'ค่าเช่าทรัพย์สิน' },
        { code: '40(6)', label: 'วิชาชีพอิสระ' },
        { code: '40(7)', label: 'รับเหมาก่อสร้าง' },
        { code: '40(8)', label: 'การพาณิชย์/อื่นๆ' }
    ].map(item => {
        const currentSrc = (standard.incomeSources || []).find(s => s.category === item.code);
        const currentAmount = currentSrc ? currentSrc.amount : 0;

        const previousSrc = (standard.comparison?.incomeSources || []).find(s => s.category === item.code);
        const prevAmount = previousSrc ? previousSrc.amount : 0;

        const diff = currentAmount - prevAmount;
        let percentChange = 0;
        if (prevAmount > 0) {
            percentChange = (diff / prevAmount) * 100;
        } else if (currentAmount > 0) {
            percentChange = 100.00;
        }

        // Cap at 100% or -100%
        const cappedPercent = Math.max(-100, Math.min(100, percentChange)).toFixed(2);

        return { type: item.code, label: item.label, currentAmount, prevAmount, diff, percentChange: cappedPercent };
    });

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

                {/* 1. ส่วนหัว (Header Section) ข้อมูลสรุปเบื้องต้น */}
                <div className="p-5 bg-navy text-white">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-2 mb-2 opacity-75">
                                <span className="badge bg-white text-navy px-2 py-1">{standard.formCode || 'ภ.ง.ด. 90'}</span>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="row g-5">

                        {/* คอลัมน์ซ้าย: ข้อมูลโปรไฟล์และที่อยู่ */}
                        <div className="col-lg-7">

                            {/* Personal Info */}
                            <TaxpayerPersonalInfo standard={standard} data={data} />

                            {/* Operational & Team Info */}
                            <TaxpayerOperationalInfo data={data} />

                            {/* Business & ISIC Info */}
                            <TaxpayerBusinessInfo data={data} />

                            {/* Address Info */}
                            <TaxpayerAddressInfo standard={standard} data={data} />

                            {/* Spouse Info (If exists) */}
                            <TaxpayerSpouseInfo standard={standard} />
                        </div>

                        {/* คอลัมน์ขวา: ข้อมูลความเสี่ยง การเงิน และการเปรียบเทียบ */}
                        <div className="col-lg-5">

                            {/* Verification/Risk Badge */}
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
                                    formCode="ภ.ง.ด. 90"
                                    year={standard.year || year}
                                    compareYear={compareYear}
                                />
                            </section>

                            {/* Official Filing History Table */}
                            <FilingHistoryTable data={data} />

                            {/* Comparison Table (Current year analytics) */}
                            <section className="mb-5">
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <FileText size={20} className="me-2" /> วิเคราะห์รายได้
                                </h5>
                                <div className="table-responsive rounded-3 border bg-white overflow-hidden shadow-sm">
                                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="py-2 px-3 text-secondary small border-0">ประเภท</th>
                                                <th className="py-2 px-3 text-end text-secondary small border-0 text-nowrap">ปี {toThaiYear(data.risks?.compareYear)}<br /><span className="x-small opacity-50 fw-normal">(ปีที่เทียบ)</span></th>
                                                <th className="py-2 px-3 text-end text-secondary small border-0 text-nowrap">ปี {toThaiYear(standard.year)}<br /><span className="x-small opacity-50 fw-normal">(ปีหลักจาก DLN)</span></th>
                                                <th className="py-2 px-3 text-center text-secondary small border-0">เปลี่ยนแปลง</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonData.map((row, idx) => {
                                                const isUp = parseFloat(row.percentChange) > 0;
                                                const isDown = parseFloat(row.percentChange) < 0;
                                                const hasValue = row.currentAmount > 0 || row.prevAmount > 0;

                                                return (
                                                    <tr key={idx} className={hasValue ? "" : "opacity-25"}>
                                                        <td className="px-3 py-2 border-0">
                                                            <div className="fw-bold text-navy">{row.type}</div>
                                                        </td>
                                                        <td className="px-3 py-2 text-end text-secondary font-monospace border-0">
                                                            {formatCurrency(row.prevAmount)}
                                                        </td>
                                                        <td className="px-3 py-2 text-end fw-bold text-dark font-monospace border-0">
                                                            {formatCurrency(row.currentAmount)}
                                                        </td>
                                                        <td className="px-3 py-2 text-center border-0">
                                                            {hasValue ? (
                                                                <div className={`d-flex align-items-center justify-content-center gap-1 fw-bold ${isUp ? 'text-success' : isDown ? 'text-danger' : 'text-warning'}`}>
                                                                    {isUp && <TrendingUp size={14} />}
                                                                    {isDown && <TrendingDown size={14} />}
                                                                    {!isUp && !isDown && <Minus size={14} />}
                                                                    <span>{isUp ? '+' : isDown ? '-' : ''}{Math.abs(row.percentChange)}%</span>
                                                                </div>
                                                            ) : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Financial Summary */}
                            <section>
                                <h5 className="text-navy fw-bold mb-4 d-flex align-items-center">
                                    <FileText size={20} className="me-2" /> รายละเอียดภาษี (แบบ ภ.ง.ด. 90)
                                </h5>
                                <div className="card border-0 shadow-sm p-4 bg-navy text-white rounded-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="opacity-75">เงินได้รวมพึงประเมิน</span>
                                        <span className="fw-bold">{formatCurrency(standard.financials?.totalIncome || data.totalIncome)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="opacity-75">ค่าลดหย่อนรวม</span>
                                        <span className="text-danger fw-bold">(-) {formatCurrency(standard.financials?.totalAllowance)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 pt-2 border-top border-white border-opacity-25 fw-bold">
                                        <span className="opacity-75">เงินได้สุทธิ</span>
                                        <span className="text-warning">{formatCurrency(standard.financials?.netIncome)}</span>
                                    </div>

                                    <div className="hr my-3 border-white border-opacity-10"></div>

                                    <div className="d-flex justify-content-between mb-2 opacity-75 small">
                                        <span>ภาษีคำนวณได้</span>
                                        <span>{formatCurrency(standard.financials?.netTax)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 opacity-75 small">
                                        <span>ภาษีหัก ณ ที่จ่าย</span>
                                        <span>{formatCurrency(standard.financials?.whtAmount)}</span>
                                    </div>

                                    <div className="p-3 bg-white bg-opacity-10 rounded-3 text-center border border-white border-opacity-10">
                                        <div className="small fw-bold text-white-50 text-uppercase mb-1">ภาษีสุทธิที่ต้องชำระเพิ่ม</div>
                                        <div className="display-6 fw-bold text-white">
                                            {formatCurrency((standard.financials?.netTax || 0) - (standard.financials?.whtAmount || 0))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer Tip */}
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
            </div >
        </div >
    );
};

export default TaxpayerDetail90;
