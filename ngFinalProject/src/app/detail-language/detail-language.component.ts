import { Comment } from './../models/comment';
import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../models/language';

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-detail-language',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {

  language: Language = null;
  comments = null;
  newComment: Comment = new Comment();
  updatingComment: Comment = null;
  addingComment = false;

  constructor(private langService: LanguageService, private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    const langId = this.route.snapshot.paramMap.get('id');
    if (langId) {
      this.showLanguage(langId);
    }

  }

  showLanguage(id: string) {
    this.langService.show(id).subscribe(
      data => {
        this.language = data;
        this.showCommentsForLanguage();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  showCommentsForLanguage() {
    this.commentService.languageIndex(this.language.name).subscribe(

      data => this.comments = data,
      err => console.error('Observer got an error: ' + err)
    );
  }

  addComment(comment) {
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
      this.commentService.update(id, comment).subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)

        );
      }

  deleteComment(id) {
      this.commentService.destroy(id).subscribe(
        data => this.showCommentsForLanguage(),
        err => console.error('Observer got an error: ' + err)
    );
  }

  setAddingComment (bool: boolean) {
    this.addingComment = bool;
  }


}
