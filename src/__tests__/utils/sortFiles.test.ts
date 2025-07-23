import { describe, it, expect } from 'vitest';
import { sortFiles } from '../../utils/sortFiles';
import {
  ProcessedItem,
  ItemType,
  FileType,
  SortOption,
} from '../../types/files';

describe('sortFiles', () => {
  const mockRawData = [
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
    {
      type: 'folder',
      name: 'Empty Folder',
      files: [],
    },
  ];

  describe('Input validation', () => {
    it('should handle edge cases', () => {
      expect(sortFiles([], [], SortOption.NAME, false)).toEqual([]);

      expect(sortFiles(null as any, [], SortOption.NAME, false)).toEqual([]);
      expect(sortFiles(undefined as any, [], SortOption.NAME, false)).toEqual(
        []
      );

      const singleItem: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Single Document',
          added: '2023-01-01',
        },
      ];
      expect(sortFiles(singleItem, [], SortOption.NAME, false)).toEqual(
        singleItem
      );
    });
  });

  describe('Name sorting', () => {
    it('should sort by name ascending', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'zebra document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FOLDER,
          name: 'Beta Folder',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: '!Important Document',
          added: '2023-01-02',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Alpha Document',
          added: '2023-01-03',
        },
      ];

      const expected: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: '!Important Document',
          added: '2023-01-02',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Alpha Document',
          added: '2023-01-03',
        },
        {
          type: ItemType.FOLDER,
          name: 'Beta Folder',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'zebra document',
          added: '2023-01-01',
        },
      ];

      expect(sortFiles(input, [], SortOption.NAME, true)).toEqual(expected);
    });

    it('should sort by name descending', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Alpha Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FOLDER,
          name: 'Beta Folder',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'zebra document',
          added: '2023-01-02',
        },
      ];

      const expected: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'zebra document',
          added: '2023-01-02',
        },
        {
          type: ItemType.FOLDER,
          name: 'Beta Folder',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Alpha Document',
          added: '2023-01-01',
        },
      ];

      expect(sortFiles(input, [], SortOption.NAME, false)).toEqual(expected);
    });
  });

  describe('Date sorting', () => {
    it('should sort files by date', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Old Document',
          added: '2016-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'New Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date A',
          added: '2020-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date B',
          added: '2020-01-01',
        },
      ];

      const expectedDescending: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'New Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date A',
          added: '2020-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date B',
          added: '2020-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Old Document',
          added: '2016-01-01',
        },
      ];

      const expectedAscending: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Old Document',
          added: '2016-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date A',
          added: '2020-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Same Date B',
          added: '2020-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'New Document',
          added: '2023-01-01',
        },
      ];

      expect(sortFiles(input, [], SortOption.DATE, false)).toEqual(
        expectedDescending
      );
      expect(sortFiles(input, [], SortOption.DATE, true)).toEqual(
        expectedAscending
      );
    });

    it('should sort folders by latest child file date', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Misc',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Empty Folder',
          isEmpty: true,
        },
      ];

      const expectedDescending: ProcessedItem[] = [
        {
          type: ItemType.FOLDER,
          name: 'Empty Folder',
          isEmpty: true,
        },
        {
          type: ItemType.FOLDER,
          name: 'Misc',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
      ];

      const expectedAscending: ProcessedItem[] = [
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Misc',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Empty Folder',
          isEmpty: true,
        },
      ];

      expect(sortFiles(input, mockRawData, SortOption.DATE, false)).toEqual(
        expectedDescending
      );
      expect(sortFiles(input, mockRawData, SortOption.DATE, true)).toEqual(
        expectedAscending
      );
    });

    it('should sort mixed files and folders by date', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.CSV,
          name: 'Cost centres',
          added: '2016-08-12',
        },
        {
          type: ItemType.FOLDER,
          name: 'Misc',
          isEmpty: false,
        },
      ];

      const expected: ProcessedItem[] = [
        {
          type: ItemType.FOLDER,
          name: 'Misc',
          isEmpty: false,
        },
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.CSV,
          name: 'Cost centres',
          added: '2016-08-12',
        },
      ];

      expect(sortFiles(input, mockRawData, SortOption.DATE, false)).toEqual(
        expected
      );
    });
  });

  describe('Error handling', () => {
    it('should handle invalid inputs gracefully', () => {
      const invalidDateInput: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Valid Date File',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Invalid Date File',
          added: 'invalid-date',
        },
      ];

      const dateResult = sortFiles(
        invalidDateInput,
        [],
        SortOption.DATE,
        false
      );
      expect(dateResult).toHaveLength(2);
      expect(dateResult.map(item => item.name)).toContain('Valid Date File');
      expect(dateResult.map(item => item.name)).toContain('Invalid Date File');

      const testData: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Test File',
          added: '2023-01-01',
        },
      ];

      const invalidSortResult = sortFiles(
        testData,
        [],
        'invalid' as SortOption,
        false
      );
      expect(invalidSortResult).toEqual(testData);

      const undefinedSortResult = sortFiles(
        testData,
        [],
        undefined as any,
        false
      );
      expect(undefinedSortResult).toEqual(testData);
    });

    it('should not mutate original data and maintain stability', () => {
      const input: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Document A',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Document B',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Document C',
          added: '2023-01-01',
        },
      ];

      const originalData = JSON.parse(JSON.stringify(input));
      const result = sortFiles(input, [], SortOption.DATE, false);

      expect(input).toEqual(originalData);
      expect(result).not.toBe(input);

      expect(result.map(item => item.name)).toEqual([
        'Document A',
        'Document B',
        'Document C',
      ]);
    });
  });
});
