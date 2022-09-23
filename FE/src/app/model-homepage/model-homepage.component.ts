import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';

@Component({
  selector: 'app-model-homepage',
  templateUrl: './model-homepage.component.html',
  styleUrls: ['./model-homepage.component.css']
})
export class ModelHomepageComponent implements OnInit {

  org : string = "";
  username: string = "";
  constructor(private ts : MyTestService) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  ngOnInit(): void {
  }
}
