import React from 'react';
import { Package, AlertTriangle, Loader2 } from 'lucide-react';

const ProductCard = ({ product, onStockUpdate, isUpdating }) => {
  const isLowStock = product.stock < product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;
  
  const handleIncrement = () => {
    onStockUpdate(product.id, product.stock + 1);
  };
  
  const handleDecrement = () => {
    if (product.stock > 0) {
      onStockUpdate(product.id, product.stock - 1);
    }
  };

  return (
    <div className={`card ${isLowStock ? 'card-critical' : ''} ${isUpdating ? 'card-updating' : ''}`}>
      {isUpdating && (
        <div className="loading-overlay">
          <Loader2 className="spinner" size={24} />
        </div>
      )}
      
      <div className="product-image-container">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'} 
          alt={product.name}
          className="product-image"
        />
      </div>
      
      <div className="card-header">
        <Package size={20} className="icon-product" />
        <h3 className="product-name">{product.name}</h3>
      </div>
      
      <div className="product-info">
        <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
        <div className="stock-info">
          <span className="stock-label">Stock:</span>
          <span className={`stock-value ${isOutOfStock ? 'stock-out' : isLowStock ? 'stock-low' : ''}`}>
            {product.stock} units
          </span>
        </div>
      </div>

      {isLowStock && (
        <div className={`alert-badge ${isOutOfStock ? 'alert-out' : 'alert-low'}`}>
          <AlertTriangle size={14} />
          <span>{isOutOfStock ? 'OUT OF STOCK' : 'CRITICAL LOW'}</span>
        </div>
      )}

      <div className="stock-controls">
        <button 
          className="btn btn-decrement" 
          onClick={handleDecrement}
          disabled={product.stock === 0 || isUpdating}
        >
          -
        </button>
        <div className="stock-display">{product.stock}</div>
        <button 
          className="btn btn-increment" 
          onClick={handleIncrement}
          disabled={isUpdating}
        >
          +
        </button>
      </div>

      <div className="threshold-info">
        Low stock threshold: {product.lowStockThreshold}
      </div>
    </div>
  );
};

export default ProductCard;