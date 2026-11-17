import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApprovalActionEnum } from 'store/type/ApprovalActionEnum';

interface Props {
  action?: ApprovalActionEnum;
}

const ApprovalAction = ({ action }: Props) => {
  const { t } = useTranslation();

  if (action === ApprovalActionEnum.APPROVED)
    return <Chip color="success" label={t(`ApprovalActionEnum.${ApprovalActionEnum.APPROVED}`)} size="small" variant="light" />;
  if (action === ApprovalActionEnum.REJECTED)
    return <Chip color="error" label={t(`ApprovalActionEnum.${ApprovalActionEnum.REJECTED}`)} size="small" variant="light" />;
  return <Chip label={t('unknown')} size="small" variant="light" />;
};

export default ApprovalAction;
