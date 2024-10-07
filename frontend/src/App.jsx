import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login'
import AdminPage from './paginas/AdminPage'

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/gerente" element={<GerentePage />}/>
        <Route path="/cliente" element={<ClientePage />}/>
        <Route path="*" element={<Login />} /> {/* Redirige a Login si la ruta no es válida */}

      </Routes> 
    </Router>
  );  
};

export default App
