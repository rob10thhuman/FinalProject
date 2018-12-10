import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.populateLanguagesList();
  }

  populateLanguagesList() {
    const ratings = [];
    const catRating = [];
    this.langService.index().subscribe(
      data => {
        const list = data;

        for (let i = 0; i < list.length; i++) {
          const subList = list[i].lRatings;
          let sumOverall = 0;
          let sumCat1 = 0;
          let sumCat2 = 0;
          let sumCat3 = 0;
          const language = list[i];

          for (let j = 0; j < subList.length; j++) {
            sumOverall += list[i].lRatings[j].rating;
          }
          for (let j = 0; j < subList.length; j++) {
            sumCat1 += list[i].lRatings[j].cat1;
          }
          for (let j = 0; j < subList.length; j++) {
            sumCat2 += list[i].lRatings[j].cat2;
          }
          for (let j = 0; j < subList.length; j++) {
            sumCat3 += list[i].lRatings[j].cat3;
          }

          const avgRatingOverall = sumOverall / subList.length;
          const avgRatingSafety = sumCat1 / subList.length;
          const avgRatingSpeed = sumCat2 / subList.length;
          const avgRatingEaseOfLearning = sumCat3 / subList.length;
          const newObject = { language, avgRatingOverall, avgRatingSafety, avgRatingSpeed, avgRatingEaseOfLearning};
          catRating[i] = newObject;
        }
        this.langService.languagesListWithAvgs = catRating;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }
}
