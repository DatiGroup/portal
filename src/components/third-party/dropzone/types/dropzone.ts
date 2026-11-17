import { Theme, SxProps } from '@mui/material/styles';
import { DropzoneOptions } from 'react-dropzone';

// ==============================|| TYPES - DROPZONE ||============================== //

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile[] | null;
  setFieldValue: (field: string, value: any) => void;
  sx?: SxProps<Theme>;
}

export interface FileUploadStatus {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  type?: DropzoneType;
  btnTile?: string;
  sx?: SxProps<Theme>;
  onUpload?: () => Promise<void>;
  isUploading?: boolean;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: File[]) => void;
  fileStatuses?: FileUploadStatus[];
}

export interface FilePreviewProps {
  showList?: boolean;
  type?: DropzoneType;
  files: (CustomFile | string)[];
  onRemove?: (file: CustomFile | string) => void;
  fileStatuses?: FileUploadStatus[];
}

export enum DropzoneType {
  DEFAULT = 'default',
  STANDARD = 'standard',
  COMPACT = 'compact'
}
