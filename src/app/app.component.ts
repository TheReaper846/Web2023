import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
