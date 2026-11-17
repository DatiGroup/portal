import { useDroppable } from '@dnd-kit/core';
import { Box, BoxProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface DroppableNodeProps extends BoxProps {
  id: string;
  data?: any;
  children: ReactNode | ReactNode[];
}

const DroppableNode = ({ id, data, children, ...other }: DroppableNodeProps) => {
  const theme = useTheme();

  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: data
  });

  const sx = {
    ...((isOver ? { backgroundColor: theme.palette.primary.light } : {}) as BoxProps['sx'])
  };

  return (
    <Box ref={setNodeRef} {...other} sx={{ ...other.sx, ...sx }}>
      {children}
    </Box>
  );
};

export default DroppableNode;
