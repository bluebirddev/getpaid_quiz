import { useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

import { getToken } from '~/auth';
import { setupAuth } from './auth';
import { AXIOS_INSTANCE } from './api/axios-instance';
import { QueryClientProvider } from 'react-query';
import queryClient from './query-client';

/**
 * Make sure auth is initialized (loading the user's credentials from
 * storage and make sure it is in memory)
 */
setupAuth();

/**
 * Do all the client-side setup.
 */
export default function Setup() {
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Adds the axios interceptor (this makes sure axios has access to the
     * auth token for its requests)
     */
    const interceptorRequest = AXIOS_INSTANCE.interceptors.request.use(
      (request) => {
        const token = getToken();

        if (token) {
          request.headers = {
            ...request.headers,
            Authorization: `${token}`,
          };
        }

        return request;
      },
      (error) => error
    );

    const interceptorResponse = AXIOS_INSTANCE.interceptors.response.use(
      (value) => value,
      (error) => {
        if (error?.response?.status === 401) {
          navigate('/');
        } else {
          return Promise.reject(error);
        }
      }
    );
    return () => {
      axios.interceptors.request.eject(interceptorRequest);
      axios.interceptors.request.eject(interceptorResponse);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
