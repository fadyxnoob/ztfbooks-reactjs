import React from 'react';



const PrimaryButton = ({ children, classes, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#01447E] text-white px-8 py-4 rounded-lg w-full hover:opacity-90 cursor-pointer gap-x-4 ${classes || ''}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;