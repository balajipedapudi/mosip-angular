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
    gender:['',Validators.required],
    date:[''],
    nationality:['',Validators.required],
    confirmation:['', Validators.required]




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
  nationalities:any=[
    {
      id:1,
      name:"Indian"
    },
    {
      id:2,
      name:"American"
    },
    {
      id:3,
      name:"Britian"
    }
  ];

  confirmations:any=[
    {
      id:1,
      name:"Yes",
      value:true
    },
    {
      id:2,
      name:"No",
      value:false
    }
  ];
  placeOfBirth:any=[
    {
      id:1,
      name:"New Delhi",
    },
    {
      id:2,
      name:"Mumbai",
    },
    {
      id:2,
      name:"Andhra Pradesh",
    },
  ];

  constructor(private _formBuilder: FormBuilder) {}
}