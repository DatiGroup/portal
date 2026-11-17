import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import { Button, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routePaths';

interface Props {
  sx?: SxProps;
  to?: string;
  children: ReactNode;
}

const LookupHeaderButton = ({ sx, to = routePaths.dashboard.tool.lookups.lookupAdd, children, ...rest }: Props) => {
  return (
    <Button component={Link} to={to} variant="contained" startIcon={<PlusCircleOutlined />} sx={sx} {...rest}>
      {children}
    </Button>
  );
};

export default LookupHeaderButton;
