import { Box, Paper, styled } from '@mui/material';
import ValueAddContextProvider from 'sections/dashboard/lookups/lookupValueAdd/context/ValueAddContextProvider';
import ValueAddForm from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddForm';

const NewValueContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center'
}));

const NewValueWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: '1rem'
}));

const LookupValueAddView = () => {
  return (
    <NewValueContainer>
      <NewValueWrapper elevation={0}>
        <ValueAddContextProvider>
          <ValueAddForm />
        </ValueAddContextProvider>
      </NewValueWrapper>
    </NewValueContainer>
  );
};

export default LookupValueAddView;
