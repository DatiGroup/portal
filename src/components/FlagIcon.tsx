import type { Theme, SxProps } from '@mui/material/styles';

import { forwardRef } from 'react';

import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type FlagIconProps = React.ComponentProps<'span'> & {
  code?: string;
  sx?: SxProps<Theme>;
};

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>((props, ref) => {
  const { code, sx, ...other } = props;

  if (!code) {
    return null;
  }

  const alpha2Code = code === 'en' ? 'us' : code;
  return (
    <FlagRoot ref={ref} sx={sx} {...other}>
      <FlagImg
        loading="lazy"
        alt={code}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${alpha2Code?.toUpperCase()}.svg`}
      />
    </FlagRoot>
  );
});

const FlagRoot = styled('span')(({ theme }) => ({
  width: 26,
  height: 20,
  flexShrink: 0,
  overflow: 'hidden',
  borderRadius: '5px',
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center'
  // backgroundColor: theme.vars.palette.background.neutral
}));

const FlagImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  maxWidth: 'unset',
  objectFit: 'cover'
}));
