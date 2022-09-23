import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './app-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }
  title = 'FE';
  response ='';
  baseUrl = ""
  ApiCall(){

    // this.dataService.getData(`http://localhost:3000/blockchain/user`).subscribe((data: any) =>{
    //   console.log(data);
    //   this.response = data;
    // }

    // )
  }
}
