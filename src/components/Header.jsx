import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import './Header.css'

export default function Header(){
  const { isAuthenticated, user, signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">Support Veículos</Link>
        <nav>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/meus-anuncios">Meus Anúncios</Link>
              <Link to="/anunciar">Anunciar</Link>
              <button className="link-btn" onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Registrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
