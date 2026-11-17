import { zodResolver } from '@hookform/resolvers/zod';
import { googleTranslate } from 'apiServices/googleApi';
import { LangCodes } from 'config';
import { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formatLookupValueCode,
  getSecondaryLanguages,
  handleLookupValueInputParse
} from 'sections/dashboard/lookups/lookupValueAdd/utils/valueAddUtils';
import { GoogleTranslateDTO } from 'types/googleApi';
import { useAddLookupValueMutation } from 'store/slices/lookup/lookupSlice';
import { LookupValueAddPayload } from 'store/slices/lookup/types';
import {
  LookupValueAddContextProps,
  LookupValueAddContextType,
  LookupValueSchema,
  LookupValueSchemaType,
  PrimaryTranslationSchema
} from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';
import { routePaths } from 'routes/routePaths';
import { showErrorMessage } from 'utils/alerts';

const translationInitialValues = Object.keys(LangCodes).reduce((tlObject, langCode) => {
  tlObject[`meaning_${langCode}`] = '';
  tlObject[`description_${langCode}`] = '';

  return tlObject;
}, {} as any);

const initialValue: LookupValueSchemaType = {
  lookupCode: '',
  ...translationInitialValues,
  enabled: true,
  startDateActive: new Date().toISOString(),
  endDateActive: null
};

export const ValueAddContext = createContext<LookupValueAddContextType>({
  valueState: null,
  errorMessage: null,
  isSubmitting: false,
  isTranslating: false,
  handleInput: () => {},
  handleAutoTranslate: () => {},
  methods: null,
  onSubmit: () => {},
  allowAutoTl: false,
  lookupType: null
});

const ValueAddContextProvider = ({ children }: LookupValueAddContextProps) => {
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const { type } = useParams();
  const navigate = useNavigate();

  const [addLookupValue] = useAddLookupValueMutation();

  const [valueInput, setValueInput] = useState<any>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [allowAutoTl, setAllowAutoTl] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const methods = useForm<LookupValueSchemaType>({
    resolver: zodResolver(LookupValueSchema(t)),
    defaultValues: initialValue
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data: LookupValueSchemaType) => {
    setErrorMessage(null);

    try {
      const lookupValueDTO = handleLookupValueInputParse(valueInput);

      const payload: LookupValueAddPayload = {
        lookupType: type as string,
        lookupValueData: lookupValueDTO
      };

      // await handleLookupValueAddFetch(() => addLookupValue(payload).unwrap());
      await addLookupValue(payload).unwrap();

      navigate(routePaths.dashboard.tool.lookups.values(type || ''));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      // setErrorMessage(errorMessage || t('lookupValueAdd.errorMessage'));
      showErrorMessage(errorMessage || t('lookupValueAdd.errorMessage'));
    }
  });

  const handleInput = (event: any) => {
    const { name, value, type } = event.target;

    setValueInput((prevState: any) => {
      let newValue = value;

      if (name === 'lookupCode') newValue = formatLookupValueCode(newValue);
      if (name === 'enabled' && type === 'checkbox') newValue = !prevState['enabled'];

      return { ...prevState, [name]: newValue };
    });
  };

  const handleAutoTranslate = async () => {
    setIsTranslating(true);

    const primaryLanguage = currentLang;
    const secondaryLanguages = getSecondaryLanguages(currentLang as keyof typeof LangCodes);

    const translationPromises: Promise<GoogleTranslateDTO>[] = secondaryLanguages.map((langCode) =>
      googleTranslate({
        q: [
          valueInput[`meaning_${primaryLanguage}` as keyof LookupValueSchemaType] as string,
          valueInput[`description_${primaryLanguage}` as keyof LookupValueSchemaType] as string
        ],
        source: primaryLanguage as keyof typeof LangCodes,
        target: langCode as keyof typeof LangCodes
      })
    );

    try {
      const translations = await Promise.all(translationPromises);

      const translationsObject = translations.reduce((langObj, translation: GoogleTranslateDTO) => {
        const langCode = translation.target;

        setValue(`meaning_${langCode}`, translation.translations[0].translatedText, {
          shouldValidate: true,
          shouldDirty: true
        });

        setValue(`description_${langCode}`, translation.translations[1].translatedText, {
          shouldValidate: true,
          shouldDirty: true
        });

        langObj[`meaning_${langCode}`] = translation.translations[0].translatedText;
        langObj[`description_${langCode}`] = translation.translations[1].translatedText;

        return langObj;
      }, {} as any);

      setValueInput((prevState: any) => ({
        ...prevState,
        ...translationsObject
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      // setErrorMessage(errorMessage || t('lookupValueAdd.errorTlMessage'));
      showErrorMessage(errorMessage || t('lookupValueAdd.errorTlMessage'));
      setIsTranslating(false);
    }

    setIsTranslating(false);
  };

  useEffect(() => {
    const { success } = PrimaryTranslationSchema.safeParse({
      primaryMeaning: valueInput[`meaning_${currentLang}`],
      primaryDescription: valueInput[`description_${currentLang}`]
    });
    setAllowAutoTl(success);
  }, [valueInput, currentLang]);

  return (
    <ValueAddContext
      value={{
        valueState: [valueInput, setValueInput],
        errorMessage,
        isSubmitting,
        isTranslating,
        handleInput,
        handleAutoTranslate,
        methods,
        onSubmit,
        allowAutoTl,
        lookupType: type ?? ''
      }}
    >
      {children}
    </ValueAddContext>
  );
};

export default ValueAddContextProvider;
