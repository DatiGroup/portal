import { ReactNode } from 'react';
import useStepper from './hooks/useStepper';
import StepperHeader from './components/StepperHeader';
import { Box, BoxProps, styled } from '@mui/material';
import StepperBody from './components/StepperBody';
import StepperNav from './components/StepperNav';

export type ContentStepType = {
  label: string;
  component: ReactNode;
};

interface DefaultStepperProps {
  content: ContentStepType[];
  showFinishButton?: boolean;
}

const StepperContainer = styled(Box)<BoxProps>(() => ({
  width: '100%'
}));

const DefaultStepper = ({ content, showFinishButton = true }: DefaultStepperProps) => {
  const { activeStep, handleNext, handleBack } = useStepper();

  return (
    <StepperContainer>
      <StepperHeader content={content} activeStep={activeStep} />
      <StepperBody content={content} step={activeStep} />
      <StepperNav
        content={content}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        showFinishButton={showFinishButton}
      />
    </StepperContainer>
  );
};

export default DefaultStepper;
