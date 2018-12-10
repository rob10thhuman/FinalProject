import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { LanguageService } from '../language.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-rating',
  templateUrl: './search-rating.component.html',
  styleUrls: ['./search-rating.component.css']
})
export class SearchRatingComponent implements OnInit {
  languages: any[] = [];
  minRatingEntry = 0;
  minCat1Entry = 0;
  minCat2Entry = 0;
  minCat3Entry = 0;

  constructor(private langService: LanguageService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('init');
  }

  allLanguagesByRating(minRating: number, minCat1: number, minCat2: number, minCat3: number) {
    console.log(minRating, minCat1, minCat2, minCat3);
    this.router.navigateByUrl('languages/search/' + minRating + '/' + minCat1 + '/' + minCat2 + '/' + minCat3);
  }


}
