import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from '../services/organization.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  username: string = '';
  selected: any;
  response: string = '';
  employeeRole: number = 1;
  name: string = '';
  password: string = '';
  currentUser: string = '';
  orgranizations = [];
  orgId: number = 0;
  constructor(private snackBar: MatSnackBar, private registerService: RegisterService,
    private ts: MyTestService, private router: Router, private readonly orgService: OrganizationService) {
    this.currentUser = ts.getUser();
  }

  ngOnInit(): void {
    this.fetchOrganizationList();
  }
  createuser() {
    const payload = {
      "registerUser": {
        "name":this.name,
        "username": this.username,
        "password": this.password,
        "role": this.employeeRole,
        "date": new Date().toISOString(),
        "created_by": this.currentUser,
        "orgId": this.orgId
      }
    }
    // this.registerService.registerUser(payload).subscribe(res => {
    //   if (res) {
    //     console.log("Successfully registered");
    //     this.response = res.status;
    //     this.snackBar.open("Successfuly registered local user" + this.username, "OK");
    //     this.router.navigate(['/employeelist']);
    //   }
    // }, err => {
    //   console.log(err);
    //   this.snackBar.open("Unable to register user " + this.username, "OK");
    // });

  }

  fetchOrganizationList() {
    this.orgService.getOrganizationList().subscribe(res => {
      if (res) {
        if (this.ts.user == 'admin') {
          this.orgranizations = res;
        } else {
          this.orgranizations = res.filter((org: any) => org.OrgName == this.ts.info);
        }
        const firstValue: any = this.orgranizations[0];
        this.selected = firstValue.OrgName;
        this.orgId = firstValue.OrgId;
      }
    }, err => {
      console.log(err);
    });
  }
}
