import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InvitationForm from './InvitationForm';

const CreateInvitation = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowForm(true)}>
        {t('invitation.createInvitation')}
      </Button>
      {showForm ? <InvitationForm onClose={() => setShowForm(false)} /> : null}
    </>
  );
};

export default CreateInvitation;
