import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _AuthService: AuthService , private _Router:Router){}



  errMsg:string ='';
  isLoading:boolean = false;
  
    loginForm:FormGroup=new FormGroup({
        email:new FormControl('',[ Validators.required , Validators.email] ),
        password:new FormControl('',[ Validators.required ,Validators.minLength(8)] ), 
    }
  
    );
  
    handleform():void{ 
      this.isLoading = true; 
  
  
  const userDate =  this.loginForm.value;
  console.log(this.loginForm.value);
      if(this.loginForm.valid==true){
        this._AuthService.login(userDate).subscribe(
          {
            next: (response)=>{
      if(response.token){
        // login
        localStorage.setItem('_token' , response.token);
          this._Router.navigate(['/home']);
          this.isLoading = false;
  
      }
            },
            error: (err)=>{
              this.errMsg = err.error.message;
              this.isLoading = false;
  
          }
        }
        )
      }
    }
}
