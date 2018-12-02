import { User } from './user';
import { Language } from './language';

export class Comment {
  id: number;
  comment: string;
  user: User;
  language: Language;

  constructor(id?: number, comment?: string, user?: User, language?: Language){
    this.id = id;
    this.comment = comment;
    this.user = user;
    this.language = language;
  }
}
