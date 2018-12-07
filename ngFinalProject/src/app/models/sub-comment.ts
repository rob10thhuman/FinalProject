import { User } from './user';
import { Vote } from './vote';
import { Comment } from './comment';

export class SubComment {
  id: number;
  comment: string;
  parentComment: Comment;
  user: User;
  dateAdded: Date;
  dateUpdated: Date;
  votes: Vote[];
  active: boolean;
  flag: boolean;

  constructor(
    id?: number,
    comment?: string,
    parentComment?: Comment,
    user?: User,
    dateAdded?: Date,
    dateUpdated?: Date,
    votes?: Vote[],
    active?: boolean,
    flag?: boolean
  ) {
    this.id = id;
    this.comment = comment;
    this.parentComment = parentComment;
    this.user = user;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.votes = votes;
    this.active = active;
    this.flag = flag;
  }
}
