import { motion } from 'framer-motion';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';

function CustomTreeTransition({ ...others }: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: others.in ? 1 : 0, translateX: others.in ? 0 : 20 }}
      transition={{ type: 'spring', stiffness: 150, damping: 30 }}
    >
      <Collapse {...others} />
    </motion.div>
  );
}

export default CustomTreeTransition;
