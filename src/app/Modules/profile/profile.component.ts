import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent /*implements OnInit*/{
  user: any;
  library: any[] = [];
  fullLibrary: any[] = [];
  alreadyRead: any[] = [];
  toRead: any[] = [];
  reading: any[] = [];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.authService.getProfile().subscribe(
  //     (response) => {
  //       this.user = response.user;
  //       // this.getLibrary();
  //     },
  //     (error) => {
  //       console.error('Error fetching user profile', error);
  //     }
  //   );
  // }

  // getLibrary(): void {
  //   this.profileService.getLibrary(this.user._id).subscribe(
  //     (response) => {
  //       this.library = response;
  //       this.fullLibrary = this.library;
  //       this.alreadyRead = this.library.filter((book) => book.status === 1);
  //       this.toRead = this.library.filter((book) => book.status === 2);
  //       this.reading = this.library.filter((book) => book.status === 3);
  //     },
  //     (error) => {
  //       console.error('Error fetching user library', error);
  //     }
  //   );
  // }

  // logout(): void {
  //   this.authService.logout().subscribe(
  //     () => {
  //       console.log('Logged out successfully');
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.error('Error logging out', error);
  //     }
  //   );
  // }
}
