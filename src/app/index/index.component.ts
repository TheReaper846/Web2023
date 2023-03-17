import { Component } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  title: string = '';
  author: string = '';
  isbn: number | null = null;

  constructor(private bookService: BookService) {}

  onSearch(): void {
    // Traiter la soumission du formulaire et effectuer la recherche
    this.bookService
      .apiSearch(this.title, this.author, this.isbn ? this.isbn.toString() : '')
      .subscribe(
        (books) => {
          console.log('Books saved to the database:', books);
        },
        (error) => {
          console.error('Error searching books:', error);
        }
      );
  }
}
