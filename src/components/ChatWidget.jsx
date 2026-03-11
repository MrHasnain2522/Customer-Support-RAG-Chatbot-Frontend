import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import ChatInterface from './ChatInterface';
import ProductDetailModal from './ProductDetailModal';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={toggleWidget}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <FaTimes className="chat-widget-icon" />
        ) : (
          <>
            <FaComments className="chat-widget-icon" />
            <span className="chat-widget-badge">💬</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <>
          <div className="chat-widget-backdrop" onClick={toggleWidget} />
          <div className="chat-widget-window">
            <div className="chat-widget-header">
              <div className="chat-widget-header-info">
                <h3>AI Shopping Assistant</h3>
                <div className="status-online">● Online</div>
              </div>
              <button className="chat-widget-close" onClick={toggleWidget}>
                <FaTimes />
              </button>
            </div>
            <div className="chat-widget-body">
              <ChatInterface 
                isWidget={true}
                onProductClick={handleProductClick}
              />
            </div>
          </div>
        </>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ChatWidget;