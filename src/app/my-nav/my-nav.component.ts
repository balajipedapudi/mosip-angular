import { Component, Inject, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

export interface DialogData {
 
}
// export const userResolver: ResolveFn<boolean> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//         inject(UserService).getUserData().subscribe((userData: any) => {
//             console.log(' resolve user data');

//             sessionStorage.setItem('userData', userData.id);
//             sessionStorage.setItem('userName',userData.firstName+" "+userData.lastName);
//             sessionStorage.setItem('userRole', userData.roleOfUser.roleGroup);
//             sessionStorage.setItem('profilePic',userData.profilePicture)
//         });
        
//        return true;
    
// };


@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],

})
export class MyNavComponent implements OnInit {
  public isShow=false;
constructor(private router:Router,public dialog: MatDialog,){

  if(localStorage.getItem('token')){
  this.isShow=true;
 }else{
  this.isShow=false
 }
}
  ngOnInit(): void {
  
  }
  
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
   logout(){
     localStorage.removeItem('token');
    
    this.isShow=false
    this.router.navigate(['/login'])
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TermsAndconditionsDialog, {
      data: {
        // show:this.showParent
      },
      width:'620px',
      height:'350px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      if(result==true){
        this.router.navigate(['createApplication'])
        // this.showParent=false;
      }else{
        this.router.navigate(['myApplications']) 
      }
      
      console.log('The dialog was closed');
     
    });
  }
}

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