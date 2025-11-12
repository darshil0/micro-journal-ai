import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MicroJournal from '../src/App.jsx';

describe('MicroJournal App', () => {
  let user;

  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    user = userEvent.setup();
  });

  test('allows writing and saving a journal entry', async () => {
    render(<MicroJournal />);

    const textarea = screen.getByPlaceholderText(/What's on your mind/i);
    await user.type(textarea, 'Today was a great day with lots of joy');

    expect(textarea).toHaveValue('Today was a great day with lots of joy');

    const saveBtn = screen.getByRole('button', { name: /save entry/i });
    await user.click(saveBtn);

    expect(await screen.findByText(/Entry saved successfully/i)).toBeInTheDocument();

    const historyTab = screen.getByRole('tab', { name: /history/i });
    await user.click(historyTab);

    expect(await screen.findByText(/Today was a great day with lots of joy/i)).toBeInTheDocument();
  });

  test('switches between write, history, and insights views', async () => {
    render(<MicroJournal />);

    const writeTab = screen.getByRole('tab', { name: /write/i });
    const historyTab = screen.getByRole('tab', { name: /history/i });
    const insightsTab = screen.getByRole('tab', { name: /insights/i });

    await user.click(historyTab);
    expect(await screen.findByText(/Journal History/i)).toBeInTheDocument();
    expect(historyTab).toHaveAttribute('aria-selected', 'true');

    await user.click(insightsTab);
    expect(await screen.findByText(/AI Insights/i)).toBeInTheDocument();
    expect(insightsTab).toHaveAttribute('aria-selected', 'true');

    await user.click(writeTab);
    expect(await screen.findByPlaceholderText(/What's on your mind/i)).toBeInTheDocument();
    expect(writeTab).toHaveAttribute('aria-selected', 'true');
  });
});
