/* istanbul ignore file */
export interface BackendConfig {
  method?: 'PUT' | 'DELETE' | 'GET' | 'POST';
  url: string;
  data?: object;
  params?: object;
}


