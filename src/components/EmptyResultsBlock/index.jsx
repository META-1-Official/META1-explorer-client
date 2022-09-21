import React from 'react';
import { EmptyLabel, SearchLink } from './EmptyResultsBlock.styles';
import { useTranslation } from 'react-i18next';

const EmptyResultsBlock = ({ withoutLink }) => {
  const { t } = useTranslation();
  return (
    <EmptyLabel>
      <div>{t('NO RESULTS FOUND')}</div>
      {!withoutLink && (
        <SearchLink
          to="/search"
          onClick={() => (location.pathname = '/search')}
        >
          {t('Try to Search Here')}
        </SearchLink>
      )}
    </EmptyLabel>
  );
};

export default EmptyResultsBlock;
