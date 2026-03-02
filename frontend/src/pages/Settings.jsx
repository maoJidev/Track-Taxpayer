import { useState, useEffect } from "react";
import { UnifiedService as TaxpayerService } from "../features/main/services/unifiedService";
import { Settings as SettingsIcon, Save, Target, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Settings = () => {
    const navigate = useNavigate();
    const [targets, setTargets] = useState({ "90": 0, "91": 0, "94": 0 });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const data = await TaxpayerService.getTargets();
                setTargets(data);
            } catch (error) {
                console.error("Failed to fetch targets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTargets();
    }, []);

    const handleChange = (form, value) => {
        // Remove non-numeric characters for simple numeric input
        const numericValue = value.replace(/[^0-9]/g, "");
        setTargets(prev => ({ ...prev, [form]: Number(numericValue) }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await TaxpayerService.updateTargets(targets);
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                text: 'เป้าหมายการจัดเก็บภาษีได้รับการอัปเดตแล้ว',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถบันทึกข้อมูลได้'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-5 text-center text-muted">กำลังโหลดการตั้งค่า...</div>;

    return (
        <div className="container py-4 animate__animated animate__fadeIn">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2 shadow-sm">
                                <ArrowLeft size={20} />
                            </button>
                            <h3 className="fw-bold mb-0">ตั้งค่าระบบ (Settings)</h3>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm overflow-hidden">
                        <div className="card-header bg-navy text-white p-4">
                            <h5 className="mb-1 d-flex align-items-center gap-2">
                                <Target size={20} />
                                กำหนดเป้าหมายการจัดเก็บภาษี (KPI Targets)
                            </h5>
                            <p className="small mb-0 opacity-75">ระบุยอดเงินเป้าหมายรายปีสำหรับภาษีแต่ละประเภท (หน่วย: บาท)</p>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSave}>
                                <div className="row g-4 mb-4">
                                    {["90", "91", "94"].map((form) => (
                                        <div key={form} className="col-12">
                                            <label className="form-label fw-bold text-navy">เป้าหมาย ภ.ง.ด. {form}</label>
                                            <div className="input-group input-group-lg">
                                                <input
                                                    type="text"
                                                    className="form-control border-end-0"
                                                    value={targets[form].toLocaleString()}
                                                    onChange={(e) => handleChange(form, e.target.value)}
                                                    placeholder="ระบุจำนวนเงิน..."
                                                />
                                                <span className="input-group-text bg-white border-start-0 text-muted">บาท</span>
                                            </div>
                                            <div className="form-text text-primary">
                                                💰 เท่ากับ {(targets[form] / 1000000).toLocaleString()} ล้านบาท
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-light px-4 rounded-pill fw-bold"
                                        onClick={() => navigate("/")}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-navy px-5 rounded-pill fw-bold d-flex align-items-center gap-2"
                                        disabled={saving}
                                    >
                                        {saving ? <span className="spinner-border spinner-border-sm"></span> : <Save size={18} />}
                                        บันทึกการตั้งค่า
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="alert alert-info border-0 mt-4 shadow-sm rounded-4 p-4">
                        <h6 className="fw-bold d-flex align-items-center gap-2">
                            <SettingsIcon size={18} />
                            หมายเหตุการตั้งค่า
                        </h6>
                        <ul className="small mb-0 mt-2 text-muted">
                            <li>ตัวเลขเป้าหมายนี้จะถูกนำไปใช้ในกราฟ 3D Data Tank ในหน้า Dashboard</li>
                            <li>ในโหมดจำลอง (Mock Mode) ข้อมูลจะถูกเก็บไว้ใน Browser ของคุณ</li>
                            <li>เมื่อเชื่อมต่อกับระบบหลังบ้าน ข้อมูลส่วนนี้จะถูกบันทึกลงในฐานข้อมูลกลาง</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
