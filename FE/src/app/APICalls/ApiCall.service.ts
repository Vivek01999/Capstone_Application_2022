import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class APICallService {
     user: any

     listOfTemplates: any = [];
     constructor(
        private http: HttpClient
    ) {
        
    }


  getAllProject(){
    return this.http.get(`${environment.API_URL}/getAllProjects`);
  }
}