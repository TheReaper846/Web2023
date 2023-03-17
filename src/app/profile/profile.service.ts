import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private libraryUrl = 'http://localhost:3000/library';

  constructor(private http: HttpClient) {}

  getLibrary(userId: string): Observable<any> {
    return this.http.get(`${this.libraryUrl}/${userId}`);
  }

   getFilteredLibrary(userId: string, status: number): Observable<any> {
    return this.http.get(`${this.libraryUrl}/${userId}/status/${status}`);
  }
}
