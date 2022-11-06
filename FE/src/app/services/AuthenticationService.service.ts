import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: any


  constructor(private http: HttpClient) {

  }

  login(payload: any) {

    console.log("login called")
    return this.http.post(`${environment.API_URL}/login`, payload);
  }




}