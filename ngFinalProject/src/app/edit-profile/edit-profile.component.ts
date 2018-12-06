import { CommentService } from '../comment.service';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showUser();
  }

  showUser() {
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          (this.user = data);
        },
        err => console.error('Observer got an error: ' + err)
      );
  }


    updateUser() {
    this.userService.updateCurrentUser(this.user).subscribe(
      data => {
        this.user = data;
        this.router.navigateByUrl('/profile');
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  cancel() {
    this.router.navigateByUrl('/profile');
  }

}
