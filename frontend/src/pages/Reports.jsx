// import {
//     Download,
//     TrendingUp,
//     AlertCircle,
//     ChevronRight,
//     Search
// } from 'lucide-react';
// import { useReportController } from '../controllers/useReportController';
// import { TAX_STATUS } from '../constants';

// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const Reports = () => {
//     const {
//         stats,
//         overdueList,
//         loading,
//         activeTab,
//         setActiveTab
//     } = useReportController();



//     const handleDownloadCSV = () => {
//         MySwal.fire({
//             title: 'กําลังจัดเตรียมข้อมูล',
//             text: 'ระบบกำลังจัดเตรียมไฟล์ CSV สำหรับรายงานนี้ กรุณารอสักครู่...',
//             icon: 'info',
//             timer: 2000,
//             showConfirmButton: false,
//             didOpen: () => {
//                 MySwal.showLoading();
//             }
//         });
//         // In real app: generate blob and download
//     };


//     return (
//         <div className="container-fluid py-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                     <h3 className="fw-bold mb-1">ศูนย์รวมรายงาน (Reporting Hub)</h3>
//                     <p className="text-muted small mb-0">เรียกดูสถิติและดึงข้อมูลรายงานที่สำคัญของระบบ</p>
//                 </div>
//                 <button onClick={handleDownloadCSV} className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-4">
//                     <Download size={18} />
//                     Export CSV
//                 </button>
//             </div>

//             {/* Tab Navigation */}
//             <ul className="nav nav-tabs border-0 mb-4 gap-2">
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link rounded-pill border-0 px-4 py-2 ${activeTab === 'stats' ? 'bg-primary text-white shadow-sm' : 'text-muted bg-white'}`}
//                         onClick={() => setActiveTab('stats')}
//                     >
//                         สถิติการยื่นแบบ
//                     </button>
//                 </li>
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link rounded-pill border-0 px-4 py-2 ${activeTab === 'overdue' ? 'bg-primary text-white shadow-sm' : 'text-muted bg-white'}`}
//                         onClick={() => setActiveTab('overdue')}
//                     >
//                         รายชื่อค้างยื่น
//                     </button>
//                 </li>
//             </ul>

//             {activeTab === 'stats' ? (
//                 <div className="row g-4">
//                     {/* Summary Stats Table */}
//                     <div className="col-12">
//                         <div className="card shadow-sm border-0">
//                             <div className="card-header bg-white py-3 border-0">
//                                 <h6 className="fw-bold mb-0">รายงานสรุปผลการยื่นแบบ (ภ.ง.ด.) แยกตามประเภท</h6>
//                             </div>
//                             <div className="card-body p-0">
//                                 <div className="table-responsive">
//                                     <table className="table align-middle mb-0">
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th className="ps-4">ประเภทแบบ</th>
//                                                 <th className="text-center">เป้าหมายทั้งหมด</th>
//                                                 <th className="text-center">ยื่นแล้ว (ราย)</th>
//                                                 <th className="text-center">ค้างยื่น (ราย)</th>
//                                                 <th className="text-center">ความคืบหน้า (%)</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {stats?.filingDonutData.labels.map((label, idx) => {
//                                                 const details = stats.filingDonutData.details[idx];
//                                                 const total = details.completed + details.notFiled;
//                                                 const percentage = ((details.completed / total) * 100).toFixed(1);

//                                                 return (
//                                                     <tr key={label}>
//                                                         <td className="ps-4 fw-bold text-primary">{label}</td>
//                                                         <td className="text-center fw-bold">{total}</td>
//                                                         <td className="text-center text-success">{details.completed}</td>
//                                                         <td className="text-center text-danger">{details.notFiled}</td>
//                                                         <td style={{ width: '250px' }}>
//                                                             <div className="d-flex align-items-center gap-2 px-3">
//                                                                 <div className="progress flex-grow-1" style={{ height: '8px' }}>
//                                                                     <div
//                                                                         className="progress-bar bg-success rounded-pill"
//                                                                         style={{ width: `${percentage}%` }}
//                                                                     ></div>
//                                                                 </div>
//                                                                 <span className="small fw-bold">{percentage}%</span>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Secondary Metrics */}
//                     <div className="col-md-6">
//                         <div className="card shadow-sm border-0 h-100">
//                             <div className="card-body p-4">
//                                 <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
//                                     <TrendingUp size={18} className="text-primary" />
//                                     ประสิทธิภาพการติดตาม
//                                 </h6>
//                                 <p className="text-muted small">สรุปช่องทางการยื่นแบบที่ได้รับความนิยมสูงสุดในเดือนนี้</p>
//                                 <div className="mt-4">
//                                     {stats?.efficiencyMetrics?.map((metric, idx) => (
//                                         <div key={idx} className="mb-4">
//                                             <div className="d-flex justify-content-between mb-2">
//                                                 <span>{metric.label}</span>
//                                                 <span className={`fw-bold text-navy`}>{metric.value}%</span>
//                                             </div>
//                                             <div className="progress" style={{ height: '8px' }}>
//                                                 <div
//                                                     className={`progress-bar bg-${metric.color}`}
//                                                     style={{ width: `${metric.value}%` }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-md-6">
//                         <div className="card shadow-sm border-0 h-100">
//                             <div className="card-body p-4 d-flex flex-column justify-content-center text-center">
//                                 <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex p-3 mb-3 mx-auto">
//                                     <AlertCircle size={32} />
//                                 </div>
//                                 <h5 className="fw-bold mb-2">จำนวนเคสที่ต้องเร่งรัด</h5>
//                                 <h2 className="display-5 fw-bold text-danger mb-0">{overdueList.length}</h2>
//                                 <p className="text-muted">รายการที่ยังไม่มีการดำเนินการติดต่อ</p>
//                                 <button onClick={() => setActiveTab('overdue')} className="btn btn-outline-danger rounded-pill mt-3">ดูรายชื่อทั้งหมด</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="card shadow-sm border-0">
//                     <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
//                         <h6 className="fw-bold mb-0">รายชื่อผู้ที่ยังไม่ยื่นแบบ (รอการติดตาม)</h6>
//                         <div className="position-relative" style={{ width: '250px' }}>
//                             <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
//                             <input type="text" className="form-control form-control-sm ps-5 rounded-pill" placeholder="ค้นหาชื่อ หรือ Tax ID..." />
//                         </div>
//                     </div>
//                     <div className="card-body p-0">
//                         <div className="table-responsive">
//                             <table className="table table-hover align-middle mb-0">
//                                 <thead className="table-light">
//                                     <tr>
//                                         <th className="ps-4">ชื่อผู้ประกอบการ</th>
//                                         <th>เลขที่ผู้เสียภาษี</th>
//                                         <th>ประเภทแบบ</th>
//                                         <th>ปีภาษี</th>
//                                         <th>ความล่าช้า</th>
//                                         <th className="text-end pe-4">ดำเนินการ</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {overdueList.map(item => (
//                                         <tr key={item.id}>
//                                             <td className="ps-4 fw-bold">{item.taxpayerName}</td>
//                                             <td>{item.taxpayerId}</td>
//                                             <td>ภ.ง.ด. {item.formType}</td>
//                                             <td>{item.period}</td>
//                                             <td><span className="text-danger small fw-bold">{item.deadline}</span></td>
//                                             <td className="text-end pe-4">
//                                                 <button className="btn btn-sm btn-light rounded-circle shadow-sm">
//                                                     <ChevronRight size={16} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Reports;
