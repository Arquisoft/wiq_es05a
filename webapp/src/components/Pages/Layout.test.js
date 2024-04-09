import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Extiende las expectativas de Jest
import Layout from './Layout'; // Importa el componente a probar
import { BrowserRouter as Router } from "react-router-dom";

describe('Layout component', () => {
  // Mock de setIsLogged
  const setIsLogged = jest.fn();

  // Mock de localStorage.setItem
  const mockLocalStorageSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');

  // Props para el estado de inicio de sesión
  const initialLoggedInProps = {
    isLogged: true,
    setIsLogged: setIsLogged,
  };

  // Props para el estado sin inicio de sesión
  const initialLoggedOutProps = {
    isLogged: false,
    setIsLogged: setIsLogged,
  };

  // Configuración inicial de la prueba
  beforeEach(() => {
    setIsLogged.mockClear(); // Limpiar los mocks antes de cada prueba
    mockLocalStorageSetItem.mockClear();
  });

  it('renders navigation links correctly when logged out', () => {
    // Renderiza el componente con las props sin inicio de sesión
    const { getByText, queryByText } = render(<Router><Layout {...initialLoggedOutProps} /></Router>);

    // Verifica que los enlaces de "Inicia Sesión" y "Regístrate" estén presentes
    expect(getByText('Inicia Sesión')).toBeInTheDocument();
    expect(getByText('Regístrate')).toBeInTheDocument();

    // Verifica que el botón "Estadísticas" no esté presente
    expect(queryByText('Estadísticas')).not.toBeInTheDocument();
  });

  it('clicking "Cerrar sesión" button logs out user', () => {
    // Renderiza el componente con las props de inicio de sesión
    const { getByText } = render(<Layout {...initialLoggedInProps} />);

    // Simula hacer clic en el botón "Cerrar sesión"
    fireEvent.click(getByText('Cerrar sesión'));

    // Verifica que setIsLogged haya sido llamado con false
    expect(setIsLogged).toHaveBeenCalledWith(false);

    // Verifica que localStorage.setItem haya sido llamado con false
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith('isLogged', JSON.stringify(false));
  });
});
