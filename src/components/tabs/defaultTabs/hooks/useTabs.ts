import { SyntheticEvent, useState } from 'react';

const useTabs = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return { tabValue, handleTabChange };
};

export default useTabs;
