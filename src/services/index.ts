import axios from 'axios';

const accessToken = 'asd';
const client = 'adsd';
const uid = 'dasdasd';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
type UserCredentials = {
  ['Access-Token']: string;
  Client: string;
  Uid: string;
};

const headers: UserCredentials = {
  'Access-Token': accessToken,
  Client: client,
  Uid: uid,
};

const handleError = ({
  data,
  message,
  status,
}: {
  message: string;
  data: any;
  status: string;
}) => {
  return Promise.reject({ message, data, status });
};

instance.interceptors.request.use(
  (request) =>
    (request.headers = {
      ...request.headers,
      ...headers,
    })
);

instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status });
  }
);

export default instance;
