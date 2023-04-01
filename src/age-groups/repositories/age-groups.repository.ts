import { InjectKnex, Knex } from 'nestjs-knex';

export class AgeGroupsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getAllAgeGroups() {
    return this.knex('age_groups');
  }

  getAgeGroupById(ageGroupId: number) {
    return this.getAllAgeGroups().where('age_group_id', ageGroupId).first();
  }

  getAgeGroupByName(ageGroupName: string) {
    return this.getAllAgeGroups().where('name', ageGroupName).first();
  }

  createAgeGroup(ageGroupName: string) {
    return this.knex('age_groups').insert({ name: ageGroupName });
  }

  deleteAgeGroup(ageGroupId: number) {
    return this.knex('age_groups').where('age_group_id', ageGroupId).delete();
  }

  getAgeGroupUsers(ageGroupId: number) {
    return this.knex('age_groups as AGG')
      .join('users as USR', 'USR.age_group_id', 'AGG.age_group_id')
      .where('AGG.age_group_id', ageGroupId);
  }

  getAgeGroupClasses(ageGroupId: number) {
    return this.knex('age_groups as AGG')
      .join('classes as CLS', 'CLS.age_group_id', 'AGG.age_group_id')
      .where('AGG.age_group_id', ageGroupId);
  }
}
