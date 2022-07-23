import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:8080/api';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  //currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: any): Observable<any> {
    let api = `${this.endpoint}/auth/signup`;
    return this.http.post(api, user); 
  }
  // Sign-in
  signIn(user: any) {
    return this.http.post(`${this.endpoint}/auth/signin`, user)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  setUsername(name:string){
    localStorage.setItem('username', JSON.stringify(name));
  }
  get username():string{
    let username = localStorage.getItem('username');
    return username;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }
}