import React from 'react';

const CurrencyText = ({ value, className = "text-navy fw-bold" }) => {
    const formatted = value?.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) || '0.00';

    return <span className={className}>{formatted}</span>;
};

export default CurrencyText;
