
export class User {
  id: number;
  // firstName: string;
  // lastName: string;
  // comments: Comment[];
  email: string;
  username: string;
  password: string;
  active: boolean;
  role: string;

  constructor(
    id?: number,
    // firstName?: string,
    // lastName?: string,
    // comments?: Comment[],
    email?: string,
    username?: string,
    password?: string,
    active?: boolean,
    role?: string
  ) {
    this.id = id;
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.comments = comments;
    this.email = email;
    this.username = username;
    this.password = password;
    this.active = active;
    this.role = role;
  }
}
