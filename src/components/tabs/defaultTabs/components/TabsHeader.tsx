import { Box, BoxProps, styled, Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import { TabType } from '../DefaultTabs';
import { useId } from 'react';

interface TabsHeaderProps {
  tabs: TabType[];
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabsHeaderWrapper = styled(Box)<BoxProps>(() => ({
  borderBottom: 1,
  borderColor: 'divider'
}));

const TabsHeader = ({ tabs, tabValue, handleTabChange }: TabsHeaderProps) => {
  const id = useId();
  const downMB = useMediaQuery((theme: Theme) => theme.breakpoints.down('mb'));

  return (
    <TabsHeaderWrapper>
      <Tabs
        variant="fullWidth"
        orientation={downMB ? 'vertical' : 'horizontal'}
        value={tabValue}
        onChange={handleTabChange}
        aria-label={`TabsHeader-${id}`}
      >
        {tabs.map(({ label, icon: Icon }, index) => (
          <Tab
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'capitalize',
              gap: 1.25,
              '& .MuiTab-icon': {
                marginBottom: 0
              }
            }}
            {...(Icon ? { icon: <Icon /> } : {})}
            label={label}
            id={`TabsHeader-${id}-tab-${index}`}
            key={`TabsHeader-${id}-tab-${index}`}
            aria-controls={`TabsHeader-${id}-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </TabsHeaderWrapper>
  );
};

export default TabsHeader;
