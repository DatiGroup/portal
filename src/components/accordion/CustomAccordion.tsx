import { Box, BoxProps, styled, useTheme } from '@mui/material';

interface CustomAccordionProps extends BoxProps {
  children: React.ReactNode | React.ReactNode[];
}

const CustomAccordionWrapper = styled(Box)<BoxProps>(() => ({}));

const CustomAccordion = ({ children, sx, ...rest }: CustomAccordionProps) => {
  const theme = useTheme();

  return (
    <CustomAccordionWrapper
      sx={{
        width: '100%',
        '& .MuiAccordion-root': {
          borderColor: theme.palette.divider,
          '& .MuiAccordionSummary-root': {
            bgcolor: 'transparent'
            // flexDirection: 'row'
          },
          '& .MuiAccordionDetails-root': {
            borderColor: theme.palette.divider
          },
          '& .Mui-expanded': {
            color: theme.palette.primary.main
          }
        },
        ...sx
      }}
      {...rest}
    >
      {children}
    </CustomAccordionWrapper>
  );
};

export default CustomAccordion;
