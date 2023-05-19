import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute() {
    const { error, isAuthenticated } = useSelector(
        (state) => state.User
    );


    return isAuthenticated === true ? <Outlet /> : <Navigate to="/" />;





};


export default ProtectedRoute