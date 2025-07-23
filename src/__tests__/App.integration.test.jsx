import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from '../App';
import filesData from '../data/files.json';

describe('App Integration Tests', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  it('should fetch and display data from MSW API', async () => {
    render(<App />);

    // Initially should show loading state
    expect(screen.getByText('Loading files...')).toBeInTheDocument();

    // Wait for data to load and loading to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();
    });

    // Should show the loaded data count
    expect(
      screen.getByText(`Showing ${filesData.length} files`)
    ).toBeInTheDocument();

    // Should display the main heading
    expect(screen.getByText('File Browser')).toBeInTheDocument();
  });

  it('should display correct data from files.json', async () => {
    render(<App />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();
    });

    // Verify the data count matches files.json
    expect(
      screen.getByText(`Showing ${filesData.length} files`)
    ).toBeInTheDocument();

    // Verify the main heading is displayed
    expect(screen.getByText('File Browser')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    // Mock fetch to simulate an error
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(<App />);

    // Wait for error state
    await waitFor(() => {
      expect(
        screen.getByText(/Error loading files: Network error/)
      ).toBeInTheDocument();
    });

    // Should not show loading anymore
    expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();

    // Restore original fetch
    globalThis.fetch = originalFetch;
  });

  it('should handle HTTP errors gracefully', async () => {
    // Mock fetch to simulate HTTP error
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    render(<App />);

    // Wait for error state
    await waitFor(() => {
      expect(
        screen.getByText(/Error loading files: HTTP error! status: 404/)
      ).toBeInTheDocument();
    });

    // Should not show loading anymore
    expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();

    // Restore original fetch
    globalThis.fetch = originalFetch;
  });

  it('should verify data structure matches files.json exactly', async () => {
    // Capture the actual API call
    const originalFetch = globalThis.fetch;
    let capturedData = null;

    globalThis.fetch = vi.fn(async url => {
      const response = await originalFetch(url);
      const data = await response.json();
      capturedData = data;
      return {
        ok: true,
        json: () => Promise.resolve(data),
      };
    });

    render(<App />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();
    });

    // Verify the captured data matches files.json exactly
    expect(capturedData).toEqual(filesData);

    // Verify specific items from files.json are present
    expect(capturedData).toHaveLength(filesData.length);

    // Check first file
    expect(capturedData[0]).toEqual({
      type: 'pdf',
      name: 'Employee Handbook',
      added: '2017-01-06',
    });

    // Check first folder with nested files
    const expensesFolder = capturedData.find(item => item.name === 'Expenses');
    expect(expensesFolder).toEqual({
      type: 'folder',
      name: 'Expenses',
      files: [
        {
          type: 'doc',
          name: 'Expenses claim form',
          added: '2017-05-02',
        },
        {
          type: 'doc',
          name: 'Fuel allowances',
          added: '2017-05-03',
        },
      ],
    });

    // Restore original fetch
    globalThis.fetch = originalFetch;
  });
});
