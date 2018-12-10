import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';
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
  flaggedComments = null;
  deletingProfile = false;
  confirmingPassword = false;
  verifying = false;
  invalidPassword = false;
  noMatchPassword = false;
  passwordConfirmed;
  passwordToBeChecked = '';
  destination = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = new User();
    this.showUser();
    // this.getUserComments();
  }

  showUser() {
    this.userService.getCurrentUser().subscribe(
      data => {
        this.user = data;
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  deactivateUser() {
    this.user.active = false;
    this.userService.updateCurrentUser(this.user).subscribe(
      data => {
        console.log(data);
        this.authService.logout();
        this.router.navigateByUrl('/home');
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  editOrDelete(destination) {
    let passwordMatch = false;
    this.authService
      .verifyPassword(this.user.id, this.passwordToBeChecked)
      .subscribe(
        data => {
          if (data === true) {
            passwordMatch = true;
            if (this.destination === 'editing') {
              this.router.navigateByUrl('/editProfile');
            }
            if (this.destination === 'deleting') {
              this.deactivateUser();
            }
          } else {
            this.invalidPassword = true;
          }
        },
        err => {
          passwordMatch = false;
        }
      );
  }

  confirmPassword(givenDestination) {
    this.destination = givenDestination;
    this.confirmingPassword = true;
  }

  cancelConfirm() {
    this.passwordToBeChecked = '';
    this.invalidPassword = false;
    this.confirmingPassword = false;
  }

  setupFlaggedComments() {
    this.commentService.indexFlagged().subscribe(
      data => this.flaggedComments = data,
      err => console.error('Observer got an error: ' + err)
    );
  }

  unflagComment(comment: Comment) {
    comment.flag = false;
    this.commentService.update(comment.id, comment).subscribe(
      data => this.setupFlaggedComments(),
      err => console.error('Observer got an error: ' + err)
    );
  }

  deactivateComment(comment: Comment) {
    comment.active = false;
    this.commentService.update(comment.id, comment).subscribe(
      data => this.setupFlaggedComments(),
      err => console.error('Observer got an error: ' + err)
    );
  }

  userIsAdmin() {
    return this.user.role === 'admin';
  }

  getUpvotes(comment: Comment) {
    let count = 0;
    comment.votes.forEach((vote) => {
      if (vote.vote) {
        count++;
      }
    });
    return count;
  }
  getDownvotes(comment: Comment) {
    let count = 0;
    comment.votes.forEach((vote) => {
      if (!vote.vote) {
        count++;
      }
    });
    return count;
  }

  // verifyPasswordServerSide(password) {
  //   this.authService.verifyPassword(this.user.id, password).subscribe(
  //     data => {
  //       this.passwordConfirmed = data;
  //     },
  //     err => console.error('Observer got an error: ' + err),

  //   );
  // }

  // updateUser() {
  //   this.userService.update(this.editingUser.id, this.editingUser).subscribe(
  //     data => {
  //       this.user = data;
  //       this.editingProfile = false;
  //       this.editingUser = null;
  //       this.authService.logout();
  //     },
  //     err => console.error('Observer got an error: ' + err)
  //   );
  // }

  // getUserComments() {
  //   const username = this.authService.getUsername();
  //   this.commentService.usernameIndex(username).subscribe(
  //     data => {
  //       this.comments = data;
  //     },
  //     err => console.error('Observer got an error: ' + err)
  //   );
  // }

  // setupEditUser() {
  //   this.editingUser = new User();
  //   this.editingUser.id = this.user.id;
  //   this.editingUser.email = this.user.email;
  //   this.editingUser.active = this.user.active;
  //   this.editingUser.password = this.user.password;
  //   this.editingUser.role = this.user.role;
  //   this.editingUser.username = this.user.username;
  // }

  // confirmPassword(form: NgForm) {
  //   this.invalidPassword = false;
  //   this.noMatchPassword = false;

  //   const firstCheck = form.value.firstPassword === form.value.confirmPassword;
  //   if (firstCheck) {

  //     this.verifyPasswordServerSide(form.value.firstPassword);
  //     console.log(this.passwordConfirmed);

  //     if (this.passwordConfirmed) {
  //       this.passwordConfirmed = false;
  //       this.verifying = false;
  //       this.invalidPassword = false;
  //       this.noMatchPassword = false;
  //     } else {
  //       this.invalidPassword = true;
  //     }
  //   } else {
  //     this.noMatchPassword = true;
  //   }
  // }

  // verifyForDelete() {
  //   this.verifying = true;
  //   this.deletingProfile = true;
  // }
  // verifyForUpdate() {
  //   this.setupEditUser();
  //   this.verifying = true;
  //   this.editingProfile = true;
  // }

  // cancelDelete() {
  //   this.verifying = false;
  //   this.deletingProfile = false;
  // }
  // cancelEditing() {
  //   this.verifying = false;
  //   this.editingProfile = false;
  //   this.editingUser = null;
  // }
  // stopVerifying() {
  //   this.verifying = false;
  //   this.invalidPassword = false;
  //   this.noMatchPassword = false;
  //   this.deletingProfile = false;
  //   this.editingProfile = false;
  // }
}
