import { Controller, Get } from '@nestjs/common';
import { AppService, Dish } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('dishes')
  getDishes(): Dish[] {
    return this.appService.getDishes();
  }
}
