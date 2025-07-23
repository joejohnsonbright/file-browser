export enum ItemType {
  FOLDER = 'folder',
  FILE = 'file',
}

export enum FileType {
  PDF = 'pdf',
  DOC = 'doc',
  CSV = 'csv',
  MOV = 'mov',
  GENERIC = 'generic',
}

export interface FileItem {
  type: ItemType.FILE;
  fileType: FileType;
  name: string;
  added: string;
}

export interface FolderItem {
  type: ItemType.FOLDER;
  name: string;
  isEmpty: boolean;
}

export type ProcessedItem = FileItem | FolderItem;
