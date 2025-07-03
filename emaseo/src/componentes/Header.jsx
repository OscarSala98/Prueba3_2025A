import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="header">
            <h1>Gestor de Puntos de Recolección</h1>
            <nav>
                <span
                    className={`header-nav-link${location.pathname === '/' ? ' active' : ''}`}
                    onClick={() => navigate('/')}
                >
                    Inicio
                </span>
                <span
                    className={`header-nav-link${location.pathname === '/lista' ? ' active' : ''}`}
                    onClick={() => navigate('/lista')}
                >
                    Lista de Puntos de recolección
                </span>
                <span
                    className={`header-nav-link${location.pathname === '/crear' ? ' active' : ''}`}
                    onClick={() => navigate('/crear')}
                >
                    Crear Punto de recolección
                </span>
            </nav>
        </header>
    );
};

export default Header;