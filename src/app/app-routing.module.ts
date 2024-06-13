import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { CreateApplicationComponent } from './create-application/create-application.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'myApplications', component:MyApplicationsComponent, children:[
    
  ]},
  {path:'createApplication', component:CreateApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
