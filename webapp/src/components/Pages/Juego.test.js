import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Juego from './Juego';

// Mock de axios para simular respuestas de la API
jest.mock('axios');

describe('<Juego />', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('debería renderizar el componente correctamente', () => {
    const { getByText } = render(<Juego />);
    expect(getByText('CARGANDO...')).toBeInTheDocument();
  });

  it('debería mostrar la pregunta y las respuestas después de cargar', async () => {
    // Mock de respuesta exitosa de la API
    axios.get.mockResolvedValueOnce({
      data: {
        question: '¿Cuál es la capital de Francia?',
        answerGood: 'París',
        answers: ['Londres', 'Madrid', 'París', 'Berlín'],
      },
    });

    const { getByText, getByTestId } = render(<Juego />);
    
    // Esperar a que se carguen las preguntas
    await waitFor(() => {
      expect(getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument();
    });

    // Verificar que las respuestas se muestran correctamente
    expect(getByTestId('boton1')).toHaveTextContent('Londres');
    expect(getByTestId('boton2')).toHaveTextContent('Madrid');
    expect(getByTestId('boton3')).toHaveTextContent('París');
    expect(getByTestId('boton4')).toHaveTextContent('Berlín');
  });

  it('debería cambiar los colores de los botones al hacer clic en una respuesta', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        question: '¿Cuál es la capital de Francia?',
        answerGood: 'París',
        answers: ['Londres', 'Madrid', 'París', 'Berlín'],
      },
    });

    const { getByTestId } = render(<Juego />);
    await waitFor(() => {});

    fireEvent.click(getByTestId('boton3')); // Seleccionar la respuesta correcta

    // Verificar que los colores de los botones se hayan actualizado correctamente
    expect(getByTestId('boton1')).toHaveStyle('background-color: #E14E4E');
    expect(getByTestId('boton2')).toHaveStyle('background-color: #E14E4E');
    expect(getByTestId('boton3')).toHaveStyle('background-color: #05B92B');
    expect(getByTestId('boton4')).toHaveStyle('background-color: #E14E4E');
  });

  it('debería avanzar a la siguiente pregunta al hacer clic en el botón SIGUIENTE', async () => {
    axios.get.mockResolvedValue({
      data: {
        question: '¿Cuál es la capital de Francia?',
        answerGood: 'París',
        answers: ['Londres', 'Madrid', 'París', 'Berlín'],
      },
    });

    const { getByText, getByTestId } = render(<Juego />);
    await waitFor(() => {});

    fireEvent.click(getByTestId('boton3')); // Seleccionar la respuesta correcta
    fireEvent.click(getByText('SIGUIENTE'));

    // Verificar que se cargue la siguiente pregunta
    await waitFor(() => {
      expect(getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument();
    });
  });
});
