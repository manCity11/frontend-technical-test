/* istanbul ignore file */
import React from 'react';
import { LocalesService } from './locales.service';

const I18nContext = React.createContext({ i18nContext: { get: (id: string) => id } });

export const withI18nContext = (Component: any) => (props: any) => (
  <I18nContext.Consumer>{(contexts) => <Component {...props} {...contexts} />}</I18nContext.Consumer>
);

export const I18nProvider = ({ children }: { children: JSX.Element }) => {
  const i18n = LocalesService.getI18n();

  return (
    <I18nContext.Provider value={{ i18nContext: { get: i18n.get  } }}>{children}</I18nContext.Provider>
  );
};
