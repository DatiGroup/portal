import { ThemeMode } from 'config';
import { PalettesProps } from '@ant-design/colors';
import { PaletteThemeProps } from 'types/theme';

import ThemeConfig from 'brands/digital-twins/themeConfig';


export default function Theme(colors: PalettesProps, mode: ThemeMode): PaletteThemeProps {
  return ThemeConfig(colors, mode);
}
