import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { RegisterService } from '../services/register.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employeelist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  org : string = "";
  username: string = "";
  public userListData: any;
  public EmployeeListData: any[] = [];
  constructor(private snackBar: MatSnackBar, private router: Router, private ts : MyTestService, private getallemployeeservice: GetAllEmployeesservice, private registerService: RegisterService) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  ngOnInit(): void {
    this.getEmployeeListData();
    this.getUserListData();
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

  getUserListData() {
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
        "userIdentity":"vivek",
        "role":"client",
        "affiliation": "org1.department1"
      }
    }
    this.registerService.getUserList(payload)
    .subscribe(
      result => {
        if (result) {
          this.userListData = result.userList;
          console.log("userListData", this.userListData);
        }
      });
  }

  deleteUser(userIdentity:any){
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
        "userIdentity":userIdentity,
        "role":"client",
        "affiliation": "org1.department1"
      }
    }
    this.registerService.deleteUser(payload).subscribe(
      result => {
        if (result) {
          this.getUserListData();
        }
      });
  }
  navigateToUpdateFabricUser(userIdentity:any){
    this.router.navigate(["/updateFabricUser",{"userIdentity": userIdentity}]);
  }
  openSnackBar(userIdentity:any) {
    this.snackBar.open("Successfuly Deleted "+ userIdentity +" from the wallet","OK");
  }

}
