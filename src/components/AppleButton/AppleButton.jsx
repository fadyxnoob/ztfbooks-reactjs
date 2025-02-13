import React from 'react'
import { Link } from 'react-router-dom';

// React Icons
import { FaApple } from "react-icons/fa";



const AppleButton = () => {
    return (
       <Link to={""}>
         <button className="text-[#043133] flex items-center justify-start gap-4 w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-[18px] hover:bg-gray-50 transition-colors">
          <FaApple size={55} />
          <span className='text-[1.4rem]'>Sign up with Apple</span>
        </button>
       </Link>
      );
}

export default AppleButton
