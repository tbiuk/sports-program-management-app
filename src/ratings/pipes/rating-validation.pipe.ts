import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RatingValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'undefined') {
      throw new BadRequestException(
        'The rating parameter must not be undefined',
      );
    }

    const rating = parseInt(value);

    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be a number between 1 and 5');
    }

    return value;
  }
}
