import { ProcessedItem, SortOption, ItemType } from '../types/files';

export function sortFiles(
  fileData: ProcessedItem[],
  rawData: any[],
  sortOption: SortOption,
  ascending: boolean = false
): ProcessedItem[] {
  // Handle edge cases
  if (!fileData || !Array.isArray(fileData) || fileData.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating the original data
  const sortedData = [...fileData];

  // Handle invalid sort options
  if (!sortOption || !Object.values(SortOption).includes(sortOption)) {
    return sortedData;
  }

  if (sortOption === SortOption.NAME) {
    return sortByName(sortedData, ascending);
  } else if (sortOption === SortOption.DATE) {
    return sortByDate(sortedData, rawData, ascending);
  }

  return sortedData;
}

function sortByName(
  items: ProcessedItem[],
  ascending: boolean
): ProcessedItem[] {
  return items.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    const comparison = nameA.localeCompare(nameB);
    return ascending ? comparison : -comparison;
  });
}

function sortByDate(
  items: ProcessedItem[],
  rawData: any[],
  ascending: boolean
): ProcessedItem[] {
  return items.sort((a, b) => {
    const dateA = getItemDate(a, rawData);
    const dateB = getItemDate(b, rawData);

    // Handle invalid dates by treating them as very old dates
    const timeA = dateA ? new Date(dateA).getTime() : 0;
    const timeB = dateB ? new Date(dateB).getTime() : 0;

    // For ascending: older dates first (smaller timestamps)
    // For descending: newer dates first (larger timestamps)
    const comparison = timeA - timeB;
    return ascending ? comparison : -comparison;
  });
}

function getItemDate(item: ProcessedItem, rawData: any[]): string | null {
  if (item.type === ItemType.FILE) {
    return item.added || null;
  }

  if (item.type === ItemType.FOLDER) {
    // Empty folders are treated as the newest (return a future date)
    if (item.isEmpty) {
      return '9999-12-31'; // Far future date to make empty folders appear newest
    }

    // Find the folder in rawData and get the newest file date
    const folderData = rawData.find(
      raw => raw.name === item.name && raw.type === 'folder'
    );
    if (!folderData || !folderData.files || folderData.files.length === 0) {
      return '9999-12-31'; // Treat as empty folder
    }

    // Find the newest file date in the folder
    let newestDate = '';
    for (const file of folderData.files) {
      if (file.added && (!newestDate || file.added > newestDate)) {
        newestDate = file.added;
      }
    }

    return newestDate || null;
  }

  return null;
}
