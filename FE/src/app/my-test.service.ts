import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyTestService {

  info: string = "";
  user: string = "";
  orgId: number= 0;
  constructor() { }
  setproj(x:string,y:string)
  {
    this.info = x;
    this.user = y;
    console.log("Setting project"+this.info);
  }
  setAddorg(m:string,n:string)
  {
    this.info = m;
    this.user = n;
    console.log("Setting AddOrg"+this.info);
  }
  getAll(){
    console.log("Getting all project lists"+this.info);
    return this.info;
  }

  setInfo(i:string,u:string)
  {
    this.info = i;
    this.user = u;
    console.log("Setting organization"+this.info);
  }

  getInfo() {
    console.log("sending organization"+this.info);
    return this.info;
  }

  getUser(){
    console.log("sending User "+this.user);
    return this.user;
  }
}
