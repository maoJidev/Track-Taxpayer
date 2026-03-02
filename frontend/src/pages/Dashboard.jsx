// import { useDashboardController } from "../controllers/useDashboardController";
// import SummaryCard from "../components/cards/SummaryCard";
// import FilingStackedBar from "../components/charts/FilingStackedBar";
// import FilingDonut from "../components/charts/FilingDonut";
// import PaymentMethodPie from "../components/charts/PaymentMethodPie";
// import CollectionProgressChart from "../components/charts/CollectionProgressChart";
// import QuickFollowUpTable from "../components/tables/QuickFollowUpTable";
// import DashboardSkeleton from "../components/loaders/DashboardSkeleton";
// import { TrendingUp, BarChart3, PieChart } from "lucide-react";


// const Dashboard = () => {
//     const { data, loading } = useDashboardController();


//     if (loading) {
//         return <DashboardSkeleton />;
//     }

//     return (
//         <div className="container-fluid py-3 animate__animated animate__fadeIn">
//             {/* Summary */}
//             <div className="row mb-4">
//                 {data?.summaryData.map((item, idx) => (
//                     <SummaryCard key={idx} {...item} />
//                 ))}
//             </div>

//             {/* Main Analytics Row */}
//             <div className="row mb-4">
//                 <div className="col-lg-8 mb-3">
//                     <div className="card p-4 h-100 shadow-sm border-0">
//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                             <div>
//                                 <h6 className="fw-bold mb-1 text-navy d-flex align-items-center gap-2">
//                                     <TrendingUp size={18} className="text-primary" />
//                                     Analytics & Collection Tracking
//                                 </h6>
//                                 <small className="text-muted">เปรียบเทียบเป้าหมายและการจัดเก็บภาษีจริง</small>
//                             </div>
//                         </div>
//                         <CollectionProgressChart data={data?.collectionStats} />
//                     </div>
//                 </div>
//                 <div className="col-lg-4 mb-3">
//                     <div className="card p-4 h-100 shadow-sm border-0">
//                         <h6 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
//                             <PieChart size={18} className="text-primary" />
//                             ช่องทางการชำระเงิน
//                         </h6>
//                         <div className="my-auto">
//                             <PaymentMethodPie data={data?.paymentMethodPieData} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row mb-4">
//                 <div className="col-md-6 mb-3">
//                     <div className="card p-4 h-100 shadow-sm border-0">
//                         <h6 className="fw-bold mb-3 text-navy d-flex align-items-center gap-2">
//                             <BarChart3 size={18} className="text-primary" />
//                             ภาพรวมการยื่นแบบ
//                         </h6>
//                         <FilingStackedBar data={data?.filingBarData} />
//                     </div>
//                 </div>

//                 <div className="col-md-6 mb-3">
//                     <div className="card p-4 h-100 shadow-sm border-0">
//                         <h6 className="fw-bold mb-1 text-navy">สัดส่วนประเภทแบบ (ภ.ง.ด.)</h6>
//                         <small className="text-muted mb-3 d-block">จำนวนรายการแยกตามประเภทแบบภาษี</small>
//                         <FilingDonut data={data?.filingDonutData} />
//                     </div>
//                 </div>
//             </div>

//             {/* Follow Up Table */}
//             <div className="row">
//                 <div className="col-12">
//                     <QuickFollowUpTable data={data?.followUpList} />
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default Dashboard;
