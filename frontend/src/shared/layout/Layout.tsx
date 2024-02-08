import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import React from 'react'
import { Navbar } from '@/widgets/Navbar'

export const Layout = () => {

    return ( <div className="d-flex flex-column h-100">
        <Navbar />
        <Outlet />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    </div>
)}
