import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';

@Component({
  selector: 'app-employeelist',
  templateUrl: './update-fabric-user.component.html',
  styleUrls: ['./update-fabric-user.component.css']
})
export class UpdateFabricUserComponent implements OnInit {

  org : string = "";
  username: any = "";
  public EmployeeListData: any[] = [];
  constructor(private route: ActivatedRoute ,private ts : MyTestService, private getallemployeeservice: GetAllEmployeesservice) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("userIdentity");
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
