// src/components/issues/IssueList.jsx
import React from 'react';
import IssueCard from './IssueCard';

const IssueList = ({ issues, isLandlord = false, onUpdate }) => {
  const groupedIssues = {
    PENDING: issues.filter(issue => issue.status === 'PENDING'),
    IN_PROGRESS: issues.filter(issue => issue.status === 'IN_PROGRESS'),
    SCHEDULED: issues.filter(issue => issue.status === 'SCHEDULED')
  };

  return (
    <div>
      {!isLandlord ? (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Maintenance Requests</h3>
          
          {Object.entries(groupedIssues).map(([status, statusIssues]) => (
            statusIssues.length > 0 && (
              <div key={status} className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {status.replace('_', ' ')}
                </h4>
                {statusIssues.map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            )
          ))}
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant & Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map(issue => (
                <tr key={issue.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{issue.tenant}</div>
                    <div className="text-sm text-gray-500">{issue.unit}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{issue.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {issue.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={issue.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={issue.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="secondary" size="small" onClick={() => onUpdate && onUpdate(issue)}>
                      UPDATE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IssueList;