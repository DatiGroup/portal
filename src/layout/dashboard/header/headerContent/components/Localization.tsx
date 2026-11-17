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

// project imports
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';

// types
import { I18n } from 'types/config';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useGetStatusQuery } from 'store/slices/status/slice';
import { LangCodes } from 'config';
import { useChangeLangMutation } from 'store/slices/me/slice';
import useAuth from 'sections/auth/hooks/useAuth';
import { showErrorMessage } from 'utils/alerts';
import { getLang, setLocalLang } from 'locales/localeUtils';
import { FlagIcon } from 'components/FlagIcon';

// ==============================|| HEADER CONTENT - LOCALIZATION ||============================== //

export default function Localization() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  const [updateLanguageCode] = useChangeLangMutation();
  const { data: statusData, isLoading: statusIsLoading } = useGetStatusQuery();

  const { i18n } = useTranslation();
  const currentLang = getLang();

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

  const handleListItemClick = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setLocalLang(lang);
      isLoggedIn && (await updateLanguageCode(lang).unwrap());
      setOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
      showErrorMessage();
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={(theme) => ({
          color: 'text.primary',
          bgcolor: open ? theme.palette.grey[100] : 'transparent',
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.default' : 'transparent' })
        })}
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <FlagIcon code={currentLang} />
      </IconButton>
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
                  {!statusIsLoading &&
                    Array.isArray(statusData?.languages) &&
                    statusData.languages.map((lang: string) => {
                      return (
                        <ListItemButton
                          selected={i18n.language === lang}
                          onClick={() => handleListItemClick(lang as I18n)}
                          key={`lang_${lang}`}
                        >
                          <ListItemText
                            primary={
                              <Grid container>
                                <Typography color="text.primary">{LangCodes[lang as keyof typeof LangCodes]}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: '8px' }}>
                                  ({lang.toUpperCase()})
                                </Typography>
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
