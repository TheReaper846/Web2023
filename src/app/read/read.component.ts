import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '..//service/book.service';
import { Book } from '../models/book.model';
import { AuthService } from '../auth.service';
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
  datas = false;
  inlibrary = false;
  status_0 = false;
  status_1 = false;
  status_2 = false;
  status_3 = false;
  constructor(private route: ActivatedRoute, private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the ISBN of the book from the route parameter
    const isbn = this.route.snapshot.paramMap.get('isbn') ?? '';
    const userId = this.authService.getCurrentUserId();

    // Call the apiSearch function with maxResults = 1
    this.bookService.apiSearch('', '', isbn, 1).subscribe((books: Book[]) => {
      // Display the book details
      const book = books[0];
      console.log(book);
      this.img = book.img;
      this.title = book.title;
      this.authors = book.authors;
      this.description = book.description ?? 'No description available';
      this.publisher = book.publisher ?? 'No publisher available';
      this.publishedDate = book.publishedDate ?? 'No published date available';
      this.categories = book.categories ?? 'No categories available';
      this.pageCount = book.pageCount ?? 0;
      this.isbn = book.isbn;
    });

    this.authService.getCurrentUserId()
    .pipe(
      switchMap((userId: string | null) => {
        if (userId) {
          return this.bookService.getBookStatus(this.title, this.isbn, userId);
        } else {
          return of({
            status_0: false,
            status_1: false,
            status_2: false,
            status_3: false,
          });
        }
      })
    )
    .subscribe(
      (status) => {
        this.status_0 = status.status_0;
        this.status_1 = status.status_1;
        this.status_2 = status.status_2;
        this.status_3 = status.status_3;
      },
      (error) => {
        console.error('Error fetching book status:', error);
      }
    );
  }
}
