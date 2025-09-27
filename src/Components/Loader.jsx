import React from 'react';
import '../App.css';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
