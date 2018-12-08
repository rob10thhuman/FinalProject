import { User } from './../models/user';
import { Rating } from './../models/rating';
import { Component, OnInit } from '@angular/core';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { RatingService } from '../rating.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  readonly = true;
  avgTestRating = 3;
  avgRating = 0;
  avgCat1Rating = 0;
  avgCat2Rating = 0;
  avgCat3Rating = 0;
  userRating = null;
  userCat1Rating = null;
  userCat2Rating = null;
  userCat3Rating = null;
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
    console.log('show rating object:');
    console.log(ratings);
    // const cat1 = this.detail.language.lRatings
    let testSum = 0;
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    console.log('ratings.length: ' + ratings.length);
    for (let i = 0; i < ratings.length; i++) {
      console.log('ratings data: ' + this.detail.language.lRatings[i].rating);
      console.log('i:' + i);
      sum += this.detail.language.lRatings[i].rating;
      sum1 += this.detail.language.lRatings[i].cat1;
      sum2 += this.detail.language.lRatings[i].cat2;
      sum3 += this.detail.language.lRatings[i].cat3;
    }

    this.avgRating = ratings.length === 0 ? -1 : (sum / ratings.length);
    this.avgCat1Rating = ratings.length === 0 ? -1 : (sum1 / ratings.length);
    this.avgCat2Rating = ratings.length === 0 ? -1 : (sum2 / ratings.length);
    this.avgCat3Rating = ratings.length === 0 ? -1 : (sum3 / ratings.length);
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
        this.userCat1Rating = data.cat1;
        this.userCat2Rating = data.cat2;
        this.userCat3Rating = data.cat3;
      },
      err => console.error('Could not pull rating: ' + err)
    );
  }

  passRating(rating) {
    console.log(rating);
    if (rating > 0) {
    const username = this.authService.getUsername();
    console.log(username);
    this.userService
      .showByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          this.currentUser = data;
          const userId = this.currentUser.id;
          console.log('current user below before updating rating:');
          console.log(userId);
          const langId = this.route.snapshot.paramMap.get('id');
          this.addRating(userId, langId, rating);
        },
        err => console.error('Observer got an error: ' + err)
      );
      }
  }

  passCat1Rating(rating) {
    console.log(rating);
    if (rating > 0) {
    const username = this.authService.getUsername();
    console.log(username);
    this.userService
      .showByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          this.currentUser = data;
          const userId = this.currentUser.id;
          console.log('current user below before updating rating:');
          console.log(userId);
          const langId = this.route.snapshot.paramMap.get('id');
          this.addCat1Rating(userId, langId, rating);
        },
        err => console.error('Observer got an error: ' + err)
      );
      }
  }

  passCat2Rating(rating) {
    console.log(rating);
    if (rating > 0) {
    const username = this.authService.getUsername();
    console.log(username);
    this.userService
      .showByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          this.currentUser = data;
          const userId = this.currentUser.id;
          console.log('current user below before updating rating:');
          console.log(userId);
          const langId = this.route.snapshot.paramMap.get('id');
          this.addCat2Rating(userId, langId, rating);
        },
        err => console.error('Observer got an error: ' + err)
      );
      }
  }

  passCat3Rating(rating) {
    console.log(rating);
    if (rating > 0) {
    const username = this.authService.getUsername();
    console.log(username);
    this.userService
      .showByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          this.currentUser = data;
          const userId = this.currentUser.id;
          console.log('current user below before updating rating:');
          console.log(userId);
          const langId = this.route.snapshot.paramMap.get('id');
          this.addCat3Rating(userId, langId, rating);
        },
        err => console.error('Observer got an error: ' + err)
      );
      }
  }

  addRating(userId, languageId, rating) {
    console.log('= = = = = = = = = =');
    console.log(rating);
    console.log(typeof rating);
    // rating.language = this.detail.language;
    this.ratingService.create(userId, languageId, rating).subscribe(
      data => {
        window.location.reload();
      },
      err => console.error('cannot add rating: ' + err)
    );
  }

  addCat1Rating(userId, languageId, rating) {
    console.log('= = = = = = = = = =');
    console.log(rating);
    console.log(typeof rating);
    // rating.language = this.detail.language;
    this.ratingService.createCat1(userId, languageId, rating).subscribe(
      data => {
        window.location.reload();
      },
      err => console.error('cannot add rating: ' + err)
    );
  }

  addCat2Rating(userId, languageId, rating) {
    console.log('= = = = = = = = = =');
    console.log(rating);
    console.log(typeof rating);
    // rating.language = this.detail.language;
    this.ratingService.createCat2(userId, languageId, rating).subscribe(
      data => {
        window.location.reload();
      },
      err => console.error('cannot add rating: ' + err)
    );
  }

  addCat3Rating(userId, languageId, rating) {
    console.log('= = = = = = = = = =');
    console.log(rating);
    console.log(typeof rating);
    // rating.language = this.detail.language;
    this.ratingService.createCat3(userId, languageId, rating).subscribe(
      data => {
        window.location.reload();
      },
      err => console.error('cannot add rating: ' + err)
    );
  }

  // updateRating(newValue) {
  //   console.log(newValue);
  //   console.log('clicked: ' + newValue);
  //   this.userRating = newValue;
  //   // need to now update the db w/the newValue using the logged in usename

  //   // should then recalculate the average?
  // }
}
