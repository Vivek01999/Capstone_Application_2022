import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { Projectservice } from '../services/project-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-project-list',
  templateUrl: './manager-project-list.component.html',
  styleUrls: ['./manager-project-list.component.css']
})
export class ManagerProjectListComponent implements OnInit {
  menu: string ="GK";
  org : string = "";
  username: string = "";
  public projectlist: any []= [];
  //public orglist: any []= [];
  
  constructor(private ts : MyTestService, private ps: Projectservice, private router: Router) {
    this.org= ts.getInfo();
    this.username= ts.getUser()
    this.getcompleteprojectListData();
   }

   ngOnInit(): void {
    this.getcompleteprojectListData();
   }
   getcompleteprojectListData() {
     console.log("getting projects")
     this.ps.getAllProjectsList()
         .subscribe(
         result => {
           if (result) {
             this.projectlist = result;
             //this.orglist = result;
             console.log("projectlistdata", this.projectlist);
             //console.log("organisation name", this.orglist)
          }
         });
       }

       public viewProject(viewObj:any){
        this.ps.isProjectView = true;
        this.ps.selectedProject = viewObj;
        
        this.router.navigateByUrl('/mapproject')
        console.log('============================')
     }
    }