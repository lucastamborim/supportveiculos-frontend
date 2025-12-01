import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import Home from './pages/Home/Home'
import Detail from './pages/Detail/Detail'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreateEdit from './pages/CreateEdit/CreateEdit'
import ManagePhotos from './pages/ManagePhotos/ManagePhotos'
import MyAds from './pages/MyAds/MyAds'


import Header from './components/Header/Header'
import PrivateRoute from './routes/PrivateRoute'


export default function App(){
return (
<div>
<Header />
<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/anuncio/:id" element={<Detail />} />


<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


<Route path="/anunciar" element={<PrivateRoute><CreateEdit /></PrivateRoute>} />
<Route path="/anuncio/:id/editar" element={<PrivateRoute><CreateEdit /></PrivateRoute>} />
<Route path="/anuncio/:id/fotos" element={<PrivateRoute><ManagePhotos /></PrivateRoute>} />
<Route path="/meus-anuncios" element={<PrivateRoute><MyAds /></PrivateRoute>} />


<Route path="*" element={<Navigate to='/' replace />} />
</Routes>
</main>
</div>
)
}