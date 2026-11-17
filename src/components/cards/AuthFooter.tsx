// material-ui
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routePaths';
import { useGetTermsQuery } from 'store/slices/terms/slice';
import { useMemo } from 'react';
import { TermsEnumType } from 'store/slices/terms/termsType';

export default function AuthFooter() {
  const { t } = useTranslation();
  const { data: terms, isLoading } = useGetTermsQuery();

  const termsAndConditions = useMemo(() => terms?.find((t) => t.type === TermsEnumType.TERMS_AND_CONDITIONS), [terms]);
  const privacyPolicy = useMemo(() => terms?.find((t) => t.type === TermsEnumType.PRIVACY_POLICY), [terms]);

  return (
    <Container maxWidth={false}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ gap: 2, justifyContent: { xs: 'center', sm: 'space-between', textAlign: { xs: 'center', sm: 'inherit' } } }}
      >
        <Typography variant="subtitle2" color="secondary">
          <Trans
            i18nKey="footer.copyright"
            t={t}
            values={{
              year: new Date().getFullYear(),
              brandName: t('brandName')
            }}
            components={{
              url: (
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                  component={MuiLink}
                  href={t('brandUrl')}
                  target="_blank"
                  underline="always"
                >
                  {t('brandName')}
                </Typography>
              )
            }}
          />
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1, sm: 3 }, textAlign: { xs: 'center', sm: 'inherit' } }}>
          {termsAndConditions && (
            <Typography
              variant="subtitle2"
              color="secondary"
              component={Link}
              to={routePaths.legal.termsAndConditions}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer.termsAndConditions')}
            </Typography>
          )}
          {privacyPolicy && (
            <Typography
              variant="subtitle2"
              color="secondary"
              component={Link}
              to={routePaths.legal.privacyPolicy}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer.privacyPolicy')}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
