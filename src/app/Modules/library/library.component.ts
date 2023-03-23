import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router'; // Ajoutez cette ligne pour importer Router

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
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

    this.profileService.getFullLibrary().subscribe(
      (result) => {
      this.results = result.library;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );

  }
}
