import { useRef, useState } from 'react';
// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Transitions from 'components/@extended/Transitions';
import CircularLoader from 'components/CircularLoader';

import { useTheme } from '@mui/material/styles';
import useAuth from 'sections/auth/hooks/useAuth';
import { showError } from 'utils/alerts';
import { useSwitchOrgMutation } from 'store/slices/organizations/organizationSlice';
import { MemberOfOrganization } from 'store/slices/me/types';
import { ButtonBase, Stack } from '@mui/material';
import DownOutlined from '@ant-design/icons/DownOutlined';

export default function OrgSwitch() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { meData, activeOrg } = useAuth();

  const [changeOrg, { isLoading }] = useSwitchOrgMutation();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = async (orgId: number) => {
    try {
      await changeOrg({ orgId }).unwrap();
      setOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={(theme) => ({
          p: 0.25,
          bgcolor: open ? 'grey.100' : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 },
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.default' : 'transparent', '&:hover': { bgcolor: 'secondary.light' } })
        })}
        aria-label="organization switch"
        ref={anchorRef}
        aria-controls={open ? 'org-switch-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center', p: 0.5 }}>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {activeOrg?.name || 'Select Organization'}
          </Typography>
          <DownOutlined />
        </Stack>
      </ButtonBase>
      <Popper
        sx={{ zIndex: theme.zIndex.appBar }}
        placement={downMD ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [downMD ? 0 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={downMD ? 'top-right' : 'top'} in={open} {...TransitionProps}>
            <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z1 })}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    p: 0,
                    width: '100%',
                    minWidth: 200,
                    maxWidth: { xs: 250, md: 290 },
                    bgcolor: 'background.paper',
                    borderRadius: 0.5
                  }}
                >
                  {meData?.memberOfOrganizations &&
                    meData.memberOfOrganizations.map((org: MemberOfOrganization) => {
                      return (
                        <ListItemButton
                          disabled={isLoading}
                          selected={activeOrg?.userOrganizationId === org.userOrganizationId}
                          onClick={() => handleListItemClick(org.userOrganizationId)}
                          key={`org_${org.userOrganizationId}`}
                        >
                          <ListItemText
                            primary={
                              <Grid container spacing={1} alignItems="center">
                                <Typography color="text.primary">{org.name}</Typography>
                                {isLoading && activeOrg?.userOrganizationId === org.userOrganizationId && <CircularLoader />}
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      );
                    })}
                </List>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
