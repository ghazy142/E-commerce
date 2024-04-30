import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {}

    register(userDate:object):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userDate);

    }

    login(userDate:object):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userDate);

    }
   }

