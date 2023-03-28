import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SportsService } from '../sports.service';

@Injectable()
export class SportExistsPipe implements PipeTransform {
  constructor(private readonly sportsService: SportsService) {}

  async transform(value: number) {
    const sport = await this.sportsService.getSportById(value);
    if (!sport) {
      throw new BadRequestException(`Sport with name ${value} does not exist`);
    }

    return value;
  }
}
