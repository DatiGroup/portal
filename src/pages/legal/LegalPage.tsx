import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';
import { useGetTermsQuery } from 'store/slices/terms/slice';
import { TermsEnumType } from 'store/slices/terms/termsType';
import { ScreenLoading } from 'components/ScreenLoading';

interface LegalPageProps {
  type: TermsEnumType;
  title: string;
}

export default function LegalPage({ type, title }: LegalPageProps) {
  const { data: terms, isLoading } = useGetTermsQuery();

  const term = useMemo(() => terms?.find((t) => t.type === type), [terms, type]);

  const sanitizedHtml = useMemo(() => (term ? DOMPurify.sanitize(term.contentHtml) : ''), [term]);

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Box
        sx={{
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            mt: 3,
            mb: 1.5
          },
          '& p': {
            mb: 2
          },
          '& ul, & ol': {
            pl: 4,
            mb: 2
          },
          '& li': {
            mb: 1
          }
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </Container>
  );
}
