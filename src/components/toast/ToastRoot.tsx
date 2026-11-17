import type { CSSObject } from '@mui/material/styles';

import { Toaster } from 'sonner';

import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const ToastRoot = styled(Toaster)(({ theme }) => {
  const baseStyles: Record<string, CSSObject> = {
    toastDefault: {
      padding: theme.spacing(1, 1, 1, 1.5),
      boxShadow: theme.customShadows.z1,
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.text.primary,
      background: 'red'
    },
    toastColor: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.customShadows.z1,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper
    },
    toastLoader: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.customShadows.z1,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper
    }
  };

  const loadingStyles: CSSObject = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    transform: 'none',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 'inherit',
    justifyContent: 'center',
    background: theme.palette.background.default,
    [`& .${snackbarClasses.loadingIcon}`]: {
      zIndex: 9,
      width: 24,
      height: 24,
      borderRadius: '50%',
      animation: 'rotate 3s infinite linear',
      background: `conic-gradient(transparent, ${alpha(theme.palette.text.disabled, 0.64)})`
    },
    [snackbarClasses.loaderVisible]: { display: 'flex' }
  };

  return {
    width: 300,
    gap: 1,
    [`& .${snackbarClasses.toast}`]: {
      gap: 1,
      width: '100%',
      minHeight: 52,
      display: 'flex',
      borderRadius: 12,
      alignItems: 'center',
      position: 'relative'
    },
    // Override for all toasts

    /**
     * Content
     */
    [`& .${snackbarClasses.content}`]: { gap: 0, flex: '1 1 auto' },
    [`& .${snackbarClasses.title}`]: { fontSize: theme.typography.subtitle1.fontSize },
    [`& .${snackbarClasses.description}`]: { ...theme.typography.caption, opacity: 0.64 },
    /**
     * Buttons
     */
    [`& .${snackbarClasses.actionButton}`]: {},
    [`& .${snackbarClasses.cancelButton}`]: {},
    [`& .${snackbarClasses.closeButton}`]: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      color: theme.palette.text.secondary,
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background 0.2s',
      '&:hover': {
        background: alpha(theme.palette.action.active, 0.08),
        color: theme.palette.text.primary
      },
      '&:focus': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2
      }
    },
    /**
     * Icon
     */
    [`& .${snackbarClasses.icon}`]: {
      margin: 0,
      width: 48,
      height: 48,
      alignItems: 'center',
      borderRadius: 'inherit',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      display: 'flex',
      [`& .${snackbarClasses.iconSvg}`]: { width: 24, height: 24, fontSize: 24 }
    },

    '@keyframes rotate': { to: { transform: 'rotate(1turn)' } },

    /**
     * @variant default
     */
    [`& .${snackbarClasses.default}`]: {
      ...baseStyles.toastDefault,
      [`&:has(${snackbarClasses.closeBtnVisible})`]: {
        [`& .${snackbarClasses.content}`]: { paddingRight: 32 }
      },
      [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
      /**
       * @with loader
       */
      [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
      [`& .${snackbarClasses.loader}`]: loadingStyles
    },
    /**
     * @variant error
     */
    [`& .${snackbarClasses.error}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.08)
      }
    },
    /**
     * @variant success
     */
    [`& .${snackbarClasses.success}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.08)
      }
    },
    /**
     * @variant warning
     */
    [`& .${snackbarClasses.warning}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.palette.warning.main,
        backgroundColor: alpha(theme.palette.warning.main, 0.08)
      }
    },
    /**
     * @variant info
     */
    [`& .${snackbarClasses.info}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.palette.info.main,
        backgroundColor: alpha(theme.palette.info.main, 0.08)
      }
    }
  };
});

export const snackbarClasses = {
  root: 'snackbar__root',
  toast: 'snackbar__toast',
  title: 'snackbar__title',
  icon: 'snackbar__icon',
  iconSvg: 'snackbar__icon__svg',
  content: 'snackbar__content',
  description: 'snackbar__description',
  actionButton: 'snackbar__action__button',
  cancelButton: 'snackbar__cancel__button',
  closeButton: 'snackbar__close_button',
  loadingIcon: 'snackbar__loading_icon',
  /********/
  default: 'snackbar__default',
  error: 'snackbar__error',
  success: 'snackbar__success',
  warning: 'snackbar__warning',
  info: 'snackbar__info',
  /********/
  loader: 'sonner-loader',
  loaderVisible: '&[data-visible="true"]',
  closeBtnVisible: '[data-close-button="true"]'
};
