import { BadRequestException, Injectable } from '@nestjs/common';
import { SportsRepository } from './repositories/sports.repository';

@Injectable()
export class SportsService {
  constructor(private readonly sportsRepository: SportsRepository) {}

  getAllSports() {
    return this.sportsRepository.getAllSports();
  }

  getSportById(sportID: number) {
    return this.sportsRepository.getSportById(sportID);
  }

  private async checkNameUnique(
    sportName: string,
    excludeSportID: number = null,
  ) {
    const existingSport = await this.sportsRepository.getSportByName(sportName);

    if (existingSport && existingSport.sportID != excludeSportID) {
      throw new BadRequestException(
        `Sport with name ${sportName} already exists`,
      );
    }
  }

  async createSport(sportName: string, sportDescription: string) {
    await this.checkNameUnique(sportName);
    return this.sportsRepository.createSport(sportName, sportDescription);
  }

  async updateSport(
    sportID: number,
    sportName: string,
    sportDescription: string,
  ) {
    if (typeof sportName !== 'undefined') {
      await this.checkNameUnique(sportName, sportID);
    }

    return this.sportsRepository.updateSport(
      sportID,
      sportName,
      sportDescription,
    );
  }

  async deleteSport(sportID: number) {
    return this.sportsRepository.deleteSport(sportID);
  }

  getSportByName(sportName: string) {
    return this.sportsRepository.getSportByName(sportName);
  }
}
