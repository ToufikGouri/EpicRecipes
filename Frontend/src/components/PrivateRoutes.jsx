import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

    const isLoggedIn = localStorage.getItem("isLoggedIn")

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes