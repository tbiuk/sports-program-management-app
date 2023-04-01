import { BadRequestException, Injectable } from '@nestjs/common';
import { AgeGroupsRepository } from './age-groups.repository';

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

  private async checkCanDeleteAgeGroup(ageGroupId: number) {
    const ageGroupUsers = await this.ageGroupsRepository.getAgeGroupUsers(
      ageGroupId,
    );

    if (ageGroupUsers.length) {
      throw new BadRequestException(
        `Cannot delete age group asociated with one or more users`,
      );
    }

    const ageGroupClasses = await this.ageGroupsRepository.getAgeGroupClasses(
      ageGroupId,
    );

    if (ageGroupClasses.length) {
      throw new BadRequestException(
        `Cannot delete age group asociated with one or more classes`,
      );
    }
  }

  async deleteAgeGroup(ageGroupId: number) {
    await this.checkCanDeleteAgeGroup(ageGroupId);
    return this.ageGroupsRepository.deleteAgeGroup(ageGroupId);
  }

  getAgeGroupByName(ageGroupName: string) {
    return this.ageGroupsRepository.getAgeGroupByName(ageGroupName);
  }
}
