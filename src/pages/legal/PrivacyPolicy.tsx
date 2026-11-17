import { useTranslation } from 'react-i18next';
import { TermsEnumType } from 'store/slices/terms/termsType';
import LegalPage from './LegalPage';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return <LegalPage type={TermsEnumType.PRIVACY_POLICY} title={t('footer.privacyPolicy')} />;
}
