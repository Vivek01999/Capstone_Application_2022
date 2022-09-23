import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { MapEmployeeService } from '../services/MapEmployee.service';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  org : string = "";
  username: string = "";
  Org: string = "";
  Role : string = "CSE"
  newUserName : string = ""
  Project : string = ""
  constructor(private ts : MyTestService, private mapEmployeeService : MapEmployeeService) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  
  ngOnInit(): void {
  }
  submitUser(){
    console.log("submitted")
this.mapEmployeeService.mapEmpoylee(this.Project, this.newUserName).subscribe(data=> {
  if (data.isMapped == true)
  alert("user mapped sucessfully")
  else
  alert("user already mapped or user record doesnt exist")
})
    // return  this.http.post<any>(`${environment.API_URL}/login`, { Username : username, Password: password })
    // console.log("org",this.org,"useranem",this.newUserName, "role",this.Role, "project",this.Project )
    
  }
}
