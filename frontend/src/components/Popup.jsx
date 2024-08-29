import React from 'react';
// import './Popup.css'; // Make sure to style appropriately

const Popup = ({ title, children, onClose }) => {
  return (
    <div className="popup-overlay ">
      <div className="popup-content w-1/3">
        <h2>{title}</h2>
        {children}
        
      </div>
    </div>
  );
};

export default Popup;
