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

  const renderComponent = () => render(<AddUser />);

  const setupMockedUsernames = (usernames) => {
    mockAxios.onGet(`http://localhost:8000/getUsernames`).reply(200, { usernames });
  };

  const setupSuccessfulResponse = () => {
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);
  };

  const setupErrorResponse = (statusCode, errorMessage) => {
    mockAxios.onPost('http://localhost:8000/adduser').reply(statusCode, { error: errorMessage });
  };

  const typeUsernameAndPassword = (username, password) => {
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
  };

  const clickCreateUserButton = () => {
    const createUserButton = screen.getByRole('button', { name: /Crear/i });
    fireEvent.click(createUserButton);
  };

  it('should add user successfully', async () => {
    renderComponent();
    setupSuccessfulResponse();
    typeUsernameAndPassword('testUser', 'testPassword');
    clickCreateUserButton();
    await waitFor(() => {
      expect(screen.getByText(/Usuario creado correctamente/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    renderComponent();
    setupErrorResponse(500, 'Internal Server Error');
    typeUsernameAndPassword('testUser', 'testPassword');
    clickCreateUserButton();
    await waitFor(() => {
      expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
    });
  });

  it('should show error message for short password', async () => {
    renderComponent();
    setupMockedUsernames([]);
    setupSuccessfulResponse();
    typeUsernameAndPassword('testUser', 'sh');
    clickCreateUserButton();
    await waitFor(() => {
      expect(screen.getByText(/Error: Credenciales incorrectas. La contraseña debe contener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show error message for repeated username', async () => {
    renderComponent();
    setupMockedUsernames(['existingUser']);
    setupSuccessfulResponse();
    typeUsernameAndPassword('existingUser', 'passwordCorrect');
    clickCreateUserButton();
    await waitFor(() => {
      expect(screen.getByText(/Error: Credenciales incorrectas. El nombre de usuario esta en uso/i)).toBeInTheDocument();
    });
  });

});
