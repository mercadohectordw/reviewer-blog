import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerUser = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern(/^.{8,16}$/),Validators.required]),
      confirm_password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    document.title = `Registro - Reviewer`;
  }

  submitForm(): void{
    if(this.registerUser.invalid || this.registerUser.get('password')?.value != this.registerUser.get('confirm_password')?.value){
      this.errorMessage = "Revisa tus datos";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }

    let userData = {
      name : this.registerUser.get("name")?.value,
      username : this.registerUser.get("username")?.value,
      email : this.registerUser.get("email")?.value,
      password : this.registerUser.get("password")?.value,
    };

    this.userService.register(userData).subscribe({
      next: (res:any) => {
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl("/home").then(() => {
          window.location.reload();
        });
      },
      error: (err:any) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    });
  }
}