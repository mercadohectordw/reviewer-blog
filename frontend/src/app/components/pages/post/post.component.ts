import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!: Post;
  autor?: User;
  comments!: Comment[];

  constructor(private postService: PostService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postService.getPost(this.route.snapshot.params['post_id']).subscribe({
      next: (res:Post) => {
        this.post = res;
        document.title = this.post.title + " - Reviewer";
        this.getComments();
        if(typeof this.post.autor !== "string"){
          this.autor = this.post.autor;
        }
      },
      error: (err:any) => {
        this.router.navigateByUrl("/page-not-found");
      }
    });
  }

  getComments(): void{
    this.commentService.getCommentsByPost(this.route.snapshot.params['post_id']).subscribe({
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
