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

    if (searchString) {
      this.indexLanguagesBySearch(searchString);
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
        console.log('*************');
        console.log(data);
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  getAllCategoryRatings() {
    this.langService.indexCategoryRatings().subscribe(
      data => {
        console.log(data);
        this.categoryRatings = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  sortByOverall() {
    this.langService.index().subscribe(
      data => {
        const list = data;
        console.log('**********************');
        console.log(data);

        for (let i = 0; i < list.length; i++) {
            const subList = list[i].lRatings;
            let sum = 0;
            const language = list[i];

            console.log(language);
              for (let j = 0; j < subList.length; j++) {
                sum += list[i].lRatings[j].rating;
              }
              console.log('AVG OVERALL:');
              console.log(sum / subList.length);
              const avgRating = sum / subList.length;
              const newObject = {language, avgRating};
              this.cat1rating[i] = newObject;
              console.log(this.cat1rating);
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
        console.log('**********************');
        console.log(data);

        for (let i = 0; i < list.length; i++) {
            const subList = list[i].lRatings;
            let sum = 0;
            const language = list[i];

            console.log(language);
              for (let j = 0; j < subList.length; j++) {
                sum += list[i].lRatings[j].cat1;
              }
              console.log('AVG SAFETY RATING:');
              console.log(sum / subList.length);
              const avgSafety = sum / subList.length;
              const newObject = {language, avgSafety};
              this.cat1rating[i] = newObject;
              console.log(this.cat1rating);
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
        console.log('**********************');
        console.log(data);

        for (let i = 0; i < list.length; i++) {
            const subList = list[i].lRatings;
            let sum = 0;
            const language = list[i];

            console.log(language);
              for (let j = 0; j < subList.length; j++) {
                sum += list[i].lRatings[j].cat2;
              }
              console.log('AVG SPEED RATING:');
              console.log(sum / subList.length);
              const avgSpeed = sum / subList.length;
              const newObject = {language, avgSpeed};
              this.cat1rating[i] = newObject;
              console.log(this.cat1rating);
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
        console.log('**********************');
        console.log(data);

        for (let i = 0; i < list.length; i++) {
            const subList = list[i].lRatings;
            let sum = 0;
            const language = list[i];

            console.log(language);
              for (let j = 0; j < subList.length; j++) {
                sum += list[i].lRatings[j].cat3;
              }
              console.log('AVG EASE OF LEARNING:');
              console.log(sum / subList.length);
              const avgEase = sum / subList.length;
              const newObject = {language, avgEase};
              this.cat1rating[i] = newObject;
              console.log(this.cat1rating);
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
