import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {
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
        this.getFilteredLibrary(3); // Modifier cette valeur pour chaque composant (0 pour Library, 1 pour AlreadyRead, etc.)
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
