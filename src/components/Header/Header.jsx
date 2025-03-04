import React, { useEffect } from 'react'
import Topbar from './Topbar/Topbar'
import Navbar from './Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { fetchCartItems } from '../../Store/cartSlice'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);
  return (
    <div className=''>
      <Topbar />
      <Navbar />
    </div>
  )
}

export default Header
