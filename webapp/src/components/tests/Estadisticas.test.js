import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axiosMock from 'axios';
import Estadisticas from '../Pages/Estadisticas';

// Mock de datos para simular la respuesta del servidor
const mockUserData = {
  user: {
    correctAnswers: 10,
    incorrectAnswers: 5,
    completedGames: 20,
    averageTime: 30,
  },
};

// Mock de axios.get para simular la solicitud al servidor
jest.mock('axios');

describe('Estadisticas Component', () => {
  it('renders estadisticas component with user data', async () => {
    // Configuración del mock de axios.get para devolver los datos simulados
    axiosMock.get.mockResolvedValueOnce({ data: mockUserData });

    // Renderizar el componente
    const { getByText } = render(<Estadisticas isLogged={true} username="testUser" />);

    // Esperar a que se carguen los datos del usuario
    await waitFor(() => {
      // Verificar que los datos del usuario se muestran en el componente
      expect(getByText('Nº Preguntas acertadas:')).toBeInTheDocument();
      expect(getByText('10')).toBeInTheDocument(); // Verifica que el número de preguntas acertadas sea 10

      expect(getByText('Nº Preguntas falladas:')).toBeInTheDocument();
      expect(getByText('5')).toBeInTheDocument(); // Verifica que el número de preguntas falladas sea 5

      expect(getByText('Nº Juegos completados:')).toBeInTheDocument();
      expect(getByText('20')).toBeInTheDocument(); // Verifica que el número de juegos completados sea 20

      expect(getByText('Tiempo medio por juego:')).toBeInTheDocument();
      expect(getByText('30')).toBeInTheDocument(); // Verifica que el tiempo medio por juego sea 30
    });
  });

  it('renders error message if user data fetching fails', async () => {
    // Configuración del mock de axios.get para simular un error al obtener los datos del usuario
    axiosMock.get.mockRejectedValueOnce(new Error('Network Error'));

    // Renderizar el componente
    const { getByText } = render(<Estadisticas isLogged={true} username="testUser" />);

    // Esperar a que se cargue el mensaje de error
    await waitFor(() => {
      // Verificar que el mensaje de error se muestra en el componente
      expect(getByText('Error al cargar la información')).toBeInTheDocument();
    });
  });
});
