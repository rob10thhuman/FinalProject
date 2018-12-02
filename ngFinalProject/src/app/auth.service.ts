import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // will replace with enviroment later
   private url = 'http://localhost:8087/';

  constructor(private http: HttpClient) {}

  login(username, password) {
    const token = this.generateBasicAuthToken(username, password);

    // Send token as Authorization header (this is spring security convention for basic auth)
    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${token}`);

    // create request to authenticate credentials
    return this.http
      .get(this.url + 'authenticate', {headers})
      .pipe(
        tap((res) => {

          localStorage.setItem('token' , token);
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
    return this.http.post(this.url + 'register', user)
    .pipe(
        tap((res) => {  // create a user and then upon success, log them in
          this.login(user.username, user.password);
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('problem registering');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
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
}
