import { Navigate } from 'react-router-dom';

// Componente de ruta protegida
const RutaProtegida = ({ children, rolPermitido }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario')); // Obtener el usuario guardado

    // Si el rol no coincide, redirigir al login
    if (usuario.rol !== rolPermitido) {
        return <Navigate to={`/login`}/>;
    } 

    // Si el rol es correcto, renderizar el componente hijo
    return children;
};

export default RutaProtegida