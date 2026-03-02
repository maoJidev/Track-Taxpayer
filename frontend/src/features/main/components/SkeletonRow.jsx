import React from 'react';

const SkeletonRow = ({ columns = 6, columnWidths = [] }) => {
    return (
        <tr className="skeleton-row">
            {Array(columns).fill(0).map((_, i) => (
                <td key={i} className={`px-4 ${i === 3 ? 'text-end' : i === 4 ? 'text-center' : ''}`}>
                    <div
                        className={`skeleton-box ${i === 3 ? 'ms-auto' : i === 4 ? 'mx-auto' : ''}`}
                        style={{
                            width: columnWidths[i] || (i === 0 ? '20px' : '150px'),
                            height: i === 4 ? '24px' : '16px'
                        }}
                    ></div>
                </td>
            ))}
        </tr>
    );
};

export default SkeletonRow;
