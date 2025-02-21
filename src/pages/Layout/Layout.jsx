import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
const Layout = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
