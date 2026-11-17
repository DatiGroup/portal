import { Box, Paper, styled } from '@mui/material';
import LookupAddContextProvider from 'sections/dashboard/lookups/lookupAdd/context/LookupAddContextProvider';
import LookupAddForm from 'sections/dashboard/lookups/lookupAdd/components/LookupAddForm';

const NewLookupContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center'
}));

const NewLookupWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: '1rem'
}));

const LookupAddView = () => {
  return (
    <NewLookupContainer>
      <NewLookupWrapper elevation={0}>
        <LookupAddContextProvider>
          <LookupAddForm />
        </LookupAddContextProvider>
      </NewLookupWrapper>
    </NewLookupContainer>
  );
};

export default LookupAddView;
