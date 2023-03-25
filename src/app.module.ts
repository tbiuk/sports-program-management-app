import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const knexConfig = require('../knexfile');

@Module({
  imports: [KnexModule.forRoot(knexConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
