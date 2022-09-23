import { Component, OnInit } from '@angular/core';
import { MyTestService } from '../my-test.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  org : string = "";
  Role : string = "";
  username: string = "";
  newEmployeeName: string = "";
  NewEmployeeService: any;
  constructor(private ts : MyTestService, NewEmployeeService : NewEmployeeComponent ) { 
    
  }
  ngOnInit(): void {
    this.org= this.ts.getInfo();
    this.username= this.ts.getUser();
  }
  createNewEmployee(){
    
  }
}
