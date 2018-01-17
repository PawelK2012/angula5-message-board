import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:63145/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  constructor(private http: Http, private router: Router) { }

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    // return !! double negative to get t/f not a value
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
    return new RequestOptions({ headers: header });
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {
      this.authenticate(res);
    });
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
      this.authenticate(res);
    });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  authenticate(res) {
    var authRepsonse = res.json();
    if (!authRepsonse.token) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, authRepsonse.token);
    localStorage.setItem(this.NAME_KEY, authRepsonse.firstName);
    this.router.navigate(['/']);
  }
}
