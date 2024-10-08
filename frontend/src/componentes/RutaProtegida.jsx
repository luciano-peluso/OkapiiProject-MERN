import { Navigate } from 'react-router-dom';

// Componente de ruta protegida
const RutaProtegida = ({ children, rolPermitido }) => {
    const rol = localStorage.getItem('rol'); // Obtener el rol guardado

    // Si el rol no coincide, redirigir al login
    if (rol !== rolPermitido) {
        return <Navigate to={`/${rol}`}/>;
    }

    // Si el rol es correcto, renderizar el componente hijo
    return children;
};

export default RutaProtegida