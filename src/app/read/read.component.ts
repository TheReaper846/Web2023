import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '..//service/book.service';
import { Book } from '../models/book.model';

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

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    // Get the ISBN of the book from the route parameter
    const isbn = this.route.snapshot.paramMap.get('isbn') ?? '';

    // Call the apiSearch function with maxResults = 1
    this.bookService.apiSearch('', '', isbn, 1).subscribe((books: Book[]) => {
      // Display the book details
      const book = books[0];
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
  }
}
