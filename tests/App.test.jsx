import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MicroJournal from '../src/App.jsx';

describe('MicroJournal App', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test('renders initial UI and toggles dark mode', async () => {
    render(<MicroJournal />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Micro Journal/i);
    
    const toggleBtn = screen.getByRole('button', { name: /dark mode/i });
    expect(toggleBtn).toBeInTheDocument();

    await userEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });

  test('displays error if entry is shorter than 10 chars', async () => {
    render(<MicroJournal />);
    const saveBtn = screen.getByRole('button', { name: /save entry/i });
    await userEvent.click(saveBtn);
    expect(screen.getByText(/Please write at least 10 characters/i)).toBeInTheDocument();
  });

  test('allows writing and saving a journal entry', async () => {
    render(<MicroJournal />);

    const textarea = screen.getByPlaceholderText(/What's on your mind/i);
    await userEvent.type(textarea, 'Today was a great day with lots of joy');
    expect(textarea.value).toBe('Today was a great day with lots of joy');

    const saveBtn = screen.getByRole('button', { name: /save entry/i });
    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Please write at least 10 characters/i)).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('tab', { name: /history/i }));
      expect(screen.getByText(/Today was a great day with lots of joy/i)).toBeInTheDocument();
    });
  });

  test('switches between write, history, and insights views', async () => {
    render(<MicroJournal />);
    const writeTab = screen.getByRole('tab', { name: /write/i });
    const historyTab = screen.getByRole('tab', { name: /history/i });
    const insightsTab = screen.getByRole('tab', { name: /insights/i });

    await userEvent.click(historyTab);
    expect(historyTab).toHaveClass('bg-teal-600');
    expect(screen.getByText(/History Entries/i)).toBeInTheDocument();

    await userEvent.click(insightsTab);
    expect(insightsTab).toHaveClass('bg-teal-600');
    expect(screen.getByText(/AI Insights/i)).toBeInTheDocument();

    await userEvent.click(writeTab);
    expect(writeTab).toHaveClass('bg-teal-600');
    expect(screen.getByPlaceholderText(/What's on your mind/i)).toBeInTheDocument();
  });

  test('displays AI insight error without API key or fewer than 3 entries', async () => {
    render(<MicroJournal />);
    const insightsTab = screen.getByRole('tab', { name: /insights/i });
    await userEvent.click(insightsTab);
    const genBtn = screen.getByRole('button', { name: /generate new insight/i });
    await userEvent.click(genBtn);
    expect(await screen.findByText(/Write at least 3 entries/i)).toBeInTheDocument();
  });
});
