import React from 'react';
import logo from '../assets/Logomain.png'; 

const Logo = ({ w = "100", h = "100", className = "" }) => {
    return (
        <img
        src={logo}
        alt="OptiSap Logo"
        width={w}
        height={h}
        className={`logo ${className}`}
      />
    );
  };
  
  export default Logo;
