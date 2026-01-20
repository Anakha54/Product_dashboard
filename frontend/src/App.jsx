import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import ProductCard from './components/ProductCard';
import StatsCard from './components/StatsCard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError('Failed to connect to server. Please ensure the backend is running.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStockUpdate = async (productId, newQuantity) => {
    setUpdatingIds(prev => new Set([...prev, productId]));
    
    try {
      const response = await fetch(`${API_BASE_URL}/update-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          newQuantity: newQuantity
        })
      });

      const data = await response.json();

      if (data.success) {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === productId ? data.data : p
          )
        );
        setError(null);
      } else {
        setError(data.error || 'Failed to update stock');
      }
    } catch (err) {
      setError('Failed to update stock. Please check your connection.');
      console.error('Error updating stock:', err);
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.stock < p.lowStockThreshold && p.stock > 0).length,
    outOfStock: products.filter(p => p.stock === 0).length
  };

  if (loading) {
    return <LoadingSpinner message="Loading inventory..." />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="title">
            <Package size={32} />
            Smart Inventory Dashboard
          </h1>
          <p className="subtitle">Real-time stock management</p>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="stats-container">
        <StatsCard value={stats.total} label="Total Products" />
        <StatsCard value={stats.lowStock} label="Low Stock" variant="warning" />
        <StatsCard value={stats.outOfStock} label="Out of Stock" variant="danger" />
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onStockUpdate={handleStockUpdate}
            isUpdating={updatingIds.has(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;