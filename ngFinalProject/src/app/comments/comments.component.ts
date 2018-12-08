import { SortCommentsPipe } from './../sort-comments.pipe';
import { CalculateVotesPipe } from './../calculate-votes.pipe';
import { Vote } from './../models/vote';
import { Comment } from './../models/comment';
import { AuthService } from './../auth.service';
import { CommentService } from './../comment.service';
import { Component, OnInit, } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { VoteService } from '../vote.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { SubComment } from '../models/sub-comment';
import { SubCommentService } from '../sub-comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newComment: Comment = null;
  updatingComment: Comment = null;
  updatingSubComment: Comment = null;
  replyToComment: SubComment = null;
  replyToSubComment: SubComment = null;
  currentUser: User = new User();
  showReplies = null;

  sortQuery = 'TOP';

  constructor(
    private commentService: CommentService,
    private subCommentService: SubCommentService,
    private voteService: VoteService,
    private votePipe: CalculateVotesPipe,
    private sortComments: SortCommentsPipe,
    private userService: UserService,
    private detail: DetailLanguageComponent,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.showCommentsForLanguage();
    this.getCurrentUser();
  }

  showCommentsForLanguage() {
    this.commentService.languageIndex(this.detail.language.name).subscribe(
      data => {
        this.comments = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  addComment(comment) {
    comment.language = this.detail.language;
    this.commentService.create(comment).subscribe(
      data => {
        this.showCommentsForLanguage();
        this.teardownAddingComment();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  addReplyToComment(parentComment, replyComment) {
    replyComment.comment = this.getAtUsernameAnnotation(parentComment.user.username, replyComment);

    this.subCommentService.create(parentComment.id, replyComment).subscribe(
      data => {
        this.showReplies = parentComment.id;
        this.showCommentsForLanguage();
        this.teardownReplyToComment();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }
  addReplyToSubComment(parentComment, parentSubComment, replyComment) {
    replyComment.comment = this.getAtUsernameAnnotation(parentSubComment.user.username, replyComment);
    replyComment.id = null;
    this.subCommentService.create(parentComment.id, replyComment).subscribe(
      data => {
        console.log(data);
        this.showCommentsForLanguage();
        this.teardownReplyToSubComment();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  updateComment(id, comment) {
    this.commentService.update(id, comment).subscribe(
      data => {
        this.showCommentsForLanguage();
        this.teardownUpdatingComment();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }
  updateSubComment(parentComment: Comment, subComment: SubComment) {
    this.subCommentService.update(parentComment.id, subComment).subscribe(
      data => {
        this.showCommentsForLanguage();
        this.teardownUpdatingSubComment();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  deleteComment(id) {
    this.commentService
      .destroy(id)
      .subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)
      );
  }
  deactivateComment(id) {
    this.commentService
      .deactivate(id)
      .subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)
      );
  }

  deleteSubComment(id) {
    this.subCommentService
      .destroy(id)
      .subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)
      );
  }
  deactivateSubComment(id) {
    this.subCommentService
      .deactivate(id)
      .subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)
      );
  }

  getCurrentUser() {
    const username = this.authService.getUsername();
    if (username) {
      this.userService.showByUsername(username).subscribe(
        data => {
          this.currentUser = data;
        },
        err => console.error('Observer got an error: ' + err)
      );
    }
  }

  voteParentComment(comment: Comment, voteValue: boolean) {
    const vote = this.hasVotedOnParentComment(comment.votes);

    if (vote !== null) {
      if (vote.vote === voteValue) {
        this.voteService.destroy(vote.id).subscribe(
          data => {
            console.log('i cancel my vote parent');
            this.showCommentsForLanguage();
          },
          err => console.error('Observer got an error: ' + err)
        );
      } else {
        vote.vote = !vote.vote;


        this.voteService.updateForComment(comment.id, vote.id, vote).subscribe(
          data => {
            console.log('i change my vote parent');
            this.showCommentsForLanguage();
          },
          err => console.error('Observer got an error: ' + err)
        );
      }
    } else {
      const newVote = new Vote();
      newVote.vote = voteValue;
      newVote.comment = comment;
      newVote.user = this.currentUser;
      this.voteService.createForComment(comment.id, newVote).subscribe(
        data => {
          console.log('my first vote Parent');
          this.showCommentsForLanguage();


        },
        err => console.error('Observer got an error: ' + err)
      );
    }
  }



  setupAddingComment() {
    this.newComment = new Comment();
  }
  teardownAddingComment() {
    this.newComment = null;
  }

  setupUpdatingComment(comment: Comment) {
    this.updatingComment = new Comment();

    this.updatingComment.id = comment.id;
    this.updatingComment.comment = comment.comment;
    this.updatingComment.dateAdded = comment.dateAdded;
    this.updatingComment.dateUpdated = comment.dateUpdated;
    this.updatingComment.language = comment.language;
    this.updatingComment.user = comment.user;
    this.updatingComment.votes = comment.votes;
  }
  setupUpdatingSubComment(subComment: SubComment) {
    this.updatingSubComment = new Comment();

    this.updatingSubComment.id = subComment.id;
    this.updatingSubComment.comment = subComment.comment;
    this.updatingSubComment.dateAdded = subComment.dateAdded;
    this.updatingSubComment.dateUpdated = subComment.dateUpdated;
    this.updatingSubComment.user = subComment.user;
  }

  setupReplyToComment(comment: Comment) {
    this.replyToComment = new SubComment();
    this.replyToComment.parentComment = comment;
    this.replyToComment.user = this.currentUser;


  }
  setupReplyToSubComment(subComment: SubComment) {

    this.replyToSubComment = new SubComment();
    this.replyToSubComment.id = subComment.id;
    this.replyToSubComment.parentComment = subComment.parentComment;
    this.replyToSubComment.user = this.currentUser;

  }


  teardownUpdatingComment() {
    this.updatingComment = null;
  }
  teardownUpdatingSubComment() {
    this.updatingSubComment = null;
  }
  teardownReplyToComment() {
    this.replyToComment = null;
  }
  teardownReplyToSubComment() {
    this.replyToSubComment = null;
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    return username === this.authService.getUsername();
  }

  hasVotedOnParentComment(votes: Vote[]): Vote {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].user.username === this.authService.getUsername()
      && votes[i].comment !== null) {
        // console.log(votes[i]);

        return votes[i];
      }
    }
    return null;
  }


  isUpVotedParentComment(votes: Vote[]) {
    const theParentVote = this.hasVotedOnParentComment(votes);
    if (!theParentVote) {
      return 'badge badge-pill badge-secondary';
    }
    return theParentVote.vote ? 'badge badge-pill badge-success' : 'bbadge badge-pill badge-secondary';
  }
  isDownVotedParentComment(votes: Vote[]) {
    const theVote = this.hasVotedOnParentComment(votes);
    if (!theVote) {
      return 'badge badge-pill badge-secondary';
    }
    return !theVote.vote ? 'badge badge-pill badge-danger' : 'badge badge-pill badge-secondary';
  }

  getAtUsernameAnnotation(username: string, reply: SubComment) {
    return reply.comment = '@' + username + ' ' + reply.comment;
  }

  setShowReplies(comment) {
    if (this.showReplies && this.showReplies !== comment.id) {
      this.showReplies = comment.id;
    } else if (this.showReplies && this.showReplies === comment.id) {
      this.showReplies = null;
    } else {
      this.showReplies = comment.id;
    }
  }

  setSortQuery(query: string) {
    this.sortQuery = query;
    this.comments = this.sortComments.transform(this.comments, this.sortQuery);
  }

  test() {
    return 'hi';
  }
}
