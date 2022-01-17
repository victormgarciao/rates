import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App' , () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders root', () => {
    const linkElement = screen.getByTestId('app');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders header', () => {
    const linkElement = screen.getByTestId('app-header');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders main', () => {
    const linkElement = screen.getByTestId('main');
    expect(linkElement).toBeInTheDocument();
  });
});
