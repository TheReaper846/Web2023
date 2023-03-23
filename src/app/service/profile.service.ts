import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private libraryUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFullLibrary(): Observable<any> {
    return this.http.get<any>(`${this.libraryUrl}/library`);
  }

  getFilteredLibrary(status: string): Observable<any> {
    return this.http.get(`${this.libraryUrl}/filteredLibrary?status=${status}`);
  }
}
