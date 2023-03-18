import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  title: string = '';
  author: string = '';
  isbn: number | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  onSearch(): void {
    // Traiter la soumission du formulaire et effectuer la recherche
    this.bookService
      .apiSearch(this.title, this.author, this.isbn ? this.isbn.toString() : '', 40)
      .subscribe(
        (books) => {
          console.log('Books saved to the database:', books);
          this.router.navigate(['/search']);
        },
        (error) => {
          console.error('Error searching books:', error);
        }
      );
  }
}
