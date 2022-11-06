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
  selected: string = "NASA";
  response: string = '';
  employeeRole: string = '';
  affiliation: string = '';
  userIdentity: string = '';
  name: string = '';
  password: string = '';
  organization: string = '';
  currentUser: string = '';
  public EmployeeListData: any[] = [];
  date: Date = new Date();
  date1: any = '';
  constructor(private snackBar: MatSnackBar, private registerService: RegisterService,
    private ts: MyTestService, private router: Router, private readonly orgService: OrganizationService) {
    this.currentUser = ts.getUser();
    this.date1 = this.date.toISOString().split('T')[0];
  }

  ngOnInit(): void {
  }
  createuser() {
    const payload = {
      "registerUser": {
        "userIdentity": this.userIdentity,
        "role": this.employeeRole,
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
    });

  }

  fetchOrganizationList() {
    this.orgService.getOrganizationList().subscribe(res => {
      if (res) {
      }
    }, err => {
      console.log(err);
      this.snackBar.open("Unable to Fetch Organization List ", "OK");
    });
  }
}
