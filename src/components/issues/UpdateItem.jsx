// src/components/issues/UpdateItem.jsx
import React from 'react';
import { 
  FaUser, 
  FaClock, 
  FaPaperclip, 
  FaComment, 
  FaCheckCircle,
  FaUserPlus,
  FaCalendarAlt,
  FaExclamationCircle
} from 'react-icons/fa';

const UpdateItem = ({ update, compact = false }) => {
  const getUpdateConfig = (type) => {
    const configs = {
      'status_change': {
        icon: <FaExclamationCircle className="text-blue-500" />,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        textColor: 'text-blue-800'
      },
      'assignment': {
        icon: <FaUserPlus className="text-green-500" />,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-100',
        textColor: 'text-green-800'
      },
      'comment': {
        icon: <FaComment className="text-purple-500" />,
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-100',
        textColor: 'text-purple-800'
      },
      'completion': {
        icon: <FaCheckCircle className="text-green-500" />,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-100',
        textColor: 'text-green-800'
      },
      'scheduling': {
        icon: <FaCalendarAlt className="text-indigo-500" />,
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-100',
        textColor: 'text-indigo-800'
      },
      'default': {
        icon: <FaUser className="text-gray-500" />,
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-100',
        textColor: 'text-gray-800'
      }
    };

    return configs[update.type] || configs.default;
  };

  const formatUpdateText = (text) => {
    // Highlight keywords
    const keywords = ['completed', 'assigned', 'scheduled', 'updated', 'resolved'];
    let formattedText = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formattedText = formattedText.replace(
        regex, 
        `<span class="font-semibold">${keyword}</span>`
      );
    });
    
    return formattedText;
  };

  const config = getUpdateConfig(update.type);

  if (compact) {
    return (
      <div className="flex items-start space-x-3 py-2">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p 
              className="text-sm text-gray-800"
              dangerouslySetInnerHTML={{ __html: formatUpdateText(update.text) }}
            />
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
              {update.timestamp}
            </span>
          </div>
          {update.author && (
            <p className="text-xs text-gray-500 mt-1">
              By {update.author}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} mb-3`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <div className="text-lg">{config.icon}</div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-900">
                {update.author || 'System'}
              </span>
              {update.role && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                  {update.role}
                </span>
              )}
            </div>
            
            <p 
              className="text-gray-800 mb-2"
              dangerouslySetInnerHTML={{ __html: formatUpdateText(update.text) }}
            />
            
            {update.details && (
              <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                <p className="text-sm text-gray-700">{update.details}</p>
              </div>
            )}
            
            {update.comment && (
              <div className="mt-3 pl-3 border-l-2 border-gray-300">
                <p className="text-sm text-gray-700 italic">"{update.comment}"</p>
              </div>
            )}
            
            {update.attachments && update.attachments.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaPaperclip className="mr-2" />
                  <span>Attachments ({update.attachments.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {update.attachments.map((attachment, idx) => (
                    <a
                      key={idx}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <FaPaperclip className="mr-2 text-gray-400" />
                      <span className="text-gray-700">
                        {attachment.name || `Attachment ${idx + 1}`}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <div className="flex items-center text-sm text-gray-500">
            <FaClock className="mr-1" />
            <span>{update.timestamp}</span>
          </div>
        </div>
      </div>
      
      {update.metadata && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(update.metadata).map(([key, value]) => (
              <div key={key} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded">
                <span className="text-gray-500">{key}: </span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;