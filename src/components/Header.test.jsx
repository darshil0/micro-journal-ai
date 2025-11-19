// src/components/Header.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the main title and subtitle', () => {
    render(<Header />);

    // Check for the main title parts
    expect(screen.getByText('Micro')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();

    // Check for the subtitle
    expect(screen.getByText('Capture thoughts. Discover patterns.')).toBeInTheDocument();

    // Check for the "AI" badge
    expect(screen.getByText('AI')).toBeInTheDocument();
  });
});
