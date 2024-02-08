import httpClient from '../http-client';
import IConfirmEmailParams from './types/params/IConfirmEmailParams';
import ISignInParams from './types/params/ISignInParams';
import ISignUpParams from './types/params/ISignUpParams';
import IToken from './types/IToken';
import IUser from './types/IUser';
import identityStore from './store';

export function useIdentity() {
  const urlPath = 'api/v1/identity/auth';

  return {
    userIsInRole(roleName: string) {
      const { roles } = identityStore.user;
      return roles && roles.length
        ? roles.filter((role) => role.toLowerCase() == roleName.toLowerCase())
            .length !== 0
        : false;
    },
    userIsAuthenticated() {
      return identityStore.user.userName !== undefined;
    },
    async confirmEmailAsync(emailToken: IConfirmEmailParams) {
      return await httpClient.post(`${urlPath}/confirm-email`, emailToken);
    },
    async getXsrfTokenAsync() {
      return await httpClient
        .get<IToken>(`${urlPath}/xsrf-token`)
        .then((resp) => {
          identityStore.setXsrfToken(resp.data.token);
          return identityStore.xsrfToken;
        });
    },
    async getAsync() {
      await httpClient
        .get<IUser>(urlPath)
        .then((resp) => {
          if (resp.status === 200) {
            identityStore.setUser(resp.data);
          }
        })
        .finally(async () => {
          await this.getXsrfTokenAsync();
        });
    },
    async signUpAsync(credentials: ISignUpParams) {
      return await httpClient
        .post<IUser>(`${urlPath}/sign-up`, credentials)
        .then(async (resp) => {
          identityStore.setUser(resp.data);
          await this.getXsrfTokenAsync();
        });
    },
    async signInAsync(credentials: ISignInParams) {
      return await httpClient
        .post<IUser>(`${urlPath}/sign-in`, credentials)
        .then(async (resp) => {
          identityStore.setUser(resp.data);
          await this.getXsrfTokenAsync();
        });
    },
    async signOutAsync() {
      return httpClient.post(`${urlPath}/sign-out`).then(() => {
        identityStore.setUser({} as IUser);
        identityStore.setXsrfToken(null);
      });
    },
  };
}

export default useIdentity();
