import type { IconProps } from '@iconify/react';

import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

import { styled } from '@mui/material/styles';

export type IconifyProps = React.ComponentProps<typeof IconRoot> & IconProps;

export const Iconify = forwardRef<SVGSVGElement, IconifyProps>((props, ref) => {
  const { width = 20, sx, ...other } = props;
  return (
    <IconRoot
      ssr
      ref={ref}
      sx={[
        {
          width,
          height: width,
          flexShrink: 0,
          display: 'inline-flex'
          //   color: theme.palette.iconColor
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    />
  );
});

const IconRoot = styled(Icon)``;
