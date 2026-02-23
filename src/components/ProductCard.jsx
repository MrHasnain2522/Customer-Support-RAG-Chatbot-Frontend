import React from 'react';
import { FaTag, FaPalette, FaRuler, FaExpand } from 'react-icons/fa';

const ProductCard = ({ product, onCardClick }) => {
  const { name, price, colors, sizes, description, image } = product;

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

  return (
    <div className="product-card" onClick={() => onCardClick(product)}>
      <div className="product-image">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="product-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.image-placeholder').style.display = 'flex';
            }}
          />
        ) : null}
        <div className="image-placeholder" style={{ display: image ? 'none' : 'flex' }}>
          <div className="placeholder-icon">👗</div>
          <div className="placeholder-text">{name}</div>
        </div>
        <div className="product-badge">New</div>
        <div className="expand-icon">
          <FaExpand />
        </div>
      </div>
      
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-info">
          <div className="info-item">
            <FaTag className="info-icon" />
            <span className="product-price">PKR {price.toLocaleString()}</span>
          </div>
          
          <div className="info-item">
            <FaPalette className="info-icon" />
            <div className="color-options">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="color-dot"
                  style={{ 
                    backgroundColor: colorMap[color] || '#ccc',
                    border: color === 'White' ? '1px solid #ddd' : 'none'
                  }}
                  title={color}
                />
              ))}
              {colors.length > 4 && (
                <span className="color-more">+{colors.length - 4}</span>
              )}
            </div>
          </div>
          
          <div className="info-item">
            <FaRuler className="info-icon" />
            <span className="product-sizes">{sizes.join(', ')}</span>
          </div>
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = 'tel:03201007448';
          }}
        >
          Order Now - 0320-1007448
        </button>
      </div>
    </div>
  );
};

export default ProductCard;