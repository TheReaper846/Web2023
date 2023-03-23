import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, of, filter } from 'rxjs';

interface LoginResponse {
  user?: {
    _id: string;
    name: string;
  };
  message: string;
}

interface ApiResponse {
  userId?: string;
}

interface ServerResponse {
  userId?: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = 'http://localhost:3000';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, password });
  }

  login(name: string, password: string): Observable<any> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { name, password }).pipe(
    tap((response) => {
      if (response.user) {
        this.isAuthenticatedSubject.next(true);
      }
    }));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUserId(): Observable<string | null> {
  return this.http.get<{ userId?: string }>(`${this.apiUrl}/currentUserId`).pipe(
    map(response => response.userId || null),
    catchError(() => {
      return of(null);
    })
  );
}

}
