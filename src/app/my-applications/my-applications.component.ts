import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MyApplicationsService } from '../services/my-applications.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface DialogData {
 
}
@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit{
  // public showParent:boolean =true;
  public isLoading:boolean=true;
  repeatArray = Array(8).fill(0);
  constructor(private appService:MyApplicationsService, public dialog: MatDialog, public router:Router,public route:ActivatedRoute){

  }
  appCards:any=[];
  
  ngOnInit(): void {
    this.appService.getAppCards().subscribe({
      next:(res:any)=>{
        console.log(res);
        setTimeout(()=>{
             this.isLoading=false;
        },3000)
        
        this.appCards=res.appCards;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.showParent = this.router.url === '/myApplications';
    //   }
    // });
    // this.showParent = this.router.url === '/myApplications';
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
  getIcon(result:any){
    if(result=='Application Incomplete'){
      return 'lock_open';
    }else if(result=='Booked'){
     return 'lock';
    }else if(result=='Pending Appointment'){
      return 'lock_open';
     }else if(result=='Expired'){
      return 'lock';
     }else if(result=='Cancelled'){
      return 'lock';
     }
    else {
      return ''
    }
  }
  viewAcc(result:any){
    if(result=='Application Incomplete'){
      return false;
    }else if(result=='Booked'){
     return true;
    }else if(result=='Pending Appointment'){
      return false;
     }else if(result=='Expired'){
      return true;
     }else if(result=='Cancelled'){
      return false;
     }
    else {
      return false
    }
  }
 

  // @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       if (this.router.url === '/myApplications') {
  //         this.showParent = true;
  //       }
  //     }
  //   });

  // }
}
// dialouge


// @Component({
//   selector: 'TermsAndconditionsDialog',
//   templateUrl: 'terms-conditions-dialog.html',
//   styleUrls:['terms-conditions-dialog.css']
// })
// export class TermsAndconditionsDialog {}
