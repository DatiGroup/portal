import { useDraggable } from '@dnd-kit/core';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface ResourceListButtonProps {
  id: string;
  data?: any;
  children: ReactNode | ReactNode[];
}

const DraggableButton = ({ id, data, children }: ResourceListButtonProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data
  });

  const sx = {
    transform: CSS.Translate.toString(transform)
  };

  return (
    <Button
      ref={setNodeRef}
      variant="dashed"
      color="primary"
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        padding: { xs: '0.25rem', sm: '0.3rem', md: '0.35rem', lg: '0.4rem' },
        lineHeight: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
        wordBreak: 'break-word',
        cursor: 'grab',
        ...sx
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </Button>
  );
};

export default DraggableButton;
