import { User } from './User';

export class UserRole {
  constructor(    
    public id: number,
    public name: string,
    public users: User[],
  ) {
    this.id = id;
    this.name = name;
    this.users = users;
  }

  get noDelete(): boolean {
    return this.users && this.users.length > 0;
  }
}
