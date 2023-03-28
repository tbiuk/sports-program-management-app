import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class NotUndefinedPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      throw new BadRequestException(
        `The ${metadata.data} parameter must not be undefined`,
      );
    }
    return value;
  }
}
