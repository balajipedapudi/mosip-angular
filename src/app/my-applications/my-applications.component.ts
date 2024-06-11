import { Component, OnInit } from '@angular/core';
import { MyApplicationsService } from '../services/my-applications.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit{
  
  constructor(private appService:MyApplicationsService){

  }
  appCards:any=[];
  
  ngOnInit(): void {
    this.appService.getAppCards().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.appCards=res.appCards;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getStatusClass(result:any){
    
if(result=='Application Incomplete'){
  return 'appIncomplete';
}else if(result=='Booked'){
 return 'booked';
}else if(result=='Pending Appointment'){
  return 'pending';
 }else if(result=='Expired'){
  return 'expired';
 }else if(result=='Cancelled'){
  return 'cancelled';
 }
else {
  return ''
}
  }
  getFooterBgClass(result:any){
    console.log(result);
    
    if(result=='Application Incomplete'){
      return 'appIncompleteFooter';
    }else if(result=='Booked'){
     return 'bookedFooter';
    }else if(result=='Pending Appointment'){
      return 'pendingFooter';
     }else if(result=='Expired'){
      return 'expiredFooter';
     }else if(result=='Cancelled'){
      return 'cancelledFooter';
     }
    else {
      return ''
    }
  }
}
