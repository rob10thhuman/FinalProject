import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../language.service';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating-tests',
  templateUrl: './rating-tests.component.html',
  styleUrls: ['./rating-tests.component.css']
})
export class RatingTestsComponent implements OnInit {

  ratings = [];

  currentRate = 3;

  constructor(
    config: NgbRatingConfig,
    private langService: LanguageService,
    private ratingService: RatingService
    ) {
    config.max = 5;
  }

  ngOnInit() {
    this.populateRatings();
  }


  populateRatings() {
    this.ratingService.indexCategoryRating().subscribe(
      data => {
        this.ratings = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }


  printStuff(ratingPrint) {
    console.log('stuff');
    console.log(ratingPrint);

  }
}
