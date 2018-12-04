import { Injectable } from '@angular/core';
import { Rating } from './models/rating';
import { DetailLanguageComponent } from './detail-language/detail-language.component';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RatingService {
  private notAuthUrl = environment.baseUrl + 'api/notAuth/ratings';
  private authUrl = environment.baseUrl + 'api/auth/ratings';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  private  httpOptionsUnAuth = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  show(userId: number, languageId: number) {
    return this.http.get<Rating>(this.notAuthUrl + '/' + userId + '/' + languageId, this.httpOptionsUnAuth).pipe(
      catchError(this.handleError));
    }

  create(data: Rating) {
    return this.http.post<Rating>(this.authUrl, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something broke in add rating');
    return throwError(error.json().error || 'Server Error');
  }
}
