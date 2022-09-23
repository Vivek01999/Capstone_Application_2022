import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MyTestService } from "./my-test.service";


@Injectable()
export class Permissions {
    constructor(public ts: MyTestService){

    }
  canActivate(): boolean {
      debugger;
      if(this.ts.user){
          return true
      }else{
          return false;
      }
  }
}
@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(public ts: MyTestService,public router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    
    if(this.ts.user){
        return true
    }else{
        this.router.navigate(['']);
        return false;
    }

   // return this.permissions.canActivate();
  }
}