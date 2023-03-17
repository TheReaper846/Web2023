import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  apiSearch(
    title: string,
    author: string,
    isbn: string
  ): Observable<Book[]> {
    // Construisez l'URL de l'API ici
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (isbn !== '' || title !== '' || author !== '') {
      if (isbn !== '') {
        url += 'isbn:' + isbn;
      }
      if (author !== '' && isbn !== '') {
        url += '+inauthor:' + author;
      } else if (author !== '' && isbn === '') {
        url += 'inauthor:' + author;
      }
      if (title !== '' && (isbn !== '' || author !== '')) {
        url += '+intitle:' + title;
      } else if (title !== '' && isbn === '' && author === '') {
        url += 'intitle:' + title;
      }
      url += '&maxResults=40&key=AIzaSyD7EJo8D4aciXWQpw-2RVmJ-O95gh1QU3g';
      url = url.replace(/ /g, '+');
    } else {
      return new Observable((observer) => {
        observer.error('No search criteria provided');
      });
    }

    return new Observable((observer) => {
      this.http.get(url).subscribe(async (data: any) => {
        const searchResults = data.items.map((item: any): Book => {
          const book: Book = {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors.join(', '),
            isbn: item.volumeInfo.industryIdentifiers[0].identifier,
            img: item.volumeInfo.imageLinks.thumbnail,
          };
          return book;
        });

        // Enregistrer les résultats dans la base de données et renvoyer les livres enregistrés
        const savedBooks = await Promise.all(
          searchResults.map((book : Book) => this.saveBook(book).toPromise())
        );
        observer.next(savedBooks);
        observer.complete();
      });
    });
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.API_URL}/books`, book);
  }
}
