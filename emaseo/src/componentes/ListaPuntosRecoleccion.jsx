import './ListaPuntosRecoleccion.css';
import PuntoRecoleccion from './PuntoRecoleccion';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListaPuntosRecoleccion = () => {
    const [puntos, setPuntos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPuntos();
    }, []);

    const fetchPuntos = () => {
        axios.get('http://localhost:3002/puntosRecoleccion')
            .then(response => {
                setPuntos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los puntos de recolección:', error);
            });
    };

    const eliminarPunto = (id) => {
        axios.delete(`http://localhost:3002/puntosRecoleccion/${id}`)
            .then(() => {
                setPuntos(puntos.filter(p => p.id !== id));
            })
            .catch(error => {
                console.error('Error eliminando punto de recolección:', error);
            });
    };

    const editarPunto = (id) => {
        navigate(`/editar/${id}`);
    };

    const agregarPunto = () => {
        navigate('/crear');
    };

    return (
        <div className="lista-puntos-recoleccion-container">
            <button
                className="lista-puntos-recoleccion-agregar-btn"
                onClick={agregarPunto}
            >
                Agregar Punto de Recolección
            </button>
            {puntos && puntos.length > 0 ? (
                puntos.map((punto, idx) => (
                    <div
                        key={punto.id || idx}
                        className="lista-puntos-recoleccion-item"
                    >
                        <PuntoRecoleccion {...punto} />
                        <div className="lista-puntos-recoleccion-botones">
                            <button
                                className="lista-puntos-recoleccion-editar-btn"
                                onClick={() => editarPunto(punto.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="lista-puntos-recoleccion-eliminar-btn"
                                onClick={() => eliminarPunto(punto.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="lista-puntos-recoleccion-vacio">
                    No hay puntos de recolección disponibles.
                </p>
            )}
        </div>
    );
};

export default ListaPuntosRecoleccion;