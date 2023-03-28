import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('ageGroupId') ageGroupId: number,
  ) {
    const emailVerificationToken = await this.UsersService.createUser(
      email,
      password,
      ageGroupId,
    );
    this.UsersService.sendVerificationEmail(email, emailVerificationToken);

    return { message: 'User registered.' };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.UsersService.verifyEmailToken(token);

    if (!user) {
      return { message: 'Email verification failed.' };
    }

    return { message: 'Email verified successfully.' };
  }
}
