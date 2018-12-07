import { CategoryRating } from './../models/category-rating';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { LanguageService } from '../language.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-langugage',
  templateUrl: './list-langugage.component.html',
  styleUrls: ['./list-langugage.component.css']
})
export class ListLangugageComponent implements OnInit {

  speed = new Category(1, 'Speed');

  categories = [this.speed];

  cat = this.categories[0];

  categoryRatings = [];

  title = 'Error!';

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
      this.indexCategories();
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

}
