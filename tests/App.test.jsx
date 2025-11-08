// __tests__/App.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MicroJournal from '../src/App.jsx';

describe('MicroJournal App', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test('renders initial UI and toggles dark mode', () => {
    render(<MicroJournal />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Micro Journal/i);
    
    const toggleBtn = screen.getByRole('button', { name: /dark mode/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button')).toHaveTextContent(/Light Mode/i);
  });

  test('displays error if entry is shorter than 10 chars', () => {
    render(<MicroJournal />);
    const saveBtn = screen.getByText(/Save Entry/i);
    fireEvent.click(saveBtn);
    expect(screen.getByText(/Please write at least 10 characters/i)).toBeInTheDocument();
  });

  test('allows writing and saving a journal entry', async () => {
    render(<MicroJournal />);

    const textarea = screen.getByPlaceholderText(/What's on your mind/i);
    fireEvent.change(textarea, { target: { value: 'Today was a great day with lots of joy' } });
    expect(textarea.value).toBe('Today was a great day with lots of joy');

    const saveBtn = screen.getByText(/Save Entry/i);
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Please write at least 10 characters/i)).toBeNull();
      // Entry should be visible in history tab after save
      fireEvent.click(screen.getByText(/History/i));
      expect(screen.getByText(/Today was a great day with lots of joy/i)).toBeInTheDocument();
    });
  });

  test('switches between write, history, and insights views', () => {
    render(<MicroJournal />);
    const writeTab = screen.getByText(/Write/i);
    const historyTab = screen.getByText(/History/i);
    const insightsTab = screen.getByText(/Insights/i);

    fireEvent.click(historyTab);
    expect(historyTab).toHaveClass('bg-teal-600');

    fireEvent.click(insightsTab);
    expect(insightsTab).toHaveClass('bg-teal-600');

    fireEvent.click(writeTab);
    expect(writeTab).toHaveClass('bg-teal-600');
  });

  test('displays AI insight error without API key or fewer than 3 entries', async () => {
    render(<MicroJournal />);
    fireEvent.click(screen.getByText(/Insights/i));
    fireEvent.click(screen.getByText(/Generate New Insight/i));
    expect(await screen.findByText(/Write at least 3 entries/i)).toBeInTheDocument();
  });
});
