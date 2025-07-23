// Placeholder Folder component
interface FileItem {
  type: string;
  name: string;
  added: string;
}

interface FolderProps {
  name: string;
  files: FileItem[];
}

// eslint-disable-next-line no-unused-vars
export function Folder({ name, files }: FolderProps) {
  return (
    <div data-testid="folder">
      <span>{name}</span>
      <p>Folder placeholder</p>
    </div>
  );
}
