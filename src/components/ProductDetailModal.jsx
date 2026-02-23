import React, { useState } from 'react';
import { FaTimes, FaPhone, FaWhatsapp, FaCheckCircle, FaShoppingBag, FaRuler, FaTshirt } from 'react-icons/fa';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  if (!isOpen || !product) return null;

  const colorMap = {
    'Pink': '#FFB6C1',
    'Rose Pink': '#FF69B4',
    'Coral Pink': '#F88379',
    'Black': '#000000',
    'Charcoal': '#36454F',
    'White': '#FFFFFF',
    'Sky Blue': '#87CEEB',
    'Powder Blue': '#B0E0E6',
    'Turquoise': '#40E0D0',
    'Blue': '#3498DB',
    'Green': '#90EE90',
    'Yellow': '#FFD700',
    'Red': '#FF6B6B',
    'Purple': '#DDA0DD',
    'Grey': '#D3D3D3',
    'Peach': '#FFDAB9',
  };

  const handleOrder = () => {
    const message = `Hi! I want to order:\n${product.name}\nColor: ${selectedColor}\nSize: ${selectedSize}\nPrice: PKR ${product.price.toLocaleString()}`;
    window.open(`https://wa.me/923201007448?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-content">
          {/* Left Side - Image */}
          <div className="modal-image-section">
            <div className="modal-image-container">
              {product.image ? (
                <img src={product.image} alt={product.name} className="modal-product-image" />
              ) : (
                <div className="modal-image-placeholder">
                  <div className="modal-placeholder-icon">👗</div>
                  <p>{product.name}</p>
                </div>
              )}
            </div>
            <div className="modal-badge">New Arrival</div>
          </div>

          {/* Right Side - Details */}
          <div className="modal-details-section">
            <div className="modal-header">
              <h2 className="modal-product-name">{product.name}</h2>
              <div className="modal-price">PKR {product.price.toLocaleString()}</div>
            </div>

            <div className="modal-description">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p className="modal-long-description">
                {product.longDescription || `Experience elegance and comfort with our ${product.name}. Crafted from premium quality fabric, this piece combines traditional aesthetics with modern design. Perfect for any occasion, this suit offers exceptional comfort and style that lasts all day long.`}
              </p>
            </div>

            {/* Features */}
            <div className="modal-features">
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>Premium Quality Fabric</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>Comfortable All-Day Wear</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>Easy Care & Maintenance</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>Perfect for All Occasions</span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="modal-selection-group">
              <h3>
                <FaTshirt className="selection-icon" />
                Select Color
              </h3>
              <div className="modal-colors">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`modal-color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="modal-color-dot"
                      style={{
                        backgroundColor: colorMap[color] || '#ccc',
                        border: color === 'White' ? '2px solid #ddd' : '2px solid transparent'
                      }}
                    />
                    <span className="modal-color-name">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="modal-selection-group">
              <h3>
                <FaRuler className="selection-icon" />
                Select Size
              </h3>
              <div className="modal-sizes">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`modal-size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide */}
            <div className="modal-size-guide">
              <h4>Size Guide</h4>
              <table className="size-guide-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>34-36"</td>
                    <td>28-30"</td>
                    <td>38-40"</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>36-38"</td>
                    <td>30-32"</td>
                    <td>39-41"</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>38-40"</td>
                    <td>32-34"</td>
                    <td>40-42"</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>40-42"</td>
                    <td>34-36"</td>
                    <td>41-43"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="modal-order-btn whatsapp" onClick={handleOrder}>
                <FaWhatsapp /> Order via WhatsApp
              </button>
              <a href="tel:03201007448" className="modal-order-btn phone">
                <FaPhone /> Call to Order
              </a>
            </div>

            {/* Delivery Info */}
            <div className="modal-delivery-info">
              <FaShoppingBag className="delivery-icon" />
              <div>
                <strong>Free Delivery</strong> on orders over PKR 5,000
                <br />
                <small>Delivered in 3-5 business days</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;