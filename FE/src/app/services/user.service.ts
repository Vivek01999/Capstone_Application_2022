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
    const url = `${environment.API_URL}/registerUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }
}
