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

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = null;
  newComment: Comment = null;
  updatingComment: Comment = null;
  currentUser: User = new User();

  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private votePipe: CalculateVotesPipe,
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
    this.newComment.comment = null;
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
    this.userService.showByUsername(username).subscribe(
      data => {
        this.currentUser = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  voteComment(comment: Comment, voteValue: boolean) {
    const vote = this.hasVotedOnComment(comment.votes);

    if (vote && vote.vote === voteValue) {
      vote.vote = !vote.vote;
      this.voteService.destroy(vote.id);
    } else {
      const newVote = new Vote();
      newVote.vote = voteValue;
      newVote.comment = comment;
      newVote.user = this.currentUser;
      this.voteService.create(comment.id, newVote).subscribe(
        data => {
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
    this.updatingComment = comment;
  }
  teardownUpdatingComment() {
    this.updatingComment = null;
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    return username === this.authService.getUsername();
  }

  checkUpdatingFormConditions(comment: Comment) {
    return this.updatingComment && this.updatingComment === comment;
  }

  hasVotedOnComment(votes: Vote[]): Vote {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].user.username === this.authService.getUsername()) {
        return votes[i];
      }
    }
    return null;
  }

  getVoteButtonNgClass(votes: Vote[]) {}
}
