// src/components/issues/IssueCard.jsx
import React from 'react';
import { FaClock, FaUser, FaBuilding } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

const IssueCard = ({ issue, isLandlord = false, onUpdate }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
            <StatusBadge status={issue.status} />
            {issue.priority && <StatusBadge status={issue.priority} />}
          </div>
          
          <p className="text-gray-600 mb-3">{issue.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>Reported {formatDate(issue.reportedDate)}</span>
            </div>
            
            {isLandlord && (
              <>
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>{issue.tenant}</span>
                </div>
                <div className="flex items-center">
                  <FaBuilding className="mr-1" />
                  <span>{issue.unit}</span>
                </div>
              </>
            )}
            
            {issue.assignedTo && (
              <div className="text-blue-600 font-medium">
                Technician: {issue.assignedTo}
              </div>
            )}
          </div>
        </div>
        
        {isLandlord && onUpdate && (
          <Button variant="secondary" size="small" onClick={() => onUpdate(issue)}>
            UPDATE
          </Button>
        )}
      </div>
      
      {issue.updates && issue.updates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Latest: {issue.updates[issue.updates.length - 1].text}
          </p>
        </div>
      )}
    </div>
  );
};

export default IssueCard;