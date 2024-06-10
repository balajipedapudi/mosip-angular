import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { Router } from '@angular/router';
import { MyNavComponent } from '../my-nav/my-nav.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public showOtp: boolean = false;
  public showResendBtn:boolean=false;
  public showSendBtn:boolean=true;
  public timer: number = 0;
  private interval: any;
  constructor(private formBuilder: FormBuilder, private router:Router, private comp:MyNavComponent, private toastr:ToastrService) { }

  mobileOrEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: true };
      }
  
      const mobileRegex = /^[0-9]{10}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      const isMobileValid = mobileRegex.test(value);
      const isEmailValid = emailRegex.test(value);
  
      if (!isMobileValid && !isEmailValid) {
        return { invalidMobileOrEmail: true };
      }
  
      return null;
    };
  }

  loginDetails = this.formBuilder.group({
    mobileNum_email: [null, [Validators.required, this.mobileOrEmailValidator()]]
  });
  otpDetails = this.formBuilder.group({
    otp: [null,[Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  sendOtp() {
    
    if (this.loginDetails.valid) {
     
      fetch("http://localhost:3000/otp")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.showSendBtn=false;
          this.showResendBtn=false;
          this.showOtp = true;
          this.startTimer(60);
        })
    } else {
      this.toastr.error('Please Enter Valid Credentials');
    }
  }

  validateOtp() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    localStorage.setItem('token','1234')
    console.log(this.otpDetails.value.otp);
    this.comp.isShow=true;
    this.router.navigate(['myApplications'])
    
  }
  onOtpChange(otp: any) {
    this.otpDetails.controls['otp'].setValue(otp);
    // Manually trigger validation
    this.otpDetails.controls['otp'].updateValueAndValidity();
  }

  startTimer(seconds: number) {
    
    this.timer = seconds;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.interval);
         this.showResendBtn=true;
        this.showOtp=false;
        this.toastr.info('Please Resend OTP');
      }
    }, 1000);
  }

  get minutes(): number {
    return Math.floor(this.timer / 60);
  }

  get seconds(): number {
    return this.timer % 60;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}


