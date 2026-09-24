import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';

interface Dish {
  name: string;
  cuisine: string;
}

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';
  private readonly http = inject(HttpClient);
  protected readonly dishes = signal<Dish[]>([]);

  constructor() {
    this.http.get<Dish[]>('/api/dishes').subscribe((dishes) => this.dishes.set(dishes));
  }
}
