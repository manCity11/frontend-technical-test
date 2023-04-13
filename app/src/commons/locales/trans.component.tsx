/* istanbul ignore file */
import React from 'react';
import { LocalesService } from './locales.service';

import { TransProps, TransJSX } from './types';

export function Trans ({ id, values }: TransProps) {
  const i18n = LocalesService.getI18n();
  const message: TransJSX | string = i18n.get(id, values);

  return <>{ _.isObject(message) ? <span dangerouslySetInnerHTML={(message as TransJSX)} /> : message }</>;
}
