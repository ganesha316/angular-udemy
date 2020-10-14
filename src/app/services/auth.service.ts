import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials) {
    //  return this.http.post('/api/authenticate', credentials);
    return this.http.post("/api/authenticate", credentials).pipe(
      map((response) => {
        if(response && response['token']){
          localStorage.setItem('token', response['token']);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService()
    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    let tokenExpirationDate = jwtHelper.getTokenExpirationDate(token)
    let isTokenExpired = jwtHelper.isTokenExpired(token)

    return !isTokenExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token)
      return null;
    return new JwtHelperService().decodeToken(token); 
  }
}
