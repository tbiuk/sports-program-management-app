import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
