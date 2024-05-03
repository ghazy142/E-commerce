import { HttpClient } from '@angular/common/http';
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

  login(userDate: object): Observable<any> {
    // return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userDate);
    return this._HttpClient.post(`https://localhost:5001/api/Account/login`, userDate);
  }

  confirmEmail(token: object): Observable<any> {
    return this._HttpClient.get(`https://localhost:5001/api/Account/confirmation-code`, token);
  }
}
