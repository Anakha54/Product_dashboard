import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <Loader2 className="spinner" size={48} />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;