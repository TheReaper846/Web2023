import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  user: any;
  library: any[] = [];

  constructor(
    private authService: AuthService,
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (response) => {
        this.user = response.user;
        this.getLibrary();
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  getLibrary(): void {
    this.libraryService.getLibrary(this.user._id).subscribe(
      (response) => {
        this.library = response;
      },
      (error) => {
        console.error('Error fetching user library', error);
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out', error);
      }
    );
  }
}
