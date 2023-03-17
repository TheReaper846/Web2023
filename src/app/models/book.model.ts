export class Book {
  title: string;
  authors: string;
  isbn: string;
  img: string;

  constructor(title: string, authors: string, isbn: string, img: string) {
    this.title = title;
    this.authors = authors;
    this.isbn = isbn;
    this.img = img;
  }
}
