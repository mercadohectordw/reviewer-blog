import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user?: User;
  profilePath?: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUserByToken(token).subscribe({
        next: (res: User) => {
          this.user = res;

          if(res.permissions!.includes("author")){
            this.profilePath = `/author/${res.username}`
          } else {
            this.profilePath = `/user/${res.username}`
          }
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      })
    }
  }

  logout(): void{
    localStorage.removeItem("token");
    window.location.reload();
  }
}
