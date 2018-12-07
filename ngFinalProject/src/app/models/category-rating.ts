export class CategoryRating {
  id: number;
  categoryId: number;
  rating: number;
  userId: number;
  languageId: number;

  constructor(
    id: number,
    categoryId: number,
    rating: number,
    userId: number,
    languageId: number
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.rating = rating;
    this.userId = userId;
    this.languageId = languageId;
  }
}
