// src/components/common/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pending'
    },
    IN_PROGRESS: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'In Progress'
    },
    SCHEDULED: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Scheduled'
    },
    COMPLETED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Completed'
    },
    HIGH: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'High'
    },
    MEDIUM: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Medium'
    },
    LOW: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Low'
    }
  };

  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: status
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;