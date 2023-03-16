import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  signup(): void {
    this.authService.signup(this.name, this.password).subscribe(
      (response) => {
        console.log('User created successfully', response);
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }
}
