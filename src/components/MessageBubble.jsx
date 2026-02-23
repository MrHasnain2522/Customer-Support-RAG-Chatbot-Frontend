import React from 'react';
import { FaUser, FaRobot, FaCheckCircle } from 'react-icons/fa';

const MessageBubble = ({ message, isUser }) => {
  const { content, timestamp, sources } = message;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message-container ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-avatar">
        {isUser ? (
          <FaUser className="avatar-icon user-icon" />
        ) : (
          <FaRobot className="avatar-icon bot-icon" />
        )}
      </div>
      
      <div className="message-content-wrapper">
        <div className="message-bubble">
          <div className="message-text">{content}</div>
          
          {!isUser && sources && sources.length > 0 && (
            <div className="message-sources">
              <div className="sources-header">
                <FaCheckCircle className="check-icon" />
                <span>Verified from catalog</span>
              </div>
              {sources.map((source, index) => (
                <div key={index} className="source-item">
                  <span className="source-name">{source.filename}</span>
                  <span className="source-relevance">
                    {Math.round(source.relevance * 100)}% match
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="message-timestamp">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;