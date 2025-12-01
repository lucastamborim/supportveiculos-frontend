import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'


export default function PrivateRoute({ children }){
const { isAuthenticated, isLoading } = useContext(AuthContext)
if (isLoading) return <div>Carregando...</div>
if (!isAuthenticated) return <Navigate to="/login" replace />
return children
}