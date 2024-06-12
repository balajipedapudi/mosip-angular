import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyApplicationsService {

  constructor(private http:HttpClient) { }

  public getAppCards(){
    const url = "http://10.175.1.66:3000/appCards";
    return this.http.get(url);
  }
}
