import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = null;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.showUser();
  }

  showUser() {
    const username = this.authService.getUsername();
    this.userService.showByUsername(username).subscribe(
      data => this.user = data,
        err => console.error('Observer got an error: ' + err)
    );
  }

}
