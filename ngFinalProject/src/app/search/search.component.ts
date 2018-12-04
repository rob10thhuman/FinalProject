import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: string = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  allLanguagesByKeywords(search: string) {
    this.router.navigateByUrl('languages/search/' + search);
  }

}
