import React from 'react';
// eslint-disable-next-line no-unused-vars
import { FaTag, FaPalette, FaRuler, FaExpand, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, onCardClick }) => {
  const { name, price, colors, sizes, description, image } = product;

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

  return (
    <div className="product-card-wrapper" onClick={() => onCardClick(product)}>
      {/* Product Card */}
      <div className="product-card-ecommerce">
        {/* Image Section */}
        <div className="product-card-image-section">
          {image ? (
            <>
              <img 
                src={image} 
                alt={name} 
                className="product-card-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = e.target.parentElement.querySelector('.product-card-placeholder');
                  if (placeholder) {
                    placeholder.style.display = 'flex';
                  }
                }}
              />
              <div className="product-card-placeholder" style={{ display: 'none' }}>
                <div className="placeholder-icon-large">👗</div>
                <div className="placeholder-name">{name}</div>
              </div>
            </>
          ) : (
            <div className="product-card-placeholder">
              <div className="placeholder-icon-large">👗</div>
              <div className="placeholder-name">{name}</div>
            </div>
          )}
          
          {/* Badges */}
          <div className="product-card-badges">
            <span className="badge-new">New</span>
            <span className="badge-trending">🔥 Trending</span>
          </div>
          
          {/* Quick View Overlay */}
          <div className="product-card-overlay">
            <button className="quick-view-btn">
              <FaExpand /> Quick View
            </button>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="product-card-details-section">
          <h3 className="product-card-title">{name}</h3>
          <p className="product-card-desc">{description}</p>
          
          {/* Price */}
          <div className="product-card-price-section">
            <div className="price-main">PKR {price.toLocaleString()}</div>
            <div className="price-original">PKR {(price * 1.2).toLocaleString()}</div>
            <div className="price-discount">20% OFF</div>
          </div>
          
          {/* Color Swatches */}
          <div className="product-card-colors">
            <div className="colors-label">
              <FaPalette className="label-icon" />
              <span>{colors.length} Colors</span>
            </div>
            <div className="colors-swatches">
              {colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ 
                    backgroundColor: colorMap[color] || '#ccc',
                    border: color === 'White' || color.includes('Silver') ? '1px solid #ddd' : 'none'
                  }}
                  title={color}
                />
              ))}
              {colors.length > 5 && (
                <span className="colors-more">+{colors.length - 5}</span>
              )}
            </div>
          </div>
          
          {/* Sizes */}
          <div className="product-card-sizes">
            <div className="sizes-label">
              <FaRuler className="label-icon" />
              <span>Available Sizes</span>
            </div>
            <div className="sizes-list">
              {sizes.slice(0, 6).map((size, index) => (
                <span key={index} className="size-tag">{size}</span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="product-card-actions">
            <button 
              className="btn-view-details"
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(product);
              }}
            >
              View Details
            </button>
            <button 
              className="btn-add-cart"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = 'tel:03201007448';
              }}
            >
              <FaShoppingCart /> Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;