import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../Login';
import userEvent from '@testing-library/user-event'

const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();  
  });

  it('should render correctly', async () => {
    render(<Login isLogged={false} setIsLogged={jest.fn()} username={''} setUsername={jest.fn()}/>);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  })

  it('should log in successfully', async () => {
    render(<Login isLogged={false} setIsLogged={jest.fn()} username={'testUser'} setUsername={jest.fn()}/>);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/login').reply(200, { createdAt: '2024-01-01T12:34:56Z' });

    // Simulate user input
    await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        fireEvent.click(loginButton);
      });
    
    // Verify that the user information is displayed
    expect(screen.getByText(/Login successful/i)).toBeInTheDocument(); 
    //expect(screen.getByText(/Your account was created on 1\/1\/2024/i)).toBeInTheDocument();
  });

  it('logged in successfully', async () => {
    render(<Login isLogged={true} setIsLogged={jest.fn()} username={'testUser'} setUsername={jest.fn()}/>);
    
    // Verify that the user information is displayed
    expect(screen.getByText(/¡Buenas, testUser!/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Tu cuenta fue creada el/i)).toBeInTheDocument();
  });

  it('should handle error when logging in', async () => {
    render(<Login isLogged={false} setIsLogged={jest.fn()} username={'testUer'} setUsername={jest.fn()}/>);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });


    mockAxios.onPost('http://localhost:8000/login').reply(401, { error: 'Unauthorized' });

    //Simulate
    userEvent.type(usernameInput, 'testUser')
    userEvent.type(passwordInput, 'testPassword')

    // Trigger the login button click
    fireEvent.click(loginButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: Unauthorized/i)).toBeInTheDocument();
    });
  });
});
