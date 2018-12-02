import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe(
      data => {
        this.router.navigateByUrl('home');
      },
      err => console.error('Observer got an error: ' + err)
    );

  }

}
