import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApprovalRequestsType } from 'store/slices/platformUsers/platformUserTypes';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';

import { useApproveUserMutation, useRejectUserMutation } from 'store/slices/platformUsers/platformUserSlice';
import { showErrorMessage, showSuccessMessage } from 'utils/alerts';
import ApprovalTable from '../ApprovalTable/ApprovalTable';
import RejectDialog from './RejectDialog';
import useCanEditUser from '../hooks/useCanEditUser';
import useCustomBreakpoints from 'hooks/useCustomBreakpoints';
import { columnsDesktop } from './columnsDesktop';
import { columnsMobile } from './columnsMobile';

interface Props {
  data: ApprovalRequestsType[];
  orgId?: number;
}
const ApprovalRequestTable = ({ data, orgId }: Props) => {
  const { t } = useTranslation();

  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useRejectUserMutation();
  const { isMobile } = useCustomBreakpoints();

  const [showDialog, setShowDialog] = useState(false);
  const [rows, setRow] = useState<ApprovalRequestsType | undefined>(undefined);

  const { canEdit } = useCanEditUser();

  const onReject = useCallback((row: ApprovalRequestsType) => {
    setRow(row);
    setShowDialog(true);
  }, []);

  const onRejectConfirm = async (comment?: string) => {
    if (rows) {
      await handleReject(rows.approvalRequestId, comment);
    }
    setShowDialog(false);
  };

  const onClose = () => {
    setRow(undefined);
    setShowDialog(false);
  };

  const handleApproval = useCallback(
    async (requestId: number) => {
      try {
        if (!orgId) return;
        await approveUser({ requestId, orgId }).unwrap();

        showSuccessMessage();
      } catch (error) {
        console.error('Error changing approval status:', error);
        // Optionally, display an error message to the user
        showErrorMessage();
      }
    },
    [approveUser, orgId]
  );

  const handleReject = useCallback(
    async (requestId: number, comment?: string) => {
      try {
        await rejectUser({ requestId, comment }).unwrap();

        showSuccessMessage();
      } catch (error) {
        console.error('Error changing approval status:', error);
        // Optionally, display an error message to the user
        showErrorMessage();
      }
    },
    [rejectUser]
  );

  const columns = useMemo(
    () =>
      isMobile
        ? columnsMobile({
            t,
            canEdit,
            handleApproval,
            onReject
          })
        : columnsDesktop({
            t,
            canEdit,
            handleApproval,
            onReject
          }),
    [canEdit, handleApproval, isMobile, onReject, t]
  );

  return (
    <Stack rowGap={2}>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h5">{t('iam.approvalRequests')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilteringTable
            {...{
              data: data || [],
              columns,
              canExpand: true,
              renderSubComponent: (row) => <ApprovalTable data={row.original.approvals} />
            }}
          />
        </AccordionDetails>
      </Accordion>
      {showDialog && <RejectDialog onReject={onRejectConfirm} onClose={onClose} />}
    </Stack>
  );
};

export default ApprovalRequestTable;
