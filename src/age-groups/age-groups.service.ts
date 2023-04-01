import { BadRequestException, Injectable } from '@nestjs/common';
import { AgeGroupsRepository } from './repositories/age-groups.repository';

@Injectable()
export class AgeGroupsService {
  constructor(private readonly ageGroupsRepository: AgeGroupsRepository) {}

  getAllAgeGroups() {
    return this.ageGroupsRepository.getAllAgeGroups();
  }

  getAgeGroupById(ageGroupId: number) {
    return this.ageGroupsRepository.getAgeGroupById(ageGroupId);
  }

  private async checkNameUnique(ageGroupName: string) {
    const existingAgeGroup = await this.ageGroupsRepository.getAgeGroupByName(
      ageGroupName,
    );

    if (existingAgeGroup) {
      throw new BadRequestException(
        `Age group with name ${ageGroupName} already exists`,
      );
    }
  }

  async createAgeGroup(ageGroupName: string) {
    await this.checkNameUnique(ageGroupName);
    return this.ageGroupsRepository.createAgeGroup(ageGroupName);
  }

  deleteAgeGroup(ageGroupId: number) {
    return this.ageGroupsRepository.deleteAgeGroup(ageGroupId);
  }

  getAgeGroupByName(ageGroupName: string) {
    return this.ageGroupsRepository.getAgeGroupByName(ageGroupName);
  }
}
