import IconButton, { ExtendedIconButtonProps } from 'components/@extended/IconButton';

const TreeNodeButton = (props: ExtendedIconButtonProps) => (
  <IconButton sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} shape="rounded" color="error" {...props}>
    {props.children}
  </IconButton>
);

export default TreeNodeButton;
