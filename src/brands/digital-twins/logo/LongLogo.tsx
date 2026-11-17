import { useTheme } from '@mui/material';

const LogoLong = ({ ...rest }) => {
  const theme = useTheme();

  const fillColor = theme.palette.primary.main;
  const fillColorSecondary = theme.palette.primary.main;

  // Glyphs reused from the original wordmark (positioned via translate)
  const glyphI = 'm 896.8,162.9 h -37.5 v 188.9 h 37.5 z';
  const glyphT = 'M 708.3,351.8 V 200.6 h -75.5 v -37.8 h 188.8 v 37.8 H 746 v 151.2 z';
  const glyphA =
    'M 557.3,162.9 H 444 l -37.6,37.6 v 151.3 l 37.6,0.1 v -75.7 h 113.4 v 75.6 h 37.5 V 200.6 Z m 0.1,75.5 H 444 v -32.1 c 0,-3.1 2.5,-5.7 5.7,-5.7 h 102 c 3.1,0 5.7,2.5 5.7,5.7 z';
  const glyphG =
    'm 1236.9,162.8 v 37.8 h -107.6 c -3.1,0 -5.7,2.5 -5.7,6 v 101.7 c 0,2.9 2.5,5.4 5.7,5.4 h 101.9 c 3.1,0 5.7,-2.6 5.7,-5.7 v -31.7 h -37.7 v -37.8 h 37.8 l 37.7,37.6 v 37.7 l -38.3,37.8 h -112.8 l -37.7,-37.4 V 200.9 l 37.8,-38.1 z';

  return (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2395.9 207.9" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g transform="translate(-160.9,-162.8)">
        <g>
          {/* D */}
          <path
            fill={fillColorSecondary}
            d="m 330.7,162.8 h -151 v 151.3 h 37.5 V 206.3 c 0,-3.1 2.5,-5.7 5.7,-5.7 h 102.2 c 3.1,0 5.7,2.5 5.7,5.7 v 102.1 c 0,3.1 -2.5,5.7 -5.7,5.7 H 217.2 v 37.7 H 330.7 L 368.4,314 V 200.4 Z"
          />
          <path
            fill={fillColor}
            d="m 330.7,162.8 h -151 v 151.3 h 37.5 V 206.3 c 0,-3.1 2.5,-5.7 5.7,-5.7 h 102.2 c 3.1,0 5.7,2.5 5.7,5.7 v 102.1 c 0,3.1 -2.5,5.7 -5.7,5.7 H 217.2 v 37.7 H 330.7 L 368.4,314 V 200.4 Z"
          />
          {/* I */}
          <path fill={fillColor} transform="translate(-453.2,0)" d={glyphI} />
          {/* G */}
          <path fill={fillColor} transform="translate(-604.6,0)" d={glyphG} />
          {/* I */}
          <path fill={fillColor} transform="translate(-151.3,0)" d={glyphI} />
          {/* T */}
          <path fill={fillColor} transform="translate(150.4,0)" d={glyphT} />
          {/* A */}
          <path fill={fillColor} transform="translate(603.2,0)" d={glyphA} />
          {/* L */}
          <path fill={fillColor} d="M 1235.8,162.8 H 1273.4 V 308.4 c 0,3.1 2.5,5.7 5.7,5.7 H 1424.5 V 351.8 H 1273.4 L 1235.8,314.2 Z" />

          {/* T */}
          <path fill={fillColor} transform="translate(980.8,0)" d={glyphT} />
          {/* W – U with a half-height centre stem, chamfered bottom corners */}
          <path
            fill={fillColor}
            d="M 1840.1,162.8 H 1877.6 V 308.5 c 0,3.1 2.5,5.7 5.7,5.7 H 1910 c 3.1,0 5.7,-2.5 5.7,-5.7 V 238.5 H 1953.2 V 308.5 c 0,3.1 2.5,5.7 5.7,5.7 H 1985.6 c 3.1,0 5.7,-2.5 5.7,-5.7 V 162.8 H 2028.8 V 314.2 L 1991.2,351.8 H 1877.7 L 1840.1,314.2 Z"
          />
          {/* I */}
          <path fill={fillColor} transform="translate(1207.2,0)" d={glyphI} />
          {/* N – arch with top-left chamfer (A without the crossbar) */}
          <path
            fill={fillColor}
            d="M 2141.7,200.4 L 2179.3,162.8 H 2330.4 V 351.8 H 2292.9 V 206.3 c 0,-3.1 -2.5,-5.7 -5.7,-5.7 H 2185 c -3.1,0 -5.7,2.5 -5.7,5.7 V 351.8 H 2141.7 Z"
          />
          {/* S – chamfered top-left, mid-right (as in G) and bottom-right */}
          <path
            fill={fillColor}
            d="M 2405.7,162.8 H 2556.8 V 200.6 H 2411.4 c -3.1,0 -5.7,2.5 -5.7,5.7 V 232.8 c 0,3.1 2.5,5.7 5.7,5.7 H 2519.2 L 2556.8,276.1 V 314.2 L 2519.2,351.8 H 2368.1 V 314.2 H 2513.5 c 3.1,0 5.7,-2.5 5.7,-5.7 V 281.8 c 0,-3.1 -2.5,-5.7 -5.7,-5.7 H 2368.1 V 200.4 Z"
          />

          <path fill={fillColorSecondary} d="m 198.4,332.9 h -37.5 v 37.8 h 37.5 z" />
        </g>
      </g>
    </svg>
  );
};

export default LogoLong;
