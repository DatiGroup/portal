import { useState } from 'react';

const useStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return { activeStep, handleNext, handleBack };
};

export default useStepper;
