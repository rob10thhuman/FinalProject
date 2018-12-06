import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Vote } from './models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private notAuthUrl = environment.baseUrl + 'api/notAuth/votes';
  private authUrl = environment.baseUrl + 'api/auth/votes';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index() {
    return this.http.get<Vote[]>(this.notAuthUrl + '?sorted=true', this.httpOptions ).pipe(
      catchError(this.handleError));
  }
  indexByCommentId(commentId: string) {
    return this.http.get<Vote[]>(this.notAuthUrl + '/comments/' + commentId, this.httpOptions ).pipe(
      catchError(this.handleError));
  }



  show(id: string) {
    return this.http.get<Vote>(this.notAuthUrl + '/' + id, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  createForComment(id, vote: Vote) {
    return this.http.post<Vote>(this.authUrl + '/comments/' + id, vote, this.httpOptions).pipe(
      catchError(this.handleError));
  }
  createForSubComment(id, vote: Vote) {
    return this.http.post<Vote>(this.authUrl + '/sub-comments/' + id, vote, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  destroy(id: number) {
    return this.http.delete<Vote>( this.authUrl + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  updateForComment(commentId: number, id: number, data: Vote) {
    return this.http.put<Vote>(this.authUrl + '/comments/' + commentId + '/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }
  updateForSubComment(subCommentId: number, id: number, data: Vote) {
    return this.http.put<Vote>(this.authUrl + '/sub-comments/' + subCommentId + '/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }
}
