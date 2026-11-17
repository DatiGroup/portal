import { useAdminLogListQuery, usePlatformUserQuery } from 'store/slices/platformUsers/platformUserSlice';
import { useParams } from 'react-router';
import { Grid } from '@mui/system';
import UserPersonalDetailsCard from './UserPersonalDetailsCard';
import UserAccessManagmentCard from './UserAccessManagmentCard/UserAccessManagmentCard';
import ApprovalRequestTable from './ApprovalRequest/ApprovalRequestTable';
import AdminActivityLogTable from './AdminActivityLog/AdminActivityLogTable';
import { ScreenLoading } from 'components/ScreenLoading';
import { Container } from '@mui/material';
import OrgDetailsCard from './OrgDetailsCard';

const PlatformUserDetailView = () => {
  const { id = '' } = useParams();
  const { data, isLoading } = usePlatformUserQuery(id, { skip: !id });
  const { data: adminLogData, isLoading: isAdminLoading } = useAdminLogListQuery(id, { skip: !id });

  //new users should have 1 order
  const orgId = data?.organizations[0]?.userOrganizationId;

  if (isLoading || isAdminLoading) return <ScreenLoading />;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserPersonalDetailsCard userDetails={data?.user} />
        </Grid>

        {data?.organizations.map((p) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <OrgDetailsCard orgDetails={p} />
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 4 }}>{data?.user.userId && <UserAccessManagmentCard data={data?.iam} userId={data?.user.userId} />}</Grid>
        <Grid size={12}>
          <AdminActivityLogTable data={adminLogData || []} />
        </Grid>
        <Grid size={12}>
          <ApprovalRequestTable data={data?.user.approvalRequests || []} orgId={orgId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlatformUserDetailView;
