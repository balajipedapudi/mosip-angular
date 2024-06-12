import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent {
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    name:['', Validators.required],
    gender:['',Validators.required]

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  titles:any=[
    {
      id:1,
      name:"Mr"
    },
    {
      id:2,
      name:"Miss"
    },
    {
      id:3,
      name:"Missus"
    }
  ];
  genders:any=[
    {
      id:1,
      name:"Male"
    },
    {
      id:2,
      name:"Female"
    },
    {
      id:3,
      name:"Others"
    }
  ];

  constructor(private _formBuilder: FormBuilder) {}
}
