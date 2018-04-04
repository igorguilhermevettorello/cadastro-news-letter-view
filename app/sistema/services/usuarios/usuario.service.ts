import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Router } from '@angular/router'

@Injectable()

export class UserService {
  private loggedIn = false;

  constructor(
    private http: Http,
    private globals: Globals,
    private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(usuario) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = this.globals.url + '/authentication';
    return this.http.post(url, JSON.stringify(usuario), { headers: headers })
      .map((response: Response) => {
        let res = response.json();
        if (res.auth_token) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }
      })
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('menu');
    localStorage.removeItem('userCreatedAt');
    localStorage.removeItem('userImagem');
    localStorage.removeItem('userName');
    localStorage.removeItem('userUpdatedAt');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}