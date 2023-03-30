import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PostComponent } from './components/pages/post/post.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AutorProfileComponent } from './components/pages/autor-profile/autor-profile.component';
import { UserOptionsComponent } from './components/pages/user-options/user-options.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "post/:post_id", component: PostComponent},
  {path: "user/:username", component: UserProfileComponent},
  {path: "autor/:username", component: AutorProfileComponent},
  {path: "settings", component: UserOptionsComponent},
  
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},

  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", redirectTo: "page-not-found", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
