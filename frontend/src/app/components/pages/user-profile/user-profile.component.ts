import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params['username']).subscribe({
      next: (res:any) => {
        this.user = res;
        if(!this.user) this.router.navigateByUrl("/page-not-found");
      },
      error: (err:any) => {
        this.router.navigateByUrl("/page-not-found");
      }
    });
  }

}
