import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Temporizador from '../Temporizador';

describe('Temporizador', () => {
  it('renders the initial countdown time', () => {
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} pausa={false} />);
    const countdownElement = screen.getByText(tiempoInicial);
    expect(countdownElement).toBeInTheDocument();
  });

  it('decreases countdown time when not paused', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} pausa={false} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const updatedCountdownElement = screen.getByText(tiempoInicial - 1);
    expect(updatedCountdownElement).toBeInTheDocument();
  });

  it('stops countdown time when paused', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} pausa={true} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const updatedCountdownElement = screen.getByText(tiempoInicial);
    expect(updatedCountdownElement).toBeInTheDocument();
  });

  it('restarts countdown time when restart prop changes', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    const { rerender } = render(<Temporizador tiempoInicial={tiempoInicial} pausa={false} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const updatedCountdownElement = screen.getByText(tiempoInicial - 1);
    expect(updatedCountdownElement).toBeInTheDocument();

    // Simulate restart by changing the restart prop
    rerender(<Temporizador tiempoInicial={tiempoInicial} pausa={false} restart={true} handleRestart={jest.fn()} />);

    // Countdown should restart
    const restartedCountdownElement = screen.getByText(tiempoInicial);
    expect(restartedCountdownElement).toBeInTheDocument();
  });
});