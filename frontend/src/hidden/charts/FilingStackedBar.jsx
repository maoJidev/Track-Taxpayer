import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const FilingStackedBar = ({ data }) => {
    if (!data) return <div className="text-center p-4 text-muted">ไม่พบข้อมูล</div>;

    const chartData = {
        labels: data.labels, // ["ภ.ง.ด. 90", "ภ.ง.ด. 91", "ภ.ง.ด. 94"]
        datasets: data.datasets.map(ds => ({
            label: ds.label,
            data: ds.data,
            backgroundColor: ds.color,
            borderRadius: 4,
            barThickness: 40,
        })),
    };

    const options = {
        indexAxis: 'y', // Horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                grid: { color: "#f1f5f9" },
                ticks: {
                    font: { family: "'Inter', sans-serif" },
                    color: "#64748b"
                }
            },
            y: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        weight: '600',
                        size: 14 // Back to a slightly larger size
                    },
                    color: "#1e293b",
                }
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 13,
                        weight: '600'
                    },
                    color: "#475569",
                },
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        const total = context.chart.data.datasets.reduce((sum, ds) => sum + ds.data[context.dataIndex], 0);
                        const percentage = ((context.raw / total) * 100).toFixed(0);
                        return ` ${context.dataset.label}: ${context.raw} ราย (${percentage}%)`;
                    }
                }
            }
        },
    };

    return (
        <div style={{ height: "250px" }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default FilingStackedBar;
