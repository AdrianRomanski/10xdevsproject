import { Injectable } from '@nestjs/common';

export interface Dish {
  name: string;
  cuisine: string;
}

@Injectable()
export class AppService {
  private readonly dishes: Dish[] = [
    { name: 'Pierogi', cuisine: 'Polish' },
    { name: 'Pad Thai', cuisine: 'Thai' },
    { name: 'Ratatouille', cuisine: 'French' },
  ];

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getDishes(): Dish[] {
    return this.dishes;
  }
}
