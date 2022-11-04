import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimationDurations } from '@angular/material/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  username: string = '';
  selected: string = "NASA";
  response: string = '';
  role: string = '';
  affiliation: string = '';
  userIdentity: string = '';
  public EmployeeListData: any[] = [];
  constructor(private snackBar: MatSnackBar,private registerService: RegisterService, private ts: MyTestService, private router: Router){
    this.username = ts.getUser();
  }

  ngOnInit(): void {

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
}
