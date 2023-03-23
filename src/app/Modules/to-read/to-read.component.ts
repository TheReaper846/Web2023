import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-to-read',
  templateUrl: './to-read.component.html',
  styleUrls: ['./to-read.component.css']
})
export class ToReadComponent implements OnInit {
  user: any;
  @Input() books: any[] = [];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (response) => {
        this.user = response.user;
        this.getFilteredLibrary(2); // Modifier cette valeur pour chaque composant (0 pour Library, 1 pour AlreadyRead, etc.)
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  getFilteredLibrary(status: number): void {
    this.profileService.getFilteredLibrary(this.user._id, status).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching user library', error);
      }
    );
  }
}
