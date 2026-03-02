import React from 'react';

const SkeletonItem = ({ className, style }) => (
    <div className={`bg-light animate-pulse ${className}`} style={{ ...style, minHeight: '1em', borderRadius: '4px' }}></div>
);

const DashboardSkeleton = () => {
    return (
        <div className="container-fluid py-3">
            <style>
                {`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                `}
            </style>

            {/* Summary Cards Skeleton */}
            <div className="row mb-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="col-md-3 mb-3">
                        <div className="card h-100 border-0 shadow-sm p-3">
                            <SkeletonItem className="mb-2 w-50" style={{ height: '14px' }} />
                            <SkeletonItem className="w-75" style={{ height: '32px' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="row mb-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="col-md-4 mb-3">
                        <div className="card p-3 h-100 shadow-sm border-0">
                            <SkeletonItem className="mb-3 w-40" style={{ height: '20px' }} />
                            <SkeletonItem className="w-100" style={{ height: '250px' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm border-0 p-3">
                        <SkeletonItem className="mb-3 w-20" style={{ height: '24px' }} />
                        {[1, 2, 3, 4, 5].map(i => (
                            <SkeletonItem key={i} className="mb-2 w-100" style={{ height: '50px' }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
