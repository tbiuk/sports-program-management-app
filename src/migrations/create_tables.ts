exports.up = function (knex) {
  return knex.schema
    .createTable('age_groups', function (table) {
      table.increments('age_group_id').primary();
      table.string('name').notNullable();
    })
    .createTable('users', function (table) {
      table.increments('user_id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').defaultTo('user');
      table
        .integer('age_group_id')
        .unsigned()
        .notNullable()
        .references('age_group_id')
        .inTable('age_groups');
      table.boolean('verified').defaultTo(false);
      table.string('email_verification_token').nullable();
    })
    .createTable('sports', function (table) {
      table.increments('sport_id').primary();
      table.string('name').unique().notNullable();
      table.string('description').nullable();
    })
    .createTable('classes', function (table) {
      table.increments('class_id').primary();
      table
        .integer('sport_id')
        .unsigned()
        .notNullable()
        .references('sport_id')
        .inTable('sports')
        .onDelete('CASCADE');
      table
        .integer('age_group_id')
        .unsigned()
        .notNullable()
        .references('age_group_id')
        .inTable('age_groups');
      table.string('duration').notNullable();
      table.string('schedule').notNullable();
    })
    .createTable('enrollments', function (table) {
      table.increments('enrollment_id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE');
      table.unique(['user_id', 'class_id']);
    })
    .createTable('ratings', function (table) {
      table.increments('rating_id').primary();
      table
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('user_id')
        .inTable('users')
        .onDelete('SET NULL');
      table.integer('rating').notNullable();
      table.unique(['class_id', 'user_id']);
    })
    .createTable('comments', function (table) {
      table.increments('comment_id').primary();
      table
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('user_id')
        .inTable('users')
        .onDelete('SET NULL');
      table.string('comment').notNullable();
      table.unique(['class_id', 'user_id']);
    })
    .then(function () {
      return knex('age_groups').insert([
        {
          name: 'child',
        },
        {
          name: 'youth',
        },
        {
          name: 'young adult',
        },
        {
          name: 'adult',
        },
      ]);
    })
    .then(function () {
      return knex('users').insert([
        {
          email: 'admin@mail.com',
          password:
            '$2b$10$BTeRfohRMFDhgLJ2/FyKf.ipqTlCEDRbKvAxg6BXvOUYG0xClBimO',
          role: 'admin',
          age_group_id: 4,
          verified: true,
          email_verification_token: null,
        },
      ]);
    })
    .then(function () {
      return knex('sports').insert([
        {
          name: 'baseball',
          description: 'Learn baseball.',
        },
        {
          name: 'basketball',
          description: 'Learn basketball.',
        },
        {
          name: 'football',
          description: 'Learn football.',
        },
        {
          name: 'boxing',
          description: 'Learn boxing.',
        },
        {
          name: 'cycling',
          description: 'Learn cycling.',
        },
        {
          name: 'fitness',
          description: 'Learn fitness.',
        },
        {
          name: 'golf',
          description: 'Learn golf.',
        },
        {
          name: 'running',
          description: 'Learn running.',
        },
        {
          name: 'swimming',
          description: 'Learn swimming.',
        },
        {
          name: 'tennis',
          description: 'Learn tennis.',
        },
        {
          name: 'triathlon',
          description: 'Learn triathlon.',
        },
        {
          name: 'volleyball',
          description: 'Learn volleyball.',
        },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('ratings')
    .dropTableIfExists('enrollments')
    .dropTableIfExists('classes')
    .dropTableIfExists('sports')
    .dropTableIfExists('users')
    .dropTableIfExists('age_groups');
};
