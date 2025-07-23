import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchSortBar } from '../../components/SearchSortBar';

describe('SearchSortBar', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    sortMethod: 'name',
    onSortMethodChange: vi.fn(),
    sortDirection: 'asc',
    onSortDirectionChange: vi.fn(),
  };

  it('should render without crashing', () => {
    render(<SearchSortBar {...defaultProps} />);
    expect(screen.getByTestId('search-sort-bar')).toBeInTheDocument();
  });

  it('should render search input with correct value', () => {
    render(<SearchSortBar {...defaultProps} searchTerm="test" />);
    const searchInput = screen.getByRole('textbox', { name: /search/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('test');
  });

  it('should call onSearchChange when search input changes', () => {
    const onSearchChange = vi.fn();
    render(<SearchSortBar {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    expect(onSearchChange).toHaveBeenCalledWith('new search');
  });

  it('should render sort method dropdown with correct value', () => {
    render(<SearchSortBar {...defaultProps} sortMethod="date" />);
    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    expect(sortSelect).toBeInTheDocument();
    expect(sortSelect).toHaveValue('date');
  });

  it('should have sort method options: name, date', () => {
    render(<SearchSortBar {...defaultProps} />);

    expect(screen.getByRole('option', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /date/i })).toBeInTheDocument();
  });

  it('should call onSortMethodChange when sort method changes', () => {
    const onSortMethodChange = vi.fn();
    render(
      <SearchSortBar
        {...defaultProps}
        onSortMethodChange={onSortMethodChange}
      />
    );

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    fireEvent.change(sortSelect, { target: { value: 'date' } });

    expect(onSortMethodChange).toHaveBeenCalledWith('date');
  });

  it('should render sort direction button with correct text', () => {
    render(<SearchSortBar {...defaultProps} sortDirection="desc" />);
    const sortDirectionButton = screen.getByRole('button', {
      name: /sort direction/i,
    });
    expect(sortDirectionButton).toBeInTheDocument();
    expect(sortDirectionButton).toHaveTextContent('↓');
  });

  it('should show ascending arrow when sortDirection is asc', () => {
    render(<SearchSortBar {...defaultProps} sortDirection="asc" />);
    const sortDirectionButton = screen.getByRole('button', {
      name: /sort direction/i,
    });
    expect(sortDirectionButton).toHaveTextContent('↑');
  });

  it('should call onSortDirectionChange when sort direction button is clicked', () => {
    const onSortDirectionChange = vi.fn();
    render(
      <SearchSortBar
        {...defaultProps}
        onSortDirectionChange={onSortDirectionChange}
      />
    );

    const sortDirectionButton = screen.getByRole('button', {
      name: /sort direction/i,
    });
    fireEvent.click(sortDirectionButton);

    expect(onSortDirectionChange).toHaveBeenCalled();
  });
});
