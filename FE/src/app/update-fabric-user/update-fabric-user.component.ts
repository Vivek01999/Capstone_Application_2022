import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { GetAllEmployeesservice } from '../services/GetAllEmployees.sercvice';
import { FabricUserIdentityService } from '../services/fabric-userIdentity.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './update-fabric-user.component.html',
  styleUrls: ['./update-fabric-user.component.css']
})
export class UpdateFabricUserComponent implements OnInit {

  org: string = "";
  userInfo: any = {}
  username: any = "";
  id: any = "";
  type: any = "";
  affiliation: any = "";
  affiliationList = [];
  public EmployeeListData: any[] = [];
  organizations = [];
  departmentList: any = []
  department = ''
  roleList: any = []
  affRole = ''
  orgId = 0;
  selected: string = "";
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private ts: MyTestService, private getallemployeeservice: GetAllEmployeesservice,
    private router: Router, private fabUIDService: FabricUserIdentityService, private readonly orgService: OrganizationService) {
    this.org = ts.getInfo();
    this.username = ts.getUser();
  }
  ngOnInit(): void {
    this.userInfo = this.route.snapshot.paramMap.get("userInfo");
    
    if (!this.userInfo) {
      this.router.navigate(['/fabricUserIDList']);
    }
    this.userInfo = JSON.parse(this.userInfo);
    this.id = this.userInfo.FabricUserIdentity;
    this.type = this.userInfo.FabricRole;
    this.affiliation = this.userInfo.affiliation;
    this.fetchAffiliations(this.org);
  }

  updateFabricDetails() {
    const payload = {
      updateUser: {
        id: this.id,
        type: this.type,
        affiliation: this.department + '.'+ this.affRole
      }
    }
    console.log(payload);
    this.fabUIDService.updateFabUserIdentity(payload).subscribe(result => {
      if (result.status == true) {
        //snackbar
        this.snackBar.open("Successfuly updated details of fabric user " + payload.updateUser.id, "OK");
        this.router.navigate(['/fabricUserIDList']);
      } else {
        this.snackBar.open("Failed to update details of fabric user " + payload.updateUser.id, "OK");
        this.router.navigate(['/fabricUserIDList']);
      }
    })
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
      "orgId": this.org
    }
    this.orgService.getAffiliations(payload).subscribe(res => {
      if (res) {
        this.affiliationList = res.affiliations;
        this.departmentList = Object.keys(this.affiliationList);
        this.department = this.departmentList[0];
        console.log(this.departmentList)
        this.filterRoles(this.departmentList[0])
      }
    }, err => {
      console.log(err);
    });
  }

  filterRoles(dept: any) {
    this.roleList = this.affiliationList[dept];
    this.affRole = this.roleList[0].Role;

  }
}
