import { Box, styled } from '@mui/material';
import useTabs from './hooks/useTabs';
import { ElementType, ReactNode } from 'react';
import TabsHeader from './components/TabsHeader';
import TabsBody from './components/TabsBody';

export type TabType = {
  label: string;
  icon?: ElementType;
  component: ReactNode;
};

interface DefaultTabsProps {
  tabs: TabType[];
}

const TabContainer = styled(Box)(() => ({
  width: '100%'
}));

const DefaultTabs = ({ tabs }: DefaultTabsProps) => {
  const { tabValue, handleTabChange } = useTabs();

  return (
    <TabContainer>
      <TabsHeader tabs={tabs} tabValue={tabValue} handleTabChange={handleTabChange} />
      <TabsBody tabs={tabs} tabValue={tabValue} />
    </TabContainer>
  );
};

export default DefaultTabs;
