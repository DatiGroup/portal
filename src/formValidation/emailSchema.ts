import zod from 'zod';
import { TFunction } from 'i18next';

export const emailSchema = (t: TFunction) =>
  zod
    .email(t('validator.email'))
    .max(100, t('validator.max', { max: 100 }))
    .trim()
    .toLowerCase();
