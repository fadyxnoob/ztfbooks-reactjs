import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const ForgotPassword = () => {
  const [method, setMethod] = useState('phone'); // Default to 'phone'
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const baseButtonClass = "py-3 px-8 rounded transition-colors duration-200 text-center cursor-pointer";
  const activeButtonClass = `${baseButtonClass} bg-[#01447E] text-[#D2D2D2]`;
  const inactiveButtonClass = `${baseButtonClass} bg-[#D2D2D2] text-[#01447E] border border-gray-300`;

  const inputClasses = "w-full px-3 py-3 bg-[#D2D2D2] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";

  const wrapperStyles = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingBottom: "2rem",
    border: "1px solid #D2D2D2"
  };

  const methodHandler = useCallback((method) => {
    console.log('Setting method to:', method);
    setMethod(method);
  }, []);

  return (
    <div className="w-full h-[1440px] d-flex justify-center items-center py-8 bg-[#fff]">
      <div className="min-w-[627px] h-[913px] max-w-md mx-auto bg-white shadow-lg" style={wrapperStyles}>
        <div className="flex flex-col items-center mb-0">
          <div className="bg-blue-50 p-4 rounded-full mb-12 w-[100px] h-[100px] flex justify-center items-center">
            <BsSearch className="w-12 h-12 text-blue-800" />
          </div>
          <h2 className="text-[2.8rem] text-[#01447E] font-medium text-blue-900 mb-8">Forgot Password?</h2>
          <p className="text-sm text-gray-600 text-[#01447E] text-[1rem] font-bold text-center">
            Recover your password through Email or Phone Number
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-[2.5rem]">
          <div className="flex justify-between items-center gap-4 mb-6">
            <Button
              classNames={method === 'email' ? activeButtonClass : inactiveButtonClass}
              onClick={() => methodHandler('email')} // Set method to 'email'
            >
              Email
            </Button>
            <Button
              classNames={method === 'phone' ? activeButtonClass : inactiveButtonClass}
              onClick={() => methodHandler('phone')} // Set method to 'phone'
            >
              Phone
            </Button>
          </div>

          <div className="mt-[5rem]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {method === 'email' ? 'Email' : 'Phone'}
              </label>
              <Input
                key={method} // Force re-render when method changes
                type={method === 'email' ? 'email' : 'tel'} // Dynamic type based on method
                name={method}
                placeholder={method === 'email' ? 'Enter your email' : '03**********'}
                classes={inputClasses}
                inputRegister={register(method, {
                  required: true,
                  pattern: method === 'email'
                    ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i // Email regex
                    : /^03[0-9]{9}$/ // Phone regex (for Pakistan)
                })}
              />
              {errors[method] && (
                <p className="mt-1 text-sm text-red-600">
                  {method === 'email'
                    ? 'Please enter a valid email address'
                    : 'Please enter a valid phone number'}
                </p>
              )}
            </div>

            <Button
              classNames="cursor-pointer mt-[4rem] w-full bg-[#01447E] text-[#D2D2D2] py-3 px-4 rounded-md hover:bg-blue-900 transition-colors"
              type="submit"
            >
              Reset Password
            </Button>
          </div>

          <div className="mt-4">
            <span className="text-[1.2rem] text-[#01447E] text-medium">Back to </span>
            <Button
              path="/login"
              classNames="text-[1.2rem] text-sm text-blue-800"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);