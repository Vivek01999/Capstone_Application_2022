import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { ModelServiceService } from '../services/model-service.service';
import {formatDate, DatePipe} from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Projectservice } from '../services/project-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mbse-model-varient',
  templateUrl: './mbse-model-varient.component.html',
  styleUrls: ['./mbse-model-varient.component.css']
})
export class MbseModelVarientComponent implements OnInit,OnDestroy {

  org : string = "";
  username: string = "";
  varientForm=this.fb.group;
  public projectSelectionOptions: any[] =[];
  public baseModelOptions: any[] =[];
  public projectSelected: any;
  public baseModel: string = "";
  public modelName: any;
  public modelDescription: any;
  public verison: any;
  public subVersion: any;
  docId:any = '';
  tempBlob:any ;
  MVMD_Id:string = '';
  MBMD_Id:string='';
  filepaths: any[]=[];
  ModelPreview:string="";
  fileUpload: any[] = [];

  constructor(private ts : MyTestService, public modelService: ModelServiceService, private fb:FormBuilder, private Projectservice:Projectservice, private router:Router) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
    this.getprojectlist();
  }
  ngOnInit(): void {
    this.getTemplateModels();
    //this.getprojectlist();
    console.log(this.modelService.selectedMBSEVarientListItem, 'model on init')
    if(this.modelService.selectedMBSEVarientListItem){
      this.MVMD_Id = this.modelService.selectedMBSEVarientListItem.MVMD_Id;
      this.modelName=this.modelService.selectedMBSEVarientListItem.MVMD_Name;
      this.modelDescription=this.modelService.selectedMBSEVarientListItem.description;
      this.docId=this.modelService.selectedMBSEVarientListItem.DocId;
      this.baseModel=this.modelService.selectedMBSEBaseListItem.MBMD_Id;
      this.getDocData(this.docId);
      if(this.modelService.selectedMBSEVarientListItem.Project_Id == null || this.modelService.selectedMBSEVarientListItem.Project_Id == undefined){
        this.projectSelected=2
      }else{
        this.projectSelected=this.modelService.selectedMBSEVarientListItem.Project_Id
      }
    }
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


  onSubmit() {
    debugger;
    let data = {'MBMD_Id': this.baseModel, 'MVMD_Name': this.modelName,'Project_Id':this.projectSelected,  'description': this.modelDescription, 'filepaths': this.filepaths, 'Creator': this.username, 'CreatedDate': formatDate( new Date(), 'yyyy-MM-dd', 'en')}
    this.modelService.createVariantModelTemplate(data)
      .subscribe(
        result => {
          if (result['isCreated'] === true) {
            alert("VariantModelTemplate Created");
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
            //this.projectSelected = this.projectSelectionOptions[0].ID;
         }
        });
      }
      
      onfileUpload(event: any){
        if(event.target.files.length > 0){
          this.fileUpload=event.target.files;
        }
      }

  getTemplateModels() {
    this.modelService.getTemplateModels({'model': 'variant'})
      .subscribe(
        result => {
          this.baseModelOptions = result;
        });
  }
  ngOnDestroy(): void {
    
      this.modelService.selectedMBSEVarientListItem = false;
      this.modelService.isMBSEVarientModelView = false;
      this.MVMD_Id = "";
      this.modelName="";
      this.modelDescription="";
      this.fileUpload =[];
      this.filepaths=[];
      this.baseModel='';
      this.modelService.selectedMBSEBaseListItem = {};
      this.docId='';
      this.ModelPreview='';
  }
}
