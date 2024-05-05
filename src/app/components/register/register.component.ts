import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService , private _Router:Router){}



errMsg:string ='';
isLoading:boolean = false;

  registerForm:FormGroup=new FormGroup({
    firstName: new FormControl('' ,[ Validators.required , Validators.minLength(3) , Validators.maxLength(25)] ),
    lastName: new FormControl('' ,[ Validators.required , Validators.minLength(3) , Validators.maxLength(25)] ),
    email:new FormControl('',[ Validators.required , Validators.email] ),
    password:new FormControl('',[ Validators.required ,Validators.minLength(8)] ), 
    phoneNumber:new FormControl('',[ Validators.required ,Validators.minLength(11)])
  }

  );

  handleform():void{
    this.isLoading = true; 


const userDate =  this.registerForm.value;
console.log(this.registerForm.value);
    if(this.registerForm.valid==true){
      this._AuthService.register(userDate).subscribe(
        {
          next: (response)=>{
    if(response.message==="Confirmation Code Has Been Sent"){
      // login
        this._Router.navigate(['/mailconfirm']);
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
