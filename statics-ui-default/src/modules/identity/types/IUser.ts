export default interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  languageCode: string;
  roles: Array<string>;
  accessToken: string;
}
