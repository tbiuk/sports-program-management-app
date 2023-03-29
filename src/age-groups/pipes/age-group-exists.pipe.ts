import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AgeGroupsService } from '../age-groups.service';

@Injectable()
export class AgeGroupExistsPipe implements PipeTransform {
  constructor(private readonly ageGroupsService: AgeGroupsService) {}

  async transform(value: number) {
    const ageGroup = await this.ageGroupsService.getAgeGroupById(value);
    if (!ageGroup) {
      throw new BadRequestException(
        `Age group with id ${value} does not exist`,
      );
    }

    return value;
  }
}
