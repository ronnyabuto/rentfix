// src/components/issues/UpdatesTimeline.jsx
import React from 'react';
import { FaClock, FaUserCheck, FaTools, FaCheckCircle, FaComment, FaCalendarCheck } from 'react-icons/fa';
import UpdateItem from './UpdateItem';
import { useAppContext } from '../../context/AppContext';

const UpdatesTimeline = ({ issueId, showAll = false }) => {
  const { state } = useAppContext();
  
  // If issueId is provided, get updates for that specific issue
  // Otherwise, get all recent activity
  let updates = [];
  
  if (issueId) {
    const issue = state.issues.find(issue => issue.id === issueId);
    updates = issue?.updates || [];
  } else {
    // Combine updates from all issues and recent notifications
    updates = [
      ...state.issues.flatMap(issue => 
        issue.updates.map(update => ({
          ...update,
          issueTitle: issue.title,
          issueId: issue.id
        }))
      ),
      ...state.notifications.map(notification => ({
        ...notification,
        type: 'notification'
      }))
    ].sort((a, b) => {
      // Simple sorting - in a real app, you'd parse timestamps
      return b.id - a.id;
    });
  }

  const getIconForUpdateType = (type) => {
    const icons = {
      'created': <FaClock className="text-blue-500" />,
      'assigned': <FaUserCheck className="text-green-500" />,
      'in_progress': <FaTools className="text-yellow-500" />,
      'completed': <FaCheckCircle className="text-green-500" />,
      'comment': <FaComment className="text-purple-500" />,
      'scheduled': <FaCalendarCheck className="text-indigo-500" />,
      'notification': <FaClock className="text-gray-500" />
    };
    return icons[type] || <FaClock className="text-gray-400" />;
  };

  const getColorForUpdateType = (type) => {
    const colors = {
      'created': 'bg-blue-100 border-blue-200',
      'assigned': 'bg-green-100 border-green-200',
      'in_progress': 'bg-yellow-100 border-yellow-200',
      'completed': 'bg-green-100 border-green-200',
      'comment': 'bg-purple-100 border-purple-200',
      'scheduled': 'bg-indigo-100 border-indigo-200',
      'notification': 'bg-gray-100 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 border-gray-200';
  };

  const displayUpdates = showAll ? updates : updates.slice(0, 5);

  if (displayUpdates.length === 0) {
    return (
      <div className="text-center py-8">
        <FaClock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No updates yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Updates will appear here as progress is made
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {issueId ? 'Issue Updates' : 'Recent Activity'}
        </h3>
        {!showAll && updates.length > 5 && (
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View all ({updates.length})
          </button>
        )}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {displayUpdates.map((update, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-3.5 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 z-10">
                <div className="w-2 h-2 rounded-full bg-gray-400 mx-auto mt-0.5"></div>
              </div>
              
              <div className={`ml-10 p-4 rounded-lg border ${getColorForUpdateType(update.type)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {getIconForUpdateType(update.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    {update.issueTitle && (
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {update.issueTitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-800 mb-2">{update.text}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {update.timestamp}
                      </span>
                      {update.type === 'comment' && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          Comment
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {update.comment && (
                  <div className="mt-3 pl-3 border-l-2 border-gray-300">
                    <p className="text-sm text-gray-700">{update.comment}</p>
                  </div>
                )}
                
                {update.attachments && update.attachments.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Attachments:</p>
                    <div className="flex space-x-2">
                      {update.attachments.map((attachment, idx) => (
                        <a
                          key={idx}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                        >
                          {attachment.name || `File ${idx + 1}`}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showAll && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaClock />
              <span>Updates refresh automatically</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatesTimeline;