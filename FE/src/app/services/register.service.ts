import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(payload: any) {
    const url = `${environment.API_URL}/registerUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  getUserList(payload: any) {
    const url = `${environment.API_URL}/getUserList`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  deleteUser(payload: any) {
    const url = `${environment.API_URL}/deleteUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  updateUser(payload: any) {
    const url = `${environment.API_URL}/updateFabricUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }
}
