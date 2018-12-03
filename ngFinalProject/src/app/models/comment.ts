import { User } from './user';
import { Language } from './language';

export class Comment {
  id: number;
  comment: string;
  user: User;
  language: Language;
  dateAdded: Date;
  dateUpdated: Date;

  constructor(
    id?: number,
    comment?: string,
    user?: User,
    language?: Language,
    dateAdded?: Date,
    dateUpdated?: Date
  ) {
    this.id = id;
    this.comment = comment;
    this.user = user;
    this.language = language;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
  }
}
