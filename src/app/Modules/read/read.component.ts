import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../service/book.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../..//Auth/auth.service';
import { of, switchMap } from 'rxjs';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  // Declare the variables to store the book details
  img!: string;
  title!: string;
  authors!: string;
  description!: string;
  publisher!: string;
  publishedDate!: string;
  categories!: string;
  pageCount!: number;
  isbn!: string;

  // Other variables for authentication, data, and library status
  authenticated = false;
  inlibrary = false;
  status_0 = true;
  status_1 = false;
  status_2 = false;
  status_3 = false;
  constructor(private route: ActivatedRoute, private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the ISBN of the book from the route parameter
    let isbn = this.route.snapshot.paramMap.get('entry') || '';
    isbn = isbn.replace(/\D/g,'');

    // Call the apiSearch function with maxResults = 1
    this.bookService.apiSearch('', '', isbn, 1).subscribe((result) => {
      this.bookService.getCurrentBook().subscribe((response) => {
        const book = response.currentBook[0];
        this.img = book.img;
        this.title = book.title;
        this.authors = book.authors;
        this.description = book.description ?? 'No description available';
        this.publisher = book.publisher ?? 'No publisher available';
        this.publishedDate = book.publishedDate ?? 'No published date available';
        this.categories = book.categories ?? 'No categories available';
        this.pageCount = book.pageCount ?? 0;
        this.isbn = book.isbn;

        if (this.authenticated){
          this.bookService.checkIfInLibrary(this.isbn).subscribe((response) => {
            this.inlibrary = response.inLibrary;
            this.status_0 = response.status === 0;
            this.status_1 = response.status === 1;
            this.status_2 = response.status === 2;
            this.status_3 = response.status === 3;
          });
        }

      });
    });
    // Check if the user is authenticated
    this.authenticated = this.authService.isAuthenticated;
  }

  // Function to add the book to the library
  addToLibrary(): void {
    const book: Book = {
      img: this.img,
      title: this.title,
      authors: this.authors,
      isbn: this.isbn,
    }

    this.bookService.addToLibrary(book).subscribe((response) => {
      this.inlibrary = true;
      this.status_0 = true;
    });
  }

  removeBook(): void {
    this.bookService.removeBook(this.isbn).subscribe((response) => {
      this.inlibrary = false;
      this.status_0 = true;
      this.status_1 = false;
      this.status_2 = false;
      this.status_3 = false;
    });
  }

  // Function to change the status of the book
  changeStatus(status: string): void {
    this.status_0 = false;
    this.status_1 = false;
    this.status_2 = false;
    this.status_3 = false;
    switch (status) {
      case '0':
        this.status_0 = true;
        break;
      case '1':
        this.status_1 = true;
        break;
      case '2':
        this.status_2 = true;
        break;
      case '3':
        this.status_3 = true;
        break;
    }

    this.bookService.setStatus(this.isbn, status).subscribe((response) => {
      console.log(response);
    });
  }
}
