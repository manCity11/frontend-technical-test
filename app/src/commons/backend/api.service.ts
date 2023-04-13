// @ts-ignore
import conf from 'MAIN_CONFIG'; 
import axios from 'axios';
import { BackendConfig } from './types';

export const ApiService = {
  call: (config: BackendConfig) => axios({ ...config, method: config.method || 'GET', url: conf.backendHost + config.url })
    .then((result = {} as any) => result.data),
};
