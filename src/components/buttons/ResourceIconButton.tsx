import IconButton, { ExtendedIconButtonProps } from 'components/@extended/IconButton';

const ResourceIconButton = ({ children, ...rest }: ExtendedIconButtonProps) => {
  return (
    <IconButton sx={{ fontSize: 20 }} size="medium" variant="light" shape="rounded" {...rest}>
      {children}
    </IconButton>
  );
};

export default ResourceIconButton;
