import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private url = environment.baseUrl + 'api/ratings';

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

}
