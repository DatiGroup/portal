import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { Trans, useTranslation } from 'react-i18next';
import useRegister from 'sections/auth/hooks/useRegister';
import { Field, Form } from 'components/hook-form';
import { InputLabel, MenuItem } from '@mui/material';
import { useGetStatusQuery } from 'store/slices/status/slice';
import { LangCodes } from 'config';
import CustomCaptcha from 'components/CustomCaptcha';

export default function RegisterForm() {
  const { t } = useTranslation();
  const { level, errorMessage, isSubmitting, isLoading, handleInput, methods, onSubmit, countries, captchaRef, onCaptchaConfirm, onClose } =
    useRegister();
  const { data, isLoading: isLoadingStatus } = useGetStatusQuery();

  return (
    <Form aria-label="registrationForm" methods={methods} onSubmit={onSubmit} autoSubmit>
      <CustomCaptcha ref={captchaRef} onSubmit={onCaptchaConfirm} onClose={onClose} />
      <Grid container spacing={3}>
        <Grid size={12}>
          <Field.Text name="userName" label={t('userName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Password name="password" onChange={handleInput} label={t('password')} placeholder={t('xcharacters', { x: 6 })} />
        </Grid>
        <Grid size={12}>
          <Field.Password name="repeatPassword" label={t('repeatPassword')} placeholder={t('xcharacters', { x: 6 })} />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Box aria-label="strengthIndicator" sx={{ bgcolor: level.password.color, width: 85, height: 8, borderRadius: '7px' }} />
              </Grid>
              <Grid>
                <Typography aria-label="strengthText" variant="subtitle1" fontSize="0.75rem">
                  {level.password.label}
                </Typography>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Field.Email name="email" label={t('email')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Text name="firstName" label={t('firstName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Text name="lastName" label={t('lastName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          {/* <InputLabel htmlFor="preferredLang">{t('preferredLang')}</InputLabel> */}
          <Field.Select label={t('preferredLang')} inputProps={{ id: 'preferredLang' }} displayEmpty name="preferredLang">
            <MenuItem value="">{t('selectLanguage')}</MenuItem>
            {!isLoadingStatus &&
              Array.isArray(data?.languages) &&
              data.languages.map((lang: string) => {
                return (
                  <MenuItem key={`option_${lang}`} value={lang}>
                    {LangCodes[lang as keyof typeof LangCodes]}
                  </MenuItem>
                );
              })}
          </Field.Select>
        </Grid>
        <Grid size={12}>
          <Field.Text name="organizationName" label={t('register.organizationName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Text
            name="registrationNumber"
            onChange={handleInput}
            label={t('register.registrationNumber')}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={12}>
          {/* <InputLabel htmlFor="country">{countries.countryType?.meaning}</InputLabel> */}
          <Field.Select label={countries.countryType?.meaning} inputProps={{ id: 'country' }} displayEmpty name="country">
            <MenuItem value="">{t('register.selectCountry')}</MenuItem>
            {Array.from(countries.countryValues.entries()).map(([code, meaning]) => {
              return (
                <MenuItem key={`option_${code}`} value={code}>
                  {meaning}
                </MenuItem>
              );
            })}
          </Field.Select>
        </Grid>
        <Grid size={12}>
          <Field.Text name="contactName" label={t('register.contactName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Text name="contactLastName" label={t('register.contactLastName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Text name="contactEmail" label={t('register.contactEmail')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Typography variant="body2">
            <Trans
              i18nKey="register.registerTerms"
              t={t}
              components={{
                serviceTerms: <Link variant="subtitle2" component={RouterLink} to="#" />,
                privacyPolicy: <Link variant="subtitle2" component={RouterLink} to="#" />
              }}
            />
          </Typography>
        </Grid>
        <Grid size={12}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Grid>
        <Grid size={12}>
          <AnimateButton>
            <Button
              name="submitButton"
              disableElevation
              loading={isSubmitting || isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              aria-label="submitButton"
            >
              {t('register.createAccount')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Form>
  );
}
