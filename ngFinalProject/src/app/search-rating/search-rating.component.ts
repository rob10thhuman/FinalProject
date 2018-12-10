import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';

@Component({
  selector: 'app-search-rating',
  templateUrl: './search-rating.component.html',
  styleUrls: ['./search-rating.component.css']
})
export class SearchRatingComponent implements OnInit {
  languages: Language[] = [];
  minRatingEntry = 0;
  minCat1Entry = 0;
  minCat2Entry = 0;
  minCat3Entry = 0;

  constructor() {}

  ngOnInit() {
    console.log('init');
  }

  allLanguagesByRating(minRating: number, minCat1: number, minCat2: number, minCat3: number) {
  }


}
