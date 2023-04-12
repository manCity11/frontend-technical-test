/* istanbul ignore file */
import { FUNNELS_ROUTES } from './funnels/route';
import { FunnelRouteType } from './types';

export const APP_ROUTES: [FunnelRouteType] = [
  ...FUNNELS_ROUTES,
];
