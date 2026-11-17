// material-ui
import Stack from '@mui/material/Stack';

// project imports
import CircularWithPath from './@extended/progress/CircularWithPath';

// ==============================|| LOADER - CIRCULAR ||============================== //

interface CircularLoaderProps {
  size?: string | number | undefined;
}

export default function CircularLoader({ size }: CircularLoaderProps) {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 1 }}>
      <CircularWithPath size={size} />
    </Stack>
  );
}
