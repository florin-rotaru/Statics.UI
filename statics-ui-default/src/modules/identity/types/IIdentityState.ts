import IUser from './IUser';

export default interface IIdentityState {
  user: IUser;
  xsrfToken: string | null;
}
