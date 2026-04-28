import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LocalizedLink = ({ to, children, ...props }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language; // e.g., 'en', 'ur', 'fr', 'ar'
  
  // Define your default language that doesn't need a prefix
  const defaultLang = 'en';

  // 1. If we are on the default language, keep the path as is
  // 2. Otherwise, construct the path with the language prefix
  const isDefault = lang === defaultLang;
  
  let localizedTo = to;

  if (!isDefault) {
    // Check if it's already prefixed to avoid double slashes (e.g., /ur/ur/cart)
    const isAlreadyPrefixed = to.startsWith(`/${lang}`);
    
    if (!isAlreadyPrefixed) {
      // If to is '/', return '/lang'. Otherwise, return '/lang/path'
      const prefix = `/${lang}`;
      localizedTo = to === '/' ? prefix : `${prefix}${to.startsWith('/') ? to : '/' + to}`;
    }
  }

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;