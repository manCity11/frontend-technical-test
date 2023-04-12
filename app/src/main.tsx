/* istanbul ignore file */
// @ts-ignore
import conf from 'MAIN_CONFIG';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { APP_ROUTES } from './route';
import { LocalesService } from './commons/locales/locales.service';
import { I18nProvider } from './commons/locales/i18n-provider.component';

import './commons/locales/locales-fr.i18n';
import './commons/funnels/funnels-layout.scss';

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    LocalesService.fetchLocales(conf.locales_url)
      .then(() => {
        setIsLoading(false);
      }).catch(() => {
        setHasError(true);
      });
  }, []);

  if(hasError) {
    return <div>Error</div>;
  }

  return !isLoading ? (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {APP_ROUTES.map(({ path, component: Component }) => <Route key={path} element={<Component />} path={path}  />)}
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  ) : null;
}

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);
