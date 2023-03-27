import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';

@Injectable()
export class UserBelongsToClassInterceptor implements NestInterceptor {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const classId = request.body.class;

    const enrollment =
      await this.enrollmentsService.getEnrollmentByUserAndClassID(
        userId,
        classId,
      );

    if (!enrollment) {
      throw new ForbiddenException(
        'User does not belong to the specified class',
      );
    }

    return next.handle();
  }
}
