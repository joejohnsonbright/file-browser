// Placeholder File component
interface FileProps {
  name: string;
  type: string;
  added: string;
}

// eslint-disable-next-line no-unused-vars
export function File({ name, type, added }: FileProps) {
  return (
    <div data-testid="file">
      <p>File placeholder</p>
    </div>
  );
}
