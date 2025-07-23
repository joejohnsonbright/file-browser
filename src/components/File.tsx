interface FileProps {
  name: string;
  type: string;
  added: string;
}

export function File({ name, type, added }: FileProps) {
  return (
    <div data-testid="file" className="flex flex-row space-x-4" role="listitem">
      <span className="font-medium">{name}</span>
      <span>{type}</span>
      <span>{added}</span>
    </div>
  );
}
