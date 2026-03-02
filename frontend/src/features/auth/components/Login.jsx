import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

const Login = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = e.target.username.value;
        const password = e.target.password.value;

        try {
            await login({ userId, password });

            MySwal.fire({
                title: <strong>เข้าสู่ระบบสำเร็จ</strong>,
                html: <i>ยินดีต้อนรับกลับเข้าสู่ระบบ!</i>,
                icon: 'success',
                confirmButtonColor: '#0f172a',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                navigate('/taxpayers/pnd90');
            });
        } catch (err) {
            console.error('Login error in UI:', err);
            MySwal.fire({
                title: <span style={{ color: 'red' }}><b>เข้าสู่ระบบไม่สำเร็จ</b></span>,
                html: (
                    <div>
                        <hr className="my-2" />
                        <p style={{ color: 'red' }}>{err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"}</p>
                    </div>
                ),
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'ลองอีกครั้ง'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-4 font-display bg-[#0f172a] overflow-hidden">
            {/* Optimized CSS Background Layer (Replaces 30MB image to prevent freezing) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Cg%3E%3C/svg%3E')" }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[400px] z-10"
            >
                <div className="bg-white/95 rounded-2xl login-card overflow-hidden shadow-2xl border border-slate-700/20">
                    <div className="p-7">
                        <div className="flex flex-col items-center mb-5">
                            <div className="w-20 h-20 mb-3 flex items-center justify-center">
                                <img
                                    alt="Revenue Department Logo"
                                    className="w-full h-auto object-contain"
                                    src="/images/logo.png"
                                />
                            </div>
                            <h1 className="text-lg font-bold text-primary text-center mb-1">
                                ระบบติดตามผู้ประกอบการในท้องที่
                            </h1>
                            <p className="text-[11px] text-slate-700 font-semibold uppercase tracking-wider">
                                กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="username">
                                    ชื่อผู้ใช้งาน
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">person</span>
                                    </div>
                                    <input
                                        className="block w-full border-gray-200 rounded-lg bg-white/70 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', border: '1px solid #e5e7eb', fontSize: '14px' }}
                                        id="username"
                                        name="username"
                                        defaultValue="NB195096"
                                        placeholder="ระบุชื่อผู้ใช้งาน"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="password">
                                    รหัสผ่าน
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">lock</span>
                                    </div>
                                    <input
                                        className="block w-full border-gray-200 rounded-lg bg-white/70 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '6.5rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', border: '1px solid #e5e7eb', fontSize: '14px' }}
                                        id="password"
                                        name="password"
                                        defaultValue="pass1234"
                                        placeholder="ระบุรหัสผ่าน"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="flex items-center space-x-1 text-[10px] text-slate-500 hover:text-primary transition-colors px-1"
                                        >
                                            <span className="material-symbols-outlined text-base">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                            <span className="font-bold">{showPassword ? 'ซ่อน' : 'แสดง'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded" id="remember-me" name="remember-me" type="checkbox" />
                                    <label className="ml-2 block text-xs text-slate-700 font-medium" htmlFor="remember-me">
                                        จดจำฉัน
                                    </label>
                                </div>
                                <a className="text-xs font-bold text-professional-blue hover:underline" href="#">
                                    ลืมรหัสผ่าน?
                                </a>
                            </div>

                            <button
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#0f172a] hover:bg-slate-800 transition-all shadow-md disabled:opacity-50 mt-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ (Sign In)'}
                            </button>
                        </form>
                    </div>
                </div>

                <footer className="mt-6 text-center">
                    <p className="text-[10px] text-white/70 leading-relaxed uppercase tracking-widest font-medium">
                        © 2024 กรมสรรพากร (The Revenue Department)<br />
                        <span className="opacity-60">All rights reserved.</span>
                    </p>
                    <div className="mt-3 flex justify-center space-x-4 opacity-70 hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-white text-xl">shield</span>
                            <span className="text-[8px] font-bold text-white uppercase ml-1">Secure</span>
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-white text-xl">verified_user</span>
                            <span className="text-[8px] font-bold text-white uppercase ml-1">Certified</span>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default Login;
