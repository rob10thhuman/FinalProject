import { Language } from './language';
import { User } from './user';
export class Rating {
  id: number;
  rating: number;
  user: User;
  language: Language;

  constructor(
    id?: number,
    rating?: number,
    user?: User,
    language?: Language
  ) {
    this.id = id;
    this.rating = rating;
    this.user = user;
    this.language = language;
  }
}
