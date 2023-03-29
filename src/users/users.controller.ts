import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Delete,
  UseInterceptors,
  Request,
  Param,
  Put,
} from '@nestjs/common';
import { AgeGroupExistsPipe } from 'src/age-groups/pipes/age-group-exists.pipe';
import { AdminGuard } from 'src/auth/admin.guard';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('ageGroupId', AgeGroupExistsPipe) ageGroupId: number,
  ) {
    const emailVerificationToken = await this.usersService.createUser(
      email,
      password,
      ageGroupId,
    );
    this.usersService.sendVerificationEmail(email, emailVerificationToken);

    return { message: 'User registered.' };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.verifyEmailToken(token);

    if (!user) {
      return { message: 'Email verification failed.' };
    }

    return { message: 'Email verified successfully.' };
  }

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getUserById(@Param('id', UserExistsPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Put('unsetadmin/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  setUserNotAdmin(@Request() req, @Param('id', UserExistsPipe) userId: number) {
    return this.usersService.setUserNotAdmin(req.user.id, userId);
  }

  @Put('setadmin/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  setUserAdmin(@Param('id', UserExistsPipe) userId: number) {
    return this.usersService.setUserAdmin(userId);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteRating(@Request() req, @Param('id', UserExistsPipe) userId: number) {
    return this.usersService.deleteUser(req.user.id, userId);
  }
}
