import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  enable: boolean = false;
  @Input() parentComment: string | null = null;
  @Input() post_id!: string;
  @Output() messageEvent = new EventEmitter<string>();
  comment: FormGroup;
  token?: string;

  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private userService: UserService, private location: Location) {
    this.comment = this.formBuilder.group({
      content: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUserByToken(token).subscribe({
        next: (res: User) => {
          this.enable = true;
          if(token) this.token = token;
        },
        error: (err: any) => {
          console.log(err.error.message);
          localStorage.removeItem("token");
        }
      });
    }
  }

  createComment(): void{
    if(!this.enable || this.comment.invalid || !this.token || !this.post_id) {
      return;
    }

    let body = {
      parentComment: this.parentComment,
      content: this.comment.get("content")?.value
    };

    this.commentService.createComment(body, this.post_id, this.token).subscribe({
      next: (res:any) => {
        this.messageEvent.emit(res.message);
      },
      error: (err:any) => {
        console.log(err.error.message);
      }
    });
  }

}
