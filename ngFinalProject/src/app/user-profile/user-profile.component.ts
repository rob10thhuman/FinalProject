import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  editingUser: User = null;
  comments = [];
  deletingProfile = false;
  editingProfile = false;
  verifying = false;
  invalidPassword = false;
  noMatchPassword = false;
  passwordConfirmed;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.showUser();
    this.getUserComments();
  }

  showUser() {
    const username = this.authService.getUsername();
    this.userService
      .showByUsername(username)
      .subscribe(
        data => (this.user = data),
        err => console.error('Observer got an error: ' + err)
      );
  }

  verifyPasswordServerSide(password) {
    this.authService.verifyPassword(this.user.id, password).subscribe(
      data => {
        this.passwordConfirmed = data.valueOf();
      },
      err => console.error('Observer got an error: ' + err),

    );
  }

  deactivateUser() {
    this.user.active = false;
    this.userService.update(this.user.id, this.user).subscribe(
      data => {
        this.deletingProfile = false;
        this.authService.logout();
        this.router.navigateByUrl('/home');
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  updateUser() {
    this.userService.update(this.editingUser.id, this.editingUser).subscribe(
      data => {
        this.user = data;
        this.editingProfile = false;
        this.editingUser = null;
        this.authService.logout();
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  getUserComments() {
    const username = this.authService.getUsername();
    this.commentService.usernameIndex(username).subscribe(
      data => {
        this.comments = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  setupEditUser() {
    this.editingUser = new User();
    this.editingUser.id = this.user.id;
    this.editingUser.email = this.user.email;
    this.editingUser.active = this.user.active;
    this.editingUser.password = this.user.password;
    this.editingUser.role = this.user.role;
    this.editingUser.username = this.user.username;
  }

  confirmPassword(form: NgForm) {
    this.invalidPassword = false;
    this.noMatchPassword = false;

    const firstCheck = form.value.firstPassword === form.value.confirmPassword;
    if (firstCheck) {

      this.verifyPasswordServerSide(form.value.firstPassword);
      console.log(this.passwordConfirmed);

      if (this.passwordConfirmed === true) {
        this.passwordConfirmed = false;
        this.verifying = false;
        this.invalidPassword = false;
        this.noMatchPassword = false;
      } else {
        this.invalidPassword = true;
      }
    } else {
      this.noMatchPassword = true;
    }
  }



  verifyForDelete() {
    this.verifying = true;
    this.deletingProfile = true;
  }
  verifyForUpdate() {
    this.setupEditUser();
    this.verifying = true;
    this.editingProfile = true;
  }

  cancelDelete() {
    this.verifying = false;
    this.deletingProfile = false;
  }
  cancelEditing() {
    this.verifying = false;
    this.editingProfile = false;
    this.editingUser = null;
  }
  stopVerifying() {
    this.verifying = false;
    this.invalidPassword = false;
    this.noMatchPassword = false;
    this.deletingProfile = false;
    this.editingProfile = false;
  }
}
