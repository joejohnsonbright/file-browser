import { describe, it, expect } from 'vitest';
import { processRawData } from '../../utils/loadFileData';
import { ItemType, FileType } from '../../types/files';

describe('loadFileData utilities', () => {
  describe('processRawData', () => {
    it('should process empty array', () => {
      const rawData = [];
      const result = processRawData(rawData);
      expect(result).toEqual([]);
    });

    it('should process single PDF file', () => {
      const rawData = [
        {
          type: 'pdf',
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.PDF,
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
      ]);
    });

    it('should process multiple files of different types', () => {
      const rawData = [
        {
          type: 'pdf',
          name: 'Employee Handbook',
          added: '2017-01-06',
        },
        {
          type: 'csv',
          name: 'Cost centres',
          added: '2016-08-12',
        },
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
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
      ]);
    });

    it('should process empty folder', () => {
      const rawData = [
        {
          type: 'folder',
          name: 'Empty Folder',
          files: [],
        },
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
        {
          type: ItemType.FOLDER,
          name: 'Empty Folder',
          isEmpty: true,
        },
      ]);
    });

    it('should process folder with files', () => {
      const rawData = [
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
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
        {
          type: ItemType.FOLDER,
          name: 'Expenses',
          isEmpty: false,
        },
      ]);
    });

    it('should process folders without files property', () => {
      const rawData = [
        {
          type: 'folder',
          name: 'Folder without files property',
        },
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
        {
          type: ItemType.FOLDER,
          name: 'Folder without files property',
          isEmpty: true,
        },
      ]);
    });

    it('should process complete files.json structure', () => {
      const rawData = [
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

      const result = processRawData(rawData);

      expect(result).toEqual([
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
      ]);
    });

    it('should handle unknown file types as generic', () => {
      const rawData = [
        {
          type: 'unknown',
          name: 'Mystery file',
          added: '2023-01-01',
        },
      ];

      const result = processRawData(rawData);

      expect(result).toEqual([
        {
          type: ItemType.FILE,
          fileType: FileType.GENERIC,
          name: 'Mystery file',
          added: '2023-01-01',
        },
      ]);
    });

    it('should handle malformed data gracefully', () => {
      const rawData = [
        null,
        undefined,
        {},
        { name: 'No type' },
        { type: 'pdf' }, // No name
      ];

      const result = processRawData(rawData);

      // Should filter out invalid entries
      expect(result).toEqual([]);
    });
  });
});
