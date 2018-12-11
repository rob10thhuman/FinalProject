import { Language } from './../models/language';
import { CategoryRating } from './../models/category-rating';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-list-langugage',
  templateUrl: './list-langugage.component.html',
  styleUrls: ['./list-langugage.component.css']
})
export class ListLangugageComponent implements OnInit {
  speed = new Category(1, 'Speed');

  avgSpeed = 0;

  categories = [this.speed];

  cat = this.categories[0];

  categoryRatings = [];

  title = 'Error!';

  cat1rating = [];

  languages: Language[] = [];
  constructor(
    private langService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const searchString = this.route.snapshot.paramMap.get('searchString');

    // It is probably possible to do this more cleanly (ie without parsing a string to an int)
    const minRating = parseInt(
      this.route.snapshot.paramMap.get('minRating'),
      10
    );
    const minCat1 = parseInt(this.route.snapshot.paramMap.get('minCat1'), 10);
    const minCat2 = parseInt(this.route.snapshot.paramMap.get('minCat2'), 10);
    const minCat3 = parseInt(this.route.snapshot.paramMap.get('minCat3'), 10);

    if (searchString) {
      this.indexLanguagesBySearch(searchString);
    } else if (
      minRating !== null &&
      minCat1 !== null &&
      minCat2 !== null &&
      minCat3 !== null &&
      !isNaN(minRating) &&
      !isNaN(minCat1) &&
      !isNaN(minCat2) &&
      !isNaN(minCat3)
    ) {
      console.log(minRating, minCat1, minCat2, minCat3);
      this.indexLanguagesByRating(minRating, minCat1, minCat2, minCat3);
    } else {
      this.indexLanguages();
      // this.indexCategories();
      this.getAllCategoryRatings();
    }
  }

  indexLanguages() {
    this.langService.index().subscribe(
      data => {
        this.languages = data;
        this.title = 'Top 10 Languages:';
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  indexLanguagesByRating(
    minRating: number,
    minCat1: number,
    minCat2: number,
    minCat3: number
  ) {
     this.langService.languagesListWithAvgs.forEach(lang => {
       if (lang.avgRatingOverall > minRating &&
           lang.avgRatingSafety > minCat1 &&
           lang.avgRatingSpeed > minCat2 &&
           lang.avgRatingEase > minCat3) {
          this.languages.push(lang.language);
       }
     });
  }

  indexLanguagesBySearch(search: string) {
    this.langService.indexBySearch(search).subscribe(
      data => {
        this.languages = data;
        this.title = 'Search Results:';
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  detailPage(id) {
    this.router.navigateByUrl('languages/' + id);
  }

  setCat(cat) {
    this.cat = cat;
  }

  indexCategories() {
    this.langService.indexCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  getAllCategoryRatings() {
    this.langService.indexCategoryRatings().subscribe(
      data => {
        this.categoryRatings = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  sortByCategory(category) {
    const list = this.langService.languagesListWithAvgs;
    let sortedArray = [];
    if (category === 'Overall') {
      sortedArray = list.sort((a, b) => a.avgRatingOverall > b.avgRatingOverall ? -1 : a.avgRatingOverall < b.avgRatingOverall ? 1 : 0);
    }
    if (category === 'Safety') {
      sortedArray = list.sort((a, b) => a.avgRatingSafety > b.avgRatingSafety ? -1 : a.avgRatingSafety < b.avgRatingSafety ? 1 : 0);
    }
    if (category === 'Speed') {
      sortedArray = list.sort((a, b) => a.avgRatingSpeed > b.avgRatingSpeed ? -1 : a.avgRatingSpeed < b.avgRatingSpeed ? 1 : 0);
    }
    if (category === 'EaseOfLearning') {
      sortedArray = list.sort((a, b) => a.avgRatingEase > b.avgRatingEase ? -1 : a.avgRatingEase < b.avgRatingEase ? 1 : 0);
    }
    this.languages = [];
    for (let j = 0; j < sortedArray.length; j++) {
      this.languages.push(sortedArray[j].language);
    }
  }

  sortByOverall() {
    this.langService.index().subscribe(
      data => {
        const list = data;

        for (let i = 0; i < list.length; i++) {
          const subList = list[i].lRatings;
          let sum = 0;
          const language = list[i];

          for (let j = 0; j < subList.length; j++) {
            sum += list[i].lRatings[j].rating;
          }
          const avgRating = sum / subList.length;
          const newObject = { language, avgRating };
          this.cat1rating[i] = newObject;
        }

        const sortedArray = this.cat1rating.sort((a, b) => {
          if (a.avgRating > b.avgRating) {
            return -1;
          }
          if (a.avgRating < b.avgRating) {
            return 1;
          }
          return 0;
        });

        this.languages = [];

        for (let j = 0; j < sortedArray.length; j++) {
          this.languages.push(sortedArray[j].language);
        }
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  sortBySafety() {
    this.langService.index().subscribe(
      data => {
        const list = data;

        for (let i = 0; i < list.length; i++) {
          const subList = list[i].lRatings;
          let sum = 0;
          const language = list[i];

          for (let j = 0; j < subList.length; j++) {
            sum += list[i].lRatings[j].cat1;
          }
          const avgSafety = sum / subList.length;
          const newObject = { language, avgSafety };
          this.cat1rating[i] = newObject;
        }

        const sortedArray = this.cat1rating.sort((a, b) => {
          if (a.avgSafety > b.avgSafety) {
            return -1;
          }
          if (a.avgSafety < b.avgSafety) {
            return 1;
          }
          return 0;
        });

        this.languages = [];

        for (let j = 0; j < sortedArray.length; j++) {
          this.languages.push(sortedArray[j].language);
        }
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  sortBySpeed() {
    this.langService.index().subscribe(
      data => {
        const list = data;

        for (let i = 0; i < list.length; i++) {
          const subList = list[i].lRatings;
          let sum = 0;
          const language = list[i];

          for (let j = 0; j < subList.length; j++) {
            sum += list[i].lRatings[j].cat2;
          }
          const avgSpeed = sum / subList.length;
          const newObject = { language, avgSpeed };
          this.cat1rating[i] = newObject;
        }

        const sortedArray = this.cat1rating.sort((a, b) => {
          if (a.avgSpeed > b.avgSpeed) {
            return -1;
          }
          if (a.avgSpeed < b.avgSpeed) {
            return 1;
          }
          return 0;
        });

        this.languages = [];

        for (let j = 0; j < sortedArray.length; j++) {
          this.languages.push(sortedArray[j].language);
        }
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  sortByEaseOfLearning() {
    this.langService.index().subscribe(
      data => {
        const list = data;

        for (let i = 0; i < list.length; i++) {
          const subList = list[i].lRatings;
          let sum = 0;
          const language = list[i];

          for (let j = 0; j < subList.length; j++) {
            sum += list[i].lRatings[j].cat3;
          }
          const avgEase = sum / subList.length;
          const newObject = { language, avgEase };
          this.cat1rating[i] = newObject;
        }

        const sortedArray = this.cat1rating.sort((a, b) => {
          if (a.avgEase > b.avgEase) {
            return -1;
          }
          if (a.avgEase < b.avgEase) {
            return 1;
          }
          return 0;
        });

        this.languages = [];

        for (let j = 0; j < sortedArray.length; j++) {
          this.languages.push(sortedArray[j].language);
        }
      },
      err => console.error('Observer got an error: ' + err)
    );
  }
}
