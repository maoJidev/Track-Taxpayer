import React, { useState, useEffect } from 'react';

const DataTank = ({ label, actual, target, lastYear, color = "#3b82f6" }) => {
    const [animatedHeight, setAnimatedHeight] = useState(0);
    const rawPercentage = (actual / target) * 100;
    const percentage = rawPercentage.toFixed(1);
    const lastYearPercent = Math.min((lastYear / target) * 100, 120);


    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedHeight(percentage);
        }, 300);
        return () => clearTimeout(timer);
    }, [percentage]);

    // SVG Height constants
    const tankHeight = 160;
    const tankWidth = 80;
    const ellipseHeight = 15;
    // Cap visual fill at 110% of tank height
    const visualPercent = Math.min(animatedHeight, 110);
    const fillHeight = (visualPercent / 100) * tankHeight;
    const lastYearY = tankHeight - (lastYearPercent / 100) * tankHeight;


    // Format numbers: Use Millions for big targets, but Baht for smaller actuals
    const formatValue = (val) => {
        if (val >= 1000000) {
            return (val / 1000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " ล้านบาท";
        }
        return val.toLocaleString() + " บาท";
    };


    return (
        <div className="text-center p-3 animate__animated animate__fadeIn">
            <div className="position-relative mx-auto" style={{ width: tankWidth, height: tankHeight + ellipseHeight * 2 }}>
                <svg width={tankWidth} height={tankHeight + ellipseHeight * 2} viewBox={`0 0 ${tankWidth} ${tankHeight + ellipseHeight * 2}`}>
                    {/* Tank Bottom Cap */}
                    <ellipse cx={tankWidth / 2} cy={tankHeight + ellipseHeight} rx={tankWidth / 2} ry={ellipseHeight} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Tank Body (Background/Target) */}
                    <rect x="0" y={ellipseHeight} width={tankWidth} height={tankHeight} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Liquid Fill */}
                    <rect x="0" y={tankHeight + ellipseHeight - fillHeight} width={tankWidth} height={fillHeight} fill={color} opacity="0.8" style={{ transition: 'all 1.5s ease-out' }} />

                    {/* Liquid Top Surface (Perspective) */}
                    {fillHeight > 0 && (
                        <ellipse
                            cx={tankWidth / 2}
                            cy={tankHeight + ellipseHeight - fillHeight}
                            rx={tankWidth / 2}
                            ry={ellipseHeight}
                            fill={color}
                            style={{ transition: 'all 1.5s ease-out', filter: 'brightness(1.1)' }}
                        />
                    )}

                    {/* Last Year Indicator (Dashed Line) */}
                    <line
                        x1="0" y1={lastYearY + ellipseHeight}
                        x2={tankWidth} y2={lastYearY + ellipseHeight}
                        stroke="#fbbf24"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                    />

                    {/* Tank Glass Reflection / Top Rim */}
                    <ellipse cx={tankWidth / 2} cy={ellipseHeight} rx={tankWidth / 2} ry={ellipseHeight} fill="none" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Marker for Last Year Text */}
                    <text x={tankWidth + 5} y={lastYearY + ellipseHeight + 4} fontSize="9" fill="#92400e" fontWeight="bold">LY</text>
                </svg>

                {/* Percentage Overlay */}
                <div className="position-absolute top-50 start-50 translate-middle w-100">
                    <div className="fw-bold text-navy" style={{ fontSize: '1.25rem', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>
                        {percentage}%
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="fw-bold text-navy small mb-1">{label}</div>
                <div className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
                    {formatValue(actual)}
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                    เป้าหมาย {formatValue(target)}
                </div>

            </div>
        </div>
    );
};

export default DataTank;
