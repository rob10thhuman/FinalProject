import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { CommentService } from '../comment.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  editingUser: User = null;
  // comments: Comment[] = null;
  deletingProfile = false;
  editingProfile = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    // private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.showUser();
    // this.getUserComments();
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

  deactivateUser() {
    this.user.active = false;
    this.userService.update(this.user.id, this.user).subscribe(
      data => {
        console.log('deleted!');
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
        this.tearDownEditUser();

      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  // getUserComments() {
  //   const username = this.authService.getUsername();
  //   console.log('1: ' + username);

  //   this.commentService
  //     .usernameIndex(username)
  //     .subscribe(
  //       data => {
  //         console.log('this is it');

  //         this.comments = data;
  //       },
  //       err => console.error('Observer got an error: ' + err)
  //     );
  // }

  setDeletingProfile(bool: boolean) {
    this.deletingProfile = bool;
  }

  setupEditUser() {
    this.editingProfile = true;

    this.editingUser = new User();
    this.editingUser.id = this.user.id;
    this.editingUser.email = this.user.email;
    this.editingUser.active = this.user.active;
    this.editingUser.password = this.user.password;
    this.editingUser.role = this.user.role;
    this.editingUser.username = this.user.username;
  }
  tearDownEditUser() {
    this.editingProfile = false;
    this.editingUser = null;
  }
}
