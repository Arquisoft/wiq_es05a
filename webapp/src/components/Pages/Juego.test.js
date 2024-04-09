import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Juego from './Juego';

describe('Juego component', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('fetches questions when mounted', async () => {
    const mockData = {
      question: '¿Cuál es la capital de Francia?',
      answerGood: 'París',
      answers: ['Londres', 'Madrid', 'Berlín', 'París']
    };

     mock.onGet('http://localhost:8000/pregunta').reply(200, mockData);

     const { container, getByText } = render(<Juego isLogged={true} username="test" numPreguntas={1} />);
     await waitFor(() => getByText('CARGANDO...'));

     await waitFor(() => getByText(mockData.question));

     expect(getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument();
     expect(getByText('París')).toBeInTheDocument();
     expect(getByText('Londres')).toBeInTheDocument();
     expect(getByText('Berlín')).toBeInTheDocument();
     expect(getByText('1 / 1')).toBeInTheDocument();
   });

  

});