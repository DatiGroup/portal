import { Box, Button, Stack } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { ContentStepType } from '../DefaultStepper';

interface StepperNavProps {
  content: ContentStepType[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  showFinishButton?: boolean;
}

const StepperNav = ({ content, activeStep, handleNext, handleBack, showFinishButton }: StepperNavProps) => {
  return (
    <Box>
      {activeStep < content.length && (
        <Stack direction="row" sx={{ justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end' }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ my: 1, ml: 1 }}>
              Back
            </Button>
          )}
          <AnimateButton>
            {activeStep < content.length - 1 && (
              <Button variant="contained" onClick={handleNext} sx={{ my: 1, ml: 1 }}>
                Next
              </Button>
            )}
            {showFinishButton && activeStep === content.length - 1 && (
              <Button variant="contained" color="success" onClick={handleNext} sx={{ my: 1, ml: 1 }}>
                Finish
              </Button>
            )}
          </AnimateButton>
        </Stack>
      )}
    </Box>
  );
};

export default StepperNav;
