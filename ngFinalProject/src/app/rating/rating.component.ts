import { User } from './../models/user';
import { Rating } from './../models/rating';
import { Component, OnInit } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { RatingService } from '../rating.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  readonly = true;
  avgRating = 0;
  userRating = null;
  newRating: Rating = null;
  updatingRating: Rating = null;
  currentUser: User = new User();


  constructor(private detail: DetailLanguageComponent,
    private ratingService: RatingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.showRatings();
    this.getCurrentUser();
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
    this.avgRating = count === 0 ? 0 : (sum / count);
    console.log(this.avgRating);
    return this.avgRating;
  }

  getCurrentUser() {
    const username = this.authService.getUsername();
    console.log(username);
    this.userService
      .showByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          this.currentUser = data;
          const userId = this.currentUser.id;
          console.log('current user below:');
          console.log(userId);
          const langId = this.route.snapshot.paramMap.get('id');
          this.findRating(userId, langId);
        },
        err => console.error('Observer got an error: ' + err)
      );
  }

  findRating(userId, languageId) {
    this.ratingService.show(userId, languageId).subscribe(
      data => {
        this.userRating = data.rating;
      },
      err => console.error('Could not pull rating: ' + err)
    );
  }

  addRating(rating) {
    rating.language = this.detail.language;
    this.ratingService.create(rating).subscribe(
      data => {
      },
      err => console.error('cannot add rating: ' + err)
    );
    this.newRating.rating = null;
  }

  updateRating(newValue) {
    console.log(newValue);
    console.log('clicked: ' + newValue);
    this.userRating = newValue;
    // need to now update the db w/the newValue using the logged in usename

    // should then recalculate the average?
  }
}
