import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: FormGroup;
  token?: string;
  errorMessage: string = ""; 

  constructor(private formBuilder: FormBuilder, private postService: PostService, private userService: UserService , private router: Router) { 
    this.post = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    document.title = "Crear Post - Reviewer";
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUserByToken(token).subscribe({
        next: (res:User) => {
          if(res.permissions?.includes("author")){
            this.token = token!;
          } else {
            console.log("No Autorizado");
            this.router.navigateByUrl("/home");
          }
        },
        error: (err:any) => {
          console.log(err.error.message);
          localStorage.removeItem("token");
          this.router.navigateByUrl("/home");
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  createPost(): void{
    if(this.post.invalid){
      this.errorMessage = "Completa todos los campos";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }

    let body: Post = {
      title: this.post.get("title")?.value,
      imageUrl: this.post.get("imageUrl")?.value,
      content: this.post.get("content")?.value,
      tags: this.post.get("tags")?.value.split(" ")
    }

    this.postService.createPost(body, this.token!).subscribe({
      next: (res:any) => {
        console.log(res.message);
        this.router.navigateByUrl(`/post/${res.post}`);
      },
      error: (err:any) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    });
  }

}
