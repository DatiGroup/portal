//project-import
import { ThemeMode } from 'config';

//assets
import { PalettesProps } from '@ant-design/colors';

// types
import { PaletteThemeProps } from 'types/theme';

// ==============================|| THEME CONFIG WITH OVERRIDES ||============================== //

export interface ThemeColorOverrides {
  primaryColors?: string[];
  errorColors?: string[];
  warningColors?: string[];
  infoColors?: string[];
  successColors?: string[];
}

export function themeConfigWithOverrides(
  themeConfigFn: (colors: PalettesProps, mode: ThemeMode) => PaletteThemeProps,
  colors: PalettesProps,
  mode: ThemeMode,
  overrides?: ThemeColorOverrides
): PaletteThemeProps {
  // Get the base theme from ThemeConfig
  const baseTheme = themeConfigFn(colors, mode);

  // If no overrides, return base theme
  if (!overrides) {
    return baseTheme;
  }

  // Apply overrides to the theme
  const theme = { ...baseTheme };

  if (overrides.primaryColors) {
    theme.primary = {
      lighter: overrides.primaryColors[0],
      100: overrides.primaryColors[1],
      200: overrides.primaryColors[2],
      light: overrides.primaryColors[3],
      400: overrides.primaryColors[4],
      main: overrides.primaryColors[5],
      dark: overrides.primaryColors[6],
      700: overrides.primaryColors[7],
      darker: overrides.primaryColors[8],
      900: overrides.primaryColors[9],
      contrastText: baseTheme.primary.contrastText
    };
  }

  if (overrides.errorColors) {
    theme.error = {
      lighter: overrides.errorColors[0],
      light: overrides.errorColors[1],
      main: overrides.errorColors[2],
      dark: overrides.errorColors[3],
      darker: overrides.errorColors[4],
      contrastText: baseTheme.error.contrastText
    };
  }

  if (overrides.warningColors) {
    theme.warning = {
      lighter: overrides.warningColors[0],
      light: overrides.warningColors[1],
      main: overrides.warningColors[2],
      dark: overrides.warningColors[3],
      darker: overrides.warningColors[4],
      contrastText: baseTheme.warning.contrastText
    };
  }

  if (overrides.infoColors) {
    theme.info = {
      lighter: overrides.infoColors[0],
      light: overrides.infoColors[1],
      main: overrides.infoColors[2],
      dark: overrides.infoColors[3],
      darker: overrides.infoColors[4],
      contrastText: baseTheme.info.contrastText
    };
  }

  if (overrides.successColors) {
    theme.success = {
      lighter: overrides.successColors[0],
      light: overrides.successColors[1],
      main: overrides.successColors[2],
      dark: overrides.successColors[3],
      darker: overrides.successColors[4],
      contrastText: baseTheme.success.contrastText
    };
  }

  return theme;
}
