import { useNavigate } from "react-router-dom";

const SummaryCard = ({ title, value, color, filter }) => {
    const navigate = useNavigate();

    const getBgColor = (c) => {
        switch (c) {
            case 'navy': return '#1e3a8a';
            case 'success': return '#10b981';
            case 'danger': return '#ef4444';
            case 'primary': return '#3b82f6';
            case 'warning': return '#f59e0b';
            default: return '#64748b';
        }
    };

    const bgColor = getBgColor(color);

    return (
        <div className="col-md-3 mb-3">
            <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderLeft: `4px solid ${bgColor}`, cursor: 'pointer' }}
                onClick={() => navigate("/taxpayers", { state: { filters: filter } })}
            >
                <div className="card-body">
                    <h6 className="text-secondary small fw-bold text-uppercase mb-2">{title}</h6>
                    <h3 className="fw-bold mb-0" style={{ color: bgColor }}>{value.toLocaleString()}</h3>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
