import { RequestHeaders, UserCredentials } from '@/types/commonTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    Accept: 'application/json, */*, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const getHeaders = () => {
  const headers: RequestHeaders = {
    'access-token':
      JSON.parse(localStorage.getItem('credentials') || JSON.stringify({}))
        ?.token || '',
    client:
      JSON.parse(localStorage.getItem('credentials') || JSON.stringify({}))
        ?.client || '',
    uid:
      JSON.parse(localStorage.getItem('credentials') || JSON.stringify({}))
        ?.uid || '',
  };

  return headers;
};

const handleError = ({ message }: { message: string }) => {
  return Promise.reject({ message });
};

instance.interceptors.request.use((request) => {
  const headers = getHeaders();

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
