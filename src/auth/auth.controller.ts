import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailVerifiedGuard } from './email-verified.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseGuards(EmailVerifiedGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
