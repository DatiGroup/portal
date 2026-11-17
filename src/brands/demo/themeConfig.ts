import { ThemeMode } from 'config';
import { PalettesProps } from '@ant-design/colors';
import { PaletteThemeProps } from 'types/theme';
import DefaultTheme from '../themes/defaultTheme';
import { themeConfigWithOverrides } from 'brands/utils/themeConfigWithOverrides';

export default function ThemeConfig(colors: PalettesProps, mode: ThemeMode): PaletteThemeProps {
  const primaryColorsLight = ['#f0f6ff', '#edf4ff', '#bed3f7', '#8faeeb', '#6488de', '#3c64d0', '#2947ab', '#192f85', '#0d1b5e', '#070e38'];
  const primaryColorsDark = ['#1d212d', '#212841', '#273353', '#2c3e6e', '#324c92', '#385ab5', '#5d7dcb', '#89a7e1', '#b9cef0', '#e9f0fb'];

  return themeConfigWithOverrides(DefaultTheme, colors, mode, {
    primaryColors: mode === ThemeMode.DARK ? primaryColorsDark : primaryColorsLight
  });
}
