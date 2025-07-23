interface FileItem {
  type: string;
  name: string;
  added: string;
}

interface FolderProps {
  name: string;
  files: FileItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

// eslint-disable-next-line no-unused-vars
export function Folder({ name, files, isExpanded, onToggle }: FolderProps) {
  return (
    <div data-testid="folder">
      <span>{name}</span>
      <p>Folder placeholder</p>
    </div>
  );
}
