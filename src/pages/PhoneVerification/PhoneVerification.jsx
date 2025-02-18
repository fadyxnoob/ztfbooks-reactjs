import React, { useState, useRef, useEffect } from 'react';
import { LuSmartphone } from "react-icons/lu";
import { useForm } from "react-hook-form";
import service from '../../API/DBService';

const PhoneVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();


  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResend = async () => {
    const res = await service.resendOTP()
    console.log('Resending OTP...');
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
  };

  const wrapperStyles = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingBottom: "2rem",
    border: "1px solid #D2D2D2"
  }

  return (
    <div className="w-full h-[1440px] d-flex justify-center items-center py-8 bg-[#fff]">
      <div className="min-w-[627px] h-[913px] max-w-md mx-auto bg-white shadow-lg" style={wrapperStyles}>
        {/* Header */}
        <div className="text-center flex justify-center items-center flex-col">
          <h2 className="text-[2.8rem] text-[#01447E] font-medium text-blue-900 mb-12">
            Phone Verification
          </h2>
          <div className="bg-blue-50 p-4 rounded-full mb-12 w-[100px] h-[100px] flex justify-center items-center">
            <LuSmartphone className="w-12 h-12  h-6 text-blue-800" />
          </div>
          <p className="mt-6 text-[16px] text-[#333333]">
            Enter your code send to
            <br />
            +18944***0525
          </p>
        </div>

        <form
          // onSubmit={}
        >
          {/* OTP Input */}
          <div className="mt-8">
            <div className="flex justify-center space-x-4 mb-[2rem]">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{ height: "60px" }}
                  className="w-12 h-12 text-center text-3xl border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                />
              ))}
            </div>

            <div className="mt-10 text-sm ml-[5.1rem]">
              <span className="text-[#000]">Didn't received an OTP?</span>{' '}
              <button
                onClick={handleResend}
                className="ml-2 text-[#01447E] hover:text-blue-800 font-medium"
              >
                Resend
              </button>
            </div>
          </div>

          {/* Verify Button */}
          <div className='w-76 mx-auto' style={{ width: "66%" }}>
            <button
              onClick={handleVerify}
              className="mt-12 w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#D2D2D2] bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneVerification;