/* istanbul ignore file */
export interface FunnelRouteType {
  path: string;
  component: () => JSX.Element;
  exact?: boolean;
}
