import { InjectKnex, Knex } from 'nestjs-knex';

export class SportsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllSports() {
    return this.knex('sports').select(
      'sport_id as sportID',
      'name',
      'description',
    );
  }

  getSportById(sportID: number) {
    return this.getAllSports().where('sport_id', sportID).first();
  }

  getSportByName(sportName: string) {
    return this.getAllSports().where('name', sportName).first();
  }

  createSport(sportName: string, sportDescription: string) {
    return this.knex('sports').insert({
      name: sportName,
      description: sportDescription,
    });
  }

  updateSport(sportID: number, sportName: string, sportDescription: string) {
    let query = this.knex('sports').where('sport_id', sportID);

    if (typeof sportName !== 'undefined')
      query = query.update('name', sportName);

    if (typeof sportDescription !== 'undefined')
      query = query.update('description', sportDescription);

    return query;
  }

  deleteSport(sportID: number) {
    return this.knex('sports').where('sport_id', sportID).delete();
  }
}
