import { useEffect } from 'react';
import { ProductTypeEnum } from 'types/productTypes';
import { generateValidPassword } from 'utils/passwordStrength';

const useLazyPlaceholder = (
  id: string,
  value: string | null | undefined,
  isFieldDirty: boolean,
  setValue: (id: string, value: any, options?: { shouldDirty?: boolean }) => void,
  productType: ProductTypeEnum
) => {
  useEffect(() => {
    if (!isFieldDirty) {
      switch (productType) {
        case ProductTypeEnum.CHECKBOX:
          setValue(id, value === 'true', { shouldDirty: true });
          break;

        case ProductTypeEnum.PASSWORD:
          setValue(id, generateValidPassword(8, 30), { shouldDirty: true });
          break;

        default:
          setValue(id, value || '', { shouldDirty: true });
      }
    }
  }, [id, isFieldDirty, productType, setValue, value]);
};

export default useLazyPlaceholder;
