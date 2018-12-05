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

  constructor(
    id?: number,
    comment?: string,
    parentComment?: Comment,
    user?: User,
    dateAdded?: Date,
    dateUpdated?: Date,
    votes?: Vote[]
  ) {
    this.id = id;
    this.comment = comment;
    this.parentComment = parentComment;
    this.user = user;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.votes = votes;
  }
}
