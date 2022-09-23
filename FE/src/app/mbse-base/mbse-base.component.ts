import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MyTestService } from '../my-test.service';
import {AuthenticationService} from '../services/AuthenticationService.service';
import { ModelServiceService } from '../services/model-service.service';
import {formatDate, DatePipe} from '@angular/common';
import { Projectservice } from '../services/project-service.service';
import { Router } from '@angular/router';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-mbse-base',
  templateUrl: './mbse-base.component.html',
  styleUrls: ['./mbse-base.component.css']
})
export class MbseBaseComponent implements OnInit,OnDestroy  {
  //@ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  public projectSelected: any;
  ModelName : string = "";
  ModelDesc : string = "";
  MBMD_Id:string = '';
  docId:any = '';
  ModelPreview:string="";
  fileUpload: any[] = [];
  public projectSelectionOptions: any[] =[];
  tempBlob:any ;
  org : string = "";
  username: string = "";
  filepaths: any[]=[];
  
  constructor(private ts : MyTestService, private authenticationService : AuthenticationService, public modelService: ModelServiceService, private Projectservice:Projectservice, private router:Router) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
    this.getprojectlist();
  }
  ngOnInit(): void {
    //this.getprojectlist();
    console.log(formatDate( new Date(), 'yyyy-MM-dd', 'en'));
    console.log(this.modelService.selectedMBSEBaseListItem, 'model on init')
    if(this.modelService.selectedMBSEBaseListItem){
      this.MBMD_Id = this.modelService.selectedMBSEBaseListItem.MBMD_Id;
      this.ModelName = this.modelService.selectedMBSEBaseListItem.MBMD_Name;
      this.ModelDesc=this.modelService.selectedMBSEBaseListItem.description;
      this.docId=this.modelService.selectedMBSEBaseListItem.DocId;
      this.getDocData(this.docId);
      if(this.modelService.selectedMBSEBaseListItem.Project_Id == null || this.modelService.selectedMBSEBaseListItem.Project_Id == undefined){
        this.projectSelected=2
      }else{
        this.projectSelected=this.modelService.selectedMBSEBaseListItem.Project_Id
      }
    }
  }
  ngOnDestroy(): void {
    
    this.ModelName = "";
    this.ModelDesc = "";
    this.MBMD_Id = '';
    this.fileUpload = [];
    this.filepaths=[];
    this.modelService.isMBSEBaseModelView = false;
    this.modelService.selectedMBSEBaseListItem = {};
    this.docId='';
    this.ModelPreview='';
  }
  onMbseUpload(){
    const formdata = new FormData();
    for (let eachFiles of this.fileUpload) {
      formdata.append('files',eachFiles)
    }

    this.modelService.uploadFile(formdata).subscribe(
      result => {
        console.log(result['filepath']);
       this.filepaths=result['filepath'];
      });
  }
  onMbseSubmit(){
    // debugger;
    let data = {'MBMD_Id': this.projectSelected, 'Project_Id': this.projectSelected,'MMD_Name': this.ModelName, 'description': this.ModelDesc, 'filepaths': this.filepaths, 'Creator': this.username, 'CreatedDate': formatDate( new Date(), 'yyyy-MM-dd', 'en')}
    this.modelService.createBaseModelTemplate(data)
      .subscribe(
        result => {
          if (result['isCreated'] === true) {
            alert("BaseModelTemplate Created");
            this.router.navigateByUrl("modeldashboard");
          }
        });
  }
  getDocData(docId: any){
    console.log("getDocData")
    this.Projectservice.getDocument(docId).subscribe(
      (result) => {
        console.log(result);
        this.filepaths = result;
      });
  }
 
  getprojectlist() {
    console.log("getting projects")
    this.Projectservice.getAllProjects()
        .subscribe(
        result => {
          if (result) {
            this.projectSelectionOptions = result;
            console.log("projectlistdata", result);
           // this.projectSelected = this.projectSelectionOptions[0].ID;
         }
        });
      }

  onfileUpload(event: any){
    if(event.target.files.length > 0){
      this.fileUpload=event.target.files;
    }
  }

}
