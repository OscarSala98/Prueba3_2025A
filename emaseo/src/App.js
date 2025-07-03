import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './componentes/Layout';
import Inicio from './componentes/Inicio.jsx';
import ListaPuntosRecoleccion from './componentes/ListaPuntosRecoleccion';
import CrearPuntoRecoleccion from './componentes/CrearPuntoRecoleccion.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/lista" element={<ListaPuntosRecoleccion/>} />
          <Route path="/crear" element={<CrearPuntoRecoleccion />} />
          <Route path="/editar/:id" element={<CrearPuntoRecoleccion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
