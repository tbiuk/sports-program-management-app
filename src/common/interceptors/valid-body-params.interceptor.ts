import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidBodyParamsInterceptor implements NestInterceptor {
  constructor(private readonly validParams: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const bodyParams = request.body;

    const invalidParams = Object.keys(bodyParams).filter(
      (param) => !this.validParams.includes(param),
    );

    if (invalidParams.length > 0) {
      throw new BadRequestException(
        `Invalid body parameter(s): ${invalidParams.join(', ')}`,
      );
    }

    return next.handle();
  }
}
