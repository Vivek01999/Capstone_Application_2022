import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
     user: any


    constructor(private http: HttpClient) {
        
    }
    
    login(username:string,password:string) {

        console.log("login called")
      return  this.http.post<any>(`${environment.API_URL}/login`, { Username : username, Password: password })
    }



    
}