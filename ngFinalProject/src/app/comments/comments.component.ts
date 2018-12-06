import { SortCommentsPipe } from './../sort-comments.pipe';
import { CalculateVotesPipe } from './../calculate-votes.pipe';
import { Vote } from './../models/vote';
import { Comment } from './../models/comment';
import { AuthService } from './../auth.service';
import { CommentService } from './../comment.service';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newComment: Comment = null;
  updatingComment: Comment = null;
  replyingComment: SubComment = null;
  currentUser: User = new User();

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

  addReplyingComment(parentId, replyComment) {
    this.subCommentService.create(parentId, replyComment).subscribe(
      data => {
        console.log(data);
        this.showCommentsForLanguage();
        this.teardownReplyingComment();
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

  deleteComment(id) {
    this.commentService
      .destroy(id)
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

  voteComment(comment: Comment, voteValue: boolean) {
    const vote = this.hasVotedOnComment(comment.votes);

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
          console.log(data);
          console.log('my first vote Parent');
          this.showCommentsForLanguage();


        },
        err => console.error('Observer got an error: ' + err)
      );
    }
  }

  voteSubComment(subComment: SubComment, voteValue: boolean) {
    const vote = this.hasVotedOnSubComment(subComment.votes);
    console.log(vote);

    if (vote !== null) {
      if (vote.vote === voteValue) {
        this.voteService.destroy(vote.id).subscribe(
          data => {
            console.log('i cancel my vote child');
            this.showCommentsForLanguage();
          },
          err => console.error('Observer got an error: ' + err)
        );
      } else {
        vote.vote = !vote.vote;


        this.voteService.updateForSubComment(subComment.id, vote.id, vote).subscribe(
          data => {
            console.log('i change my vote child');
            this.showCommentsForLanguage();
          },
          err => console.error('Observer got an error: ' + err)
        );
      }
    } else {
      const newVote = new Vote();
      newVote.vote = voteValue;
      newVote.subComment = subComment;
      newVote.user = this.currentUser;
      this.voteService.createForSubComment(subComment.id, newVote).subscribe(
        data => {
          console.log(data);

          console.log('my first vote Child');
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

  setupReplyingComment(comment: Comment) {
    this.replyingComment = new SubComment();
    this.replyingComment.parentComment = comment;
    this.replyingComment.user = this.currentUser;


  }
  teardownUpdatingComment() {
    this.updatingComment = null;
  }
  teardownReplyingComment() {
    this.replyingComment = null;
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    return username === this.authService.getUsername();
  }

  hasVotedOnComment(votes: Vote[]): Vote {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].user.username === this.authService.getUsername()
      && votes[i].comment !== null) {

        return votes[i];
      }
    }
    return null;
  }
  hasVotedOnSubComment(votes: Vote[]): Vote {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].user.username === this.authService.getUsername()
      && votes[i].subComment !== null) {
        return votes[i];
      }
    }
    return null;
  }

  isUpVotedComment(votes: Vote[]) {
    const theVote = this.hasVotedOnComment(votes);
    if (!theVote) {
      return 'badge badge-pill badge-secondary';
    }
    return theVote.vote ? 'badge badge-pill badge-success' : 'bbadge badge-pill badge-secondary';
  }
  isDownVotedComment(votes: Vote[]) {
    const theVote = this.hasVotedOnComment(votes);
    if (!theVote) {
      return 'badge badge-pill badge-secondary';
    }
    return !theVote.vote ? 'badge badge-pill badge-danger' : 'badge badge-pill badge-secondary';
  }
  isUpVotedSubComment(votes: Vote[]) {
    const theVote = this.hasVotedOnSubComment(votes);
    if (!theVote) {
      return 'badge badge-pill badge-secondary';
    }
    return theVote.vote ? 'badge badge-pill badge-success' : 'bbadge badge-pill badge-secondary';
  }
  isDownVotedSubComment(votes: Vote[]) {
    const theVote = this.hasVotedOnSubComment(votes);
    if (!theVote) {
      return 'badge badge-pill badge-secondary';
    }
    return !theVote.vote ? 'badge badge-pill badge-danger' : 'badge badge-pill badge-secondary';
  }

  setSortQuery(query: string) {
    this.sortQuery = query;
    this.comments = this.sortComments.transform(this.comments, this.sortQuery);
  }
}
