import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Temporizador from './Temporizador';

describe('Temporizador', () => {
  it('renders the initial countdown time', () => {
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} />);
    const countdownElement = screen.getByText(tiempoInicial);
    expect(countdownElement).toBeInTheDocument();
  });

  it('decreases countdown time when not paused', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} />);
    jest.advanceTimersByTime(1000);
    const updatedCountdownElement = screen.getByText(tiempoInicial - 1);
    expect(updatedCountdownElement).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('stops countdown time when paused', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    render(<Temporizador tiempoInicial={tiempoInicial} pausa={true} />);
    jest.advanceTimersByTime(1000);
    const updatedCountdownElement = screen.getByText(tiempoInicial);
    expect(updatedCountdownElement).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('restarts countdown time when restart prop changes', () => {
    jest.useFakeTimers();
    const tiempoInicial = 60;
    const { rerender } = render(<Temporizador tiempoInicial={tiempoInicial} />);
    jest.advanceTimersByTime(1000);
    const updatedCountdownElement = screen.getByText(tiempoInicial - 1);
    expect(updatedCountdownElement).toBeInTheDocument();

    // Simulate restart by changing the restart prop
    rerender(<Temporizador tiempoInicial={tiempoInicial} restart={true} />);

    // Countdown should restart
    const restartedCountdownElement = screen.getByText(tiempoInicial);
    expect(restartedCountdownElement).toBeInTheDocument();
    jest.useRealTimers();
  });
});