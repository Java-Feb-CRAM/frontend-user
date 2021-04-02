import { UserRole } from './UserRole';

export class User {
  constructor(
    public id: number,
    public userRole: UserRole,
    public givenName: string,
    public familyName: string,
    public username: string,
    public active: boolean,
    public email: string,
    public password: string,
    public phone: string,
  ) {
    this.id = id;
    this.userRole = userRole;
    this.givenName = givenName;
    this.familyName = familyName;
    this.username = username;
    this.active = active;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
