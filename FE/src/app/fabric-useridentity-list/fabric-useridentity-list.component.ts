import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { FabricUserIdentityService } from '../services/fabric-userIdentity.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employeelist',
  templateUrl: './fabric-useridentity-list.component.html',
  styleUrls: ['./fabric-useridentity-list.component.css']
})
export class FabricUserIdentityListComponent implements OnInit {

  org: string = "";
  username: string = "";
  public userListData: any;
  public EmployeeListData: any[] = [];
  constructor(private snackBar: MatSnackBar, private router: Router, private ts: MyTestService, 
    private getallemployeeservice: GetAllEmployeesservice, private fabUIDService: FabricUserIdentityService) {
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
    this.fabUIDService.getFabUserIdentityList(payload)
      .subscribe(
        result => {
          if (result) {
            this.userListData = result.filter((v: any) => v.OrgId == this.ts.orgId)
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
