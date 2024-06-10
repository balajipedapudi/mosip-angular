import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'',redirectTo:'/myApplications', pathMatch:'full'},
  {path:'myApplications', component:MyApplicationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
