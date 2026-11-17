import { alpha, styled } from '@mui/material/styles';
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import CustomTreeTransition from 'components/tree/customTree/components/CustomTreeTransition';

const CustomTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} slots={{ groupTransition: CustomTreeTransition, ...props.slots }} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3
    }
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));

CustomTreeItem.displayName = 'StyledTreeItem';

export default CustomTreeItem;
