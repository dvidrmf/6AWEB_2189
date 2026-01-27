import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Httpclient } from './httpclient';
import { User, Todo } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  protected readonly title = signal('http-client-demo');
  httpusers: User[] = [];
  todos: Todo[] = [];

  constructor(private httpClient: Httpclient) {}

  ngOnInit() {
    this.httpClient.getLimitedUsers(3).subscribe((data) => {
      this.httpusers = data;
      console.log('Limited users loaded:', this.httpusers);
    });

    this.httpClient.getLimitedTodos(8).subscribe((data) => {
      this.todos = data;
      console.log('Limited todos loaded:', this.todos);
    });
  }
}
