import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {}

  register(userDate: object): Observable<any> {
    // return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userDate);
    return this._HttpClient.post(`https://localhost:5001/api/Account/register/owner`, userDate);
  }

  login(userDate: any): Observable<any> {
    // return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userDate);
    const params=new HttpParams().set('email',userDate.email ).set('passwd',userDate.password);  
    return this._HttpClient.post(`https://localhost:5001/api/Account/login`, {}, {params});
  }

  confirmEmail(email: string , code:number): Observable<any> {
    const params=new HttpParams().set('email',email ).set('code',code);  
    return  this._HttpClient.put(`https://localhost:5001/api/Account/email-confirmation`, {} , {params});
  }
}
