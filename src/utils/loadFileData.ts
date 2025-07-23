import { ProcessedItem, ItemType, FileType } from '../types/files';

function getFileType(type: string): FileType {
  switch (type) {
    case 'pdf':
      return FileType.PDF;
    case 'doc':
      return FileType.DOC;
    case 'csv':
      return FileType.CSV;
    case 'mov':
      return FileType.MOV;
    default:
      return FileType.GENERIC;
  }
}

export function processRawData(rawData: any[]): ProcessedItem[] {
  return rawData
    .filter(item => item && typeof item === 'object' && item.type && item.name)
    .map(item => {
      if (item.type === 'folder') {
        return {
          type: ItemType.FOLDER,
          name: item.name,
          isEmpty: !item.files || item.files.length === 0,
        };
      } else {
        return {
          type: ItemType.FILE,
          fileType: getFileType(item.type),
          name: item.name,
          added: item.added,
        };
      }
    });
}
