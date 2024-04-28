import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from '../AddUser';

const mockAxios = new MockAdapter(axios);

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should add user successfully', async () => {
    render(<AddUser />);

    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Crear/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Usuario creado correctamente/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    render(<AddUser />);

    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const addUserButton = screen.getByRole('button', { name: /Crear/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
    });
  });





  // it('should display error message for short password', async () => {
  //   render(<AddUser />);

  //   const usernameInput = screen.getByLabelText(/Usuario/i);
  //   const passwordInput = screen.getByLabelText(/Contraseña/i);
  //   const createUserButton = screen.getByRole('button', { name: /Crear/i });

  //   fireEvent.change(usernameInput, { target: { value: 'newusername' } });
  //   fireEvent.change(passwordInput, { target: { value: 'err' } });

  //   fireEvent.click(createUserButton);

  //   expect(await screen.findByText(/Error: Credenciales incorrectas. La contraseña debe contener al menos 8 caracteres/i)).toBeInTheDocument();
  // });


  // it('should display error message for repeated username', async () => {
  //   const mockAxios = new MockAdapter(axios);
  //   const mockedUsernames = ['existingUser'];
  //   mockAxios.onGet(`http://localhost:8000/getUsernames`).reply(200, { usernames: mockedUsernames });

  //   render(<AddUser />);

  //   const usernameInput = screen.getByLabelText(/Usuario/i);
  //   const passwordInput = screen.getByLabelText(/Contraseña/i);
  //   const createUserButton = screen.getByRole('button', { name: /Crear/i });

  //   fireEvent.change(usernameInput, { target: { value: 'existingUser' } });
  //   fireEvent.change(passwordInput, { target: { value: 'short123456' } });

  //   fireEvent.click(createUserButton);

  //   expect(await screen.findByText(/Usuario creado correctamente/i)).toBeInTheDocument();
  // });
  
});

