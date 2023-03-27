import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidQueryParamsInterceptor implements NestInterceptor {
  constructor(private readonly validParams: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const queryParams = request.query;

    const invalidParams = Object.keys(queryParams).filter(
      (param) => !this.validParams.includes(param),
    );

    if (invalidParams.length > 0) {
      throw new BadRequestException(
        `Invalid query parameter(s): ${invalidParams.join(', ')}`,
      );
    }

    return next.handle();
  }
}
