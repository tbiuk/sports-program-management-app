import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SportsService } from '../sports.service';

@Injectable()
export class SportExistsOrUndefinedPipe implements PipeTransform {
  constructor(private readonly sportsService: SportsService) {}

  async transform(value: string) {
    if (typeof value === 'undefined') {
      return value;
    }

    const sport = await this.sportsService.getSportByName(value);
    if (!sport) {
      throw new BadRequestException(`Sport with name ${value} does not exist`);
    }

    return value;
  }
}
