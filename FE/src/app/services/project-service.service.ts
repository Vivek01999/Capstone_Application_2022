import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Projectservice {

  constructor(private http: HttpClient) { }
  public selectedProject:any;
  public isProjectView:boolean = false;
  
  getDocument(docId: any){
    const url = `${environment.API_URL}/getFileDetails/${docId}`;
    console.log("In project service");
    console.log(url)
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
          return result;
        })
      );
    }

  getAllProjects() {
    const url = `${environment.API_URL}/getAllProjects`;
    console.log("In project service");
    console.log(url)
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );}

  getAllProjectsList(){
    const url = `${environment.API_URL}/getAllProjectsList`;
    console.log("In project List service");
    console.log(url)
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );
      }


  
  getAllOrgs() {
    const url = `${environment.API_URL}/getAllOrgs`;
    console.log("In project service");
    console.log(url)
    return this.http.get(url)
      .pipe(
        tap((result: any) => {
        })
      );  
  }
  createProject(data: any) {
    const url = `${environment.API_URL}/createProject`;
    let formData = new FormData();
    formData.append('ID', data.ID);
    formData.append('Name', data.Name);
    formData.append('Desc', data.Desc);
    console.log("formdata", formData);
    return this.http.post(url, formData)
      .pipe(
        tap((result: any) => {
        })
      );
      }
    
  updateProjectToModel(data: any){
    const url = `${environment.API_URL}/updateProjectToModel`;
    let formData = new FormData();
    console.log("entered form")
    formData.append('ProjectId', data.ProjectId);
    formData.append('OrgID', data.OrgID);
    console.log("formdata", formData);
    console.log("now going to post data in DB");
    return this.http.post(url, formData)
      .pipe(
        tap((result: any) => {
        })
      );
      }
    }
    
