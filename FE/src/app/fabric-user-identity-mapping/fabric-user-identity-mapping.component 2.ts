import { Component, OnInit } from '@angular/core';
import { FabricUserIdentityService } from '../services/fabric-userIdentity.service';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fabric-user-identity-mapping',
  templateUrl: './fabric-user-identity-mapping.component.html',
  styleUrls: ['./fabric-user-identity-mapping.component.css']
})
export class FabricUserIdentityMappingComponent implements OnInit {
  fabUserIdentityList: any;
  username: string = '';
  info: string = '';
  fabUserIdentity: any;
  user:any;
  userNamesList: any;
  constructor(private snackBar: MatSnackBar, private fabUIDService: FabricUserIdentityService, private ts: MyTestService,
    private router: Router, private readonly orgService: OrganizationService, private userService: UserService) {
    this.username = ts.getUser();
    this.info = ts.getInfo();
  }

  ngOnInit(): void {
    this.fetchFabriUIDList();
    this.getUserList();
  }

  fetchFabriUIDList() {
    const payload = {
      orgName: this.info
    }
    this.fabUIDService.getFabricUIDListForOrg(payload).subscribe((res: any) => {
      this.fabUserIdentityList = res.fabricUserIdentityList;
      // console.log(this.fabUserIdentityList);
    })
  }
  getUserList(){
    const payload = {
      orgName: this.info
    }
    this.userService.getUserList(payload).subscribe((res: any) => {
      this.userNamesList = res.userList;
    })
  }
  mapUsertoFID(){
    const fabIdInfo = this.fabUserIdentityList.filter((fid: any) =>fid.FabricUserIdentity == this.fabUserIdentity)
    const userInfo = this.userNamesList.filter((user:any)=> user.Username == this.user)
    const payload = {
      UserId: userInfo[0].ID,
      FabricId:fabIdInfo[0].ID 
    }
    this.fabUIDService.mapFUI(payload).subscribe((res: any) => {
      console.log(res)
    })
  }

}
