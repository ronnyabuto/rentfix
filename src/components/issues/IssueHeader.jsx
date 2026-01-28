// src/components/issues/IssueHeader.jsx
import React from 'react';
import { FaCalendarAlt, FaUser, FaBuilding, FaTag, FaExclamationTriangle } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';
import { format } from 'date-fns';

const IssueHeader = ({ issue }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const stats = [
    {
      icon: <FaCalendarAlt className="text-gray-400" />,
      label: 'Reported',
      value: formatDate(issue.reportedDate),
      title: `Reported on ${formatDate(issue.reportedDate)}`
    },
    {
      icon: <FaUser className="text-gray-400" />,
      label: 'Tenant',
      value: issue.tenant || 'N/A',
      title: issue.tenant || 'N/A'
    },
    {
      icon: <FaBuilding className="text-gray-400" />,
      label: 'Unit',
      value: issue.unit || 'N/A',
      title: issue.unit || 'N/A'
    },
    {
      icon: <FaTag className="text-gray-400" />,
      label: 'Category',
      value: issue.category || 'General',
      title: issue.category || 'General'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
              <div className="flex space-x-2">
                <StatusBadge status={issue.status} />
                {issue.priority && (
                  <div className="flex items-center">
                    <StatusBadge status={issue.priority} />
                    {issue.priority === 'HIGH' && (
                      <FaExclamationTriangle className="ml-1 text-red-500" title="High Priority" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600">ID: #{issue.id}</p>
          </div>
          
          {issue.assignedTo && (
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm font-medium text-blue-700">
                  Assigned to: {issue.assignedTo}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-gray-800 whitespace-pre-line">{issue.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                {stat.icon}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate" title={stat.title}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {issue.scheduledDate && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
            <div className="flex items-center">
              <FaCalendarAlt className="text-yellow-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Scheduled for Visit</p>
                <p className="text-sm text-yellow-700">
                  {format(new Date(issue.scheduledDate), 'EEEE, MMMM dd, yyyy')}
                  {issue.scheduledTime && ` at ${issue.scheduledTime}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueHeader;