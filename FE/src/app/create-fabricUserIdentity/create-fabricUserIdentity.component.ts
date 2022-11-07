import { Component, OnInit } from '@angular/core';
import { FabricUserIdentityService } from '../services/fabric-userIdentity.service';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-create-fabric-user-identity',
  templateUrl: './create-fabricUserIdentity.component.html',
  styleUrls: ['./create-fabricUserIdentity.component.css']
})
export class CreateFabricUserIdentityComponent implements OnInit {

  username: string = '';
  selected: string = "";
  response: string = '';
  role: string = '';
  affiliation: string = '';
  affiliationList = [];
  userIdentity: string = '';
  organizations = [];
  info: string = '';
  orgId = 0;
  constructor(private snackBar: MatSnackBar, private fabUIDService: FabricUserIdentityService, private ts: MyTestService,
    private router: Router, private readonly orgService: OrganizationService) {
    this.username = ts.getUser();
    this.info = ts.getInfo();
  }

  ngOnInit(): void {
    this.fetchOrganizationList();
  }

  createuser() {
    const payload = {
      "registerUser": {
        "userIdentity": this.userIdentity,
        "role": this.role,
        "affiliation": this.affiliation,
        "organization": this.info
      }
    }
    this.fabUIDService.registerFabUserIdentity(payload).subscribe(res => {
      if (res) {
        console.log("Successfully registered");
        this.response = res.status;
        this.snackBar.open("Successfuly registered and enrolled " + this.userIdentity, "OK");
        this.router.navigate(['/fabricUserIDList']);
      }
    }, err => {
      console.log(err);
      this.snackBar.open("Unable to register user " + this.userIdentity, "OK");
    });

  }

  fetchOrganizationList() {
    this.orgService.getOrganizationList().subscribe(res => {
      if (res) {
        if (this.ts.user == 'admin') {
          this.organizations = res;
        } else {
          this.organizations = res.filter((org: any) => org.OrgName == this.ts.info);
        }
        const firstValue: any = this.organizations[0];
        this.selected = firstValue.OrgName;
        this.orgId = firstValue.OrgId;
        this.fetchAffiliations(this.selected);
      }
    }, err => {
      console.log(err);
    });
  }

  fetchAffiliations(event: any) {
    const payload = {
      "orgName": event,
      "orgId": 1
    }
    this.orgService.getAffiliations(payload).subscribe(res => {
      if (res) {
        this.affiliationList = res.affiliations;
      }
    }, err => {
      console.log(err);
    });
  }

}
