import { Language } from './../models/language';
import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail-language',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {

  language: Language = null;
  avgRating = 0;

  constructor(private langService: LanguageService, private authService: AuthService, private commentService: CommentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const langId = this.route.snapshot.paramMap.get('id');
    if (langId) {
      this.showLanguage(langId);
    }
  }

  showLanguage(id: string) {
    this.langService.show(id).subscribe(
      data => {
        this.language = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  isLoggedInUsername(username) {
    // const user = JSON.parse(this.authService.getToken());
    // console.log(user);
    // return user.username === username;
    return false;
  }

}
