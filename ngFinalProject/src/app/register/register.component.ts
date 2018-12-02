import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(form: NgForm) {
    const user = new User();
    user.email = form.value.email;
    user.username = form.value.username;
    user.password = form.value.password;
    this.authService.register(user).subscribe(
      data => {
        this.router.navigateByUrl('home');
      },
      err => console.error('Observer got an error: ' + err)
    );

  }

}
