import React from 'react';
import './Footer.css';

const Footer = () => {
    const [horaActual, setHoraActual] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setHoraActual(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer>
            <p>© 2025 - Todos los derechos reservados</p>
            <p>Hora actual: {horaActual.toLocaleTimeString()}</p>
        </footer>
    );
};

export default Footer;
