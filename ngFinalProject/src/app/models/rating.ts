import { Language } from './language';
import { User } from './user';
export class Rating {
  id: number;
  rating: number;
  cat1: number;
  cat2: number;
  cat3: number;
  user: User;
  language: Language;

  constructor(
    id?: number,
    rating?: number,
    cat1?: number,
    cat2?: number,
    cat3?: number,
    user?: User,
    language?: Language
  ) {
    this.id = id;
    this.rating = rating;
    this.cat1 = cat1;
    this.cat2 = cat2;
    this.cat3 = cat3;
    this.user = user;
    this.language = language;
  }
}
