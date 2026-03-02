import DataTank from "../analytics/DataTank";

const CollectionProgressChart = ({ data }) => {
    if (!data) return <div className="text-center p-4 text-muted">ไม่พบข้อมูล</div>;

    // Standard colors for different forms
    const colors = ["#3b82f6", "#ef4444", "#fbbf24"];

    return (
        <div className="d-flex justify-content-around align-items-end" style={{ minHeight: "280px" }}>
            {data.labels.map((label, index) => (
                <DataTank
                    key={label}
                    label={label}
                    actual={data.actual[index]}
                    target={data.target[index]}
                    lastYear={data.lastYear[index]}
                    color={colors[index]}
                />
            ))}
        </div>
    );
};

export default CollectionProgressChart;

