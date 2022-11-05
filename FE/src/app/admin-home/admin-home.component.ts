import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  menu: string ="GK";
  org : string = "";
  username: string = "";
  constructor(private ts : MyTestService) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }

  ngOnInit(): void {
  }

}
