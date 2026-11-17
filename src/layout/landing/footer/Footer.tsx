// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// 8ra word-image trademark — official RGB variant for digital media, used unaltered.
// The SVG already contains the white carrier surface and the protection zone required by the design guidelines.
import logo8ra from 'assets/images/logos/8ra_RGB_quer.svg';

// ==============================|| LANDING - FOOTER PAGE ||============================== //

type showProps = {
  isFull?: boolean;
};

export default function Footer({ isFull }: showProps) {
  const theme = useTheme();

  return (
    <>
      <Divider sx={{ borderColor: theme.palette.primary.main }} />
      <Box
        sx={{
          pt: isFull ? 0 : 5,
          pb: 5,
          bgcolor: theme.palette.grey[700],
          ...theme.applyStyles('dark', { bgcolor: theme.palette.background.paper })
        }}
      >
        <Container maxWidth={false}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            {/* Hyperlink to the 8ra homepage is mandatory for online use */}
            <Link href="https://www.8ra.com" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', lineHeight: 0 }}>
              {/* Minimum scale: 33% of the 10 cm reference width = 3.3 cm; aspect ratio preserved (no distortion) */}
              <Box
                component="img"
                src={logo8ra}
                alt="8ra Cloud-Edge Continuum"
                sx={{ width: '5cm', minWidth: '3.3cm', height: 'auto', display: 'block' }}
              />
            </Link>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
