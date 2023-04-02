import { Controller, Get } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller('')
export class AppController {
  constructor() {}

  @Get()
  getHomePageData() {
    return 'Welcome to sports-program-management-app!';
  }
}
