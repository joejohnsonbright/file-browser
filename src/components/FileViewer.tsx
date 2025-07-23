// FileViewer component - displays a list of files and folders
import { useState, useMemo } from 'react';
import { File } from './File';
import { Folder } from './Folder';
import { SearchSortBar } from './SearchSortBar';
import { processRawData } from '../utils/loadFileData';
import { fileNameFilter } from '../utils/fileNameFilter';
import { sortFiles } from '../utils/sortFiles';
import { SortOption, ItemType } from '../types/files';

interface FileItem {
  type: string;
  name: string;
  added: string;
  files?: FileItem[];
}

interface FileViewerProps {
  data?: FileItem[];
}

export function FileViewer({ data = [] }: FileViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState<SortOption>(SortOption.NAME);
  const [sortDirection, setSortDirection] = useState('asc');

  const processedData = useMemo(() => processRawData(data), [data]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return processedData;
    }
    return fileNameFilter(processedData, searchTerm, true);
  }, [processedData, searchTerm]);

  const sortedData = useMemo(() => {
    return sortFiles(filteredData, data, sortMethod, sortDirection === 'asc');
  }, [filteredData, data, sortMethod, sortDirection]);

  // Helper function to convert name to kebab-case for test IDs
  const nameToTestId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortMethodChange = (method: string) => {
    setSortMethod(method as SortOption);
  };

  return (
    <div data-testid="file-viewer" className="space-y-4">
      <SearchSortBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortMethod={sortMethod}
        onSortMethodChange={handleSortMethodChange}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
      />

      <div className="space-y-2">
        {sortedData.map((item, index) => (
          <div
            key={index}
            data-testid={`item-${nameToTestId(item.name)}`}
            className="p-2 border rounded"
          >
            {item.type === ItemType.FOLDER ? (
              <Folder
                name={item.name}
                files={
                  data.find(
                    rawItem =>
                      rawItem.name === item.name && rawItem.type === 'folder'
                  )?.files || []
                }
              />
            ) : (
              <File name={item.name} type={item.fileType} added={item.added} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
