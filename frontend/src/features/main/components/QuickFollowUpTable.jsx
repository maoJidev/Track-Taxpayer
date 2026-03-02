import { useNavigate } from "react-router-dom";
import { encodeId } from "../../utils/security";
import { TAX_STATUS_LABEL } from "../../constants";

const QuickFollowUpTable = ({ data }) => {
    if (!data) return <div className="text-center p-4 text-muted">ไม่พบข้อมูลการติดตาม</div>;

    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow-sm h-100 overflow-hidden">
            <div className="card-body p-0">
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-50">
                    <h6 className="fw-bold mb-0 text-secondary">ผู้ประกอบการที่ต้องติดตาม</h6>
                    <button
                        className="btn btn-link btn-sm text-decoration-none p-0"
                        onClick={() => navigate('/taxpayers')}
                    >
                        ดูทั้งหมด →
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-3 border-0 small text-muted text-uppercase">TAX ID / ชื่อ</th>
                                <th className="border-0 small text-muted text-uppercase">ร้าน / เหตุผล</th>
                                <th className="border-0 small text-muted text-uppercase text-center">แบบ</th>
                                <th className="border-0 small text-muted text-uppercase pe-3 text-center">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => navigate(`/taxpayers/detail/${encodeId(item.taxId)}`)}>
                                    <td className="ps-3">
                                        <div className="fw-bold text-navy small">{item.taxId}</div>
                                        <div className="small text-muted">{item.name}</div>
                                    </td>
                                    <td>
                                        <div className="small fw-medium">{item.shop}</div>
                                        <div className="text-danger extra-small" style={{ fontSize: '0.65rem' }}>
                                            {item.reason}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-primary bg-opacity-10 text-primary fw-normal">{item.formType}</span>
                                    </td>
                                    <td className="pe-3 text-center">
                                        <span className="small">
                                            {item.status === 'completed' ? '✅ ' : '❌ '}
                                            {TAX_STATUS_LABEL[item.status]}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QuickFollowUpTable;
