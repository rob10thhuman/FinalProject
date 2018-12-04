import { User } from './user';
export class Rating {
  id: number;
  rating: number;
  user: User;

  constructor(
    id?: number,
    rating?: number,
    user?: User
  ) {
    this.id = id;
    this.rating = rating;
    this.user = user;
  }
}
