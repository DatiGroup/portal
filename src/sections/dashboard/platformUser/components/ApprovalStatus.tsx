import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApprovalRequestStatusEnum } from 'store/type/ApprovalRequestStatusEnum';

interface Props {
  status?: string;
}

const ApprovalStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  if (status === ApprovalRequestStatusEnum.REJECTED)
    return <Chip color="error" label={t('ApprovalRequestStatusEnum.rejected')} size="small" variant="light" />;

  if (status === ApprovalRequestStatusEnum.APPROVED)
    return <Chip color="success" label={t('ApprovalRequestStatusEnum.approved')} size="small" variant="light" />;

  if (status === ApprovalRequestStatusEnum.INVITE)
    return <Chip color="success" label={t('ApprovalRequestStatusEnum.invite')} size="small" variant="light" />;

  if (status === ApprovalRequestStatusEnum.PENDING)
    return <Chip color="warning" label={t('ApprovalRequestStatusEnum.pending')} size="small" variant="light" />;

  return <Chip label={t('unknown')} size="small" variant="light" />;
};

export default ApprovalStatus;
