export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  active: boolean;
  role: string;

  constructor(
    id?: number,
    email?: string,
    username?: string,
    password?: string,
    active?: boolean,
    role?: string
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.active = active;
    this.role = role;
  }
}
