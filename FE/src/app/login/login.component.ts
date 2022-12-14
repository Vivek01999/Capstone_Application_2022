import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { AuthenticationService } from '../services/AuthenticationService.service';
import { OrganizationService } from '../services/organization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  selected: any;
  password: string = "";
  role: string = "admin"
  user: any
  constructor(private userService: MyTestService, private authenticationService: AuthenticationService,
    private router: Router, private orgService: OrganizationService) {

  }

  organizations = [];

  ngOnInit(): void {
    this.fetchOrganizationList();
  }


  onLoginSubmit() {
    let selectedOrganization: any;
    if (this.username == "admin") {
      this.selected = "DEFAULT"
      selectedOrganization = { OrgId: 0 }

    } else {

      selectedOrganization = this.organizations.find((org: any) => org.OrgName == this.selected)
    }
    this.userService.setInfo(this.selected, this.username);
    this.userService.orgId = selectedOrganization.OrgId
    const payload = {
      Username: this.username,
      Password: this.password,
      organizationId: selectedOrganization.OrgId
    }
    this.authenticationService.login(payload).subscribe(data => {
      this.user = data
      //todo local token
      console.log(this.user)
      if (this.user.RoleName == "User" && this.user.isValid) {
        this.router.navigate(['/userdashboard'])
      }
      else if (this.user.RoleName == "Admin" && this.user.isValid) {
        this.router.navigate(['/adminHome'])
      }
      else if (!this.user.isValid) {
        alert("invalid username or password")
      }
    })
  }

  fetchOrganizationList() {
    this.orgService.getOrganizationList().subscribe(res => {
      if (res) {
        this.organizations = res;
        const firstValue: any = this.organizations[0];
        this.selected = firstValue.OrgName;
        console.log(this.organizations)
      }
    }, err => {
      console.log(err);
    });
  }
}