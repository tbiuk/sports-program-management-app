import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AgeGroupsService } from '../age-groups.service';

@Injectable()
export class AllAgeGroupNamesExistPipe implements PipeTransform {
  constructor(private readonly ageGroupsService: AgeGroupsService) {}

  async transform(ageGroupNames: string[]) {
    for (const ageGroupName of ageGroupNames) {
      const ageGroup = await this.ageGroupsService.getAgeGroupByName(
        ageGroupName,
      );
      if (!ageGroup) {
        throw new BadRequestException(
          `Age group with name ${ageGroupName} does not exist`,
        );
      }
    }

    return ageGroupNames;
  }
}
