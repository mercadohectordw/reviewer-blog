import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  author!: User;
  posts?: Post[];
  comments?: Comment[];

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getAuthor(params['username']).subscribe({
        next: (res:any) => {
          this.author = res;
          document.title = `${this.author.name} - Reviewer`;
          if(!this.author) this.router.navigateByUrl("/page-not-found");
          this.getPosts(this.author._id!);
          this.getComments(this.author._id!);
        },
        error: (err:any) => {
          this.router.navigateByUrl("/page-not-found");
        }
      });
    })
  }

  getPosts(author_id: string): void{
    this.postService.getPostsByAuthor(author_id).subscribe({
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
