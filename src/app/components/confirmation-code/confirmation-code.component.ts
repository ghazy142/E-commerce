import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: '..//confirmation-code/confirmation-code.component.html',
  styleUrls: ['..//confirmation-code/confirmation-code.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  confirmationStatus: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  confirmEmail() {
    const token = this.route.snapshot.queryParams['token'];
    this.authService.confirmEmail(token).subscribe(
      (data) => {
        this.confirmationStatus = 'success';
      },
      (error) => {
        this.confirmationStatus = 'error';
      }
    );
  }
}
