import { useTranslation } from 'react-i18next';
import { TermsEnumType } from 'store/slices/terms/termsType';
import LegalPage from './LegalPage';

export default function TermsAndConditions() {
  const { t } = useTranslation();
  return <LegalPage type={TermsEnumType.TERMS_AND_CONDITIONS} title={t('footer.termsAndConditions')} />;
}
