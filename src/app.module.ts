import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
const knexConfig = require('../knexfile');

@Module({
  imports: [KnexModule.forRoot(knexConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
