import { User } from './user';
import { Language } from './language';
import { Vote } from './vote';
import { SubComment } from './sub-comment';

export class Comment {
  id: number;
  comment: string;
  user: User;
  language: Language;
  dateAdded: Date;
  dateUpdated: Date;
  votes: Vote[];
  subComments: SubComment[];
  active: boolean;
  flag: boolean;

  constructor(
    id?: number,
    comment?: string,
    user?: User,
    language?: Language,
    dateAdded?: Date,
    dateUpdated?: Date,
    votes?: Vote[],
    subComments?: SubComment[],
    active?: boolean,
    flag?: boolean
  ) {
    this.id = id;
    this.comment = comment;
    this.user = user;
    this.language = language;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.votes = votes;
    this.subComments = subComments;
    this.active = active;
    this.flag = flag;
  }
}
