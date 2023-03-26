import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SportsModule } from './sports/sports.module';
import { ClassesModule } from './classes/classes.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
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
    ClassesModule,
    EnrollmentsModule,
    CommentsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
