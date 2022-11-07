import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly http: HttpClient) { }

  getOrganizationList() {
    const url = `${environment.API_URL}/getOrganizationList`;
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  getAffiliations(payload: any) {
    const url = `${environment.API_URL}/getAffiliations`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }
}
