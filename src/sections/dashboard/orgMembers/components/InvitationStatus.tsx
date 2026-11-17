import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { InvitationItemType } from 'store/slices/invitation/invitationTypes';
import { isExpired } from 'utils/dateUtils';

interface Props {
  invitation?: InvitationItemType | null;
}

const InvitationStatus = ({ invitation }: Props) => {
  const { t } = useTranslation();

  if (!invitation) return <Chip color="default" label={t('invitation.statuList.notFound')} size="small" />;
  if (invitation.used) return <Chip color="success" label={t('invitation.statuList.accepted')} size="small" variant="light" />;
  if (isExpired(invitation?.expiredDate)) {
    return <Chip color="error" label={t('invitation.statuList.expired')} size="small" variant="light" />;
  } else {
    return <Chip color="warning" label={t('invitation.statuList.pending')} size="small" variant="light" />;
  }
};

export default InvitationStatus;
