import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    isbn: string,
    maxResults: number
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
      url += '&maxResults='+ maxResults.toString() +'&key=AIzaSyD7EJo8D4aciXWQpw-2RVmJ-O95gh1QU3g';
      url = url.replace(/ /g, '+');
    } else {
      return new Observable((observer) => {
        observer.error('No search criteria provided');
      });
    }

    return new Observable((observer) => {
      this.http.get(url).subscribe(async (data: any) => {
        const searchResults = data.items.map((item: any): Book => {
          let isbn = '';
          let authors = '';
          let image = '';
          try {
            isbn = item.volumeInfo.industryIdentifiers[0].identifier;
          }catch (e) {
            isbn = 'No ISBN';
          }
          try {
            authors = item.volumeInfo.authors.join(', ');
          }catch (e) {
            authors = 'No author';
          }
          try {
            image = item.volumeInfo.imageLinks.thumbnail;
          }catch (e) {
            image = 'No image';
          }
          const book: Book = {
            title: item.volumeInfo.title || 'No title',
            authors: authors,
            isbn: isbn,
            img: image,
            ...(maxResults === 1 && {
              description: item.volumeInfo.description || 'No description',
              publisher: item.volumeInfo.publisher || 'No publisher',
              publishedDate: item.volumeInfo.publishedDate || 'No date',
              categories: item.volumeInfo.categories?.join(', ') || 'No categories',
              pageCount: item.volumeInfo.pageCount || 'No page count',
            }),
          };
          return book;
        });

        // Save the search results in the database and return the saved books
        const savedBooks = await Promise.all(
          searchResults.map((book: Book) => this.saveBook(book).toPromise())
        );
        observer.next(savedBooks);
        observer.complete();
      });
    });
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.API_URL}/books`, book);
  }

  clearBooks(): Observable<any> {
  return this.http.post<any>(`${this.API_URL}/clear`, {}).pipe(
    catchError(error => {
      console.error(error);
      return throwError(error);
    })
  );
}


  getBookDetails(
    lib: number,
    id: string,
    userName: string,
    reread: number
  ): Observable<any> {
    // L'URL de l'API pour récupérer les informations du livre
    const url = `${this.API_URL}/readBook`;

    // Le payload pour la requête POST
    const payload = {
      lib: lib,
      id: id,
      userName: userName,
      reread: reread,
    };

    // Envoie la requête POST à l'API Node.js
    return this.http.post<any>(url, payload);
  }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/search`);
  }

  getBookStatus(title: string, isbn: string, userId: string): Observable<any> {
    // Replace with the appropriate API URL and endpoint
    const url = `${this.API_URL}/bookstatus?title=${title}&isbn=${isbn}&userId=${userId}`;
    return this.http.get(url);
  }
}
