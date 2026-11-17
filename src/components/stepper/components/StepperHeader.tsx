import { Step, StepLabel, Stepper, Theme, useMediaQuery } from '@mui/material';
import { ContentStepType } from '../DefaultStepper';

interface StepperHeaderProps {
  content: ContentStepType[];
  activeStep: number;
}

const StepperHeader = ({ content, activeStep }: StepperHeaderProps) => {
  const downMB = useMediaQuery((theme: Theme) => theme.breakpoints.down('mb'));

  return (
    <Stepper activeStep={activeStep} orientation={downMB ? 'vertical' : 'horizontal'} sx={{ padding: '1rem 0' }}>
      {content.map((item) => (
        <Step key={item.label}>
          <StepLabel>{item.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperHeader;
