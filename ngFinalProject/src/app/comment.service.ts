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

  // will replace with enviroment later
  private baseUrl = 'http://localhost:8087/';
  private url = this.baseUrl + 'api/comments';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index() {
    return this.http.get<Comment[]>(this.url + '?sorted=true', this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  show(id: string) {
    return this.http.get<Comment>(this.url + '/' + id, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  create(data: Comment) {
    return this.http.post<Comment>(this.url, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  destroy(id: number) {
    return this.http.delete<Comment>( this.url + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  update(id: number, data: Comment) {
    return this.http.put<Comment>(this.url + '/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }
}
