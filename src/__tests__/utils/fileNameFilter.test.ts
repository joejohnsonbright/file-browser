import { describe, it, expect } from 'vitest';
import { fileNameFilter } from '../../utils/fileNameFilter';
import { ProcessedItem, ItemType, FileType } from '../../types/files';

describe('fileNameFilter', () => {
  // Test data setup
  const mockFileData: ProcessedItem[] = [
    {
      type: ItemType.FILE,
      fileType: FileType.PDF,
      name: 'Employee Handbook',
      added: '2017-01-06',
    },
    {
      type: ItemType.FILE,
      fileType: FileType.PDF,
      name: 'Public Holiday policy',
      added: '2016-12-06',
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
    {
      type: ItemType.FILE,
      fileType: FileType.DOC,
      name: 'Christmas party',
      added: '2017-12-01',
    },
    {
      type: ItemType.FILE,
      fileType: FileType.MOV,
      name: 'Welcome to the company!',
      added: '2015-04-24',
    },
    {
      type: ItemType.FOLDER,
      name: 'Empty Folder',
      isEmpty: true,
    },
  ];

  describe('Empty data tests', () => {
    it('should return empty array for empty input', () => {
      const result = fileNameFilter([], 'test', false);
      expect(result).toEqual([]);
    });

    it('should return empty array for empty search term', () => {
      const result = fileNameFilter(mockFileData, '', false);
      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only search term', () => {
      const result = fileNameFilter(mockFileData, '   ', false);
      expect(result).toEqual([]);
    });
  });

  describe('File name filtering (includeFolderNames = false)', () => {
    it('should find files with exact name match', () => {
      const result = fileNameFilter(mockFileData, 'Employee Handbook', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should find files with partial name match (case insensitive)', () => {
      const result = fileNameFilter(mockFileData, 'employee', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should find files with partial name match (case sensitive)', () => {
      const result = fileNameFilter(mockFileData, 'Employee', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should find multiple files matching search term', () => {
      const result = fileNameFilter(mockFileData, 'policy', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Public Holiday policy',
          added: '2016-12-06',
        },
      ]);
    });

    it('should not include folders when includeFolderNames is false', () => {
      const result = fileNameFilter(mockFileData, 'Expenses', false);
      expect(result).toEqual([]);
    });

    it('should find files with special characters in name', () => {
      const result = fileNameFilter(mockFileData, 'company!', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.MOV,
          name: 'Welcome to the company!',
          added: '2015-04-24',
        },
      ]);
    });

    it('should find files with numbers in name', () => {
      const result = fileNameFilter(mockFileData, 'centres', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.CSV,
          name: 'Cost centres',
          added: '2016-08-12',
        },
      ]);
    });
  });

  describe('File and folder name filtering (includeFolderNames = true)', () => {
    it('should find both files and folders with matching names', () => {
      const result = fileNameFilter(mockFileData, 'Expenses', true);
      expect(result).toEqual([
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
      ]);
    });

    it('should find files when includeFolderNames is true', () => {
      const result = fileNameFilter(mockFileData, 'Employee', true);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should find both files and folders in mixed results', () => {
      const testData: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Test Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FOLDER,
          name: 'Test Folder',
          isEmpty: false,
        },
      ];

      const result = fileNameFilter(testData, 'Test', true);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Test Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FOLDER,
          name: 'Test Folder',
          isEmpty: false,
        },
      ]);
    });

    it('should find empty folders when includeFolderNames is true', () => {
      const result = fileNameFilter(mockFileData, 'Empty', true);
      expect(result).toEqual([
        {
          type: ItemType.FOLDER,
          name: 'Empty Folder',
          isEmpty: true,
        },
      ]);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle null or undefined fileData gracefully', () => {
      expect(() => fileNameFilter(null as any, 'test', false)).not.toThrow();
      expect(() =>
        fileNameFilter(undefined as any, 'test', false)
      ).not.toThrow();
    });

    it('should handle null or undefined searchTerm gracefully', () => {
      expect(() =>
        fileNameFilter(mockFileData, null as any, false)
      ).not.toThrow();
      expect(() =>
        fileNameFilter(mockFileData, undefined as any, false)
      ).not.toThrow();
    });

    it('should handle very long search terms', () => {
      const longSearchTerm = 'a'.repeat(1000);
      const result = fileNameFilter(mockFileData, longSearchTerm, false);
      expect(result).toEqual([]);
    });

    it('should handle search terms with only special characters', () => {
      const result = fileNameFilter(mockFileData, '!@#$%^&*()', false);
      expect(result).toEqual([]);
    });

    it('should handle unicode characters in search term', () => {
      const unicodeData: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Café Menu',
          added: '2023-01-01',
        },
      ];

      const result = fileNameFilter(unicodeData, 'Café', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Café Menu',
          added: '2023-01-01',
        },
      ]);
    });
  });

  describe('Case sensitivity', () => {
    it('should be case insensitive by default', () => {
      const result = fileNameFilter(mockFileData, 'EMPLOYEE', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should handle mixed case search terms', () => {
      const result = fileNameFilter(mockFileData, 'eMpLoYeE', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });
  });

  describe('Performance and boundary conditions', () => {
    it('should handle large datasets efficiently', () => {
      const largeDataset: ProcessedItem[] = Array.from(
        { length: 10000 },
        (_, i) => ({
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: `Document ${i}`,
          added: '2023-01-01',
        })
      );

      const result = fileNameFilter(largeDataset, 'Document 5000', false);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Document 5000');
    });

    it('should maintain original order of items in results', () => {
      const orderedData: ProcessedItem[] = [
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Z Document',
          added: '2023-01-01',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'A Document',
          added: '2023-01-02',
        },
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'M Document',
          added: '2023-01-03',
        },
      ];

      const result = fileNameFilter(orderedData, 'Document', false);
      expect(result).toEqual(orderedData);
    });
  });

  describe('Edge cases', () => {
    it('should handle search terms with leading/trailing spaces', () => {
      const result = fileNameFilter(mockFileData, '  Employee  ', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should find partial matches at word boundaries', () => {
      const result = fileNameFilter(mockFileData, 'Hand', false);
      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });
  });
});
