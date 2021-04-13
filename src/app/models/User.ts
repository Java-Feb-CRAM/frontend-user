export class User {
  constructor(
    public id: number,
    public role: string,
    public email: string,
    public username: string,
    public password: string,
    public givenName: string,
    public familyName: string,
    public phoneNumber: string
  ) {
    this.id = id;
    this.role = role;
    this.email = email;
    this.username = username;
    this.password = password;
    this.givenName = givenName;
    this.familyName = familyName;
    this.phoneNumber = phoneNumber;
  }
}
