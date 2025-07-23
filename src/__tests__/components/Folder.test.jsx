import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Folder } from '../../components/Folder';

describe('Folder', () => {
  const defaultProps = {
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
  };

  it('should render without crashing', () => {
    render(<Folder {...defaultProps} />);
    expect(screen.getByTestId('folder')).toBeInTheDocument();
  });

  it('should display folder name', () => {
    render(<Folder {...defaultProps} />);
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('should render dropdown caret button', () => {
    render(<Folder {...defaultProps} />);
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    expect(caretButton).toBeInTheDocument();
  });

  it('should show collapsed caret when folder is collapsed by default', () => {
    render(<Folder {...defaultProps} />);
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    expect(caretButton).toHaveTextContent('▶');
  });

  it('should show expanded caret when folder is clicked to expand', () => {
    render(<Folder {...defaultProps} />);
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });

    // Click to expand
    fireEvent.click(caretButton);
    expect(caretButton).toHaveTextContent('▼');
  });

  it('should toggle expansion when caret is clicked', () => {
    render(<Folder {...defaultProps} />);

    const caretButton = screen.getByRole('button', { name: /toggle folder/i });

    // Initially collapsed
    expect(caretButton).toHaveTextContent('▶');
    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(caretButton);
    expect(caretButton).toHaveTextContent('▼');
    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(caretButton);
    expect(caretButton).toHaveTextContent('▶');
    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();
  });

  it('should toggle expansion when folder name is clicked', () => {
    render(<Folder {...defaultProps} />);

    const folderName = screen.getByText('Expenses');

    // Initially collapsed
    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();

    // Click folder name to expand
    fireEvent.click(folderName);
    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();
  });

  it('should not toggle when clicking on child files', () => {
    render(<Folder {...defaultProps} />);

    // First expand the folder
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    fireEvent.click(caretButton);
    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();

    // Click on a child file - should not collapse
    const childFile = screen.getByText('Expenses claim form');
    fireEvent.click(childFile);

    // Should still be expanded
    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();
    expect(caretButton).toHaveTextContent('▼');
  });

  it('should not show files when collapsed by default', () => {
    render(<Folder {...defaultProps} />);
    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();
    expect(screen.queryByText('Fuel allowances')).not.toBeInTheDocument();
  });

  it('should show files when expanded', () => {
    render(<Folder {...defaultProps} />);

    // Click to expand
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    fireEvent.click(caretButton);

    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();
    expect(screen.getByText('Fuel allowances')).toBeInTheDocument();
  });

  it('should render File components for each file when expanded', () => {
    render(<Folder {...defaultProps} />);

    // Click to expand
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    fireEvent.click(caretButton);

    const fileElements = screen.getAllByTestId('file');
    expect(fileElements).toHaveLength(2);
  });

  it('should default to collapsed state', () => {
    render(<Folder {...defaultProps} />);
    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();
  });

  it('should have proper indentation for nested files', () => {
    render(<Folder {...defaultProps} />);

    // Click to expand
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    fireEvent.click(caretButton);

    const fileElements = screen.getAllByTestId('file');
    fileElements.forEach(file => {
      expect(file.parentElement).toHaveClass('ml-4');
    });
  });

  it('should handle empty files array', () => {
    const props = { ...defaultProps, files: [] };
    render(<Folder {...props} />);

    // Click to expand
    const caretButton = screen.getByRole('button', { name: /toggle folder/i });
    fireEvent.click(caretButton);

    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.queryByTestId('file')).not.toBeInTheDocument();
  });
});
