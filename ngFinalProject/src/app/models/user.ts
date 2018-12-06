
export class User {
  id: number;
  email: string;
  reputation: number;
  username: string;
  password: string;
  active: boolean;
  role: string;
  firstName: string;
  lastName: string;

  constructor(
    id?: number,
    email?: string,
    reputation?: number,
    username?: string,
    password?: string,
    active?: boolean,
    role?: string,
    firstName?: string,
    lastName?: string
  ) {
    this.id = id;
    this.email = email;
    this.reputation = reputation;
    this.username = username;
    this.password = password;
    this.active = active;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
