import React from 'react';
// import './Popup.css'; // Make sure to style appropriately

const Popup = ({ title, children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default Popup;
