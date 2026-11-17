import { Grid, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { ReactElement } from 'react';
import DroppablePlaceholderContent from 'components/drag&drop/components/DroppablePlaceholderContent';
import DroppableNode from 'components/drag&drop/components/DroppableNode';

export interface DroppablePlaceholderProps extends React.HTMLAttributes<any> {
  icon?: ReactElement<any> | null;
  title?: string;
  subTitle?: string | null;
  caption?: string | null;
}

const DroppablePlaceholder = ({
  icon,
  title,
  subTitle,
  caption,
  id = 'droppable-head-placeholder',
  data,
  ...rest
}: DroppablePlaceholderProps & { id?: string; data?: any }) => {
  return (
    <DroppableNode id={id} data={data} sx={{ width: '100%', padding: '0.3rem' }} {...rest}>
      <Grid size={12}>
        <MainCard title={title}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Stack sx={{ gap: 1.5, alignItems: 'center' }}>
                <DroppablePlaceholderContent icon={icon} subTitle={subTitle} caption={caption} />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </DroppableNode>
  );
};

export default DroppablePlaceholder;
