import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Empty from './Empty';
import { Stack } from '@mui/material';

const bounceVariant = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: { duration: 0.8, ease: 'easeInOut' }
  }
};

interface Props {
  fullScreen?: boolean;
}
export function ScreenNoData({ fullScreen }: Props) {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        flex: fullScreen ? 1 : undefined,
        paddingY: fullScreen ? 0 : 4,
        alignItems: 'center',
        height: '100%'
      }}
    >
      <motion.div variants={bounceVariant} initial="hidden" animate="visible">
        <Typography variant="h3" mb={3}>
          {t('nothingFound')}
        </Typography>
        <Empty />
      </motion.div>
    </Stack>
  );
}
