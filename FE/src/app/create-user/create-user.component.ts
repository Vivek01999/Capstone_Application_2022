import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  first_name : string = '';
  last_name : string = '';
  name : string = '';
  email_address:string='';
  username : string = '';
  password : string = '';
  selected: string = "NASA";

  constructor() { }

  ngOnInit(): void {
  }
  createuser() {
    this.username = this.username;
    this.password = this.password;
    this.first_name = this.first_name;
    this.last_name = this.last_name;
    this.email_address= this.email_address;
  }
}
