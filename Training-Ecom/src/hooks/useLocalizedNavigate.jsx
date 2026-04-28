import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (path, options) => {
    const lang = i18n.language;
    const isEnglish = lang === 'en';
    
    const isAlreadyPrefixed = path.startsWith(`/${lang}`);

    const localizedPath = (!isEnglish && !isAlreadyPrefixed) 
      ? (path === '/' ? `/${lang}` : `/${lang}${path}`) 
      : path;

    navigate(localizedPath, options);
  };
};