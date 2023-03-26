import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SportsModule } from './sports/sports.module';
const knexConfig = require('../knexfile');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot(knexConfig),
    UsersModule,
    AuthModule,
    SportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
