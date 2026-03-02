import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PaymentMethodPie = ({ data }) => {
    if (!data) return <div className="text-center p-4 text-muted">ไม่พบข้อมูล</div>;

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.data,
                backgroundColor: data.colors,
                borderWidth: 0,
            },
        ],
    };

    const total = data.data.reduce((acc, curr) => acc + curr, 0);

    const options = {
        cutout: "75%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 15,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 13,
                        weight: '500'
                    },
                    color: "#475569",
                    generateLabels: (chart) => {
                        const data = chart.data;
                        return data.labels.map((label, i) => {
                            const value = data.datasets[0].data[i];
                            const percentage = ((value / total) * 100).toFixed(0);
                            return {
                                text: `${label}: ${value} (${percentage}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].backgroundColor[i],
                                lineWidth: 0,
                                index: i
                            };
                        });
                    }
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
            },
            datalabels: {
                display: false,
            }
        },
    };

    // Center text plugin
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, chartArea: { top, width, height } } = chart;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw "Total" label
            ctx.font = '500 12px Inter';
            ctx.fillStyle = '#64748b';
            ctx.fillText('ทั้งหมด', width / 2, top + (height / 2) - 10);

            // Draw value
            ctx.font = 'bold 20px Inter';
            ctx.fillStyle = '#1e293b';
            ctx.fillText(`${total}`, width / 2, top + (height / 2) + 12);
            ctx.restore();
        }
    };

    return (
        <div style={{ height: "220px" }} className="position-relative">
            <Doughnut
                data={chartData}
                options={options}
                plugins={[centerTextPlugin]}
            />
        </div>
    );
};

export default PaymentMethodPie;
