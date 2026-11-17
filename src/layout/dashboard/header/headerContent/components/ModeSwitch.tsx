import { MoonFilled, SunFilled } from '@ant-design/icons';
import { Stack, StackProps, styled, Switch, SwitchProps, useTheme } from '@mui/material';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

const ModeSwitchWrapper = styled(Stack)<StackProps>(() => ({
  flexDirection: 'row',
  marginLeft: '0.25rem'
}));

const CustomModeSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
  margin: '0.25rem',
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '& + .MuiSwitch-track': {
      backgroundColor: theme.palette.warning.main
    }
  }
}));

const ModeSwitch = () => {
  const { mode, onChangeMode } = useConfig();
  const theme = useTheme();

  const handleModeChange = () => (mode === ThemeMode.DARK ? onChangeMode(ThemeMode.LIGHT) : onChangeMode(ThemeMode.DARK));

  return (
    <ModeSwitchWrapper>
      <SunFilled style={{ color: mode === ThemeMode.LIGHT ? theme.palette.warning.main : theme.palette.grey[300] }} />
      <CustomModeSwitch name="modeSwitch" checked={mode === ThemeMode.DARK} onChange={handleModeChange} />
      <MoonFilled style={{ color: mode === ThemeMode.DARK ? theme.palette.primary.main : theme.palette.grey[300] }} />
    </ModeSwitchWrapper>
  );
};

export default ModeSwitch;
