export class Book {
  title: string;
  authors: string;
  isbn: string;
  img: string;
  description?: string;
  publisher?: string;
  publishedDate?: string;
  categories?: string;
  pageCount?: number;

  constructor(title: string, authors: string, isbn: string, img: string) {
    this.title = title;
    this.authors = authors;
    this.isbn = isbn;
    this.img = img;
  }
}
