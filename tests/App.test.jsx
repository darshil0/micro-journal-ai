import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';
import { vi } from 'vitest';
import * as api from '../src/services/api';

// Mock the api service
vi.mock('../src/services/api', () => ({
  generateInsight: vi.fn(),
}));

describe('App', () => {
  let user;

  beforeEach(() => {
    localStorage.clear();
    api.generateInsight.mockClear();
    user = userEvent.setup();
    window.confirm = vi.fn(() => true); // Mock confirm dialog
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
    const historyTab = screen.getByRole('button', { name: /history/i });
    await user.click(historyTab);
    expect(screen.getByPlaceholderText(/Search your memories.../i)).toBeInTheDocument();

    const insightsTab = screen.getByRole('button', { name: /insights/i });
    await user.click(insightsTab);
    expect(screen.getByText(/AI Companion/i)).toBeInTheDocument();

    const writeTab = screen.getByRole('button', { name: /write/i });
    await user.click(writeTab);
    expect(screen.getByPlaceholderText(/How are you feeling right now?/i)).toBeInTheDocument();
  });

  describe('History View', () => {
    beforeEach(async () => {
      render(<App />);
      const textarea = screen.getByPlaceholderText(/How are you feeling right now?/i);

      await user.type(textarea, 'This is the first entry about React.');
      await user.click(screen.getByRole('button', { name: /save entry/i }));

      await user.type(textarea, 'This is the second entry about testing.');
      await user.click(screen.getByRole('button', { name: /save entry/i }));

      const historyTab = screen.getByRole('button', { name: /history/i });
      await user.click(historyTab);
    });

    test('allows searching for an entry', async () => {
      expect(screen.getByText(/This is the first entry about React./i)).toBeInTheDocument();
      expect(screen.getByText(/This is the second entry about testing./i)).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText(/Search your memories.../i);
      await user.type(searchInput, 'React');

      expect(screen.getByText(/This is the first entry about React./i)).toBeInTheDocument();
      expect(screen.queryByText(/This is the second entry about testing./i)).not.toBeInTheDocument();
    });

    test('allows deleting an entry', async () => {
        const deleteButtons = screen.getAllByTitle(/Delete Entry/i);
        expect(deleteButtons.length).toBe(2);

        // The most recent entry appears first, so we delete that one.
        fireEvent.click(deleteButtons[0]);

        expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this memory?');

        // After deletion, one entry should be gone.
        expect(await screen.findByText(/This is the first entry about React./i)).toBeInTheDocument();
        expect(screen.queryByText(/This is the second entry about testing./i)).not.toBeInTheDocument();
      });
  });

  describe('Insights View', () => {
    test('generates and displays AI insights', async () => {
      api.generateInsight.mockResolvedValue('**Key Themes:**\n* You are learning a new skill.');

      render(<App />);
      const textarea = screen.getByPlaceholderText(/How are you feeling right now?/i);
      await user.type(textarea, 'I am learning to write tests in Vitest.');
      await user.click(screen.getByRole('button', { name: /save entry/i }));

      const insightsTab = screen.getByRole('button', { name: /insights/i });
      await user.click(insightsTab);

      const generateButton = screen.getByRole('button', { name: /Generate New Insights/i });
      await user.click(generateButton);

      expect(api.generateInsight).toHaveBeenCalled();
      expect(await screen.findByText(/You are learning a new skill./i)).toBeInTheDocument();
    });
  });
});
