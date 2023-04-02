import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class EmailVerifiedGuard extends JwtAuthGuard {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersRepository.getUserByEmail(
      request.body.username,
    );

    if (!user) {
      throw new UnauthorizedException('No user found with this email');
    }

    if (user && !user.verified) {
      throw new UnauthorizedException('Email not verified');
    }

    return user && user.verified;
  }
}
