import { useState } from 'react';
import { File } from './File';

interface FileItem {
  type: string;
  name: string;
  added: string;
}

interface FolderProps {
  name: string;
  files: FileItem[];
}

export function Folder({ name, files }: FolderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Only toggle if clicking on the header itself, not on child elements
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).tagName === 'SPAN'
    ) {
      handleToggle();
    }
  };

  return (
    <div data-testid="folder">
      <div
        className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
        onClick={handleHeaderClick}
      >
        <button
          onClick={handleToggle}
          aria-label="toggle folder"
          className="mr-2 text-sm"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        <span className="font-medium">{name}</span>
      </div>

      {isExpanded && (
        <div className="ml-4 mt-2 space-y-1">
          {files.map((file, index) => (
            <div key={index} className="ml-4">
              <File name={file.name} type={file.type} added={file.added} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
