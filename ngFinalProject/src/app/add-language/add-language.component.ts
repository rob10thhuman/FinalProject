import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language';
import { AuthService } from '../auth.service';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {

  newLang = new Language();

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router
     ) { }

  ngOnInit() {
  }

  add() {
    this.languageService.create(this.newLang).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
      }
    );
  }

}
