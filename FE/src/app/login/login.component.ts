import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { AuthenticationService } from '../services/AuthenticationService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  selected: string = "NASA";
  password: string = "";
  role: string = "admin"
  user: any
  constructor(private userService: MyTestService, private authenticationService: AuthenticationService, private router: Router) {

  }

  orgranization = ["UHCL", "NASA", "Tietronix"]; // need to get organizations from Backend

  ngOnInit(): void {
  }


  onLoginSubmit() {
    this.userService.setInfo(this.selected, this.username);
    this.authenticationService.login(this.username, this.password).subscribe(data => {
      this.user = data
      //todo local token
      console.log(this.user)
      if (this.user.RoleName == "User" && this.user.isValid) {
        this.router.navigate(['/home'])
      }
      else if (this.user.RoleName == "Admin" && this.user.isValid) {
        this.router.navigate(['/admindashboard'])
      }
      else if (!this.user.isValid) {
        alert("invalid username or password")
      }
    })


  }



}
