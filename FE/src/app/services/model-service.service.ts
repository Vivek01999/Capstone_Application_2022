import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(private http: HttpClient) { }
  public selectedMBSEListItem:any;
  public selectedMBSEBaseListItem:any;
  public selectedMBSEVarientListItem:any;
  public isMBSEBaseModelView:boolean=false;
  public isMBSEModelView:boolean = false;
  public isMBSEModelEdit:boolean = false;
  public isMBSEVarientModelView:boolean=false;
  
   
  createVariantModelTemplate(data: any) {
    const url = `${environment.API_URL}/createVariantModelTemplate`;
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(url,JSON.stringify(data) ,{headers: headers})
      .pipe(
        tap((result: any) => {
        })
      );
  }

  uploadFile(formData : FormData){
    const url = `${environment.API_URL}/fileUpload`;
    return this.http.post(url, formData)
    .pipe(
      tap((result: any) => {
        return result
      })
    );
  }
  createBaseModelTemplate(data: any) {
    const url = `${environment.API_URL}/createBaseModelTemplate`;
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(url,JSON.stringify(data) ,{headers: headers})
      .pipe(
        tap((result: any) => {
        })
      );
  }

  createMBSEModel(data: any) {
    const url = `${environment.API_URL}/createMBSEModel`;
    var headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(url,JSON.stringify(data) ,{headers: headers})
      .pipe(
        tap((result: any) => {
        })
      );
  }


  updateMBSEModel(data: any) {
    const url = `${environment.API_URL}/updateMBSEModel`;
    let formData = new FormData();
    formData.append('MVMD_Id', data.MVMD_Id);
    formData.append('Model_Name', data.Model_Name);
    formData.append('VersionString', data.VersionString);
    formData.append('SubVersionString', data.SubVersionString);
    formData.append('Creator', data.Creator);
    formData.append('CreatedDate', data.CreatedDate);
    formData.append('file', data.file);
    formData.append('MM_Id', data.MM_Id)
    console.log("formdata", formData);
    return this.http.put(url, formData)
      .pipe(
        tap((result: any) => {
        })
      );
  }

  public getAllBaseModelTemplate() {
    const url = `${environment.API_URL}/getAllBaseModelTemplate`;
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );
  }

  public getAllVariantModelTemplate() {
    const url = `${environment.API_URL}/getAllVariantModelTemplate`;
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );
  }

  public getAllMBSEModel() {
    const url = `${environment.API_URL}/getAllMBSEModel`;
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );
  }

  public getTemplateModels(data: any) {
    const url = `${environment.API_URL}/getTemplateModels`;
    return this.http.post(url, data)
      .pipe(
        tap((result: any) => {
        })
      );
  }

}