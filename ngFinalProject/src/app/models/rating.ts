export class Rating {
  id: number;
  rating: number;
  user: string;

  constructor(
    id?: number,
    rating?: number,
    user?: string
  ) {
    this.id = id;
    this.rating = rating;
    this.user = user;
  }
}
