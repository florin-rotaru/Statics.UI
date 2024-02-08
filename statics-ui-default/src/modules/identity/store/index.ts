import { defineStore } from 'pinia';
import IIdentityState from '../types/IIdentityState';
import IUser from '../types/IUser';

export const useIdentityStore = defineStore('identity', {
  state: () =>
    ({
      user: {} as IUser,
      xsrfToken: null,
    } as IIdentityState),
  actions: {
    setUser(user: IUser) {
      this.$patch({ user: user });
    },
    setXsrfToken(xsrfToken: string | null) {
      this.$patch({ xsrfToken: xsrfToken });
    },
  },
});

const identityStore = useIdentityStore();
export default identityStore;
