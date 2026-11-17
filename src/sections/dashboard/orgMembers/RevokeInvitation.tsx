import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRevokeInviteMutation } from 'store/slices/invitation/invitationSlice';
import { showError, showSuccessMessage } from 'utils/alerts';

interface Props {
  invitationId: number;
}
const RevokeInvitation = ({ invitationId }: Props) => {
  const { t } = useTranslation();
  const [revoke, { isLoading }] = useRevokeInviteMutation();

  const handleRevoke = async () => {
    try {
      await revoke(invitationId).unwrap();
      showSuccessMessage();
    } catch (error: any) {
      showError(error);
    }
  };
  return (
    <Button size="small" variant="text" onClick={handleRevoke} loading={isLoading} disabled={isLoading}>
      {t('invitation.actionList.revoke')}
    </Button>
  );
};

export default RevokeInvitation;
