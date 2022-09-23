import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { Router } from '@angular/router';
import { ModelServiceService } from '../services/model-service.service';
 @Component({
   selector: 'app-mbse-variant-model-list',
   templateUrl: './mbse-variant-model-list.component.html',
   styleUrls: ['./mbse-variant-model-list.component.css']
 })
 export class MbseVariantModelListComponent implements OnInit {
   org : string = "";
   username: string = "";
   public variantModelListData: any[] = [];
   constructor(private ts : MyTestService, private modelService: ModelServiceService,  private router: Router) { 
     this.org= ts.getInfo();
     this.username= ts.getUser();
   }

   ngOnInit(): void {
     this.getVariantModelListData();
   }

   getVariantModelListData() {
    this.modelService.getAllVariantModelTemplate()
      .subscribe(
        result => {
          if (result) {
            this.variantModelListData = result;
            console.log("variantModelListData", this.variantModelListData);
          }
        });
  }

  public viewVarientModel (viewObj:any){
    this.modelService.isMBSEVarientModelView = true;
    this.modelService.selectedMBSEVarientListItem = viewObj;
    this.modelService.selectedMBSEBaseListItem = viewObj
    this.router.navigateByUrl('/MBSEVarient')
    console.log('============================')
   }
 }
