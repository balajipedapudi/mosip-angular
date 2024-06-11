import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  public login(){
    const url = "http://localhost:3000/otp";
    return this.http.get(url);
  }
}
