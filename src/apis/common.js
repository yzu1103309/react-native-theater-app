import ky from 'ky';
import {apiPrefix} from '../data';

export const client = ky.extend({
  prefixUrl: apiPrefix,
  headers: {
    'X-No-CSRF': '1',
  },
  credentials: 'include',
});
