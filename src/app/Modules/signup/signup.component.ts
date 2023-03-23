import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name!: string;
  password!: string;
  password2!: string;

  constructor(private authService: AuthService, private router: Router) {}

  passwordsMatch(): boolean {
    return this.password === this.password2;
  }

  signup(): void {
    this.authService.signup(this.name, this.password).subscribe(
      (response) => {
        console.log('User created successfully', response);
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
    this.authService.login(this.name, this.password).subscribe(
      (response) => {
        console.log('Logged in successfully', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
