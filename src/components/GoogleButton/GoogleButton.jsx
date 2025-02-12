import React from 'react'
import { Link } from 'react-router-dom';


// React Icons
import { FcGoogle } from "react-icons/fc";


const GoogleButton = () => {
  return (
    <Link to={""}>
      <button className="flex items-center justify-start gap-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-[#043133] font-medium text-gray-700 text-[18px] hover:bg-gray-50 transition-colors">
    <FcGoogle size={55} />
    <span className='text-[1.4rem]'>Sign up with Google</span>
  </button>
    </Link>
  )
}

export default GoogleButton
