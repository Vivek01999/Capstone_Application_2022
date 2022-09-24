import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AdminDashboardComponent } from './CSE-dashboard/admin-dashboard.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ModelHomepageComponent } from './model-homepage/model-homepage.component';
import { LoginComponent } from './login/login.component';
import { MbseBaseComponent } from './mbse-base/mbse-base.component';
import { MbseModelVarientComponent } from './mbse-model-varient/mbse-model-varient.component';
import { MbseModelComponent } from './mbse-model/mbse-model.component';
import { MbseModelListComponent } from './mbse-model-list/mbse-model-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { AddemployeeComponent } from './CSE-addemployee/addemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { MapmodelComponent } from './mapmodel/mapmodel.component';
import { MapProjectComponent } from './map-project/map-project.component';
import { OrgProjectComponent } from './org-project/org-project.component';
import { CommonModule } from '@angular/common';
import { MbseBaseModelListComponent } from './mbse-base-model-list/mbse-base-model-list.component';
import { MbseVariantModelListComponent } from './mbse-variant-model-list/mbse-variant-model-list.component';
import { ManagerProjectHomeComponent } from './CSE-project-home/CSE-project-home.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerProjectListComponent } from './manager-project-list/manager-project-list.component';
import { CanActivateTeam } from './canactivate';
import { CreateUserComponent } from './create-user/create-user.component'
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [CanActivateTeam] },
  { path: 'projectdashboard', component: ProjectDashboardComponent, canActivate: [CanActivateTeam] },
  { path: 'userdashboard', component: UserHomepageComponent, canActivate: [CanActivateTeam] },
  { path: 'modeldashboard', component: ModelHomepageComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEBase', component: MbseBaseComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEVarient', component: MbseModelVarientComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEModel', component: MbseModelComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEBaseModelList', component: MbseBaseModelListComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEVariantModelList', component: MbseVariantModelListComponent, canActivate: [CanActivateTeam] },
  { path: 'MBSEModelList', component: MbseModelListComponent, canActivate: [CanActivateTeam] },
  { path: 'MapModel', component: MapmodelComponent, canActivate: [CanActivateTeam] },
  { path: 'newproject', component: NewProjectComponent, canActivate: [CanActivateTeam] },
  { path: 'addemployee', component: AddemployeeComponent, canActivate: [CanActivateTeam] },
  { path: 'mapproject', component: MapProjectComponent, canActivate: [CanActivateTeam] },
  { path: 'orgproject', component: OrgProjectComponent, canActivate: [CanActivateTeam] },
  { path: 'newemployee', component: NewEmployeeComponent, canActivate: [CanActivateTeam] },
  { path: 'employeelist', component: EmployeelistComponent, canActivate: [CanActivateTeam] },
  { path: 'CSEProjectHome', component: ManagerProjectHomeComponent, canActivate: [CanActivateTeam] },
  { path: 'ManagerHome', component: ManagerHomeComponent, canActivate: [CanActivateTeam] },
  { path: 'ManagerProjectList', component: ManagerProjectListComponent, canActivate: [CanActivateTeam] },
  { path: 'create-user', component: CreateUserComponent }

];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanActivateTeam
  ]
})
export class AppRoutingModule { }
