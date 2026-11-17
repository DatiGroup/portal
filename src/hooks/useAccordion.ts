import { useState } from 'react';

const useAccordion = (initiallyExpanded: string | false = false) => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(initiallyExpanded);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setAccordionExpanded(isExpanded ? panel : false);
  };

  return { accordionExpanded, setAccordionExpanded, handleAccordionChange };
};

export default useAccordion;
