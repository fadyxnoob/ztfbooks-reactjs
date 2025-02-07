import React from 'react';

const Input = ({ name, type = "text", classes = "", placeholder, children, inputRegister, label = false, ...props }) => {
  return (
    <>
      <div className="relative w-full">
        <input
          {...inputRegister}
          type={type}
          placeholder={placeholder}
          className={classes}
          {...props}
        />
        {children && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {children}
          </div>
        )}
      </div>
      
    </>
  );
};

export default React.memo(Input)