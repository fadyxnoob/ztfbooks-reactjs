import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const VerificationSuccess = ({
  title = "",
  message,
  buttonText = "",
  classNames,
  pathTo
}) => {
  const wrapperStyles = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingBottom: "2rem",
    border: "1px solid #D2D2D2",
  };

  return (
    <div
      className={`${
        classNames
          ? classNames
          : `min-h-screen w-full flex items-center justify-center py-8 `
      }`}
    >
      <div
        className="shadow-lg w-full md:mx-4 md:w-[627px] p-4 md:p-20 pb-8 flex flex-col items-center space-y-6 bg-white/20 border border-white/30 backdrop-blur-lg rounded-lg"
        style={wrapperStyles}
      >
        {/* Check circle container */}
        <div
          className="w-28 h-28 md:w-37 md:h-37 flex items-center justify-center border-2 rounded-full"
          style={{ border: "10px solid #01447E" }}
        >
          <div className="w-24 h-24 md:w-31 md:h-31 flex items-center justify-center border-2-white">
            <BsCheckCircleFill className="w-full h-full text-[#01447E]" />
          </div>
        </div>

        <h2 className="text-[#01447E] text-lg md:text-xl font-medium text-center mb-8 md:mb-[3.8rem] mt-4 md:mt-8">
          {title || "Code Verified Successfully"}
        </h2>
        {message && <p className="text-[#545454]">{message}</p>}
        <Link
        to={pathTo}
        >
        <button
          className="cursor-pointer w-full md:w-100 mb-8 md:mb-[10rem] bg-[#01447E] hover-bg-[#01447E] text-white rounded-3xl py-3 md:py-4 px-4 font-medium hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonText || "Continue to Login"}
        </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(VerificationSuccess);
