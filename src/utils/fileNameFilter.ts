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

  const itemsToSearch = includeFolderNames
    ? fileData
    : fileData.filter(item => item.type !== ItemType.FOLDER);

  const itemsWithLowerNames = itemsToSearch.map(item => ({
    item,
    lowerName: item.name.toLowerCase(),
  }));

  return itemsWithLowerNames
    .filter(({ lowerName }) => lowerName.includes(lowerSearchTerm))
    .map(({ item }) => item);
}
