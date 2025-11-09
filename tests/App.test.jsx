import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MicroJournal from '../src/App.jsx';

describe('MicroJournal App', () => {
  let user;

  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    user = userEvent.setup();
  });

  test('renders initial UI and toggles dark mode', async () => {
    render(<MicroJournal />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Micro Journal/i })
    ).toBeInTheDocument();

    const toggleBtn = screen.getByRole('button', { name: /dark mode/i });

    await user.click(toggleBtn);

    expect(
      await screen.findByRole('button', { name: /light mode/i })
    ).toBeInTheDocument();
  });

  test('displays error if entry is shorter than 10 chars', async () => {
    render(<MicroJournal />);

    await user.click(screen.getByRole('button', { name: /save entry/i }));

    expect(
      await screen.findByText(/Please write at least 10 characters/i)
    ).toBeInTheDocument();
  });

  test('allows writing and saving a journal entry', async () => {
    render(<MicroJournal />);

    const textarea = screen.getByPlaceholderText(/What's on your mind/i);
    await user.type(textarea, 'Today was a great day with lots of joy');

    expect(textarea).toHaveValue('Today was a great day with lots of joy');

    await user.click(screen.getByRole('button', { name: /save entry/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Please write at least 10 characters/i)
      ).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole('tab', { name: /history/i }));

    expect(
      await screen.findByText(/Today was a great day with lots of joy/i)
    ).toBeInTheDocument();
  });

  test('switches between write, history, and insights views', async () => {
    render(<MicroJournal />);

    const writeTab = screen.getByRole('tab', { name: /write/i });
    const historyTab = screen.getByRole('tab', { name: /history/i });
    const insightsTab = screen.getByRole('tab', { name: /insights/i });

    await user.click(historyTab);

    expect(historyTab).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText(/History Entries/i)).toBeInTheDocument();

    await user.click(insightsTab);

    expect(insightsTab).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText(/AI Insights/i)).toBeInTheDocument();

    await user.click(writeTab);

    expect(writeTab).toHaveAttribute('aria-selected', 'true');
    expect(
      await screen.findByPlaceholderText(/What's on your mind/i)
    ).toBeInTheDocument();
  });

  test('displays AI insight error without API key or fewer than 3 entries', async () => {
    render(<MicroJournal />);

    await user.click(screen.getByRole('tab', { name: /insights/i }));

    await user.click(
      screen.getByRole('button', { name: /generate new insight/i })
    );

    expect(
      await screen.findByText(/Write at least 3 entries/i)
    ).toBeInTheDocument();
  });
});
