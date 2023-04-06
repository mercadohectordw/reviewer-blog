import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts!: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    document.title = `Reviewer`;
    this.postService.getAllPosts().subscribe({
      next: (res:Post[]) => {
        this.posts = res;
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

}
