import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('ageGroupID') ageGroupID: number,
  ) {
    const emailVerificationToken = await this.userService.createUser(
      email,
      password,
      ageGroupID,
    );
    this.userService.sendVerificationEmail(email, emailVerificationToken);

    return { message: 'User registered.' };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.userService.verifyEmailToken(token);

    if (!user) {
      return { message: 'Email verification failed.' };
    }

    return { message: 'Email verified successfully.' };
  }
}
