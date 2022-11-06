import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';

@Component({
  selector: 'app-create-fabric-user-identity',
  templateUrl: './create-fabricUserIdentity.component.html',
  styleUrls: ['./create-fabricUserIdentity.component.css']
})
export class CreateFabricUserIdentityComponent implements OnInit {

  username: string = '';
  selected: string = "NASA";
  response: string = '';
  role: string = '';
  affiliation: string = '';
  userIdentity: string = '';
  organization: string = ';'
  public EmployeeListData: any[] = [];
  constructor(private snackBar: MatSnackBar,private registerService: RegisterService, private ts: MyTestService, private router: Router, private getallemployeeservice: GetAllEmployeesservice){
    this.username = ts.getUser();
  }

  ngOnInit(): void {
    this.getEmployeeListData();
  }
  
  createuser() {
    const payload = {
      "registerUser": {
        "userIdentity":this.userIdentity,
        "role":this.role,
        "affiliation": this.affiliation
      }
    }
    this.registerService.registerUser(payload).subscribe(res => {
      if (res) {
        console.log("Successfully registered");
        this.response = res.status;
        this.snackBar.open("Successfuly registered and enrolled " + this.userIdentity, "OK");
        this.router.navigate(['/userList']);
      }
    }, err => {
      console.log(err);
      this.snackBar.open("Unable to register user " + this.userIdentity, "OK");
      this.router.navigate(['/userList']);
    });

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
