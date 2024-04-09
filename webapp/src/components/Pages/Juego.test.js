import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Juego from './Juego';//

describe('Juego component', () => {
  let mock;
  const mockData = {
    question: '¿Cuál es la capital de Francia?',
    answerGood: 'París',
    answers: ['Londres', 'Madrid', 'Berlín', 'París']
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
     mock.onGet('http://localhost:8000/pregunta').reply(200, mockData);
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

   it('responde la pregunta incorrectamente', async () => {
     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);

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
   });

  //  it('se acaba el tiempo y se revelan las preguntas', async () => {
  //   const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);

  //   await waitFor(() => getByText(mockData.question));

    //Esperamos a que el temporizador sea 0 (no funciona)
    // await waitFor(() => {
    //   const componente = getById('temp');
    //   expect(componente.textContent).toBe(0);
    // });

    //Todos los botones deben deshabilitarse
    // expect(getByText('París')).toBeDisabled();
    // expect(getByText('Londres')).toBeDisabled();
    // expect(getByText('Berlín')).toBeDisabled();
    // expect(getByText('Madrid')).toBeDisabled();

    //});

  

    


    

});