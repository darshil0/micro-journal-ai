import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

describe('App', () => {
  let user;

  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    user = userEvent.setup();
  });

  test('allows writing and saving a journal entry', async () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText(/How are you feeling right now?/i);
    await user.type(textarea, 'Today was a great day with lots of joy');

    expect(textarea).toHaveValue('Today was a great day with lots of joy');

    const saveBtn = screen.getByRole('button', { name: /save entry/i });
    await user.click(saveBtn);

    expect(await screen.findByText(/Entry saved locally./i)).toBeInTheDocument();

    const historyTab = screen.getByRole('button', { name: /history/i });
    await user.click(historyTab);

    expect(await screen.findByText(/Today was a great day with lots of joy/i)).toBeInTheDocument();
  });

  test('switches between write, history, and insights views', async () => {
    render(<App />);

    const writeTab = screen.getByRole('button', { name: /write/i });
    const historyTab = screen.getByRole('button', { name: /history/i });
    const insightsTab = screen.getByRole('button', { name: /insights/i });

    await user.click(historyTab);
    expect(await screen.findByPlaceholderText(/Search your memories.../i)).toBeInTheDocument();

    await user.click(insightsTab);
    expect(await screen.findByText(/AI Companion/i)).toBeInTheDocument();

    await user.click(writeTab);
    expect(await screen.findByPlaceholderText(/How are you feeling right now?/i)).toBeInTheDocument();
  });
});
