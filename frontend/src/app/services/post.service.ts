import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}