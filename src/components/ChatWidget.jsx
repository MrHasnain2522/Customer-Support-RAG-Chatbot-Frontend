import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import ChatInterface from './ChatInterface';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <FaTimes className="chat-widget-icon" />
        ) : (
          <FaComments className="chat-widget-icon" />
        )}
        {!isOpen && <span className="chat-widget-badge">💬</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <div className="chat-widget-header-info">
              <h3>Customer Support</h3>
              <span className="status-online">● Online</span>
            </div>
            <button 
              className="chat-widget-close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="chat-widget-body">
            <ChatInterface isWidget={true} />
          </div>
        </div>
      )}

      {/* Backdrop when chat is open */}
      {isOpen && (
        <div 
          className="chat-widget-backdrop"
          onClick={toggleChat}
        />
      )}
    </>
  );
};

export default ChatWidget;