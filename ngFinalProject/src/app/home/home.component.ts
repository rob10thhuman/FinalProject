import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchString: string = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  allLanguages() {
    this.router.navigateByUrl('languages');
  }

  allLanguagesByKeywords(search: string) {
    this.router.navigateByUrl('languages/search/' + search);
  }

}
