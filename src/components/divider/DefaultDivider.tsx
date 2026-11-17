import { Divider, DividerProps, Grid, SxProps, Theme } from '@mui/material';

interface DefaultDividerProps {
  divider?: DividerProps;
  sx?: SxProps<Theme>;
}

const DefaultDivider = ({ divider, sx }: DefaultDividerProps) => {
  return (
    <Grid size={12}>
      <Divider sx={{ borderWidth: 1, ...sx }} {...divider} />
    </Grid>
  );
};

export default DefaultDivider;
