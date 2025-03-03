import React from 'react';



const PrimaryButton = ({ children, classes = 'px-8 py-4', onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#01447E] text-white rounded-lg w-full hover:opacity-90 cursor-pointer gap-x-4 ${classes || ''}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;