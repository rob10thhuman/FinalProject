import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.showUser();
  }

  showUser() {
    const u = localStorage.getItem('token');
    console.log(atob(u));

    this.userService.showByUsername('test').subscribe(
      data => this.user = data,
        err => console.error('Observer got an error: ' + err)
    );
  }

}
