import { ThemeMode } from 'config';
import { PalettesProps } from '@ant-design/colors';
import DigitalTwinsTheme from '../themes/digitalTwinsTheme';
import { themeConfigWithOverrides } from 'brands/utils/themeConfigWithOverrides';
import { DigitalTwinsThemeProps } from 'brands/types/themeTypes';

export default function ThemeConfig(colors: PalettesProps, mode: ThemeMode): DigitalTwinsThemeProps {
  return themeConfigWithOverrides(DigitalTwinsTheme, colors, mode) as DigitalTwinsThemeProps;
}
