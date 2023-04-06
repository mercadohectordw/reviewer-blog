import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {

  user!: User;
  token!: string;
  updateData: FormGroup;
  updatePassword: FormGroup;
  errorDataMessage = "";
  doneDataMessage = "";
  errorPasswordMessage = "";
  donePasswordMessage = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.updateData = this.formBuilder.group({
      email: new FormControl("", Validators.required),
      imageUrl: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      bio: new FormControl("")
    });

    this.updatePassword = this.formBuilder.group({
      password: new FormControl("", [Validators.pattern(/^.{8,16}$/), Validators.required]),
      confirm_password: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    document.title = `Opciones de Usuario - Reviewer`;
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUserByToken(token).subscribe({
        next: (res:User) => {
          this.user = res;
          this.token = token!;

          this.updateData.get("email")?.setValue(res.email);
          this.updateData.get("imageUrl")?.setValue(res.imageUrl);
          this.updateData.get("name")?.setValue(res.name);
          this.updateData.get("bio")?.setValue(res.bio);
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

  submitData(): void {
    if (this.updateData.invalid){
      this.errorDataMessage = "Revisá tus datos";
      setTimeout(() => {
        this.errorDataMessage = "";
      }, 5000);
      return;
    }

    let userData = {
      name : this.updateData.get("name")?.value,
      imageUrl : this.updateData.get("imageUrl")?.value,
      email : this.updateData.get("email")?.value,
      bio : this.updateData.get("bio")?.value 
    };

    this.userService.updateUser(this.user.username!, userData, this.token).subscribe({
      next: (res:any) => {
        this.doneDataMessage = res.message;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (err:any) => {
        console.log(err.error.message);
        this.errorDataMessage = err.message;
        setTimeout(() => {
          this.errorDataMessage = "";
        }, 5000);
      }
    });
  }


  submitPassword(): void{
    if(this.updatePassword.invalid || this.updatePassword.get('password')?.value != this.updatePassword.get('confirm_password')?.value){
      this.errorPasswordMessage = "Revisá tus datos";
      setTimeout(() => {
        this.errorPasswordMessage = "";
      }, 5000);
      return;
    }

    let newPassword = {
      password : this.updatePassword.get('password')?.value
    };

    this.userService.updateUserPassword(this.user.username!, newPassword, this.token).subscribe({
      next: (res:any) => {
        this.donePasswordMessage = res.message;
      },
      error: (err:any) => {
        console.log(err);
        this.errorPasswordMessage = err.message;
        setTimeout(() => {
          this.errorPasswordMessage = "";
        }, 5000);
      }
    });
  }
}
