import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() {
    /* let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + token);
    let options = {headers:headers};
    return this.http.get('/api/orders', options).pipe(
      map(response => response)
    ); */
    //above method is manual method.
    //If you apply JwtModule.forRoot setting in app.module then you token will be sent automatically

    return this.http.get('/api/orders').pipe(
      map(response => response)
    );
  }
}
