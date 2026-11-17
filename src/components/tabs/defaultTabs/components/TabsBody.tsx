import { Box, BoxProps, styled } from '@mui/material';
import { TabType } from '../DefaultTabs';
import { useId } from 'react';

interface TabsBodyProps {
  tabs: TabType[];
  tabValue: number;
}

const TabsBodyWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%'
}));

const TabsBody = ({ tabs, tabValue }: TabsBodyProps) => {
  const id = useId();

  return (
    <TabsBodyWrapper>
      {tabs.map((tab, index) => (
        <Box
          role="tabpanel"
          hidden={tabValue !== index}
          id={`TabsBody-${id}-tabpanel-${index}`}
          key={`TabsBody-${id}-tabpanel-${index}`}
          aria-labelledby={`TabsBody-${id}-tab-${index}`}
        >
          {tab.component}
        </Box>
      ))}
    </TabsBodyWrapper>
  );
};

export default TabsBody;
