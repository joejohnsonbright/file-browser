import { ProcessedItem, ItemType } from '../types/files';

export function fileNameFilter(
  fileData: ProcessedItem[],
  searchTerm: string,
  includeFolderNames: boolean
): ProcessedItem[] {
  if (!fileData || !Array.isArray(fileData)) {
    return [];
  }

  if (!searchTerm || typeof searchTerm !== 'string') {
    return [];
  }

  const trimmedSearchTerm = searchTerm.trim();
  if (trimmedSearchTerm === '') {
    return [];
  }

  const lowerSearchTerm = trimmedSearchTerm.toLowerCase();

  return fileData.filter(item => {
    if (item.type === ItemType.FOLDER && !includeFolderNames) {
      return false;
    }

    return item.name.toLowerCase().includes(lowerSearchTerm);
  });
}
