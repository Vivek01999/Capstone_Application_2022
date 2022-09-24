import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  first_name: string = '';
  last_name: string = '';
  name: string = '';
  email_address: string = '';
  username: string = '';
  password: string = '';
  selected: string = "NASA";

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }
  createuser() {
    const payload = {
      "username": this.username,
      "password": this.password,
      "firstName": this.first_name,
      "lastName": this.last_name,
      "email": this.email_address,
      "orgType": this.selected
    }
    this.registerService.registerUser(payload).subscribe(res => {
      if (res) {
        console.log("Successfully registerred");
      }
    }, err => {
      console.log(err);
    });

  }
}
