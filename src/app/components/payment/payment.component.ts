import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}

cartId:any='';


  orderForm:FormGroup = new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl(''),

  });


  handleForm():void{

    this._CartService.checkOut(this.cartId , this.orderForm.value).subscribe({
      next:(response)=>{
        if(response.status==="success"){
          window.open(response.session.url , '_blank')

        }
      },
    });
  } 



  ngOnInit():void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')
      }
    })

  }


}
