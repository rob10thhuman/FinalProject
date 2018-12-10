export class CategoryRating {
  id: number;
  category: {};
  rating: number;
  userId: number;
  languageId: number;

  constructor(
    id: number,
    category: {},
    rating: number,
    userId: number,
    languageId: number
  ) {
    this.id = id;
    this.category = category;
    this.rating = rating;
    this.userId = userId;
    this.languageId = languageId;
  }
}
