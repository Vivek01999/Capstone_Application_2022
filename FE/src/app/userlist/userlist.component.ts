import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { RegisterService } from '../services/register.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employeelist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  org: string = "";
  username: string = "";
  public userListData: any;
  public EmployeeListData: any[] = [];
  constructor(private snackBar: MatSnackBar, private router: Router, private ts: MyTestService, private getallemployeeservice: GetAllEmployeesservice, private registerService: RegisterService) {
    this.org = ts.getInfo();
    this.username = ts.getUser();
  }
  ngOnInit(): void {
    this.getUserListData();
  }
  getUserListData() {
    const payload = {
      "adminIdentity": "admin"
    }
    this.registerService.getFabUserIdentityList(payload)
      .subscribe(
        result => {
          if (result) {
            this.userListData = result.userList;
            console.log("userListData", this.userListData);
          }
        });
  }

  navigateToUpdateFabricUser(userInfo: any) {
    this.router.navigate(["/updateFabricUser", { "userInfo": JSON.stringify(userInfo) }]);
  }

  navigateToDeleteFabricUser(userInfo: any) {
    this.router.navigate(["/deleteFabricUser", { "userInfo": JSON.stringify(userInfo) }]);
  }

  openSnackBar(userIdentity: any) {
    this.snackBar.open("Successfuly Deleted " + userIdentity + " from the wallet", "OK");
  }

}
