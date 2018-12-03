import { Comment } from './../models/comment';
import { AuthService } from './../auth.service';
import { CommentService } from './../comment.service';
import { Component, OnInit } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { VoteService } from '../vote.service';
import { Vote } from '../models/vote';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments = null;
  newComment: Comment = null;
  updatingComment: Comment = null;


  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private detail: DetailLanguageComponent,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.showCommentsForLanguage();
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
    this.commentService
      .update(id, comment)
      .subscribe(
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

  getVotesForComment(id) {
    this.voteService.indexByCommentId(id).subscribe(
      data => {
        console.log(data);

        // const votes = data;
        // let upvoteCount = 0;
        // let downvoteCount = 0;
        // votes.forEach((vote) => {
        //   if (vote.vote) {
        //     upvoteCount++;
        //   } else {
        //     downvoteCount++;
        //   }
        // });
        // console.log(upvoteCount);
        // console.log(downvoteCount);

        // return upvoteCount - downvoteCount;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  voteComment(comment: Comment, vote: boolean) {
    const newVote = new Vote();
    newVote.vote = vote;
    newVote.comment = comment;
    newVote.user = comment.user;
    this.voteService.create(newVote).subscribe(
      data => this.showCommentsForLanguage(),
      err => console.error('Observer got an error: ' + err)
    );
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
}
