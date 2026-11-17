import LineOutlined from '@ant-design/icons/LineOutlined';
import { Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface DrawerItemProps {
  to: string;
  text: string;
}

const DrawerItem = ({ to, text }: DrawerItemProps) => (
  <Link underline="none" href={to} target="">
    <ListItemButton>
      <ListItemIcon>
        <LineOutlined />
      </ListItemIcon>
      <ListItemText primary={text} slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
    </ListItemButton>
  </Link>
);

export default DrawerItem;
