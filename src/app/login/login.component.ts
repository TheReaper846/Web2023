import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.name, this.password).subscribe(
      (response) => {
        console.log('Logged in successfully', response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
