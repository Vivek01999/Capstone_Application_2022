import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FabricUserIdentityService {

  constructor(private readonly http: HttpClient) { }

  registerFabUserIdentity(payload: any) {
    const url = `${environment.API_URL}/registerFabricUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  getFabUserIdentityList(payload: any) {
    const url = `${environment.API_URL}/getFabricUserList`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  deleteFabUserIdentity(payload: any) {
    const url = `${environment.API_URL}/deleteFabricUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  updateFabUserIdentity(payload: any) {
    const url = `${environment.API_URL}/updateFabricUser`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  getFabricUIDListForOrg(payload: any) {
    const url = `${environment.API_URL}/getFabricUIDList`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }

  mapFUI(payload: any) {
    const url = `${environment.API_URL}/mapUserToFabricID`;
    return this.http.post(url, payload)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
  }
}
