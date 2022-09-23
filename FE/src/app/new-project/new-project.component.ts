import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { Projectservice } from '../services/project-service.service';
import {formatDate, DatePipe} from '@angular/common';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  org : string = "";
  username: string = "";
  public projectSelected: any;
  public projectName: any;
  public projectdesc: any;

  constructor(private ts : MyTestService, private projectservice: Projectservice, private router: Router ) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  
  ngOnInit(): void {
    console.log(formatDate( new Date(), 'yyyy-MM-dd', 'en'));
  }

  onSubmit() {
   let data ={'ID': this.projectSelected, 'Name': this.projectName, 'Desc': this.projectdesc, 'CreateDate': formatDate( new Date(), 'yyyy-MM-dd', 'en'), 'Creator': this.username}
    this.projectservice.createProject(data)
      .subscribe(
        result => {
          if (result['isCreated'] === true) {
            alert("project Created");
            this.router.navigateByUrl("/projectdashboard")
          }
        });
}
}
