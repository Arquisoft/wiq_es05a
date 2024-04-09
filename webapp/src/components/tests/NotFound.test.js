import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../Pages/NotFound';
import { BrowserRouter as Router } from 'react-router-dom';

jest.useFakeTimers();

describe('NotFound component', () => {
  test('redirects to home page after a brief delay', async () => {
    const { queryByText } = render(
      <Router>
        <NotFound />
      </Router>
    );

    // Verifica que el mensaje de error 404 esté presente
    expect(queryByText('404 - Página no encontrada')).toBeInTheDocument();

    // Avanza en el tiempo para simular el retraso de redirección
    jest.advanceTimersByTime(2000); // Avanza en el tiempo por 2 segundos

    // Espera a que se redirija a la página de inicio
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});