import React from 'react';

const StatsCard = ({ value, label, variant = 'default' }) => {
  return (
    <div className={`stat-card ${variant !== 'default' ? `stat-${variant}` : ''}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatsCard;