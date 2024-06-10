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
  
}
