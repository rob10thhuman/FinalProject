import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(username, password) {
    const token = this.generateBasicAuthToken(username, password);
    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

    return this.http.get(this.url + 'authenticate', { headers }).pipe(
      tap(res => {

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('problem logging in');
      })
    );
  }

  register(user) {
    // create request to register a new account
    return this.http.post(this.url + 'register', user).pipe(
      tap(res => {
        // create a user and then upon success, log them in
        console.log('registered!');
        console.log(user.username);
        console.log(user.password);
        this.login(user.username, user.password);
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('problem registering');
      })
    );
  }

  verifyPassword(id, password) {
    const token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      })
    };
    return this.http
    .get( this.url + 'verifyPassword/' + password + '/users/' + id, httpOptions ) .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('problem Verifying Password');
        })
        );
  }

  logout() {
    if (this.checkLogin()) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  generateBasicAuthToken(username, password) {
    return btoa(`${username}:${password}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
