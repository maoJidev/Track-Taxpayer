import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./features/auth/contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Settings from "./pages/Settings";
import TaxpayerList90 from "./pages/90/TaxpayerList90";
import TaxpayerDetail90 from "./pages/90/TaxpayerDetail90";
import TaxpayerList94 from "./pages/94/TaxpayerList94";
import TaxpayerDetail94 from "./pages/94/TaxpayerDetail94";
import TaxpayerList91 from "./pages/91/TaxpayerList91";
import TaxpayerDetail91 from "./pages/91/TaxpayerDetail91";
import Login from "./features/auth/components/Login";
import Profile from "./pages/Profile";
import OfficeManagement from "./pages/offices/OfficeManagement";

// สไตล์หลัก (Global Styles) สำหรับใช้รวบรวมหน้าจอผู้เสียภาษี
import "./assets/css/taxpayer-common.css";
import { useParams } from "react-router-dom";

// คอมโพเนนต์ช่วยจัดการการนำทางอัตโนมัติ (Dynamic Redirection) พร้อมแนบพารามิเตอร์
const NavigateToDetail = () => {
    const { taxId, dln, year } = useParams();
    let target = `/taxpayers/pnd90/detail/${taxId}`;
    if (dln) target += `/${dln}`;
    if (year) target += `/${year}`;
    return <Navigate to={target} replace />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* เส้นทางสาธารณะ (Public Route) - แสดงผลโดยไม่มี Layout หลักครอบ */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* เส้นทางภายในระบบ - แสดงผลผ่าน MainLayout ทั้งหมด */}
                    <Route element={<MainLayout><Outlet /></MainLayout>}>
                        <Route path="/testTaxpayerlist" element={<Navigate to="/taxpayers/pnd90" replace />} />
                        <Route path="/taxpayers/pnd90" element={<TaxpayerList90 key="pnd90-list" />} />
                        <Route path="/taxpayers/pnd90/detail/:taxId/:dln?/:year?" element={<TaxpayerDetail90 />} />

                        {/* เส้นทางพิเศษสำหรับเปลี่ยนหน้า (Redirect) เพื่อรองรับลิงก์รูปแบบเดิม */}
                        <Route path="/testTaxpayerDetail/:taxId/:dln?/:year?" element={<NavigateToDetail />} />

                        {/* V2 Route (Legacy / Fallback) */}
                        <Route path="/v2/taxpayers" element={<Navigate to="/taxpayers/pnd90" replace />} />

                        {/* PND94 Routes */}
                        <Route path="/taxpayers/pnd94" element={<TaxpayerList94 key="pnd94-list" />} />
                        <Route path="/taxpayers/pnd94/detail/:taxId/:dln?/:year?" element={<TaxpayerDetail94 />} />

                        {/* PND91 Routes */}
                        <Route path="/taxpayers/pnd91" element={<TaxpayerList91 />} />
                        <Route path="/taxpayers/pnd91/detail/:taxId/:dln?/:year?" element={<TaxpayerDetail91 />} />

                        <Route path="/settings" element={<Settings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/offices" element={<OfficeManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
