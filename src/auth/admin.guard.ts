import { ExecutionContext, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.usersRepository.getUserById(request.user.id);

    return user && user.role === 'admin';
  }
}
