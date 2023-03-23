// search.component.ts

import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  results: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (books) => {
        this.results = books;
        console.log('Books fetched from the database:', books);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
