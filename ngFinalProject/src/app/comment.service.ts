import { environment } from './../environments/environment';
import { Comment } from './models/comment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private notAuthUrl = environment.baseUrl + 'api/notAuth/comments';
  private authUrl = environment.baseUrl + 'api/auth/comments';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index() {
    return this.http.get<Comment[]>(this.notAuthUrl + '?sorted=true', this.httpOptions ).pipe(
      catchError(this.handleError));
  }
  indexFlagged() {
    return this.http.get<Comment[]>(this.authUrl + '/flagged', this.httpOptions ).pipe(
      catchError(this.handleError));
  }
  languageIndex(languageName: string) {
    return this.http.get<Comment[]>(this.notAuthUrl + '/languages/' + languageName ).pipe(
      catchError(this.handleError));
  }
  usernameIndex(username: string) {
    return this.http.get<Comment[]>(this.authUrl + '/usernames/' + username, this.httpOptions ).pipe(
      catchError(this.handleError));
  }



  show(id: string) {
    return this.http.get<Comment>(this.notAuthUrl + '/' + id, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  create(data: Comment) {
    return this.http.post<Comment>(this.authUrl, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  destroy(id: number) {
    return this.http.delete<Comment>( this.authUrl + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  update(id: number, data: Comment) {
    return this.http.put<Comment>(this.authUrl + '/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }
}
