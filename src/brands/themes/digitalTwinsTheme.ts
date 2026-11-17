// material-ui
import { PaletteColorOptions } from '@mui/material/styles';

//project-import
import { ThemeMode } from 'config';

//assets
import { PalettesProps } from '@ant-design/colors';

// types
import { DigitalTwinsThemeProps, TopologyPalette } from 'brands/types/themeTypes';

// ==============================|| PRESET THEME - PURPLE THEME8 ||============================== //

export default function ThemeConfig(colors: PalettesProps, mode: ThemeMode): DigitalTwinsThemeProps {
  const { grey } = colors;
  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  let primaryColors = ['#fff4e6', '#ffdfb8', '#ffc98f', '#ffb066', '#ff943d', '#f27013', '#cc5206', '#a63a00', '#802800', '#591900'];
  let errorColors = ['#FDE8E7', '#F25E52', '#F04134', '#EE3B2F', '#E92A21'];
  let warningColors = ['#FFF7E0', '#FFC926', '#FFBF00', '#FFB900', '#FFA900'];
  let infoColors = ['#E0F4F5', '#26B0BA', '#00A2AE', '#009AA7', '#008694'];
  let successColors = ['#E0F5EA', '#26B56E', '#00A854', '#00A04D', '#008D3A'];

  if (mode === ThemeMode.DARK) {
    primaryColors = ['#32221a', '#4a2b18', '#5e371b', '#7d4319', '#a85317', '#d26415', '#e9883a', '#f4a962', '#f8c48c', '#fbdbb5'];
    errorColors = ['#321d1d', '#7d2e28', '#d13c31', '#e66859', '#f8baaf'];
    warningColors = ['#342c1a', '#836611', '#dda705', '#e9bf28', '#f8e577'];
    infoColors = ['#1a2628', '#11595f', '#058e98', '#1ea6aa', '#64cfcb'];
    successColors = ['#1a2721', '#115c36', '#05934c', '#1da65d', '#61ca8b'];
  }

  const LIGHT_TOPOLOGY: TopologyPalette = {
    fragment: {
      pending: '#e0e0e0',
      deploying: '#bbdefb',
      ready: '#cdebce',
      failed: '#ffcdd2',
      deleting: '#fff3cd',
      unknown: '#e0e0e0'
    },
    dashboard: { background: '#e8eaf6', border: '#9fa8da', borderDefault: '#b7c0f3' },
    widget: { background: '#fff3e0', border: '#ffb74d' },
    healthDot: { green: '#22c55e', yellow: '#f59e0b', red: '#ef4444', unknown: '#9ca3af' },
    node: { unknown: '#e0e0e0' }
  };

  const DARK_TOPOLOGY: TopologyPalette = {
    fragment: {
      pending: '#424242',
      deploying: '#0d47a1',
      ready: '#1b5e20',
      failed: '#b71c1c',
      deleting: '#e65100',
      unknown: '#424242'
    },
    dashboard: { background: '#121b65', border: '#2b377a', borderDefault: '#49579e' },
    widget: { background: '#5d4037', border: '#ffb74d' },
    healthDot: { green: '#22c55e', yellow: '#f59e0b', red: '#ef4444', unknown: '#9ca3af' },
    node: { unknown: '#424242' }
  };

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500]!,
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText: greyColors[100]
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText
    },
    topology: {
      ...(mode === ThemeMode.DARK ? DARK_TOPOLOGY : LIGHT_TOPOLOGY)
    },
    grey: greyColors
  };
}
