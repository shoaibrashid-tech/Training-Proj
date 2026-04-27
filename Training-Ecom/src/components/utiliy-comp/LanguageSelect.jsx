import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({width=120}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      defaultValue={i18n.language}
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