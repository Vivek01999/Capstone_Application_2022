import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  registerUser(payload: any) {
    const url = `${environment.API_URL}/createUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  getUserList(payload: any) {
    const url = `${environment.API_URL}/fetchUsers`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }
}
