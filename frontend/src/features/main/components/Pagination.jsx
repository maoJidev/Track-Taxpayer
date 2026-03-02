import React from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({
    page,
    pageSize,
    totalElements,
    totalPages,
    onPageChange,
    loading
}) => {
    if (totalElements === 0) return null;

    return (
        <div className="p-3 d-flex justify-content-between align-items-center border-top bg-light">
            <div className="text-secondary small">
                แสดง {Math.min((page * pageSize) + 1, totalElements)} ถึง {Math.min((page + 1) * pageSize, totalElements)} จากทั้งหมด {totalElements} รายการ
            </div>
            <div className="d-flex gap-2">
                <button
                    className="btn btn-white border shadow-sm btn-sm"
                    disabled={page <= 0 || loading}
                    onClick={() => onPageChange(0)}
                >
                    <ChevronsLeft size={16} />
                </button>
                <button
                    className="btn btn-white border shadow-sm btn-sm px-3"
                    disabled={page <= 0 || loading}
                    onClick={() => onPageChange(page - 1)}
                >
                    ก่อนหน้า
                </button>
                <div className="bg-white border px-3 py-1 rounded small fw-bold d-flex align-items-center">
                    {page + 1}
                </div>
                <button
                    className="btn btn-white border shadow-sm btn-sm px-3"
                    disabled={page >= totalPages - 1 || loading}
                    onClick={() => onPageChange(page + 1)}
                >
                    ถัดไป
                </button>
                <button
                    className="btn btn-white border shadow-sm btn-sm"
                    disabled={page >= totalPages - 1 || loading}
                    onClick={() => onPageChange(totalPages - 1)}
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
