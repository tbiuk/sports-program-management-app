import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SportsService } from '../sports.service';

@Injectable()
export class AllSportNamesExistPipe implements PipeTransform {
  constructor(private readonly sportsService: SportsService) {}

  async transform(sportsNames: string[]) {
    for (const sportName of sportsNames) {
      const sport = await this.sportsService.getSportByName(sportName);
      if (!sport) {
        throw new BadRequestException(
          `Sport with name ${sportName} does not exist`,
        );
      }
    }

    return sportsNames;
  }
}
