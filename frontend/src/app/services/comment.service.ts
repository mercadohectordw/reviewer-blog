import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCommentsByUser(user_id: string): Observable<any>{
    return this.http.get<any>(this.api + 'comments/user/' + user_id);
  }

  getCommentsByPost(post_id: string): Observable<any>{
    return this.http.get<any>(this.api + 'comments/' + post_id);
  }

  createComment(comment: any, post_id: string, token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);
    return this.http.post<any>(this.api + 'comments/' + post_id, comment, httpOptions);
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