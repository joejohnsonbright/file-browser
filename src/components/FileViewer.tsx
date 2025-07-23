// FileViewer component - displays a list of files and folders
import { File } from './File';
import { Folder } from './Folder';

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
  // Helper function to convert name to kebab-case for test IDs
  const nameToTestId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div data-testid="file-viewer" className="space-y-2">
      {data.map((item, index) => (
        <div
          key={index}
          data-testid={`item-${nameToTestId(item.name)}`}
          className="p-2 border rounded"
        >
          {item.type === 'folder' ? (
            <Folder name={item.name} files={item.files || []} />
          ) : (
            <File name={item.name} type={item.type} added={item.added} />
          )}
        </div>
      ))}
    </div>
  );
}
