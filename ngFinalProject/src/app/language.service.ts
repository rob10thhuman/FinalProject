import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Language } from './models/language';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private url = environment.baseUrl + 'api/languages';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

    index() {
      return this.http.get<Language[]>(this.url + '?sorted=true', this.httpOptions ).pipe(
        catchError(this.handleError));
      }

    indexBySearch(search: string) {
      return this.http.get<Language[]>(this.url + '/search/' + search, this.httpOptions ).pipe(
        catchError(this.handleError));
    }

    show(id: string) {
      return this.http.get<Language>(this.url + '/' + id, this.httpOptions ).pipe(
        catchError(this.handleError));
    }

    create(data: Language) {
      return this.http.post<Language>(this.url, data, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    destroy(id: number) {
      return this.http.delete<Language>( this.url + '/' + id, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    update(id: number, data: Language) {
      return this.http.put<Language>(this.url + '/' + id, data, this.httpOptions).pipe(
        catchError(this.handleError));
    }

    handleError(error: any) {
      console.error('Something Broke');
      return throwError(error.json().error || 'Server Error');
    }

}
