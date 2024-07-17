import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
<div className="loader-container" data-testid="loader-container">
  <div className="loader">
    <div className="square" data-testid="loader-square"></div>
    <div className="triangle" data-testid="loader-triangle"></div>
    <div className="circle" data-testid="loader-circle"></div>
    <div className="pulse" data-testid="loader-pulse"></div>
    <span>Loading...</span>
  </div>
</div>
  );
};

export default Loader;