import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor( private formBuilder: FormBuilder){

}

  loginDetails=this.formBuilder.group({
    username:[null]
    })
}
