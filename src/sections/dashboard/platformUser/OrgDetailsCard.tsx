import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useTranslation } from 'react-i18next';
import { OrganizationType } from 'store/slices/platformUsers/platformUserTypes';

interface Props {
  orgDetails: OrganizationType;
}

const OrgDetailsCard = ({ orgDetails }: Props) => {
  const { t } = useTranslation();

  const list1 = [
    {
      id: 'name',
      label: t('org.name'),
      value: orgDetails?.name
    },
    {
      id: 'registrationNumber',
      label: t('org.registrationNumber'),
      value: orgDetails?.registrationNumber
    }
  ];

  return (
    <MainCard title={t('org.orgDetails')}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <List>
            {list1.map((item) => (
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

export default OrgDetailsCard;
