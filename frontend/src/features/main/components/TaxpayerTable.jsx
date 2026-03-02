import { useNavigate } from "react-router-dom";
import { encodeId } from "../../utils/security";
import {
    TAX_STATUS_LABEL,
    FILING_CHANNEL_LABEL,
    RCTP_LABEL,
    PAYMENT_TYPE_LABEL_PAPER,
    PAYMENT_TYPE_LABEL_INTERNET
} from "../../constants";

const statusBadge = {
    completed: <span className="badge border px-3" style={{ backgroundColor: '#10b98122', color: '#10b981', borderColor: '#10b98144' }}>✅ {TAX_STATUS_LABEL.completed}</span>,
    notFiled: <span className="badge border px-3" style={{ backgroundColor: '#ef444422', color: '#ef4444', borderColor: '#ef444444' }}>❌ {TAX_STATUS_LABEL.notFiled}</span>,
};

const channelBadge = {
    internet: <span className="badge bg-info bg-opacity-10 text-info fw-normal border border-info border-opacity-25">{FILING_CHANNEL_LABEL.internet}</span>,
    paper: <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal border border-secondary border-opacity-25">{FILING_CHANNEL_LABEL.paper}</span>,
    tcl: <span className="badge bg-primary bg-opacity-10 text-primary fw-normal border border-primary border-opacity-25">{FILING_CHANNEL_LABEL.tcl}</span>,
};

const TaxpayerTable = ({ data, selectedRows = [], onRowSelect, onSelectAll }) => {
    const navigate = useNavigate();

    const isAllSelected = data.length > 0 && selectedRows.length === data.length;

    const getPaymentLabel = (item) => {
        if (!item.pmtp) return "-";
        if (item.channel === 'internet' || item.rctp === '3') {
            return PAYMENT_TYPE_LABEL_INTERNET[item.pmtp] || item.pmtp;
        }
        return PAYMENT_TYPE_LABEL_PAPER[item.pmtp] || item.pmtp;
    };

    return (
        <div className="card border-0 shadow-sm overflow-hidden">
            <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4 py-3" style={{ width: '40px' }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isAllSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th className="py-3 small text-muted text-uppercase fw-bold">TAX ID / ชื่อผู้เสียภาษี</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold">ร้าน / กิจการ</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">แบบ</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">ปี/เดือน</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">ช่องทาง</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">ประเภทรายการ</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">การชำระเงิน</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center">สถานะ</th>
                            <th className="py-3 small text-muted text-uppercase fw-bold text-center pe-4">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={item.taxId} className={selectedRows.includes(item.taxId) ? 'table-primary bg-opacity-10' : ''}>
                                    <td className="ps-4">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedRows.includes(item.taxId)}
                                            onChange={() => onRowSelect(item.taxId)}
                                        />
                                    </td>
                                    <td>
                                        <div className="fw-bold text-navy">{item.taxId}</div>
                                        <div className="small text-muted">{item.name}</div>
                                    </td>
                                    <td className="fw-medium">
                                        {item.shop}
                                        {item.shops && item.shops.length > 1 && (
                                            <span className="badge rounded-pill bg-warning text-dark ms-2" style={{ fontSize: '0.65rem' }}>
                                                {item.shops.length} สาขา
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex flex-column gap-1 align-items-center">
                                            {item.obligations?.map(ob => (
                                                <div key={ob.id} className="x-small fw-bold border rounded px-1 bg-light">
                                                    {ob.formType}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div>{item.year}</div>
                                        <div className="small text-muted">
                                            {item.obligations?.length > 1 ? 'หลายงวด' : (item.obligations?.[0]?.period || '-')}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {channelBadge[item.channel] || <span className="text-muted small">-</span>}
                                    </td>
                                    <td className="text-center small">
                                        {item.rctp && <span className="badge bg-light text-dark border fw-normal">{RCTP_LABEL[item.rctp] || item.rctp}</span>}
                                        {!item.rctp && "-"}
                                    </td>
                                    <td className="text-center small">
                                        {item.pmtp && <span className="text-muted">{getPaymentLabel(item)}</span>}
                                        {!item.pmtp && "-"}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex flex-column gap-1 align-items-center">
                                            {item.obligations?.map(ob => {
                                                if (ob.status === 'unknown') {
                                                    return (
                                                        <span key={ob.id} className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary" style={{ fontSize: '0.6rem' }}>
                                                            {ob.formType}: -
                                                        </span>
                                                    );
                                                }
                                                return (
                                                    <span key={ob.id} className={`badge rounded-pill bg-${ob.status === 'completed' ? 'success' : 'danger'} bg-opacity-10 text-${ob.status === 'completed' ? 'success' : 'danger'}`} style={{ fontSize: '0.6rem' }}>
                                                        {ob.formType}: {ob.status === 'completed' ? 'ยื่นแล้ว' : 'ค้าง'}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td className="text-center pe-4">
                                        <button
                                            className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                                            onClick={() => navigate(`/taxpayers/detail/${encodeId(item.taxId)}`)}
                                        >
                                            รายละเอียด
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-muted">
                                    <div className="mb-2">🔍 ไม่พบข้อมูลที่ค้นหา</div>
                                    <small>ลองเปลี่ยนเงื่อนไขการค้นหาใหม่</small>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaxpayerTable;
