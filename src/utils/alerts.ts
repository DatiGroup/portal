import { t } from 'i18next';
import { toast } from 'sonner';
import { getErrorMessage } from './error';

export const showSuccessMessage = (message?: string) => {
  const errorMsg = message ?? t('alerts.genericSuccess');
  toast.success(errorMsg);
};

export const showErrorMessage = (message?: string) => {
  const errorMsg = message ?? t('alerts.genericError');
  toast.error(errorMsg);
};

export const showInfoMessage = (message?: string) => {
  const infoMsg = message ?? '';
  toast.info(infoMsg);
};

export const showError = (error?: any) => {
  const msg = getErrorMessage(error);
  toast.error(msg);
};
