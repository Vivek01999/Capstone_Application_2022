import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { ModelServiceService } from '../services/model-service.service';

 @Component({
   selector: 'app-mbse-base-model-list',
   templateUrl: './mbse-base-model-list.component.html',
   styleUrls: ['./mbse-base-model-list.component.css']
 })
 export class MbseBaseModelListComponent implements OnInit,OnDestroy {
   org : string = "";
   username: string = "";
   public baseModelListData: any[] = [];
   constructor(private ts : MyTestService, private modelService: ModelServiceService, private router: Router) {
     this.org= ts.getInfo();
     this.username= ts.getUser();
    }

   ngOnInit(): void {
     this.getBaseModelListData();
   }

   getBaseModelListData() {
    this.modelService.getAllBaseModelTemplate()
      .subscribe(
        result => {
          if (result) {
            this.baseModelListData = result;
            console.log("baseModelListData", this.baseModelListData);
          }
        });
  }

  public viewBaseModel (viewObj:any){
      this.modelService.isMBSEBaseModelView = true;
      this.modelService.selectedMBSEBaseListItem = viewObj;
      this.router.navigateByUrl('/MBSEBase')
   }
   ngOnDestroy(): void {
    
   }

 }
