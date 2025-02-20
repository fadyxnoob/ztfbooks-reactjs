import React from "react";
import { Link } from "react-router-dom";
import FailImage from "../../assets/images/payment-fail.png";
const FailedBox = ({ pathTo }) => {
  const wrapperStyles = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingBottom: "2rem",
    border: "1px solid #D2D2D2",
  };

  return (
    <div
      className={`fixed  w-full flex items-center justify-center bg-white/10 z-50 top-0`}
    >
      <div
        className="bg-white/20 rounded-lg shadow-lg w-full md:mx-4 md:w-[627px] p-4 md:p-20 pb-8 flex flex-col items-center space-y-6 border border-white/30 backdrop-blur-lg "
        style={wrapperStyles}
      >
        {/* Check circle container */}
        <div className="size-[178px] md:w-37 md:h-37 flex items-center justify-center rounded-full">
          <div className="size-full md:w-31 md:h-31 flex items-center justify-center">
            <img src={FailImage} alt={FailImage} className="size-full" />
          </div>
        </div>

        <h2 className="text-[#01447E] text-lg md:text-xl font-medium text-center mb-8 md:mb-[3.8rem] mt-4 md:mt-8">
          “Oops! Something Went Wrong"
        </h2>
        <p className="text-[#545454] text-base">
          "Unfortunately, your transaction could not be completed. Please check
          your payment details or try again."
        </p>
        <div className="flex flex-col gap-0 space-0">
          <Link to={pathTo}>
            <button className="border cursor-pointer w-100 mb-8  bg-[#01447E] hover-bg-[#01447E] text-white rounded-3xl py-3 md:py-4 px-4 font-medium hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Retry Payment
            </button>
          </Link>
          <Link to={"/"}>
            <button className="border-2 cursor-pointer w-100 mb-8  border-[#01447E] text-[#01447E] rounded-3xl py-3 md:py-4 px-4 font-medium  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FailedBox);
