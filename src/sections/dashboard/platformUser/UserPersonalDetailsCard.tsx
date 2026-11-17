import MailOutlined from '@ant-design/icons/MailOutlined';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useTranslation } from 'react-i18next';
import { PlatformUserDetailsType } from 'store/slices/platformUsers/platformUserTypes';
import { formatDateString } from 'utils/dateUtils';

interface Props {
  userDetails: PlatformUserDetailsType | undefined;
}

const UserPersonalDetailsCard = ({ userDetails }: Props) => {
  const { t } = useTranslation();

  const list1 = [
    {
      id: 'email',
      label: t('email'),
      value: userDetails?.email,
      icon: <MailOutlined />
    },
    {
      id: 'userName',
      label: t('userName'),
      value: userDetails?.userName
    },
    {
      id: 'firstName',
      label: t('firstName'),
      value: userDetails?.profile?.firstName
    },
    {
      id: 'lastName',
      label: t('lastName'),
      value: userDetails?.profile?.lastName
    }
  ];

  const list2 = [
    {
      id: 'preferredLang',
      label: t('preferredLang'),
      value: userDetails?.profile?.preferredLang
    },
    {
      id: 'startDateActive',
      label: t('startDate'),
      value: formatDateString(userDetails?.startDateActive)
    },
    {
      id: 'endDate',
      label: t('endDate'),
      value: formatDateString(userDetails?.endDateActive)
    }
  ];

  return (
    <MainCard title={t('personalDetails')}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <List>
            {list1.map((item) => (
              <ListItem key={item.id} secondaryAction={<Typography sx={{ textAlign: 'right' }}>{item.value ?? '-'}</Typography>}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={<Typography color="text.secondary">{item.label}</Typography>} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <List>
            {list2.map((item) => (
              <ListItem key={item.id} secondaryAction={<Typography sx={{ textAlign: 'right' }}>{item.value ?? '-'}</Typography>}>
                <ListItemText primary={<Typography color="text.secondary">{item.label}</Typography>} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UserPersonalDetailsCard;
