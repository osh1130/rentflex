import React from 'react';

const variants = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200'
};

const StatusBadge = ({ status, className = '' }) => {
  const statusKey = status.toLowerCase();
  const variantClasses = variants[statusKey] || variants.pending;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-medium
        border rounded-full
        ${variantClasses}
        ${className}
      `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

export default StatusBadge; 