import { fileNameFilter } from './fileNameFilter';
import { ProcessedItem, ItemType, FileType } from '../types/files';

// Original implementation for comparison
function originalFileNameFilter(
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
    // This calls toLowerCase() for every item - inefficient!
    return item.name.toLowerCase().includes(lowerSearchTerm);
  });
}

// Create a large dataset for benchmarking
function createLargeDataset(size: number): ProcessedItem[] {
  const items: ProcessedItem[] = [];
  const fileTypes = [FileType.PDF, FileType.DOC, FileType.CSV, FileType.MOV];

  for (let i = 0; i < size; i++) {
    if (i % 10 === 0) {
      // Add some folders
      items.push({
        type: ItemType.FOLDER,
        name: `Folder ${i}`,
        isEmpty: Math.random() > 0.5,
      });
    } else {
      // Add files
      items.push({
        type: ItemType.FILE,
        fileType: fileTypes[i % fileTypes.length],
        name: `Document ${i} - Important File`,
        added: '2023-01-01',
      });
    }
  }

  return items;
}

// Benchmark function
function benchmark() {
  const datasetSizes = [1000, 5000, 10000];
  const searchTerm = 'Document';

  console.log('Performance Benchmark: fileNameFilter');
  console.log('=====================================');

  datasetSizes.forEach(size => {
    const dataset = createLargeDataset(size);

    console.log(`\nDataset size: ${size} items`);

    // Benchmark original implementation
    const originalStart = performance.now();
    for (let i = 0; i < 100; i++) {
      originalFileNameFilter(dataset, searchTerm, false);
    }
    const originalEnd = performance.now();
    const originalTime = originalEnd - originalStart;

    // Benchmark optimized implementation
    const optimizedStart = performance.now();
    for (let i = 0; i < 100; i++) {
      fileNameFilter(dataset, searchTerm, false);
    }
    const optimizedEnd = performance.now();
    const optimizedTime = optimizedEnd - optimizedStart;

    const improvement = (
      ((originalTime - optimizedTime) / originalTime) *
      100
    ).toFixed(1);

    console.log(`Original:  ${originalTime.toFixed(2)}ms (100 iterations)`);
    console.log(`Optimized: ${optimizedTime.toFixed(2)}ms (100 iterations)`);
    console.log(`Improvement: ${improvement}% faster`);
  });
}

// Run benchmark if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  benchmark();
}

export { benchmark };
