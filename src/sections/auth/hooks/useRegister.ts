import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRegisterUserMutation } from 'store/slices/register/slice';
import { StringColorProps } from 'types/password';
import { strengthColor, strengthIndicator } from 'utils/passwordStrength';
import { handleRegisterFetch } from 'sections/auth/fetch/registerFetches';
import zod from 'zod';
import { CrudReponseType } from 'store/type/CrudReponseType';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from 'utils/alerts';
import { useGetRegistrationCountriesQuery } from 'store/slices/status/slice';
import { LookupCode } from 'store/slices/lookup/types';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { emailSchema } from 'formValidation/emailSchema';

const RegisterSchema = (t: TFunction) =>
  zod
    .object({
      userName: zod
        .string()
        .min(5, t('validator.min', { min: 5 }))
        .max(255, t('validator.max', { max: 255 }))
        .regex(/^[a-zA-Z0-9._@+-]+$/, t('validator.userName.letterCheck'))
        .refine((val) => !val.includes('..'), 'Username cannot contain consecutive dots')
        .refine((val) => !val.startsWith('.') && !val.endsWith('.'), 'Username cannot start or end with a dot'),
      password: zod
        .string()
        .min(8, t('validator.min', { min: 8 }))
        .max(64, t('validator.max', { max: 64 }))
        .regex(/^(?=.*[a-z])/, t('validator.password.lowerCaseCheck'))
        .regex(/^(?=.*[A-Z])/, t('validator.password.upperCaseCheck'))
        .regex(/^(?=.*\d)/, t('validator.password.digitCheck'))
        .regex(/^(?=.*[!@#$%^&()_+\-=\[\]{}|\\:";'<>,.?/~])/, t('validator.password.specialCharCheck')),
      repeatPassword: zod.string(),
      email: emailSchema(t),
      firstName: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      lastName: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      preferredLang: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      organizationName: zod
        .string()
        .max(200, t('validator.max', { max: 200 }))
        .nonempty(t('validator.required')),
      registrationNumber: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      country: zod
        .string()
        .max(2, t('validator.max', { max: 2 }))
        .nonempty(t('validator.required')),
      contactName: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      contactLastName: zod
        .string()
        .max(50, t('validator.max', { max: 50 }))
        .nonempty(t('validator.required')),
      contactEmail: emailSchema(t)
    })
    .superRefine(({ password, repeatPassword }, ctx) => {
      if (password !== repeatPassword)
        ctx.addIssue({
          code: 'custom',
          message: t('validator.notMatch'),
          path: ['repeatPassword']
        });
    });

const defaultInput: RegisterSchemaType = {
  userName: '',
  password: '',
  repeatPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  preferredLang: '',
  organizationName: '',
  registrationNumber: '',
  country: '',
  contactName: '',
  contactLastName: '',
  contactEmail: ''
};

export type RegisterSchemaType = zod.infer<ReturnType<typeof RegisterSchema>>;

export interface IndicatorInterface {
  password: StringColorProps;
}

export const defaultLevelProps: StringColorProps = strengthColor(0) ?? { color: '', label: '' };

export const defaultLevel: IndicatorInterface = {
  password: defaultLevelProps
};

const useRegister = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const { data: countriesRes } = useGetRegistrationCountriesQuery();
  const captchaRef = useRef<HCaptcha>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [userInput, setUserInput] = useState<RegisterSchemaType>(defaultInput);
  const [level, setLevel] = useState<IndicatorInterface>(defaultLevel);

  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema(t)),
    defaultValues: defaultInput
  });

  const [registerUser] = useRegisterUserMutation();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue
  } = methods;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = handleSubmit(async (data: RegisterSchemaType) => {
    setErrorMessage(null);
    try {
      setIsLoading(true);
      await captchaRef.current?.execute();
    } catch (error) {
      console.error('useRegister onSubmit error:', error);
      showErrorMessage();
      setIsLoading(false);
    }
  });

  const onCaptchaConfirm = async (recaptchaToken: string) => {
    const data = methods.getValues();
    try {
      const res: CrudReponseType = await handleRegisterFetch(() => registerUser({ ...data, recaptchaToken }).unwrap());
      showSuccessMessage(t('register.registrationSuccess'));
      res && navigate('/auth/login');
    } catch (err: CrudReponseType | any) {
      setErrorMessage(err.response?.data?.message || t('register.registrationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setIsLoading(false);
  };

  const handleInput = (event: any) => {
    let { name, value } = event.target;

    name == 'registrationNumber' && (value = value.toUpperCase().trim()) && setValue(name as keyof RegisterSchemaType, value);

    if (name === 'password') {
      setValue(name as keyof RegisterSchemaType, value);
      setLevel((prevState) => ({
        ...prevState,
        [name]: strengthColor(strengthIndicator(value)) ?? { color: '', label: '' }
      }));
    }
  };

  const countries = useMemo(() => {
    const countryType = countriesRes?.tl?.find((tl) => tl.languageCode === currentLang)?.translation;
    const countryValues = new Map();

    countriesRes?.lookupCodes?.forEach((code: LookupCode) => {
      const codeTranslation = code?.tl?.find((tl) => tl.languageCode === currentLang)?.translation;

      countryValues.set(code.lookupCode, codeTranslation?.meaning || '');
    });

    return {
      countryType: countryType,
      countryValues: countryValues
    };
  }, [currentLang, countriesRes]);

  return { level, errorMessage, isSubmitting, isLoading, handleInput, methods, onSubmit, onCaptchaConfirm, onClose, captchaRef, countries };
};

export default useRegister;
