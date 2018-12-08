import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SubComment } from './models/sub-comment';

@Injectable({
  providedIn: 'root'
})
export class SubCommentService {

  private notAuthUrl = environment.baseUrl + 'api/notAuth/sub-comments';
  private authUrl = environment.baseUrl + 'api/auth/sub-comments';

  private token = this.authService.getToken();
  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Basic ${this.token}`
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  index() {
    return this.http.get<SubComment[]>(this.notAuthUrl + '?sorted=true', this.httpOptions ).pipe(
      catchError(this.handleError));
  }
  usernameIndex(username: string) {
    return this.http.get<SubComment[]>(this.authUrl + '/usernames/' + username, this.httpOptions ).pipe(
      catchError(this.handleError));
  }



  show(id: string) {
    return this.http.get<SubComment>(this.notAuthUrl + '/' + id, this.httpOptions ).pipe(
      catchError(this.handleError));
  }

  create(parentId, data: SubComment) {
    return this.http.post<SubComment>(this.authUrl + '/' + parentId, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  destroy(id: number) {
    return this.http.delete<SubComment>( this.authUrl + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  deactivate(id: number) {
    return this.http.delete<SubComment>(this.authUrl + '/deactivate/' + id, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  update(id: number, data: SubComment) {
    return this.http.put<SubComment>(this.authUrl + '/' + id, data, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }
}
