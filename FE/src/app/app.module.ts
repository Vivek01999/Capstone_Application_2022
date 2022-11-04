import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiInterceptor } from '../Interceptor/http-interceptor';
import {AuthenticationService} from './services/AuthenticationService.service';
import { MapEmployeeService } from './services/MapEmployee.service';
import{GetAllEmployeesservice} from './services/GetAllEmployees.sercvice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './CSE-dashboard/admin-dashboard.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ModelHomepageComponent } from './model-homepage/model-homepage.component';
import { MbseBaseComponent } from './mbse-base/mbse-base.component';
import { MbseModelComponent } from './mbse-model/mbse-model.component';
import { MbseModelListComponent } from './mbse-model-list/mbse-model-list.component';
import { MbseModelVarientComponent } from './mbse-model-varient/mbse-model-varient.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { AddemployeeComponent } from './CSE-addemployee/addemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyTestService } from './my-test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MapmodelComponent } from './mapmodel/mapmodel.component';
import { MapProjectComponent } from './map-project/map-project.component';
import { OrgProjectComponent } from './org-project/org-project.component';
import { MbseBaseModelListComponent } from './mbse-base-model-list/mbse-base-model-list.component';
import { MbseVariantModelListComponent } from './mbse-variant-model-list/mbse-variant-model-list.component';
import { ManagerProjectHomeComponent } from './CSE-project-home/CSE-project-home.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerProjectListComponent } from './manager-project-list/manager-project-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FabricUserListComponent } from './fabric-user-list/fabric-user-list.component';
import { UpdateFabricUserComponent } from './update-fabric-user/update-fabric-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DeleteFabricUserComponent } from './delete-fabric-user/delete-fabric-user.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

// import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent, AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    ProjectDashboardComponent,
    UserHomepageComponent,
    ModelHomepageComponent,
    MbseBaseComponent,
    MbseModelComponent,
    MbseModelListComponent,
    MbseModelVarientComponent,
    NewEmployeeComponent,
    NewProjectComponent,
    AddemployeeComponent,
    EmployeelistComponent,
    MapmodelComponent,
    MapProjectComponent,
    OrgProjectComponent,
    MbseBaseModelListComponent,
    MbseVariantModelListComponent,
    ManagerProjectHomeComponent,
    ManagerHomeComponent,
    ManagerProjectListComponent,
    CreateUserComponent,
    FabricUserListComponent,
    UpdateFabricUserComponent,
    ChangePasswordComponent,
    UserlistComponent,
    DeleteFabricUserComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [ MyTestService, AuthenticationService,MapEmployeeService, GetAllEmployeesservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
  return 'http:localhost:3000';
}
export const routingComponents = {AdminDashboardComponent,UserHomepageComponent,ModelHomepageComponent,ManagerProjectHomeComponent}
