import { useCallback, useMemo } from 'react';

import { Field } from '.';
import { useTranslation } from 'react-i18next';
import { OptionType } from 'types/optionType';

type EnumLike = { [key: string]: string | number };

interface Props<T extends EnumLike> {
  name: string;
  translationPrefix: string;
  enumType: T;
  label?: string;
  disabled?: boolean;
}

const EnumSelect = <T extends EnumLike>({ name, label, disabled, translationPrefix, enumType }: Props<T>) => {
  const { t } = useTranslation();

  const optionsList = useMemo<OptionType[]>(
    () =>
      Object.keys(enumType).map((key) => ({
        value: key,
        label: t(`${translationPrefix}.${key}`)
      })),
    [enumType, t, translationPrefix]
  );

  const optionsArray = optionsList.map((p) => p.value);

  const getOption = useCallback((inputValue: string, _optionsList: OptionType[]) => {
    const result = _optionsList.find((op) => op.label === inputValue || op.value === inputValue);
    return {
      value: result?.value || '',
      label: result?.label || ''
    };
  }, []);

  const getOptionLabel = useCallback(
    (option: string) => {
      const o = optionsList.find((op) => op.value === option);
      return o?.label ?? '';
    },
    [optionsList]
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: string) => {
      const result = getOption(option, optionsList);

      return (
        <li {...props} key={result.value}>
          {result.label}
        </li>
      );
    },
    [getOption, optionsList]
  );

  return (
    <Field.Autocomplete
      name={name}
      label={label}
      disabled={disabled}
      options={optionsArray}
      autoComplete
      autoSelect
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      getOptionKey={(option: OptionType) => option?.value}
    />
  );
};

export default EnumSelect;
