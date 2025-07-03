import React from 'react';

const PuntoRecoleccion = ({
    id,
    direccion,
    tipo,
    estado,
    observaciones,
    esCentroAcopio, // solo para reciclaje
    esPeligroso,    // solo para especial
    esElectronico,  // solo para especial
    esResiduoGranTamano // solo para especial
}) => {
    return (
        <div className="punto-recoleccion">
            <h3>Punto de Recolección</h3>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Dirección:</strong> {direccion}</p>
            <p><strong>Tipo:</strong> {tipo}</p>
            <p><strong>Estado:</strong> {estado}</p>
            <p><strong>Observaciones:</strong> {observaciones}</p>

            {tipo === 'reciclaje' && (
                <div>
                    <p><strong>¿Es contenedor?</strong> {!esCentroAcopio ? 'Sí' : 'No'}</p>
                    <p><strong>¿Es centro de acopio?</strong> {esCentroAcopio ? 'Sí' : 'No'}</p>
                </div>
            )}

            {tipo === 'especial' && (
                <div>
                    <p><strong>¿Es peligroso?</strong> {esPeligroso ? 'Sí' : 'No'}</p>
                    <p><strong>¿Es electrónico?</strong> {esElectronico ? 'Sí' : 'No'}</p>
                    <p><strong>¿Es residuo de gran tamaño?</strong> {esResiduoGranTamano ? 'Sí' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default PuntoRecoleccion;