// material-ui
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import { useDropzone } from 'react-dropzone';

// project imports
import RejectionFiles from './components/RejectionFiles';
import PlaceholderContent from './components/PlaceholderContent';
import FilesPreview from './components/FilesPreview';

// types
import { CustomFile, DropzoneType, UploadMultiFileProps } from './types/dropzone';
import { useTranslation } from 'react-i18next';
import UploadOutlined from '@ant-design/icons/UploadOutlined';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

export default function MultiFileUpload({
  error,
  showList = false,
  files,
  type,
  btnTile,
  setFieldValue,
  sx,
  onUpload,
  fileStatuses,
  isUploading,
  ...dropzoneOptions
}: UploadMultiFileProps) {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    ...dropzoneOptions,
    onDrop: (acceptedFiles: CustomFile[]) => {
      if (files) {
        setFieldValue('files', [
          ...files,
          ...acceptedFiles.map((file: CustomFile) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        ]);
      } else {
        setFieldValue(
          'files',
          acceptedFiles.map((file: CustomFile) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        );
      }
    }
  });

  const onRemoveAll = () => {
    setFieldValue('files', []);
  };

  const onRemove = (file: File | string) => {
    const filteredItems = files ? files.filter((_file) => _file !== file) : [];
    setFieldValue('files', filteredItems);
  };

  const hasFiles = files && files.length > 0;

  // Common dropzone styles
  const getDropzoneStyles = () => ({
    ...(isDragActive && { opacity: 0.72 }),
    ...((isDragReject || error) && {
      color: 'error.main',
      borderColor: 'error.light',
      bgcolor: 'error.lighter'
    })
  });

  // STANDARD Type: Thumbnail view with icon upload
  if (type === DropzoneType.STANDARD) {
    return (
      <Box sx={{ width: 'auto', display: 'flex', ...sx }}>
        <Stack alignItems="center">
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              p: 0,
              m: 1,
              width: 64,
              height: 64,
              ...getDropzoneStyles()
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {hasFiles && files.length > 1 && (
            <Button variant="contained" color="error" size="extraSmall" onClick={onRemoveAll}>
              {t('removeAll')}
            </Button>
          )}
        </Stack>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {hasFiles && <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} fileStatuses={fileStatuses} />}
      </Box>
    );
  }

  // COMPACT Type: No dropzone UI, only file list
  if (type === DropzoneType.COMPACT) {
    return (
      <>
        <Box sx={{ width: '100%', ...sx }}>
          <Button variant="text" size="small" {...getRootProps()} startIcon={<UploadOutlined />}>
            <input {...getInputProps()} />
            {t('uploadFile')}
          </Button>
          {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
          {hasFiles && <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} fileStatuses={fileStatuses} />}
        </Box>
        {hasFiles && (
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" onClick={onRemoveAll}>
              {t('removeAll')}
            </Button>
            {onUpload && (
              <Button size="small" variant="outlined" onClick={onUpload} disabled={isUploading}>
                {isUploading && btnTile ? `${btnTile}...` : btnTile ? btnTile : t('uploadFiles')}
              </Button>
            )}
          </Stack>
        )}
      </>
    );
  }

  // DEFAULT Type: Full dropzone with drag & drop area
  return (
    <>
      <Box sx={{ width: '100%', ...sx }}>
        <DropzoneWrapper {...getRootProps()} sx={getDropzoneStyles()}>
          <input {...getInputProps()} />
          <PlaceholderContent type={type} />
        </DropzoneWrapper>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {hasFiles && <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} fileStatuses={fileStatuses} />}
      </Box>
      {hasFiles && (
        <Stack direction="row" sx={{ gap: 1.5, justifyContent: 'flex-end' }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            {t('removeAll')}
          </Button>
          {onUpload && (
            <Button size="small" variant="contained" onClick={onUpload} loading={isUploading}>
              {t('uploadFiles')}
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}
