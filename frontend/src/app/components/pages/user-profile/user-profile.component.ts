import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;
  comments?: Comment[];

  constructor(private userService: UserService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params['username']).subscribe({
      next: (res:User) => {
        this.user = res;
        document.title = `${this.user.name} - Reviewer`;
        if(!this.user) this.router.navigateByUrl("/page-not-found");
        this.getComments(this.user._id!);
      },
      error: (err:any) => {
        this.router.navigateByUrl("/page-not-found");
      }
    });
  }

  getComments(user_id: string): void{
    this.commentService.getCommentsByUser(user_id).subscribe({
      next: (res:Comment[]) => {
        this.comments = res;
        console.log(this.comments);
      },
      error: (err:any) => {
        console.log(err.error.message);
      }
    });
  }
}
