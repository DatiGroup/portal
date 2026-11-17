import { zodResolver } from '@hookform/resolvers/zod';
import { googleTranslate } from 'apiServices/googleApi';
import { LangCodes } from 'config';
import { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatLookupValueCode, getSecondaryLanguages } from 'sections/dashboard/lookups/lookupValueAdd/utils/valueAddUtils';
import { GoogleTranslateDTO } from 'types/googleApi';
import { LookupAddPayload } from 'store/slices/lookup/types';
import {
  LookupAddContextProps,
  LookupAddContextType,
  LookupSchema,
  LookupSchemaType,
  PrimaryTranslationSchema
} from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';
import { handleLookupInputParse } from 'sections/dashboard/lookups/lookupAdd/utils/lookupAddUtils';
import { useAddLookupMutation } from 'store/slices/lookup/lookupSlice';
import { showErrorMessage } from 'utils/alerts';

const translationInitialValues = Object.keys(LangCodes).reduce((tlObject, langCode) => {
  tlObject[`meaning_${langCode}`] = '';
  tlObject[`description_${langCode}`] = '';

  return tlObject;
}, {} as any);

const initialValue: LookupSchemaType = {
  lookupType: '',
  ...translationInitialValues,
  enabled: true,
  startDateActive: new Date().toISOString(),
  endDateActive: null,
  purpose: ''
};

export const LookupAddContext = createContext<LookupAddContextType>({
  valueState: null,
  errorMessage: null,
  isSubmitting: false,
  isTranslating: false,
  handleInput: () => {},
  handleAutoTranslate: () => {},
  methods: null,
  onSubmit: () => {},
  allowAutoTl: false
});

const LookupAddContextProvider = ({ children }: LookupAddContextProps) => {
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const navigate = useNavigate();

  const [addLookup] = useAddLookupMutation();

  const [valueInput, setValueInput] = useState<any>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [allowAutoTl, setAllowAutoTl] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const methods = useForm<LookupSchemaType>({
    resolver: zodResolver(LookupSchema(t)),
    defaultValues: initialValue
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data: LookupSchemaType) => {
    setErrorMessage(null);

    try {
      const lookupDTO = handleLookupInputParse(valueInput);

      const payload: LookupAddPayload = {
        lookupData: lookupDTO
      };

      await addLookup(payload).unwrap();
      navigate(-1);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      // setErrorMessage(errorMessage || t('lookupAdd.errorMessage'));
      showErrorMessage(errorMessage || t('lookupAdd.errorMessage'));
    }
  });

  const handleInput = (event: any) => {
    const { name, value, type } = event.target;

    setValueInput((prevState: any) => {
      let newValue = value;

      if (name === 'lookupType') newValue = formatLookupValueCode(newValue);
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
          valueInput[`meaning_${primaryLanguage}` as keyof LookupSchemaType] as string,
          valueInput[`description_${primaryLanguage}` as keyof LookupSchemaType] as string
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
      // setErrorMessage(errorMessage || t('lookupAdd.errorTlMessage'));
      showErrorMessage(errorMessage || t('lookupAdd.errorTlMessage'));
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
    <LookupAddContext
      value={{
        valueState: [valueInput, setValueInput],
        errorMessage,
        isSubmitting,
        isTranslating,
        handleInput,
        handleAutoTranslate,
        methods,
        onSubmit,
        allowAutoTl
      }}
    >
      {children}
    </LookupAddContext>
  );
};

export default LookupAddContextProvider;
