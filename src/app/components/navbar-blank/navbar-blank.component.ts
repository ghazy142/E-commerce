import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent {

constructor(private _Router: Router){}

  signOut(): void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login'])

  }
 
}
