// material-ui
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Box, LinearProgress, Typography, Stack, styled } from '@mui/material';

// project imports
import IconButton from 'components/@extended/IconButton';

// utils
import getDropzoneData from '../utils/getDropzoneData';

// type
import { DropzoneType, FilePreviewProps } from '../types/dropzone';

// assets
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import FileFilled from '@ant-design/icons/FileFilled';

// ==============================|| STYLED COMPONENTS ||============================== //

const GridPreviewItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(1.25),
  position: 'relative',
  display: 'inline-flex',
  verticalAlign: 'text-top',
  overflow: 'hidden'
}));

const ListPreviewItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'hasError'
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(0.75),
  border: `solid 1px ${hasError ? theme.palette.error.light : theme.palette.divider}`,
  backgroundColor: hasError ? theme.palette.error.lighter : 'transparent',
  position: 'relative'
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5)
}));

const FileStatusBox = styled(Box)(() => ({
  minHeight: 32
}));

const FileProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(0.5)
}));

// ==============================|| HELPER COMPONENTS ||============================== //

interface FileStatusContentProps {
  fileStatus: any;
  size?: string | number;
}

const FileStatusContent = ({ fileStatus, size }: FileStatusContentProps) => {
  if (fileStatus?.status === 'error' && fileStatus.error) {
    return (
      <Typography variant="caption" color="error">
        {fileStatus.error}
      </Typography>
    );
  }

  if (fileStatus?.status === 'uploading') {
    return (
      <>
        <FileProgressBar variant="determinate" value={fileStatus.progress} />
        <Typography variant="caption" color="text.secondary">
          {fileStatus.progress}%
        </Typography>
      </>
    );
  }

  return (
    <Typography variant="caption" color="text.secondary">
      {size || ''}
    </Typography>
  );
};

// ==============================|| CONSTANTS ||============================== //

const GRID_SIZE = {
  STANDARD: 64,
  DEFAULT: 80
};

const shouldShowRemoveButton = (fileStatus: any) => {
  if (!fileStatus) return true;
  return fileStatus.status === 'pending' || fileStatus.status === 'error';
};

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({ showList = false, files, onRemove, type, fileStatuses = [] }: FilePreviewProps) {
  const hasFile = files.length > 0;

  const getFileStatus = (file: File | string) => {
    if (typeof file === 'string') return null;
    return fileStatuses.find((status) => status.file === file);
  };

  const renderGridPreview = (file: File | string, index: number) => {
    const { key, preview, type: fileType } = getDropzoneData(file, index);
    const size = type === DropzoneType.STANDARD ? GRID_SIZE.STANDARD : GRID_SIZE.DEFAULT;

    return (
      <GridPreviewItem key={key} sx={{ width: size, height: size }}>
        {fileType?.includes('image') ? (
          <CardMedia component="img" alt="preview" src={preview} sx={{ width: '100%' }} />
        ) : (
          <FileFilled style={{ width: '100%', fontSize: '1.5rem' }} />
        )}

        {onRemove && (
          <RemoveButton size="small" color="error" shape="rounded" onClick={() => onRemove(file)} sx={{ bgcolor: 'background.paper' }}>
            <CloseCircleFilled />
          </RemoveButton>
        )}
      </GridPreviewItem>
    );
  };

  const renderListPreview = (file: File | string, index: number) => {
    const { key, name, size } = getDropzoneData(file, index);
    const fileStatus = getFileStatus(file);
    const hasError = fileStatus?.status === 'error';
    const fileName = typeof file === 'string' ? file : name;
    const showRemove = shouldShowRemoveButton(fileStatus);

    // Calculate size in MB with two decimals
    const sizeMB = typeof size === 'number' ? `${(size / 1024 / 1024).toFixed(2)} MB` : undefined;

    return (
      <ListPreviewItemStyled key={key} hasError={hasError}>
        <Stack sx={{ flex: 1, minWidth: 0, pr: onRemove ? 4 : 0 }}>
          <ListItemText primary={fileName} slotProps={{ primary: { variant: 'subtitle2', noWrap: true } }} />
          <FileStatusBox>
            <FileStatusContent fileStatus={fileStatus} size={typeof file === 'string' ? undefined : sizeMB} />
          </FileStatusBox>
        </Stack>

        {onRemove && (
          <RemoveButton color="error" size="small" onClick={() => onRemove(file)} sx={{ visibility: showRemove ? 'visible' : 'hidden' }}>
            <CloseCircleFilled style={{ fontSize: '1rem' }} />
          </RemoveButton>
        )}
      </ListPreviewItemStyled>
    );
  };

  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzoneType.STANDARD && { my: 3 }),
        ...(type === DropzoneType.STANDARD && { width: 'calc(100% - 84px)' })
      }}
    >
      {files.map((file, index) => (showList ? renderGridPreview(file, index) : renderListPreview(file, index)))}
    </List>
  );
}
