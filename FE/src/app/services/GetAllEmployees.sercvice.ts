import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class GetAllEmployeesservice {

  constructor(private http: HttpClient) { }

  public Employees() {
    const url = `${environment.API_URL}/getAllEmployees`;
    return this.http.get(url).pipe(tap(result => result)
    );
  }
}
