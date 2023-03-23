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
  @Input() books: any[] = [];

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
    } else {
      this.userid = this.authService.getCurrentUserId();
      this.getFilteredLibrary(0); // Modifier cette valeur pour chaque composant (0 pour Library, 1 pour AlreadyRead, etc.
    }
  }

  getFilteredLibrary(status: number): void {
    this.profileService.getLibrary(this.userid).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching user library', error);
      }
    );
  }
}
