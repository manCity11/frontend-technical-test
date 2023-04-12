/* istanbul ignore file */
import { MainTemplate } from './messaging/main';
import { FunnelRouteType } from '../types';

export const FUNNELS_ROUTES: [FunnelRouteType] = [
  {
    path: '*',
    component: MainTemplate,
  },
];
