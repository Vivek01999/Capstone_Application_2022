import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';
import { ModelServiceService } from '../services/model-service.service';
import {formatDate, DatePipe} from '@angular/common';
import { Projectservice } from '../services/project-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mbse-model',
  templateUrl: './mbse-model.component.html',
  styleUrls: ['./mbse-model.component.css']
})
export class MbseModelComponent implements OnInit,OnDestroy {

  org : string = "";
  username: string = "";
  editMBSE=this.fb.group({})
  public projectSelectionOptions: any[] =[];
  public VariantModelOptions: any[] =[];
  public VariantUpdateModelOptions:any[]=[];
  public projectSelected: any;
  public variantModelSelected: string = "";
  public modelName: string = "";
  public modelDesc: string = "";
  public version: string = "";
  public subVersion: string = "";
  public ProjectId: string = "";
  public MM_Id:string = '';
  public baseModel:string ='';
  docId:any = '';
  ModelPreview:string="";
  tempBlob:any ;
  filepaths: any[]=[];
  fileUpload: any[] = [];
  constructor(private ts : MyTestService, public modelService: ModelServiceService, private Projectservice:Projectservice, private router:Router, private router1:ActivatedRoute, private fb:FormBuilder) { 
    this.org= ts.getInfo();
    this.username= ts.getUser();
    this.getprojectlist();
  }
  ngOnInit(): void {
    this.getTemplateModels();
    //this.getprojectlist();
    //this.updateMBSEModel();
    console.log(this.modelService.selectedMBSEListItem, 'model on init')
    if(this.modelService.selectedMBSEListItem){
      this.MM_Id = this.modelService.selectedMBSEListItem.MM_Id;
      this.modelName = this.modelService.selectedMBSEListItem.MM_Name;
      this.modelDesc= this.modelService.selectedMBSEListItem.description;
      this.version=this.modelService.selectedMBSEListItem.VersionString;
      this.subVersion=this.modelService.selectedMBSEListItem.SubVersionString;
      this.variantModelSelected=this.modelService.selectedMBSEListItem.MVMD_Id;
      //this.baseModel=this.modelService.selectedMBSEBaseListItem.MBMD_Id;
      this.docId=this.modelService.selectedMBSEListItem.DocId;
      this.getDocData(this.docId);
      if(this.modelService.selectedMBSEListItem.Project_Id == null || this.modelService.selectedMBSEListItem.Project_Id == undefined){
        this.projectSelected=2
      }else{
        this.projectSelected=this.modelService.selectedMBSEListItem.Project_Id
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
    let data;

    if(this.MM_Id){
      data = {'MM_Id': this.MM_Id, 'MVMD_Id': this.variantModelSelected, 'Project_Id': this.projectSelected,'Model_Name': this.modelName, 'VersionString': this.version, 'SubVersionString': this.subVersion, 'filepaths': this.filepaths, 'Creator': this.username, 'CreatedDate': formatDate( new Date(), 'yyyy-MM-dd', 'en')}
      this.modelService.updateMBSEModel(data)
      .subscribe(
        result => {
          if (result['isCreated'] === true) {
            alert("MBSEModelTemplate Created");
          }
        });
    }else{
      data = {'MVMD_Id': this.variantModelSelected, 'Project_Id': this.projectSelected, 'description':this.modelDesc, 'Model_Name': this.modelName, 'VersionString': this.version, 'SubVersionString': this.subVersion, 'filepaths': this.filepaths, 'Creator': this.username, 'CreatedDate': formatDate( new Date(), 'yyyy-MM-dd', 'en')}
      this.modelService.createMBSEModel(data)
      .subscribe(
        result => {
          if (result['isCreated'] === true) {
            alert("MBSEModelTemplate Created");
            this.router.navigateByUrl("modeldashboard");
          }
        });
    }
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
    this.modelService.getTemplateModels({'model': 'mbse'})
      .subscribe(
        result => {
          this.VariantModelOptions = result;
        });
  }

  // updateMBSEModel(){
  //   this.modelService.updateMBSEModel({})
  //     .subscribe(
  //       result =>{
  //         this.VariantUpdateModelOptions=result;
  //       }
  //     )
  // }

  ngOnDestroy(): void {
    this.modelService.selectedMBSEListItem = false;
    this.modelService.isMBSEModelView=false;
      this.MM_Id ='';
      this.modelName = '';
      this.modelDesc= '';
      this.version='';
      this.subVersion='';
      this.variantModelSelected='';
      this.filepaths=[];
      this.docId='';
      this.ModelPreview='';
      //this.baseModel=this.modelService.selectedMBSEBaseListItem.MBMD_Id;

    }
 
}
