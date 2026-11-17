import { Box, Modal, ModalProps, Stack, useTheme } from '@mui/material';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { useId } from 'react';

interface ProductModalProps extends ModalProps {
  open: boolean;
  modalToggler: (state: boolean) => void;
  loading: boolean;
  disableBackdropClick?: boolean;
}

const DefaultModal = ({ open, modalToggler, loading, disableBackdropClick = false, children, sx, ...rest }: ProductModalProps) => {
  const uniqueModalId = useId();
  const theme = useTheme();

  const closeModal = (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') return;
    modalToggler(false);
  };

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby={`modal-${uniqueModalId}-label`}
          aria-describedby={`modal-${uniqueModalId}-description`}
          sx={{
            '& .MuiPaper-root:focus': {
              outline: 'none'
            }
          }}
          {...rest}
        >
          <MainCard
            sx={{
              minWidth: 'unset',
              width: '70%',
              maxWidth: theme.breakpoints.values.md,
              height: 'auto',
              maxHeight: 'calc(100vh - 48px)',
              ...sx
            }}
            modal
            content={false}
          >
            <SimpleBar sx={{ maxHeight: `calc(100vh - 48px)`, '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
              {loading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" sx={{ justifyContent: 'center' }}>
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                children
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
};

export default DefaultModal;
