export const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('role').defaultTo('user');
    table.string('age').defaultTo('adult');
    table.boolean('verified').defaultTo(false);
    table.string('emailVerificationToken').nullable();
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('users');
};
