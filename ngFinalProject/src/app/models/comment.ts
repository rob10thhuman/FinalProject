import { User } from './user';
import { Language } from './language';
import { Vote } from './vote';

export class Comment {
  id: number;
  comment: string;
  user: User;
  language: Language;
  dateAdded: Date;
  dateUpdated: Date;
  votes: Vote[];

  constructor(
    id?: number,
    comment?: string,
    user?: User,
    language?: Language,
    dateAdded?: Date,
    dateUpdated?: Date,
    votes?: Vote[]
  ) {
    this.id = id;
    this.comment = comment;
    this.user = user;
    this.language = language;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.votes = votes;
  }
}
