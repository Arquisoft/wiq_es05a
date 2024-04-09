import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Juego from '../Pages/Juego';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Juego component', () => {
  let mock;
  //Toda la informacion mockeada
  //Para las preguntas
  const mockData = {
    question: '¿Cuál es la capital de Francia?',
    answerGood: 'París',
    answers: ['Londres', 'Madrid', 'Berlín', 'París']
  };
  //Para actualizar estadísticas
  const responseData = { success: true };
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  beforeEach(() => {
    mock = new MockAdapter(axios);
     //Al hacer la llamada a la pregunta, devolvemos la informacion mockeada
     mock.onGet('http://localhost:8000/pregunta').reply(200, mockData);
     //Al hacer la llamada a la ruta de actualizar estadisticas, devolvemos el resultado mockeado
     mock.onGet('http://localhost:8000/updateStats?username=test&numRespuestasCorrectas=0&numRespuestasIncorrectas=0').reply(200,responseData);
    });

  afterEach(() => {
    mock.restore();
  });

  it('obtiene las preguntas y respuestas', async () => {
     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);

     await waitFor(() => getByText('CARGANDO...'));

     await waitFor(() => getByText(mockData.question));

     expect(getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument();
     expect(getByText('París')).toBeInTheDocument();
     expect(getByText('Londres')).toBeInTheDocument();
     expect(getByText('Berlín')).toBeInTheDocument();
     expect(getByText('Madrid')).toBeInTheDocument();
     expect(getByText('1 / 1')).toBeInTheDocument();
   });

   it('responde la pregunta correctamente', async () => {
     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);

     await waitFor(() => getByText(mockData.question));

     fireEvent.click(getByText('París')); 
     expect(getByText('París')).toHaveStyle('background-color: #05B92B; border: 6px solid #05B92B');
     //Todos los botones deben deshabilitarse
     expect(getByText('París')).toBeDisabled();
     expect(getByText('Londres')).toBeDisabled();
     expect(getByText('Berlín')).toBeDisabled();
     expect(getByText('Madrid')).toBeDisabled();
   });

   it('responde la pregunta incorrectamente y despinta al hacer click en Siguiente', async () => {
     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={2} />);

     await waitFor(() => getByText(mockData.question));

     fireEvent.click(getByText('Londres')); 
     expect(getByText('Londres')).toHaveStyle('background-color: #E14E4E; border: 6px solid #E14E4E');
     //La correcta se pone en verde
     expect(getByText('París')).toHaveStyle('background-color: #05B92B; border: 6px solid #05B92B');
     //Todos los botones deben deshabilitarse
     expect(getByText('París')).toBeDisabled();
     expect(getByText('Londres')).toBeDisabled();
     expect(getByText('Berlín')).toBeDisabled();
     expect(getByText('Madrid')).toBeDisabled();

     //Al hacer click en Siguiente, se habilitan los botones y se despintan
     fireEvent.click(getByText('SIGUIENTE')); 
     await waitFor(() => getByText(mockData.question));
     expect(getByText('París')).toBeEnabled();
     expect(getByText('Londres')).toBeEnabled();
     expect(getByText('Berlín')).toBeEnabled();
     expect(getByText('Madrid')).toBeEnabled();
     expect(getByText('París')).toHaveStyle('background-color: #FFFFFF');
     expect(getByText('París')).toHaveStyle('background-color: #FFFFFF');
     expect(getByText('París')).toHaveStyle('background-color: #FFFFFF');
     expect(getByText('París')).toHaveStyle('background-color: #FFFFFF');
     
   });

   it('finalizar Juego', async () => {
     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);
     await waitFor(() => getByText(mockData.question));
     fireEvent.click(getByText('SIGUIENTE')); 
     fireEvent.click(getByText('FINALIZAR PARTIDA')); 
     expect(getByText('FINALIZAR PARTIDA')).toBeDisabled();
     console.log(container.numRespuestasCorrectas)
     //expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/updateStats?username=test&numRespuestasCorrectas=0&numRespuestasIncorrectas=0');
    });
    
    it('el temporizador llega a 0 y se desvelan las respuestas ademas de bloquearse los botones', async () => {
      const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);
 
      await waitFor(() => getByText(mockData.question));
      act(() => {
        jest.advanceTimersByTime(30000); // Espera 30 segundos
      });
      expect(getByText('París')).toBeDisabled();
      expect(getByText('Londres')).toBeDisabled();
      expect(getByText('Berlín')).toBeDisabled();
      expect(getByText('Madrid')).toBeDisabled();
    });


    

});