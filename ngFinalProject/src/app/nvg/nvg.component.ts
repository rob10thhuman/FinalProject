import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nvg',
  templateUrl: './nvg.component.html',
  styleUrls: ['./nvg.component.css']
})
export class NvgComponent implements OnInit {

  public isCollapsed = false;

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

}
