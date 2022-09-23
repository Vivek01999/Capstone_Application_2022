import { Component, OnInit, OnDestroy } from '@angular/core';
//import { resourceLimits } from 'worker_threads';
import { MyTestService } from '../my-test.service';
import { Projectservice } from '../services/project-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-map-project',
  templateUrl: './map-project.component.html',
  styleUrls: ['./map-project.component.css']
})
export class MapProjectComponent implements OnInit,OnDestroy{
  org : string = "";
  username: string = "";
  projname: string = "";
  addorg: string = "";
  public projectSelectionOptions: any []= [];
  public orgSelectionOptions: any []=[];
  public projectSelected: any;
  public orgSelected: any;
  public ProjectId: string = "";
  public OrgID: string = "";
  constructor(private ts : MyTestService, public ps:Projectservice , private router: Router,private router1:ActivatedRoute, private fb:FormBuilder ) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
    this.getprojectlist();
    this.getorgslist();
  }
  ngOnInit(): void {
   this.getprojectlist()
   this.getorgslist()
   console.log(this.ps.selectedProject, 'project on init')
    if(this.ps.selectedProject){
      this.ProjectId = this.ps.selectedProject.ProjectId;
      this.OrgID = this.ps.selectedProject.OrgID;
    }
  }
  getprojectlist() {
    console.log("getting projects")
    this.ps.getAllProjects()
        .subscribe(
        result => {
          if (result) {
            this.projectSelectionOptions = result;
            console.log("projectlistdata", result);
            this.projectSelected = this.projectSelectionOptions[0].ID;
         }
        });
      }
  getorgslist() {
    console.log("getting Organisations")
    this.ps.getAllOrgs()
       .subscribe(
        result => {
          if (result) {
            this.orgSelectionOptions = result;
            console.log("orglistdata", result);
            this.orgSelected = this.orgSelectionOptions[0].OrgId;
         }
       });
     }
        
    onSubmit() {
      console.log("entered on submit function")
      let data = {'ProjectId': this.projectSelected, 'OrgID': this.orgSelected}
      console.log("going to enter service")
      this.ps.updateProjectToModel(data)
          .subscribe(
           result => {
             if (result['isCreated'] === true) {
               alert("project and organisation mapped");
               this.router.navigateByUrl("/projectdashboard")
         }
      });  
    }

    ngOnDestroy(): void {
      this.ps.selectedProject = false;
      this.ps.isProjectView=false;
        this.ProjectId ='';
        this.OrgID = '';
  
      }
  }
