import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Language } from './models/language';
import { throwError } from 'rxjs';
import { Rating } from './models/rating';
import { Category } from './models/category';
import { CategoryRating } from './models/category-rating';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languagesListWithAvgs = [];

  private notAuthUrl = environment.baseUrl + 'api/notAuth/languages';
  private authUrl = environment.baseUrl + 'api/auth/languages';

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

    index() {
      return this.http.get<Language[]>(this.notAuthUrl + '/index' + '?sorted=true', this.httpOptionsUnAuth ).pipe(
        catchError(this.handleError));
      }

    indexBySearch(search: string) {
      return this.http.get<Language[]>(this.notAuthUrl + '/search/' + search, this.httpOptionsUnAuth ).pipe(
        catchError(this.handleError));
    }

    show(id: string) {
      return this.http.get<Language>(this.notAuthUrl + '/' + id, this.httpOptionsUnAuth ).pipe(
        catchError(this.handleError));
    }

    create(data: Language) {
      return this.http.post<Language>(this.authUrl, data, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    destroy(id: number) {
      return this.http.delete<Language>( this.authUrl + '/' + id, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    update(id: number, data: Language) {
      return this.http.put<Language>(this.authUrl + '/' + id, data, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    updateRating(id: number, data: Rating) {
      return this.http.put<Rating>(this.authUrl + '/' + id, data, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    handleError(error: any) {
      console.error('Something Broke');
      return throwError(error.json().error || 'Server Error');
    }

    indexCategories() {
      return this.http.get<Category[]>(environment.baseUrl + 'api/notAuth/categories/index' , this.httpOptionsUnAuth ).pipe(
        catchError(this.handleError));
    }

    indexCategoryRatings() {
      return this.http.get<CategoryRating[]>(environment.baseUrl + 'api/notAuth/categoryRatings/index' , this.httpOptionsUnAuth ).pipe(
        catchError(this.handleError));
    }

    createCategoryRating() {
      return this.http.post<CategoryRating>(environment.baseUrl + 'api/notAuth/categories' , this.httpOptions ).pipe (
        catchError(this.handleError));
    }



}
