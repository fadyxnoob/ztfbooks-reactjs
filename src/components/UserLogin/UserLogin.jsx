import React from 'react'
import Image from '../../assets/images/author.png'
const UserLogin = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={Image} alt="" className='size-[50px] object-cover' />
            <p className='text-base font-medium text-[#333333] hidden md:block'>Welcome <br /> Amjad</p>
        </div>
    )
}

export default React.memo(UserLogin)
