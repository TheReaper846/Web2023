import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, password });
  }

  login(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { name, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
