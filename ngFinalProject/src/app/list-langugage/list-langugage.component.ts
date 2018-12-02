import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-list-langugage',
  templateUrl: './list-langugage.component.html',
  styleUrls: ['./list-langugage.component.css']
})
export class ListLangugageComponent implements OnInit {

  languages: Language[] = [];
  constructor(private langService: LanguageService) { }

  ngOnInit() {
    this.indexLanguages();
  }

  indexLanguages() {
    this.langService.index().subscribe(
      data => this.languages = data,
      err => console.error('Observer got an error: ' + err)
    );
  }


}
