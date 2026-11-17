import { PaletteThemeProps } from 'types/theme';

export interface TopologyPalette {
  fragment: {
    pending: string;
    deploying: string;
    ready: string;
    failed: string;
    deleting: string;
    unknown: string;
  };
  dashboard: { background: string; border: string; borderDefault: string };
  widget: { background: string; border: string };
  healthDot: { green: string; yellow: string; red: string; unknown: string };
  node: { unknown: string };
}

export interface DigitalTwinsThemeProps extends PaletteThemeProps {
  topology: TopologyPalette;
}
