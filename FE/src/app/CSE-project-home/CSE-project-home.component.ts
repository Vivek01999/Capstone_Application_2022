import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';

@Component({
  selector: 'app-manager-project-home',
  templateUrl: './CSE-project-home.component.html',
  styleUrls: ['./CSE-project-home.component.css']
})
export class ManagerProjectHomeComponent implements OnInit {
  org : string = "";
  username: string = "";
  constructor(private ts : MyTestService) {
    this.org= ts.getInfo();
    this.username= ts.getUser();
   }

  ngOnInit(): void {
  }

}
