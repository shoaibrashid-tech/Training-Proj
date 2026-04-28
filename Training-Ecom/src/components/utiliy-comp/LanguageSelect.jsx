import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageSelector = ({ width = 120 }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (newLng) => {
    const isCurrentlyUrdu = location.pathname.startsWith('/ur');
    const cleanPath = isCurrentlyUrdu ? location.pathname.replace('/ur', '') : location.pathname;

    let newPath = cleanPath;
    if (newLng === 'en') {
      newPath = `/${cleanPath === '/' ? '' : cleanPath}`;
    }else{
      newPath = `/${newLng}${cleanPath === '/' ? '' : cleanPath}`;
    }

    navigate(newPath);
    i18n.changeLanguage(newLng);
  };

  return (
    <Select
      defaultValue={location.pathname.startsWith('/ur') ? 'ur' : 'en'}
      onChange={changeLanguage}
      style={{ width: width }}
      options={[
        { value: 'en', label: 'English' },
        { value: 'ur', label: 'اردو' },
      ]}
    />
  );
};

export default LanguageSelector;