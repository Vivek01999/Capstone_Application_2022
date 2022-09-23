import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';

@Component({
  selector: 'app-org-project',
  templateUrl: './org-project.component.html',
  styleUrls: ['./org-project.component.css']
})
export class OrgProjectComponent implements OnInit {

  org : string = "";
  username: string = "";
  constructor(private ts : MyTestService) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }

  ngOnInit(): void {
  }

}
