import { AuthService } from './../auth.service';
import { CommentService } from './../comment.service';
import { Component, OnInit } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments = null;
  newComment: Comment = new Comment();
  updatingComment: Comment = null;
  addingComment = false;

  constructor(
    private commentService: CommentService,
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
      },
      err => console.error('Observer got an error: ' + err)
    );
    this.setAddingComment(false);
    this.newComment = null;
  }

  updateComment(id, comment) {
    this.commentService
      .update(id, comment)
      .subscribe(
        data => this.showCommentsForLanguage(),
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

  setAddingComment(bool: boolean) {
    this.addingComment = bool;
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    // const user = JSON.parse(this.authService.getToken());
    // console.log(user);
    // return user.username === username;
    return false;
  }
}
