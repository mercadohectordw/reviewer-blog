import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-autor-profile',
  templateUrl: './autor-profile.component.html',
  styleUrls: ['./autor-profile.component.css']
})
export class AutorProfileComponent implements OnInit {
  autor!: User;
  posts?: Post[];
  comments?: Comment[];

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAutor(this.route.snapshot.params['username']).subscribe({
      next: (res:any) => {
        this.autor = res;
        document.title = `${this.autor.name} - Reviewer`;
        if(!this.autor) this.router.navigateByUrl("/page-not-found");
        this.getPosts(this.autor._id!);
        this.getComments(this.autor._id!);
      },
      error: (err:any) => {
        this.router.navigateByUrl("/page-not-found");
      }
    });
  }

  getPosts(autor_id: string): void{
    this.postService.getPostsByAutor(autor_id).subscribe({
      next: (res:Post[]) => {
        this.posts = res;
        console.log(this.posts);
      },
      error: (err:any) => {
        console.log(err.error.message);
      }
    });
  }

  getComments(user_id: string): void{
    this.commentService.getCommentsByUser(user_id).subscribe({
      next: (res:Comment[]) => {
        this.comments = res;
      },
      error: (err:any) => {
        console.log(err.error.message);
      }
    });
  }
}
