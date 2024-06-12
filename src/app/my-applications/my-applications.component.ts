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
  public showParent:boolean =true;
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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showParent = this.router.url === '/myApplications';
      }
    });
    this.showParent = this.router.url === '/myApplications';
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
  openDialog(): void {
    const dialogRef = this.dialog.open(TermsAndconditionsDialog, {
      data: {
        show:this.showParent
      },
      width:'620px',
      height:'350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result==true){
        this.router.navigate(['createApplication'], {relativeTo: this.route})
        this.showParent=false;
      }
      
      console.log('The dialog was closed');
     
    });
  }

  @HostListener('document:click', ['$event']) toggelOpen(event: Event) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/myApplications') {
          this.showParent = true;
        }
      }
    });

  }
}
// dialouge


// @Component({
//   selector: 'TermsAndconditionsDialog',
//   templateUrl: 'terms-conditions-dialog.html',
//   styleUrls:['terms-conditions-dialog.css']
// })
// export class TermsAndconditionsDialog {}
@Component({
  selector: 'TermsAndconditionsDialog',
  templateUrl: 'terms-conditions-dialog.html',
  styleUrls:['terms-conditions-dialog.css']
})
export class TermsAndconditionsDialog {
  checkedValue:any=true;
  constructor(
    public dialogRef: MatDialogRef<TermsAndconditionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder:FormBuilder
  ) {}

  onNoClick(): void {
    console.log(this.data);
    console.log(this.checkedValue);
    
    this.dialogRef.close(!this.checkedValue);
    
  }
  
  checkbox = this.formBuilder.group({
    terms_con_check:false
  });
  setValue(val:any){
    console.log(val);
    
    this.checkedValue=!val;
  }
}