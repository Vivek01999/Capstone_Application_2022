import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTestService } from '../my-test.service';
import { ModelServiceService } from '../services/model-service.service';

@Component({
  selector: 'app-mbse-model-list',
  templateUrl: './mbse-model-list.component.html',
  styleUrls: ['./mbse-model-list.component.css']
})
export class MbseModelListComponent implements OnInit {

  org : string = "";
  username: string = "";
  public mbseModelListData: any[] = [];
  constructor(
    private ts : MyTestService, 
    private modelService: ModelServiceService,
    private router: Router) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
  }
  ngOnInit(): void {
    this.getMBSEModelListData();
  }

  getMBSEModelListData() {
    this.modelService.getAllMBSEModel()
      .subscribe(
        result => {
          if (result) {
            this.mbseModelListData = result;
          }
        });
  }

 public viewModel (viewObj:any){
    this.modelService.isMBSEModelView = true;
    this.modelService.selectedMBSEListItem = viewObj;
    this.router.navigateByUrl('/MBSEModel')
    console.log('============================')
 }

 public editModel (viewObj:any){
    this.modelService.isMBSEModelView = false;
    this.modelService.selectedMBSEListItem = viewObj;
    this.modelService.selectedMBSEVarientListItem=viewObj;
    this.router.navigateByUrl('/MBSEModel')
    console.log('============================')
}

}
