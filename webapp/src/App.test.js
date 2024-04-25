import { render, screen } from '@testing-library/react';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i);
  expect(linkElement).toBeInTheDocument();
});
*/

describe('App', () => {
  
  it('renders login page when not logged in', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders home page when logged in', () => {
    // Mock local storage to simulate being logged in
    const mockLocalStorage = {
      getItem: jest.fn(() => 'true'),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = mockLocalStorage;

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('redirects to login when trying to access stats page without logging in', () => {
    render(
      <MemoryRouter initialEntries={['/stats']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders stats page when logged in and trying to access stats page', () => {
    // Mock local storage to simulate being logged in
    const mockLocalStorage = {
      getItem: jest.fn(() => 'true'),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = mockLocalStorage;

    render(
      <MemoryRouter initialEntries={['/stats']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Estadisticas/i)).toBeInTheDocument();
  });
});