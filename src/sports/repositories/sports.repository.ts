import { InjectKnex, Knex } from 'nestjs-knex';

export class SportsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllSports() {
    return this.knex('sports').select(
      'sport_id as sportId',
      'name',
      'description',
    );
  }

  getSportById(sportId: number) {
    return this.getAllSports().where('sport_id', sportId).first();
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

  updateSport(sportId: number, sportName: string, sportDescription: string) {
    let query = this.knex('sports').where('sport_id', sportId);

    if (typeof sportName !== 'undefined')
      query = query.update('name', sportName);

    if (typeof sportDescription !== 'undefined')
      query = query.update('description', sportDescription);

    return query;
  }

  getSportClasses(sportId: number) {
    return this.knex('class').where('sport_id', sportId);
  }

  deleteSport(sportId: number) {
    return this.knex('sports').where('sport_id', sportId).delete();
  }
}
