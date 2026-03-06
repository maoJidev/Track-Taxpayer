import React, { useState, useEffect } from 'react';
import { OfficeService } from '../services/officeService';
import { Building2, MapPin, AlertCircle } from 'lucide-react';

/**
 * คอมโพเนนต์สำหรับเลือกสำนักงานสรรพากร (Office Selector)
 * แสดงดรอปดาวน์แบบไล่ระดับ: ภาค → พื้นที่ → สาขา
 * ปรับเปลี่ยนสถานะและการมองเห็นตามสิทธิ์ของผู้ใช้งาน (User Role)
 * 
 * @param {Object} props
 * @param {string} props.userRole - บทบาทของผู้ใช้ (เช่น Region, ST, SS)
 * @param {Object} props.userOffices - รหัสสำนักงานของผู้ใช้ { regionCode, stCode, ssCode }
 * @param {Function} props.onOfficeChange - ฟังก์ชัน Callback เมื่อมีการเปลี่ยนการเลือกสำนักงาน
 * @param {boolean} props.disabled - สถานะเปิด/ปิดการใช้งานดรอปดาวน์ทั้งหมด
 */
const OfficeSelector = ({
    userRole,
    userOffices = {},
    onOfficeChange,
    currentOffices = {},
    disabled = false
}) => {
    const [regions, setRegions] = useState([]);
    const [stOffices, setSTOffices] = useState([]);
    const [ssOffices, setSSOffices] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(currentOffices.regionCode || userOffices.regionCode || '');
    const [selectedST, setSelectedST] = useState(currentOffices.stCode || userOffices.stCode || '');
    const [selectedSS, setSelectedSS] = useState(currentOffices.ssCode || userOffices.ssCode || '');

    // ซิงค์สถานะ (Sync State) กับข้อมูลที่รับมาจากภายนอก
    useEffect(() => {
        if (currentOffices.regionCode !== undefined) setSelectedRegion(currentOffices.regionCode ?? userOffices.regionCode ?? '');
        if (currentOffices.stCode !== undefined) setSelectedST(currentOffices.stCode ?? userOffices.stCode ?? '');
        if (currentOffices.ssCode !== undefined) setSelectedSS(currentOffices.ssCode ?? userOffices.ssCode ?? '');
    }, [currentOffices.regionCode, currentOffices.stCode, currentOffices.ssCode, userOffices.regionCode, userOffices.stCode, userOffices.ssCode]);

    // ดึงข้อมูลสำนักงานพื้นที่ (ST) เมื่อมีการเปลี่ยนภาค (Region)
    useEffect(() => {
        const fetchST = async () => {
            if (selectedRegion && (userRole === 'Region' || userRole === 'ST' || userRole === 'Admin')) {
                try {
                    const stList = await OfficeService.getSTOfficesByRegion(selectedRegion);
                    setSTOffices(stList);
                } catch (err) {
                    console.error('[OfficeSelector] ST load error:', err);
                }
            }
        };
        fetchST();
    }, [selectedRegion, userRole]);

    // ดึงข้อมูลสำนักงานพื้นที่สาขา (SS) เมื่อมีการเปลี่ยนสำนักงานพื้นที่ (ST)
    useEffect(() => {
        const fetchSS = async () => {
            if (selectedST) {
                try {
                    const ssList = await OfficeService.getSSOfficesByST(selectedST);
                    setSSOffices(ssList);
                } catch (err) {
                    console.error('[OfficeSelector] SS load error:', err);
                }
            }
        };
        fetchSS();
    }, [selectedST]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // โหลดลำดับขั้นของสำนักงาน (Office Hierarchy) ในครั้งแรก
    useEffect(() => {
        loadOfficeHierarchy();
    }, [userRole, userOffices.regionCode, userOffices.stCode]);

    const loadOfficeHierarchy = async () => {
        setLoading(true);
        setError(null);

        try {
            const hierarchy = await OfficeService.getOfficeHierarchy(userRole, userOffices);
            setRegions(hierarchy.regions);

            // Only overwrite if the hierarchy query actually returned data
            // This prevents race conditions where specific hook useEffects load data,
            // but this initialization function overwrites it with an empty array.
            if (hierarchy.stOffices && hierarchy.stOffices.length > 0) {
                setSTOffices(hierarchy.stOffices);
            }
            if (hierarchy.ssOffices && hierarchy.ssOffices.length > 0) {
                setSSOffices(hierarchy.ssOffices);
            }
        } catch (err) {
            console.error('[OfficeSelector] Failed to load office hierarchy:', err);
            setError('ไม่สามารถโหลดข้อมูลสำนักงานได้');
        } finally {
            setLoading(false);
        }
    };

    // Handle region change (Region role only)
    const handleRegionChange = (e) => {
        const regionCode = e.target.value;
        setSelectedRegion(regionCode);
        setSelectedST('');
        setSelectedSS('');
        setSTOffices([]);
        setSSOffices([]);
        notifyChange({ regionCode, stCode: '', ssCode: '' });
    };

    // Handle ST change
    const handleSTChange = (e) => {
        const stCode = e.target.value;
        setSelectedST(stCode);
        setSelectedSS('');
        setSSOffices([]);
        notifyChange({ regionCode: selectedRegion, stCode, ssCode: '' });
    };

    // Handle SS change
    const handleSSChange = (e) => {
        const ssCode = e.target.value;
        setSelectedSS(ssCode);
        notifyChange({ regionCode: selectedRegion, stCode: selectedST, ssCode });
    };

    // แจ้งเตือนคอมโพเนนต์หลักเมื่อมีการเปลี่ยนแปลงชุดข้อมูลสำนักงาน
    const notifyChange = (offices) => {
        if (onOfficeChange) {
            onOfficeChange(offices);
        }
    };

    // สำหรับผู้ใช้งานระดับสาขา (SS) จะแสดงเฉพาะเมนูของสาขาและถูกล็อกไว้
    const isSSUser = userRole === 'SS';

    // If SS user, show simplified view with only SS dropdown
    if (isSSUser) {
        return (
            <div className="card mb-4">
                <div className="card-header bg-white border-bottom">
                    <div className="d-flex align-items-center gap-2">
                        <MapPin size={20} className="text-primary" />
                        <h6 className="mb-0 fw-bold">สำนักงานสรรพากร</h6>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small">
                                สำนักงานสรรพากรพื้นที่สาขา
                            </label>
                            <select
                                className="form-select"
                                value={selectedSS}
                                onChange={handleSSChange}
                                disabled={true}
                            >
                                <option value="">-- เลือกสาขา --</option>
                                {ssOffices.map(ss => (
                                    <option key={ss.ssOfficeCode} value={ss.ssOfficeCode}>
                                        {ss.ssOfficeCode} - {ss.ssOfficeName}
                                    </option>
                                ))}
                            </select>
                            <small className="text-primary fw-bold">
                                (กำหนดตามสิทธิ์ของคุณ)
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header bg-white border-bottom">
                <div className="d-flex align-items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    <h6 className="mb-0 fw-bold">เลือกสำนักงานสรรพากร</h6>
                </div>
            </div>
            <div className="card-body">
                {error && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-3">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="row g-3">
                    {/* Region Dropdown - Only for Region role */}
                    {userRole === 'Region' && (
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">ภาค</label>
                            <select
                                className="form-select"
                                value={selectedRegion}
                                onChange={handleRegionChange}
                                disabled={disabled || loading || userRole === 'Region'}
                            >
                                <option value="">-- เลือกภาค --</option>
                                {regions.map(region => (
                                    <option key={region.regionOfficeCode} value={region.regionOfficeCode}>
                                        {region.regionOfficeCode} - {region.regionOfficeName}
                                    </option>
                                ))}
                            </select>
                            {userRole === 'Region' && (
                                <small className="text-primary fw-bold">
                                    (ดูข้อมูลระดับภาคของคุณ)
                                </small>
                            )}
                        </div>
                    )}

                    {/* ST Dropdown - For Region and ST roles */}
                    {(userRole === 'Region' || userRole === 'ST') && (
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">
                                สำนักงานสรรพากรพื้นที่
                            </label>
                            <select
                                className="form-select"
                                value={selectedST}
                                onChange={handleSTChange}
                                disabled={disabled || loading || userRole === 'ST'}
                            >
                                <option value="">-- เลือกสำนักงานพื้นที่ --</option>
                                {stOffices.map(st => (
                                    <option key={st.stOfficeCode} value={st.stOfficeCode}>
                                        {st.stOfficeCode} - {st.stOfficeName}
                                    </option>
                                ))}
                            </select>
                            {userRole === 'ST' && (
                                <small className="text-primary fw-bold">
                                    (ดูข้อมูลพื้นที่ของคุณ)
                                </small>
                            )}
                        </div>
                    )}

                    {/* SS Dropdown - For Region and ST roles only */}
                    {(userRole === 'Region' || userRole === 'ST') && (
                        <div className="col-md-4">
                            <label className="form-label fw-bold small">
                                สำนักงานสรรพากรพื้นที่สาขา
                            </label>
                            <select
                                className="form-select"
                                value={selectedSS}
                                onChange={handleSSChange}
                                disabled={disabled || loading || !selectedST}
                            >
                                <option value="">-- เลือกสาขา --</option>
                                {ssOffices.map(ss => (
                                    <option key={ss.ssOfficeCode} value={ss.ssOfficeCode}>
                                        {ss.ssOfficeCode} - {ss.ssOfficeName}
                                    </option>
                                ))}
                            </select>
                            {!selectedST && (
                                <small className="text-muted">
                                    กรุณาเลือกสำนักงานพื้นที่ก่อน
                                </small>
                            )}
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-2 small text-muted">กำลังโหลดข้อมูล...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfficeSelector;
