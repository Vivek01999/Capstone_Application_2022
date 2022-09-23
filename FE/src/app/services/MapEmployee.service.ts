import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class MapEmployeeService {
    


    constructor(private http: HttpClient) {
        
    }
    
mapEmpoylee(projectID: String,employeeUsername: string){
    console.log("in map employee")
return this.http.post<any>(`${environment.API_URL}/mapEmployeeRole`, { ProjectID : projectID, Username: employeeUsername })

}





    
}