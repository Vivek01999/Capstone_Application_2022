import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    RequestName : any = ''

    constructor(private http : HttpClient) { }

  
    httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    getData(orgset : string) {
        return this.http.get(orgset);
      }
  

}