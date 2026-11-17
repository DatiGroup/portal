import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useResendInviteMutation } from 'store/slices/invitation/invitationSlice';
import { showError, showSuccessMessage } from 'utils/alerts';

interface Props {
  invitationId: number;
  email: string;
}
const ResendInvitation = ({ invitationId, email }: Props) => {
  const { t } = useTranslation();
  const [resend, { isLoading }] = useResendInviteMutation();

  const handleResend = async () => {
    try {
      await resend({ id: invitationId, payload: { email } }).unwrap();
      showSuccessMessage(t('invitation.invitationSend'));
    } catch (error: any) {
      showError(error);
    }
  };
  return (
    <Button size="small" variant="outlined" onClick={handleResend} loading={isLoading} disabled={isLoading}>
      {t('invitation.actionList.resend')}
    </Button>
  );
};

export default ResendInvitation;
