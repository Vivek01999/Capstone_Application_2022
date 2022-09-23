import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  org : string = "";
  username: string = "";
  public EmployeeListData: any[] = [];
  constructor(private ts : MyTestService, private getallemployeeservice: GetAllEmployeesservice) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  ngOnInit(): void {
    this.getEmployeeListData();
  }
  getEmployeeListData() {
    this.getallemployeeservice.Employees()
    .subscribe(
      result => {
        if (result) {
          this.EmployeeListData = result;
          console.log("EmployeeListData", this.EmployeeListData);
        }
      });
  }

}
