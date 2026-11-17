import { Box } from '@mui/material';
import { ComponentType } from 'react';

interface StepperCreditsProps {
  credits?: ComponentType<any>;
}

const StepperCredits = ({ credits: Credits }: StepperCreditsProps) => {
  return Credits ? <Credits /> : <Box>No credits provided.</Box>;
};

export default StepperCredits;
