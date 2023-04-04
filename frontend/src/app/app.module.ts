import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PostComponent } from './components/pages/post/post.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AuthorProfileComponent } from './components/pages/author-profile/author-profile.component';
import { UserOptionsComponent } from './components/pages/user-options/user-options.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { CreateCommentComponent } from './components/partials/create-comment/create-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    AuthorProfileComponent,
    UserOptionsComponent,
    CreatePostComponent,
    CreateCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
