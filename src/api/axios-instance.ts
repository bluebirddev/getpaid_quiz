import Axios, { AxiosRequestConfig } from 'axios';
import { logout } from '../auth';

/**
 * This will be utilized by "Orval" as the base HTTP client instance.
 * ie. if you look at "./endpoints" - it uses this instance.
 */

const API_HOST = import.meta.env.VITE_API_HOST;

const baseURL = API_HOST;

export const AXIOS_INSTANCE = Axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  },
});

/**
 * Custom serializer to convert array params to return:
 * key=a&key=b instead of key=[]a&key=[]b
 */
function paramsSerializer(params: Record<string, unknown>): string {
  if (!params) return '';
  return Object.entries(params)
    .reduce<string[]>((res, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          res.push(`${key}=${v}`);
        });
      } else {
        res.push(`${key}=${value}`);
      }
      return res;
    }, [])
    .join('&');
}

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    paramsSerializer,
    cancelToken: source.token,
  })
    .then((q) => {
      if (!q) {
        logout();
      }
      return q?.data;
    })
    .catch((error) => {
      if (error?.message === 'cancelled') {
        logout();
      }
      return Promise.reject(error);
    });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by Vue Query');
  };

  return promise;
};

export default customInstance;
