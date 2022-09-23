import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
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
