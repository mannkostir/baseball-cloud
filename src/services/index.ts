import { RequestHeaders, UserCredentials } from '@/types/commonTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const cachedCredentials:
  | UserCredentials
  | Record<string, any> = localStorage.getItem('credentials')
  ? JSON.parse(localStorage.getItem('credentials')!)
  : {};

const headers: RequestHeaders = {
  'access-token': cachedCredentials.token || '',
  client: cachedCredentials.client || '',
  uid: cachedCredentials.uid || '',
};

const handleError = ({ message }: { message: string }) => {
  return Promise.reject({ message });
};

instance.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    ...headers,
  };

  return request;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return handleError(error);
  }
);

export default instance;
