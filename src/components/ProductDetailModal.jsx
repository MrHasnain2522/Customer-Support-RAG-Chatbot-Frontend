import React, { useState } from 'react';
import { FaTimes, FaWhatsapp, FaPhone, FaTruck, FaShieldAlt, FaUndo, FaCheck } from 'react-icons/fa';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const { name, price, colors, sizes, description, longDescription, image } = product;

  const colorMap = {
    'Pink': '#FFB6C1',
    'Rose Pink': '#FF69B4',
    'Coral Pink': '#F88379',
    'Hot Pink': '#FF1493',
    'Black': '#000000',
    'Charcoal': '#36454F',
    'Black with Gold': '#000000',
    'Black with Silver': '#000000',
    'White': '#FFFFFF',
    'Sky Blue': '#87CEEB',
    'Powder Blue': '#B0E0E6',
    'Turquoise': '#40E0D0',
    'Navy Blue': '#000080',
    'Blue': '#3498DB',
  };

  const handleOrder = (platform) => {
    const orderText = `Hi! I want to order:\n\n${name}\nColor: ${selectedColor || 'Not selected'}\nSize: ${selectedSize || 'Not selected'}\nQuantity: ${quantity}\nTotal: PKR ${(price * quantity).toLocaleString()}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/923201007448?text=${encodeURIComponent(orderText)}`, '_blank');
    } else {
      window.location.href = 'tel:03201007448';
    }
  };

  const totalPrice = price * quantity;
  const savings = (price * 0.2) * quantity;

  return (
    <div className="modal-overlay-ecommerce" onClick={onClose}>
      <div className="modal-container-ecommerce" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-content-ecommerce">
          {/* Left: Image Gallery */}
          <div className="modal-image-gallery">
            <div className="modal-main-image">
              {image ? (
                <img src={image} alt={name} className="modal-product-img" />
              ) : (
                <div className="modal-image-placeholder-large">
                  <div className="placeholder-icon-xl">👗</div>
                  <p>{name}</p>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="modal-thumbnail-gallery">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="thumbnail-item">
                  {image ? (
                    <img src={image} alt={`${name} ${index + 1}`} />
                  ) : (
                    <div className="thumbnail-placeholder">👗</div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <FaShieldAlt className="trust-icon" />
                <span>100% Original</span>
              </div>
              <div className="trust-badge">
                <FaTruck className="trust-icon" />
                <span>Free Delivery</span>
              </div>
              <div className="trust-badge">
                <FaUndo className="trust-icon" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="modal-details-panel">
            {/* Header */}
            <div className="modal-product-header">
              <div className="breadcrumb">
                <span>Home</span> / <span>Ladies Suits</span> / <span className="active">{name}</span>
              </div>
              <h1 className="modal-product-title">{name}</h1>
              <div className="modal-rating">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <span className="rating-text">(127 reviews)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="modal-price-section">
              <div className="price-row">
                <div className="current-price">PKR {totalPrice.toLocaleString()}</div>
                <div className="original-price">PKR {(totalPrice * 1.2).toLocaleString()}</div>
                <div className="discount-badge">Save PKR {savings.toLocaleString()}</div>
              </div>
              <div className="price-note">Inclusive of all taxes</div>
            </div>

            {/* Description */}
            <div className="modal-description">
              <p className="desc-short">{description}</p>
              <p className="desc-long">{longDescription}</p>
            </div>

            {/* Color Selection */}
            <div className="modal-selection-section">
              <h3 className="selection-title">
                Select Color 
                {selectedColor && <span className="selected-value">: {selectedColor}</span>}
              </h3>
              <div className="color-options-grid">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-option-card ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div 
                      className="color-circle"
                      style={{ 
                        backgroundColor: colorMap[color] || '#ccc',
                        border: color === 'White' ? '2px solid #ddd' : '2px solid transparent'
                      }}
                    >
                      {selectedColor === color && <FaCheck className="check-icon" />}
                    </div>
                    <span className="color-name">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="modal-selection-section">
              <h3 className="selection-title">
                Select Size
                {selectedSize && <span className="selected-value">: {selectedSize}</span>}
              </h3>
              <div className="size-options-grid">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-option-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="size-guide-link">📏 Size Guide</button>
            </div>

            {/* Quantity Selector */}
            <div className="modal-selection-section">
              <h3 className="selection-title">Quantity</h3>
              <div className="quantity-selector">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="qty-input"
                  min="1"
                />
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-action-buttons">
              <button 
                className="btn-order-whatsapp"
                onClick={() => handleOrder('whatsapp')}
                disabled={!selectedColor || !selectedSize}
              >
                <FaWhatsapp /> Order via WhatsApp
              </button>
              <button 
                className="btn-order-phone"
                onClick={() => handleOrder('phone')}
                disabled={!selectedColor || !selectedSize}
              >
                <FaPhone /> Call to Order
              </button>
            </div>

            {!selectedColor || !selectedSize ? (
              <div className="selection-warning">
                ⚠️ Please select color and size to proceed
              </div>
            ) : null}

            {/* Delivery Info */}
            <div className="delivery-info-card">
              <FaTruck className="delivery-icon-large" />
              <div className="delivery-details">
                <h4>Free Delivery</h4>
                <p>Delivered in 3-5 business days across Pakistan</p>
                <p className="delivery-note">Cash on Delivery Available</p>
              </div>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Product Features</h3>
              <ul className="features-list">
                <li><FaCheck className="feature-check" /> Premium Quality Fabric</li>
                <li><FaCheck className="feature-check" /> Breathable & Comfortable</li>
                <li><FaCheck className="feature-check" /> Perfect for Summer</li>
                <li><FaCheck className="feature-check" /> Elegant Design</li>
                <li><FaCheck className="feature-check" /> Easy to Wash & Maintain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;