import axios, { AxiosRequestConfig } from 'axios';
import { AuthSchema } from 'src/modules/identity/types/AuthSchema';
import { ExposedHeaders } from './data';
import appSettings from '../app-settings';
import identityStore from '../identity/store';

const authenticationSchema =
  AuthSchema[
    <keyof typeof AuthSchema>appSettings?.authentication?.schema || 'bearer'
  ];
const nonXsrfMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];
const instance = axios.create({
  baseURL: appSettings.api.url,
  headers: {
    'Content-type': 'application/json',
  },
});

const handleCookiesAuthenticationRequestAsync = async (
  config: AxiosRequestConfig
) => {
  if (config.method && !nonXsrfMethods.includes(config.method.toUpperCase())) {
    (config.headers as Record<string, string>)[ExposedHeaders.xxsrfToken] =
      identityStore.xsrfToken || '';
  }
};

const handleBearerAuthenticationRequestAsync = async (
  config: AxiosRequestConfig
) => {
  if (identityStore.user && identityStore.user.accessToken) {
    (
      config.headers as Record<string, string>
    ).Authorization = `Bearer ${identityStore.user.accessToken}`;
  }
};

instance.interceptors.request.use(
  async (config) => {
    if (authenticationSchema === AuthSchema.cookies) {
      await handleCookiesAuthenticationRequestAsync(config);
    } else if (authenticationSchema === AuthSchema.bearer) {
      await handleBearerAuthenticationRequestAsync(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
