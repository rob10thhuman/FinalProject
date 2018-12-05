import { SubComment } from './sub-comment';
import { User } from './user';
import { Comment } from './comment';

export class Vote {
  id: number;
  vote: boolean;
  user: User;
  comment: Comment;
  subComment: SubComment;

  constructor(
    id?: number,
    vote?: boolean,
    user?: User,
    comment?: Comment,
    subComment?: SubComment
  ) {
    this.id = id;
    this.vote = vote;
    this.user = user;
    this.comment = comment;
    this.subComment = subComment;
  }
}
