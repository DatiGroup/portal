import { useTheme } from '@mui/material';

const Logo = ({ ...rest }) => {
  const theme = useTheme();

  const fillColor = theme.palette.primary.main;
  const fillColorSecondary = theme.palette.primary.main;

  return (
    <svg id="Layer_1" viewBox="0 0 381 208" version="1.1" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g id="g3" transform="translate(-160.65,-162.73)">
        <path
          fill={fillColor}
          d="M 330.75,162.74 H 179.67 v 151.28 h 37.48 V 206.27 c 0,-3.15 2.54,-5.72 5.71,-5.72 h 102.19 c 3.15,0 5.71,2.54 5.71,5.72 v 102.05 c 0,3.15 -2.54,5.72 -5.71,5.72 H 217.17 v 37.74 h 113.5 L 368.4,314.02 V 200.41 l -37.63,-37.66 h -0.02 z"
          id="path1"
          inkscape:export-filename="path1.png"
          inkscape:export-xdpi="96"
          inkscape:export-ydpi="96"
        />
        <path
          fill={fillColor}
          d="M 330.75,162.74 H 179.67 v 151.28 h 37.48 V 206.27 c 0,-3.15 2.54,-5.72 5.71,-5.72 h 102.19 c 3.15,0 5.71,2.54 5.71,5.72 v 102.05 c 0,3.15 -2.54,5.72 -5.71,5.72 H 217.17 v 37.74 h 113.5 L 368.4,314.02 V 200.41 l -37.63,-37.66 h -0.02 z"
          id="path2"
        />
        <path
          fill={fillColorSecondary}
          d="m 198.4,332.91 h -37.5 v 37.81 h 37.5 z"
          id="path3"
          inkscape:export-filename="path3.svg"
          inkscape:export-xdpi="96"
          inkscape:export-ydpi="96"
        />
        {/* "T" – same stroke width (37.5) and height as the "D", with a matching 45° chamfer on the top-right corner */}
        <path fill={fillColor} d="M 390.4,162.74 H 503.5 L 541.1,200.24 H 484.65 V 351.78 H 447.15 V 200.24 H 390.4 Z" id="path4" />
      </g>
    </svg>
  );
};

export default Logo;
