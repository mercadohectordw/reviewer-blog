import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

}