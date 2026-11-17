import { Box, Stack, Typography, useTheme } from '@mui/material';
import { cloneElement, isValidElement, ReactElement } from 'react';
import { DroppablePlaceholderProps } from 'components/drag&drop/DroppablePlaceholder';

const DroppablePlaceholderContent = ({ icon, subTitle, caption }: DroppablePlaceholderProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', width: 1, textAlign: { xs: 'center', md: 'left' } }}
      >
        {icon && (
          <Box>
            {isValidElement(icon)
              ? cloneElement(icon as ReactElement<any>, { style: { fontSize: '5rem', color: theme.palette.primary.main } })
              : null}
          </Box>
        )}

        <Stack sx={{ gap: 1, p: 3 }}>
          {subTitle && <Typography variant="h5">{subTitle}</Typography>}
          {caption && <Typography color="secondary">{caption}</Typography>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DroppablePlaceholderContent;
