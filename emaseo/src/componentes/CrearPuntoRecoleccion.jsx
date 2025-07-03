import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CrearPuntoRecoleccion.css';
import { useNavigate, useParams } from 'react-router-dom';

const CrearPuntoRecoleccion = ({ onCrear }) => {
    const [form, setForm] = useState({
        direccion: '',
        tipo: '',
        estado: '',
        observaciones: '',
        esCentroAcopio: false,
        esPeligroso: false,
        esElectronico: false,
        esResiduoGranTamano: false,
    });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const volverInicio = () => {
        navigate('/');
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3002/puntosRecoleccion/${id}`)
                .then(res => {
                    const data = res.data;
                    setForm({
                        direccion: data.direccion || '',
                        tipo: data.tipo || '',
                        estado: data.estado || '',
                        observaciones: data.observaciones || '',
                        esCentroAcopio: !!data.esCentroAcopio,
                        esPeligroso: !!data.esPeligroso,
                        esElectronico: !!data.esElectronico,
                        esResiduoGranTamano: !!data.esResiduoGranTamano,
                    });
                })
                .catch(err => {
                    setMensaje('Error al cargar el punto de recolección.');
                    console.error(err);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectBool = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value === 'true'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3002/puntosRecoleccion/${id}`, form);
                setMensaje('Punto de recolección actualizado exitosamente.');
            } else {
                await axios.post('http://localhost:3002/puntosRecoleccion', form);
                setMensaje('Punto de recolección creado exitosamente.');
                if (onCrear) onCrear(form);
                setForm({
                    direccion: '',
                    tipo: '',
                    estado: '',
                    observaciones: '',
                    esCentroAcopio: false,
                    esPeligroso: false,
                    esElectronico: false,
                    esResiduoGranTamano: false,
                });
            }
            setTimeout(() => navigate('/lista'), 1000);
        } catch (error) {
            setMensaje('Error al guardar el punto de recolección.');
            console.error(error);
        }
    };

    return (
        <div className="crear-punto-recoleccion">
            <h2>{id ? 'Editar Punto de Recolección' : 'Crear Punto de Recolección'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Dirección:
                        <input
                            type="text"
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Tipo:
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="reciclaje">Reciclaje</option>
                            <option value="especial">Especial</option>
                            <option value="ordinario">Ordinario</option>
                            <option value="critico">Critico</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Estado:
                        <select
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Observaciones:
                        <textarea
                            name="observaciones"
                            value={form.observaciones}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                {form.tipo === 'reciclaje' && (
                    <div>
                        <label>
                            ¿Es centro de acopio?
                            <select
                                name="esCentroAcopio"
                                value={form.esCentroAcopio ? 'true' : 'false'}
                                onChange={e => handleSelectBool('esCentroAcopio', e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="true">Sí</option>
                            </select>
                        </label>
                    </div>
                )}
                {form.tipo === 'especial' && (
                    <>
                        <div>
                            <label>
                                ¿Es peligroso?
                                <select
                                    name="esPeligroso"
                                    value={form.esPeligroso ? 'true' : 'false'}
                                    onChange={e => handleSelectBool('esPeligroso', e.target.value)}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Sí</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                ¿Es electrónico?
                                <select
                                    name="esElectronico"
                                    value={form.esElectronico ? 'true' : 'false'}
                                    onChange={e => handleSelectBool('esElectronico', e.target.value)}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Sí</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                ¿Es residuo de gran tamaño?
                                <select
                                    name="esResiduoGranTamano"
                                    value={form.esResiduoGranTamano ? 'true' : 'false'}
                                    onChange={e => handleSelectBool('esResiduoGranTamano', e.target.value)}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Sí</option>
                                </select>
                            </label>
                        </div>
                    </>
                )}
                <button type="submit">{id ? 'Guardar Cambios' : 'Crear'}</button>
                <button className="volver-inicio-btn" type="button" onClick={volverInicio}>
                    Volver al Inicio
                </button>
            </form>
            <p>{mensaje}</p>
        </div>
    );
};

export default CrearPuntoRecoleccion;
