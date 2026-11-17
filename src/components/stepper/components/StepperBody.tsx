import { Box } from '@mui/material';
import { ContentStepType } from '../DefaultStepper';
import { ComponentType } from 'react';
import StepperCredits from './StepperCredits';

interface StepperBodyProps {
  content: ContentStepType[];
  credits?: ComponentType<any>;
  step: number;
}

const StepperBody = ({ content, credits, step }: StepperBodyProps) => {
  return <Box>{content.length === step ? <StepperCredits credits={credits} /> : content[step].component}</Box>;
};

export default StepperBody;
