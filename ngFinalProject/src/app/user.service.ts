import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl + 'api/';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index() {
    return this.http.get<User[]>(this.url + 'auth/users', this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  show(id: string) {
    return this.http.get<User>(this.url + 'auth/users/' + id, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  showByUsername(username: string) {
    return this.http.get<User>(this.url + 'auth/users/username/' + username, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  destroy(id: number) {
    return this.http.delete<User>( this.url + 'auth/users/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  update(id: number, data: User) {
    return this.http.put<User>(this.url + 'auth/users/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  updateCurrentUser(data: User) {
    return this.http.put<User>(this.url + 'auth/users/updateCurrentUser', data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  getCurrentUser() {
    return this.http.get<User>(this.url + 'auth/users/currentUser', this.httpOptions ).pipe(
      catchError(this.handleError));
  }

}
