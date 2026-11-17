import { Stack } from '@mui/system';
import { InvitationItemType } from 'store/slices/invitation/invitationTypes';
import { isExpired } from 'utils/dateUtils';
import ResendInvitation from '../ResendInvitation';
import RevokeInvitation from '../RevokeInvitation';

interface Props {
  invitation?: InvitationItemType | null;
}

const InvitationActions = ({ invitation }: Props) => {
  if (!invitation) return null;

  const expired = isExpired(invitation.expiredDate);
  const showResend = !invitation.used;
  const showRevoke = !expired && !invitation.used;
  return (
    <Stack rowGap={1}>
      {showResend ? <ResendInvitation invitationId={invitation.invitationId} email={invitation.email} /> : null}
      {showRevoke ? <RevokeInvitation invitationId={invitation.invitationId} /> : null}
    </Stack>
  );
};

export default InvitationActions;
