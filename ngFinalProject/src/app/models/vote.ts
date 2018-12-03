import { User } from './user';
import { Comment } from './comment';
import { timingSafeEqual } from 'crypto';

export class Vote {
  id: number;
  vote: boolean;
  user: User;
  comment: Comment;

  constructor(id?: number, vote?: boolean, user?: User, comment?: Comment) {
    this.id = id;
    this.vote = vote;
    this.user = user;
    this.comment = comment;
  }
}
