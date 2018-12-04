import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nvg',
  templateUrl: './nvg.component.html',
  styleUrls: ['./nvg.component.css']
})
export class NvgComponent implements OnInit {

  model = null;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.checkLogin();
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }

}
