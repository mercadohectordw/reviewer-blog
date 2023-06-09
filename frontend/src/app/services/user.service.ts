import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.api + 'auth/signup/', user);
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(this.api + 'auth/signin/', user);
  }

  getUserByToken(token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);
    return this.http.get<any>(this.api + 'users/token/', httpOptions);
  }
  
  getUser(username: string): Observable<any>{
    return this.http.get<any>(this.api + 'users/' + username);
  }

  getAuthor(username: string): Observable<any>{
    return this.http.get<any>(this.api + 'users/author/' + username);
  }
  
  getAllAuthors(): Observable<any>{
    return this.http.get<any>(this.api + 'users/author');
  }

  updateUser(username: string, body: any, token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);
    return this.http.put<any>(this.api + 'users/' + username, body, httpOptions);
  }

  updateUserPassword(username: string, body: any, token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);
    return this.http.put<any>(this.api + 'users/password/' + username, body, httpOptions);
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
