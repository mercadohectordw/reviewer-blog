import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-autor-profile',
  templateUrl: './autor-profile.component.html',
  styleUrls: ['./autor-profile.component.css']
})
export class AutorProfileComponent implements OnInit {
  autor!: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAutor(this.route.snapshot.params['username']).subscribe({
      next: (res:any) => {
        this.autor = res;
        if(!this.autor) this.router.navigateByUrl("/page-not-found");
      },
      error: (err:any) => {
        this.router.navigateByUrl("/page-not-found");
      }
    });
  }

}
