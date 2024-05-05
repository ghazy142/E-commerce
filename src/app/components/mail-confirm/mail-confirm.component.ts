import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrl: './mail-confirm.component.scss'
})
export class MailConfirmComponent {
confirmationSuccess: any;
  constructor(private _AuthService: AuthService , private _Router:Router){}

  errMsg:string ='';
  isLoading:boolean = false;


  mailconfirm:FormGroup=new FormGroup({
    email:new FormControl('',[ Validators.required , Validators.email] ),
    code:new FormControl('',[ Validators.required ,Validators.minLength(5)] ), 
}

);


handleform():void{
  this.isLoading = true; 
  const confirmData =  this.mailconfirm.value;
  console.log(this.mailconfirm.value);
   if(this.mailconfirm.valid==true){
    const {email , code}=confirmData;
    this._AuthService.confirmEmail(email , +code).subscribe(
      {
        next: (response)=>{
          if(response.message == "Email Confirmed"){  
                      localStorage.setItem('email' ,'code');
                      this._Router.navigate(['/login']);
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
