import { Rating } from './../models/rating';
import { Component, OnInit } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  avgRating = 0;

  constructor(private detail: DetailLanguageComponent) { }

  ngOnInit() {
    this.showRatings();
  }

  showRatings () {
    const ratings = this.detail.language.lRatings;
    console.log(ratings);
    let count = 0;
    let sum = 0;
    console.log('ratings.length: ' + ratings.length);
    for (let i = 0; i < ratings.length; i++) {
      console.log('ratings data: ' + this.detail.language.lRatings[i].rating);
      console.log('i:' + i);
      count++;
      // this.avgRating = this.avgRating + this.detail.language.lRatings[i].rating;
      sum += this.detail.language.lRatings[i].rating;
      console.log('count:' + count);
    }
    this.avgRating = count === 0 ? 0 : sum / count;
    console.log(this.avgRating);
    return this.avgRating;
  }

  updateRating(newValue) {
    console.log('clicked: ' + newValue);
    // need to now update the db w/the newValue using the logged in usename
    // should then recalculate the average?
  }

}
