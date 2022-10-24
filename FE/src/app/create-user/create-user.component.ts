import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { MyTestService } from '../my-test.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  username: string = '';
  selected: string = "NASA";
  response: string = '';
  public EmployeeListData: any[] = [];
  constructor(private registerService: RegisterService, private ts: MyTestService, private getAllemployeeservice: GetAllEmployeesservice){
    this.username = ts.getUser();
  }

  ngOnInit(): void {
    this.getEmployeeListData();
  }
  
  createuser() {
    const payload = {

      "common":{
        "wallet": "wallet",
        "organisationMSP": "Org1MSP",
        "networkChannel":"mychannel",
        "smartContract":"fabcar"
      },
      "adminEnroll": {
        "caAuth": "ca.org1.example.com",
        "wallet": "wallet",
        "adminIdentity": "admin",
        "adminSecret": "adminpw"
      },
      "registerUser": {
        "userIdentity":this.username,
        "role":"CSE",
        "affiliation": "org1.department1"
      }
    }
    this.registerService.registerUser(payload).subscribe(res => {
      if (res) {
        console.log("Successfully registerred");
        this.response = res.status;
      }
    }, err => {
      console.log(err);
    });

  }
  getEmployeeListData() {
    this.getAllemployeeservice.Employees()
    .subscribe(
      result => {
        if (result) {
          this.EmployeeListData = result;
          console.log("EmployeeListData", this.EmployeeListData);
        }
      });
  }
}
