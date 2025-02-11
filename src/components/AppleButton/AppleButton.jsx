import React from 'react'

// React Icons
import { FaApple } from "react-icons/fa";



const AppleButton = () => {
    return (
        <button className="text-[#043133] flex items-center justify-start gap-4 w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-[18px] hover:bg-gray-50 transition-colors">
          <FaApple size={55} />
          <span>Sign up with Apple</span>
        </button>
      );
}

export default AppleButton
