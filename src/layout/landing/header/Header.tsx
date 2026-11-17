import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

// assets
import AppBar from 'layout/landing/header/components/AppBar';
import { useTheme } from '@mui/material/styles';

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header() {
  const theme = useTheme();

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window
  });

  return (
    <Box sx={{ width: '100%', height: { xs: '60px', md: '70px' } }}>
      <AppBar
        sx={{
          bgcolor: theme.palette.background.default,
          position: 'static',
          color: 'text.primary',
          boxShadow: 'none'
        }}
        elevation={0}
      />
      {scrollTrigger && (
        <AppBar
          sx={{
            bgcolor: 'background.paper',
            position: 'fixed',
            color: 'text.primary',
            boxShadow: theme.customShadows.primary
          }}
          elevation={1}
        />
      )}
    </Box>
  );
}
