import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { File } from '../../components/File';

describe('File', () => {
  const defaultProps = {
    name: 'Employee Handbook',
    type: 'pdf',
    added: '2017-01-06',
  };

  it('should render without crashing', () => {
    render(<File {...defaultProps} />);
    expect(screen.getByTestId('file')).toBeInTheDocument();
  });

  it('should display file name', () => {
    render(<File {...defaultProps} />);
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
  });

  it('should display file type', () => {
    render(<File {...defaultProps} />);
    expect(screen.getByText('pdf')).toBeInTheDocument();
  });

  it('should display file date', () => {
    render(<File {...defaultProps} />);
    expect(screen.getByText('2017-01-06')).toBeInTheDocument();
  });

  it('should display all information in a single line', () => {
    render(<File {...defaultProps} />);
    const fileElement = screen.getByTestId('file');
    expect(fileElement).toHaveClass('flex', 'flex-row');
  });

  it('should have proper spacing between elements', () => {
    render(<File {...defaultProps} />);
    const nameElement = screen.getByText('Employee Handbook');

    expect(nameElement.parentElement).toHaveClass('space-x-4');
  });

  it('should handle different file types', () => {
    const props = { ...defaultProps, type: 'doc' };
    render(<File {...props} />);
    expect(screen.getByText('doc')).toBeInTheDocument();
  });

  it('should handle different dates', () => {
    const props = { ...defaultProps, added: '2020-12-25' };
    render(<File {...props} />);
    expect(screen.getByText('2020-12-25')).toBeInTheDocument();
  });

  it('should have accessible structure', () => {
    render(<File {...defaultProps} />);
    const fileElement = screen.getByTestId('file');
    expect(fileElement).toHaveAttribute('role', 'listitem');
  });
});
