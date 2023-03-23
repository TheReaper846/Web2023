import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-already-read',
  templateUrl: './already-read.component.html',
  styleUrls: ['./already-read.component.css']
})
export class AlreadyReadComponent implements OnInit {
  user: any;
  userid: any;
  @Input() results: any[] = [];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router // Injectez Router ici
  ) {}

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      // Si ce n'est pas le cas, redirigez vers le routeur "error"
      this.router.navigate(['/error']);
    }

    this.profileService.getFilteredLibrary('1').subscribe(
      (result) => {
      this.results = result.library;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );

  }
}
