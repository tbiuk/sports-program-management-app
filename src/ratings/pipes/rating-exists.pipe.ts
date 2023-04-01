import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RatingsRepository } from '../ratings.repository';

@Injectable()
export class RatingExistsPipe implements PipeTransform {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async transform(value: number) {
    const rating = await this.ratingsRepository.getRatingById(value);
    if (!rating) {
      throw new BadRequestException(`Rating with id ${value} does not exist`);
    }
    return value;
  }
}
