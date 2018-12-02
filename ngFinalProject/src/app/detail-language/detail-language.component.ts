import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../models/language';

@Component({
  selector: 'app-detail-language',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {

  language: Language = null;
  comments: Comment[] = null;
  constructor(private langService: LanguageService, private route: ActivatedRoute) { }

  ngOnInit() {
    const langId = this.route.snapshot.paramMap.get('id');
    if (langId) {
      this.showLanguage(langId);
    }

  }

  showLanguage(id: string) {
    this.langService.show(id).subscribe(
      data => this.language = data,
      err => console.error('Observer got an error: ' + err)
    );
  }


}
