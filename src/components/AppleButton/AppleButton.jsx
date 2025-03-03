import React from 'react'
import { Link } from 'react-router-dom';
import { FaApple } from "react-icons/fa";


const AppleButton = () => {
    return (
       <Link to={""}>
         <button className="flex items-center justify-start gap-4 w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 text-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <FaApple size={55} />
          <span>Sign up with Apple</span>
        </button>
       </Link>
      );
}

export default React.memo(AppleButton)
