import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página de inicio después de un breve retraso
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 2000); // Redirigir después de 3 segundos

    // Limpia el temporizador al desmontar el componente para evitar fugas de memoria
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div>
      <h1>404 - Página no encontrada</h1>
    </div>
  );
};

export default NotFound;