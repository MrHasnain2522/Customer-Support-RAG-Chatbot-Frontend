import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { sendMessage } from '../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  const userId = 'user_' + Math.random().toString(36).substr(2, 9);

  const featuredProducts = [
    {
      name: 'Pink Blossom Lawn',
      price: 3800,
      colors: ['Pink', 'Rose Pink', 'Coral Pink', 'Hot Pink'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      description: 'Lightweight lawn with delicate floral embroidery',
      image: '/images/products/pink_lawn.png',
      longDescription: 'Our Pink Blossom Lawn collection features exquisite floral embroidery on premium quality lawn fabric. Perfect for summer occasions, this piece combines traditional aesthetics with modern comfort. The breathable fabric ensures all-day comfort while the elegant design makes you stand out.'
    },
    {
      name: 'Black Sophistication',
      price: 4800,
      colors: ['Black', 'Charcoal', 'Black with Gold', 'Black with Silver'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      description: 'Elegant black lawn with silver thread embroidery',
      image: '/images/products/black_sute.png',
      longDescription: 'Experience timeless elegance with our Black Sophistication collection. Featuring premium black lawn fabric adorned with intricate silver thread embroidery, this ensemble is perfect for formal events and special occasions. The sophisticated design ensures you make a lasting impression.'
    },
    {
      name: 'Sky Blue Elegance',
      price: 4200,
      colors: ['Sky Blue', 'Powder Blue', 'Turquoise', 'Navy Blue'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      description: 'Cool blue lawn with thread work border',
      image: '/images/products/sky_blue.png',
      longDescription: 'Embrace serenity with our Sky Blue Elegance collection. This stunning piece features cool blue tones with delicate thread work borders, creating a perfect balance between traditional craftsmanship and contemporary style. Ideal for daytime events and casual gatherings.'
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const greeting = {
      content: "Hello! 👋 Welcome to Ladies Suits! I'm your AI shopping assistant. I can help you find the perfect suit. What are you looking for today?",
      timestamp: new Date().toISOString(),
      isUser: false,
      sources: [],
    };
    setMessages([greeting]);
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      content: inputValue,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputValue, userId, conversationId);
      
      if (!conversationId) {
        setConversationId(response.conversation_id);
      }

      const botMessage = {
        content: response.response,
        timestamp: response.timestamp,
        isUser: false,
        sources: response.sources || [],
        context_used: response.context_used,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        content: "Sorry, I'm having trouble connecting. Please check if the backend server is running on http://localhost:5000",
        timestamp: new Date().toISOString(),
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="chat-interface">
        <div className="products-section">
          <h2 className="section-title">Featured Summer Collection</h2>
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <h3>Chat with AI Assistant</h3>
            <span className="status-indicator">● Online</span>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isLoading && (
              <div className="loading-indicator">
                <FaSpinner className="spinner" />
                <span>AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Ask about sizes, colors, prices..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <FaSpinner className="spinner" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ChatInterface;