import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './componentes/Login'
import AdminPage from './paginas/AdminPage'
import GerentePage from './paginas/GerentePage'
import ClientePage from './paginas/ClientePage'
import RutaProtegida from './componentes/RutaProtegida';
import VerUsuariosPage from './paginas/VerUsuariosPage';
import CrearUsuario from './paginas/CrearUsuario';
import VerDevs from './paginas/VerDevs';
import CrearDev from './paginas/CrearDev';

const App = () => {
  return(
    <Router>
      <Routes>
        {/* Route para el index */}
        <Route path="/" element={<Login />}/>
        {/* Routes para las rutas protegidas para solo admin */}
        <Route path="/admin" element={
          <RutaProtegida rolPermitido="admin">
            <AdminPage />
          </RutaProtegida>
          }/>
        <Route path="/ver-usuarios"  element={
          <RutaProtegida rolPermitido="admin">
            <VerUsuariosPage />
          </RutaProtegida>
          }/>
        <Route path="/crear-usuario"  element={
            <RutaProtegida rolPermitido="admin">
              <CrearUsuario />
            </RutaProtegida>
            }/>
        <Route path="/ver-desarrolladores"  element={
            <RutaProtegida rolPermitido="admin">
              <VerDevs />
            </RutaProtegida>
            }/>
        <Route path="/crear-desarrollador"  element={
            <RutaProtegida rolPermitido="admin">
              <CrearDev /> 
            </RutaProtegida>
            }/>
        {/* Routes para rutas protegidas para solo gerentes */}
        <Route path="/gerente" element={
          <RutaProtegida rolPermitido="gerente">
            <GerentePage />
          </RutaProtegida>
          }/>
        {/* Routes para rutas protegidas para solo clientes */}
        <Route path="/cliente" element={
          <RutaProtegida rolPermitido="cliente">
            <ClientePage />
          </RutaProtegida>
          }/>
        <Route path="*" element={<Login />} /> {/* Redirige a Login si la ruta no es válida */}
      </Routes> 
    </Router>
  );  
};

export default App
