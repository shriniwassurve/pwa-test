import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa-test';
  todos: any[];
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data: any[]) => {
        console.log(data);
        this.todos = data;
      });
  }
}
