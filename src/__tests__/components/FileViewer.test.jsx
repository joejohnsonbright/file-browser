import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileViewer } from '../../components/FileViewer';

describe('FileViewer', () => {
  const mockData = [
    {
      type: 'pdf',
      name: 'Employee Handbook',
      added: '2017-01-06',
    },
    {
      type: 'pdf',
      name: 'Public Holiday policy',
      added: '2016-12-06',
    },
    {
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
    },
    {
      type: 'csv',
      name: 'Cost centres',
      added: '2016-08-12',
    },
    {
      type: 'folder',
      name: 'Misc',
      files: [
        {
          type: 'doc',
          name: 'Christmas party',
          added: '2017-12-01',
        },
        {
          type: 'mov',
          name: 'Welcome to the company!',
          added: '2015-04-24',
        },
      ],
    },
  ];

  it('should render without crashing', () => {
    render(<FileViewer data={mockData} />);
    expect(screen.getByTestId('file-viewer')).toBeInTheDocument();
  });

  it('should render all top-level items with unique IDs', () => {
    render(<FileViewer data={mockData} />);

    expect(screen.getByTestId('item-employee-handbook')).toBeInTheDocument();
    expect(
      screen.getByTestId('item-public-holiday-policy')
    ).toBeInTheDocument();
    expect(screen.getByTestId('item-expenses')).toBeInTheDocument();
    expect(screen.getByTestId('item-cost-centres')).toBeInTheDocument();
    expect(screen.getByTestId('item-misc')).toBeInTheDocument();
  });

  it('should display the title/name of each item', () => {
    render(<FileViewer data={mockData} />);

    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
    expect(screen.getByText('Public Holiday policy')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Cost centres')).toBeInTheDocument();
    expect(screen.getByText('Misc')).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    render(<FileViewer data={mockData} />);

    const items = screen.getAllByTestId(/^item-/);
    expect(items).toHaveLength(5);
  });

  it('should handle empty data array', () => {
    render(<FileViewer data={[]} />);

    expect(screen.getByTestId('file-viewer')).toBeInTheDocument();
    const items = screen.queryAllByTestId(/^item-/);
    expect(items).toHaveLength(0);
  });

  it('should handle missing data prop', () => {
    render(<FileViewer />);

    expect(screen.getByTestId('file-viewer')).toBeInTheDocument();
    const items = screen.queryAllByTestId(/^item-/);
    expect(items).toHaveLength(0);
  });
});
