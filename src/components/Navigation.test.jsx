// src/components/Navigation.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { vi } from 'vitest';

describe('Navigation Component', () => {
  test('renders navigation buttons and handles clicks', () => {
    const setView = vi.fn();
    render(<Navigation view="write" setView={setView} />);

    // Check that all three buttons are rendered
    const writeButton = screen.getByRole('button', { name: /write/i });
    const historyButton = screen.getByRole('button', { name: /history/i });
    const insightsButton = screen.getByRole('button', { name: /insights/i });

    expect(writeButton).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
    expect(insightsButton).toBeInTheDocument();

    // Simulate a click on the "History" button
    fireEvent.click(historyButton);
    expect(setView).toHaveBeenCalledWith('history');

    // Simulate a click on the "Insights" button
    fireEvent.click(insightsButton);
    expect(setView).toHaveBeenCalledWith('insights');
  });
});
