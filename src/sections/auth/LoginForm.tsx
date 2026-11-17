import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button, FormHelperText, Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from './hooks/useAuth';

import { Field, Form } from 'components/hook-form';
import AnimateButton from 'components/@extended/AnimateButton';
import { TFunction } from 'i18next/typescript/t';
import { routePaths } from 'routes/routePaths';
import { CrudReponseType } from 'store/type/CrudReponseType';

const LoginSchema = (t: TFunction) =>
  zod.object({
    userName: zod.string().min(1, { message: t('validator.required') }),
    password: zod.string().min(6, { message: t('validator.min', { min: '6' }) })
  });

type LoginSchemaType = zod.infer<ReturnType<typeof LoginSchema>>;

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: LoginSchemaType = {
    userName: '',
    password: ''
  };

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema(t)),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data: LoginSchemaType) => {
    try {
      setErrorMessage(null);
      const res = await login(data.userName, data.password);
      res && navigate(routePaths.dashboard.portal.main);
    } catch (err: CrudReponseType | any) {
      console.error('Login onSubmit error:', err);
      setErrorMessage(err.response?.data?.message || t('login.loginFailed'));
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} autoSubmit>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Field.Text name="userName" label={t('userName')} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={12}>
          <Field.Password name="password" placeholder={t('xcharacters', { x: 6 })} />
        </Grid>
        <Grid size={12}>
          <Link variant="h6" component={RouterLink} to={routePaths.auth.forgotPassword} color="text.primary">
            {t('forgotPassword')}
          </Link>
        </Grid>
        <Grid size={12}>
          <AnimateButton>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting} loading={isSubmitting}>
              {t('login.submit')}
            </Button>
          </AnimateButton>
        </Grid>

        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
      </Grid>
    </Form>
  );
};

export default LoginForm;
