import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MutuallyExclusiveQueryParamsInterceptor
  implements NestInterceptor
{
  constructor(private readonly exclusiveParams: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const queryParams = request.query;

    const paramsCount = this.exclusiveParams.filter(
      (param) => queryParams[param],
    ).length;

    if (paramsCount > 1)
      throw new BadRequestException(
        `Please provide only one of the following query parameters: ${this.exclusiveParams.join(
          ', ',
        )}`,
      );

    return next.handle();
  }
}
