import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../models/language';
import { CommentService } from '../comment.service';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-detail-language',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {

  language: Language = null;
  comments = null;
  rating = null;

  constructor(private langService: LanguageService, private commentService: CommentService,
    private ratingService: RatingService, private route: ActivatedRoute) { }

  ngOnInit() {
    const langId = this.route.snapshot.paramMap.get('id');
    if (langId) {
      this.showLanguage(langId);
    }

  }

  showRating(id: string) {
    this.ratingService.show(id).subscribe(
      data => {
        this.rating = data;
      },
      err => console.log('could not get rating info' + err)
    );
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


}
