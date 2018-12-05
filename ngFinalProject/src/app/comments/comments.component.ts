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
  currentUse: User = new User();

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

    if (vote) {
      if (vote.vote === voteValue) {
        this.voteService.destroy(vote.id).subscribe(
          data => {
            console.log('i cancel my vote');
            this.showCommentsForLanguage();
          },
          err => console.error('Observer got an error: ' + err)
        );
      } else {
        vote.vote = !vote.vote;
        console.log(comment.id);

        console.log(vote);

        this.voteService.update(comment.id, vote.id, vote).subscribe(
          data => {
            console.log('i change my vote');
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
      this.voteService.create(comment.id, newVote).subscribe(
        data => {
          console.log('my first vote');
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
  teardownUpdatingComment() {
    this.updatingComment = null;
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    return username === this.authService.getUsername();
  }

  hasVotedOnComment(votes: Vote[]): Vote {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].user.username === this.authService.getUsername()) {
        return votes[i];
      }
    }
    return null;
  }

  isUpVoted(votes: Vote[]) {
    const theVote = this.hasVotedOnComment(votes);
    if (!theVote) {
      return 'btn btn-outline-success';
    }
    return theVote.vote ? 'btn btn-success' : 'btn btn-outline-success';
  }
  isDownVoted(votes: Vote[]) {
    const theVote = this.hasVotedOnComment(votes);
    if (!theVote) {
      return 'btn btn-outline-danger';
    }
    return !theVote.vote ? 'btn btn-danger' : 'btn btn-outline-danger';
  }


}
