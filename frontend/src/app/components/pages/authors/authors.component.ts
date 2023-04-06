import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors!: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    document.title = "Autores - Reviewer";
    this.userService.getAllAuthors().subscribe({
      next: (res:User[]) => {
        this.authors = res;
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

}
