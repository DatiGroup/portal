import { RichTreeView } from '@mui/x-tree-view';

import { CloseSquare, MinusSquare, PlusSquare } from 'components/tree/customTree/components/CustomTreeSVG';
import { ComponentProps } from 'react';

const CustomTree = ({ ...props }: ComponentProps<typeof RichTreeView>) => {
  return (
    <>
      <RichTreeView
        {...props}
        aria-label="customized-mui-tree"
        defaultExpandedItems={props.defaultExpandedItems ?? ['1']}
        slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare, ...props.slots }}
        sx={{ height: 'fit-content' }}
      />
    </>
  );
};

export default CustomTree;
