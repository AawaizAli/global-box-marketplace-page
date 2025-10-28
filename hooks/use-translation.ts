import { useLanguage } from './use-language';
import { translations } from '@/lib/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof translations.EN) => {
    return translations[language][key];
  };

  return { t, language };
};
