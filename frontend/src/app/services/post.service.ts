import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPostsByAuthor(author_id: string): Observable<any>{
    return this.http.get<any>(this.api + 'posts/author/' + author_id);
  }

  getPost(post_id: string): Observable<any>{
    return this.http.get<any>(this.api + 'posts/' + post_id);
  }

  createPost(post: Post, token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);
    return this.http.post<any>(this.api + 'posts/', post, httpOptions);
  }

  getAllPosts(): Observable<any>{
    return this.http.get<any>(this.api + 'posts');
  }

  generateHeader(token:string): any{
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
  }
}