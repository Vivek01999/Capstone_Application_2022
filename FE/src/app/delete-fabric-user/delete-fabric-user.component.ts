import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { FabricUserIdentityService } from '../services/fabric-userIdentity.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-fabric-user',
  templateUrl: './delete-fabric-user.component.html',
  styleUrls: ['./delete-fabric-user.component.css']
})
export class DeleteFabricUserComponent implements OnInit {
  org: string = "";
  userIdentity: string = "";
  reason: string = "";
  username: string = ""
  userInfo: any;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private fabUIDService: FabricUserIdentityService, private ts: MyTestService, private router: Router) {
    this.username = ts.getUser();
    this.org = ts.getInfo();
  }

  ngOnInit(): void {
    this.userInfo = this.route.snapshot.paramMap.get("userInfo");
    if (!this.userInfo) {
      this.router.navigate(['/fabricUserIDList']);
    }
    this.userInfo = JSON.parse(this.userInfo);
    this.userIdentity = this.userInfo.id;
  }

  deleteFabricUser() {
    const payload = {
      "deleteUser": {
        "userIdentity": this.userIdentity,
        "reason": this.reason
      }
    }
    this.fabUIDService.deleteFabUserIdentity(payload).subscribe(
      result => {
        if (result.status == true) {
          //snackbar
          this.snackBar.open("Successfuly deleted " + this.userIdentity, "OK");
          this.router.navigate(['/fabricUserIDList']);
        } else {
          this.snackBar.open("Failed to delete user " + this.userIdentity, "OK");
          this.router.navigate(['/fabricUserIDList']);
        }
      })
  }

}
