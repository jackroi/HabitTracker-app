export interface User {
  name: string;
  email: string;
  passwordDigest: string;
  salt: string;
  registrationDate: Date;
}
